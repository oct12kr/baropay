import "server-only";
import { cache } from "react";
import type { BlogPost, PaginatedPosts, WordPressPost } from "@/types/wordpress";

const WORDPRESS_URL = process.env.WORDPRESS_URL?.replace(/\/+$/, "");
const WORDPRESS_USERNAME = process.env.WORDPRESS_USERNAME;
const WORDPRESS_APP_PASSWORD = process.env.WORDPRESS_APP_PASSWORD;

const API_BASE = WORDPRESS_URL ? `${WORDPRESS_URL}/wp-json/wp/v2` : null;

export const isWordpressConfigured = Boolean(API_BASE);
export const BLOG_PLACEHOLDER_IMAGE = "/images/blog-placeholder.svg";

const REVALIDATE_SECONDS = 300;

/** Upper bound for a single WordPress request. Without it a stalled
 * connection (seen in production as `ConnectTimeoutError` / `read ETIMEDOUT`
 * from the serverless region to the WordPress host) keeps the page's stream
 * open for a minute or more with only the loading skeleton on screen. */
const REQUEST_TIMEOUT_MS = 8000;
/** One retry on network failure/timeout/5xx — these are transient on the
 * WordPress host and usually succeed on the next attempt. */
const MAX_ATTEMPTS = 2;

/** Thrown when WordPress can't be reached, as opposed to it answering that a
 * post doesn't exist — so a transient outage isn't rendered as a 404. */
export class WordPressUnavailableError extends Error {
  constructor(path: string) {
    super(`WordPress request failed: ${path}`);
    this.name = "WordPressUnavailableError";
  }
}

function getAuthHeaders(): HeadersInit | undefined {
  if (!WORDPRESS_USERNAME || !WORDPRESS_APP_PASSWORD) return undefined;
  const token = Buffer.from(`${WORDPRESS_USERNAME}:${WORDPRESS_APP_PASSWORD}`).toString(
    "base64"
  );
  return { Authorization: `Basic ${token}` };
}

export function getFeaturedImage(post: WordPressPost): string | null {
  return post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;
}

function getFeaturedImageAlt(post: WordPressPost): string | null {
  const alt = post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text;
  return alt && alt.trim().length > 0 ? alt : null;
}

/** Intrinsic dimensions of the featured image, used to reserve layout space
 * (prevents CLS) and enable next/image optimization without cropping. */
function getFeaturedImageDimensions(post: WordPressPost): {
  width: number | null;
  height: number | null;
} {
  const details = post._embedded?.["wp:featuredmedia"]?.[0]?.media_details;
  return { width: details?.width ?? null, height: details?.height ?? null };
}

const NAMED_HTML_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
  mdash: "—",
  ndash: "–",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
};

/** Decodes WordPress's HTML-entity-encoded text (e.g. "&#8217;", "&amp;") into plain text, for use in <title>/<meta> where raw entities would otherwise render literally. */
function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec: string) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&([a-zA-Z]+);/g, (match, name: string) => NAMED_HTML_ENTITIES[name] ?? match);
}

/** WordPress's `date`/`modified` fields are site-local wall-clock time with no UTC offset, which
 * JS parses as if it were UTC. Using `*_gmt` (already true UTC) instead keeps every downstream
 * consumer — JSON-LD, sitemap lastmod, RSS pubDate — anchored to the correct instant. */
function toIsoUtc(gmtDateString: string): string {
  if (!gmtDateString) return "";
  return /(?:Z|[+-]\d{2}:?\d{2})$/.test(gmtDateString) ? gmtDateString : `${gmtDateString}Z`;
}

/** Fields requested for list views (home reviews, /blog, related posts), which
 * never render full post body — excluding `content` avoids downloading and
 * parsing every post's full HTML just to show a title/excerpt/thumbnail. */
const LIST_FIELDS = "id,slug,date_gmt,modified_gmt,title,excerpt,featured_media,_links,_embedded";

/** WordPress rewrites an image into several size variants (e.g.
 * `photo.jpg` -> `photo-1024x576.jpg`) and `wp:featuredmedia.source_url` vs. a
 * `content.rendered` `<img src>` can each land on a different variant of the
 * same underlying media. Stripping the `-WxHx` suffix and any query string
 * gives a stable identity to compare "is this the same image" without
 * requiring a byte-for-byte URL match. */
function getImagePathIdentity(url: string): string | null {
  try {
    const { pathname } = new URL(url);
    return pathname.replace(/-\d+x\d+(?=\.\w+$)/, "");
  } catch {
    return null;
  }
}

function isSameImage(urlA: string | null, urlB: string | null): boolean {
  if (!urlA || !urlB) return false;
  const idA = getImagePathIdentity(urlA);
  const idB = getImagePathIdentity(urlB);
  return idA !== null && idA === idB;
}

/** Trims a matched `<tag ...>` back to include any immediately-preceding
 * Gutenberg block comment (`<!-- wp:image -->`) and forward to include any
 * immediately-following closing block comment (`<!-- /wp:image -->`), so
 * removing a block doesn't leave orphaned comment markers behind. */
function expandToBlockComments(html: string, start: number, end: number): { start: number; end: number } {
  const before = html.slice(0, start);
  const openComment = /<!--\s*wp:[\w-]+(?:\s+\{[^}]*\})?\s*-->\s*$/.exec(before);
  const newStart = openComment ? start - openComment[0].length : start;

  const after = html.slice(end);
  const closeComment = /^\s*<!--\s*\/wp:[\w-]+\s*-->/.exec(after);
  const newEnd = closeComment ? end + closeComment[0].length : end;

  return { start: newStart, end: newEnd };
}

/** After removing a block, collapse a now-empty wrapper (`<p></p>`,
 * `<figure ...></figure>`) and any leading whitespace left at the start of
 * the content so the featured image isn't followed by a blank gap. */
function collapseEmptyLeadingWrappers(html: string): string {
  let result = html;
  let changed = true;
  while (changed) {
    changed = false;
    const trimmed = result.replace(/^\s+/, "");
    if (trimmed !== result) {
      result = trimmed;
      changed = true;
    }
    const emptyWrapper = /^<(p|figure|div)(?:\s[^>]*)?>\s*<\/\1>/i.exec(result);
    if (emptyWrapper) {
      result = result.slice(emptyWrapper[0].length);
      changed = true;
    }
  }
  return result;
}

/** Removes the body's leading image when it duplicates the featured image
 * already rendered above the article (see components/blog/BlogDetail.tsx).
 * WordPress stores the featured image separately from `content.rendered`,
 * and Gutenberg/classic editors commonly re-insert that same image as the
 * post's first content block — this only strips that specific duplicate,
 * never any other image in the body. The original WordPress content is
 * never mutated; this only affects what's rendered on the frontend. */
function dedupeLeadingFeaturedImage(html: string, featuredImageUrl: string | null): string {
  if (!html || !featuredImageUrl) return html;

  // Purely cosmetic: if anything about this post's markup is unexpected, show
  // the body untouched rather than let the page fail.
  try {
    return removeLeadingFeaturedImage(html, featuredImageUrl);
  } catch (error) {
    console.error(
      "[wordpress] leading image dedupe failed:",
      error instanceof Error ? error.message : error
    );
    return html;
  }
}

function removeLeadingFeaturedImage(html: string, featuredImageUrl: string): string {

  const imgMatch = /<img\b[^>]*>/i.exec(html);
  if (!imgMatch) return html;

  const srcMatch = /\ssrc=["']([^"']+)["']/i.exec(imgMatch[0]);
  const imgSrc = srcMatch?.[1] ?? null;
  if (!isSameImage(imgSrc, featuredImageUrl)) return html;

  const imgStart = imgMatch.index;
  const imgEnd = imgStart + imgMatch[0].length;

  // Prefer removing the nearest wrapping <figure>, since that's how both the
  // classic and block editors group an image with its caption.
  const beforeImg = html.slice(0, imgStart);
  const figureOpen = /<figure(?:\s[^>]*)?>/gi;
  let lastFigureOpen: RegExpExecArray | null = null;
  for (let m = figureOpen.exec(beforeImg); m; m = figureOpen.exec(beforeImg)) {
    lastFigureOpen = m;
  }

  let removeStart = imgStart;
  let removeEnd = imgEnd;

  if (lastFigureOpen) {
    const afterFigureOpen = html.slice(lastFigureOpen.index + lastFigureOpen[0].length, imgStart);
    const figureAlreadyClosed = /<\/figure>/i.test(afterFigureOpen);
    if (!figureAlreadyClosed) {
      const closeFigureMatch = /<\/figure>/i.exec(html.slice(imgEnd));
      if (closeFigureMatch) {
        removeStart = lastFigureOpen.index;
        removeEnd = imgEnd + closeFigureMatch.index + closeFigureMatch[0].length;
      }
    }
  } else {
    // No <figure> wrapper — fall back to an immediate <a href="..."><img/></a>
    // wrapper (WordPress links the image to its attachment/full-size file).
    const anchorOpenMatch = /<a(?:\s[^>]*)?>\s*$/i.exec(beforeImg);
    const anchorCloseMatch = /^\s*<\/a>/i.exec(html.slice(imgEnd));
    if (anchorOpenMatch && anchorCloseMatch) {
      removeStart = imgStart - anchorOpenMatch[0].length;
      removeEnd = imgEnd + anchorCloseMatch[0].length;
    }
  }

  const expanded = expandToBlockComments(html, removeStart, removeEnd);
  const withoutImage = html.slice(0, expanded.start) + html.slice(expanded.end);

  return collapseEmptyLeadingWrappers(withoutImage);
}

function mapPost(post: WordPressPost): BlogPost {
  const { width, height } = getFeaturedImageDimensions(post);
  const featuredImage = getFeaturedImage(post);
  const published = post.date_gmt || post.date || "";
  return {
    id: post.id,
    slug: post.slug,
    title: decodeHtmlEntities(post.title?.rendered ?? ""),
    excerpt: decodeHtmlEntities((post.excerpt?.rendered ?? "").replace(/<[^>]+>/g, "").trim()),
    content: dedupeLeadingFeaturedImage(post.content?.rendered ?? "", featuredImage),
    date: toIsoUtc(published),
    modified: toIsoUtc(post.modified_gmt || published),
    featuredImage,
    featuredImageAlt: getFeaturedImageAlt(post),
    featuredImageWidth: width,
    featuredImageHeight: height,
  };
}

interface WordPressResponse<T> {
  data: T;
  headers: Headers;
}

/** GETs a WordPress REST path and parses its JSON. Resolves to `null` — never
 * throws, never hangs past the timeout — when WordPress is unconfigured,
 * unreachable, slow, or answers with an error status. */
async function wpFetch<T>(path: string): Promise<WordPressResponse<T> | null> {
  if (!API_BASE) {
    console.error("[wordpress] WORDPRESS_URL is not configured; returning empty results.");
    return null;
  }

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(`${API_BASE}${path}`, {
        headers: getAuthHeaders(),
        next: { revalidate: REVALIDATE_SECONDS },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });

      if (res.ok) {
        return { data: (await res.json()) as T, headers: res.headers };
      }

      console.error(`[wordpress] request failed: ${res.status} ${res.statusText} (${path})`);
      // A 4xx (e.g. page number past the last page) won't change on retry.
      if (res.status < 500) return null;
    } catch (error) {
      console.error(
        `[wordpress] request error for ${path} (attempt ${attempt}/${MAX_ATTEMPTS}):`,
        error instanceof Error ? error.message : error
      );
    }
  }

  return null;
}

/** Maps a WordPress post list defensively: one malformed post is skipped
 * instead of taking the whole list down with it. */
function mapPosts(data: unknown): BlogPost[] {
  if (!Array.isArray(data)) return [];
  return (data as WordPressPost[]).flatMap((post) => {
    try {
      return [mapPost(post)];
    } catch (error) {
      console.error(
        `[wordpress] skipping malformed post ${post?.id}:`,
        error instanceof Error ? error.message : error
      );
      return [];
    }
  });
}

/** Latest N published posts, newest first. Used on the homepage. */
export async function getLatestPosts(limit = 16): Promise<BlogPost[]> {
  const res = await wpFetch<WordPressPost[]>(
    `/posts?_embed&per_page=${limit}&orderby=date&order=desc&_fields=${LIST_FIELDS}`
  );
  return res ? mapPosts(res.data) : [];
}

/** Paginated post list for /blog. */
export async function getPosts(page = 1, perPage = 16): Promise<PaginatedPosts> {
  const res = await wpFetch<WordPressPost[]>(
    `/posts?_embed&per_page=${perPage}&page=${page}&orderby=date&order=desc&_fields=${LIST_FIELDS}`
  );

  if (!res) {
    return { posts: [], total: 0, totalPages: 0, page };
  }

  const posts = mapPosts(res.data);
  const total = Number(res.headers.get("X-WP-Total") ?? posts.length);
  const totalPages = Number(res.headers.get("X-WP-TotalPages") ?? 1);

  return { posts, total, totalPages, page };
}

/** All published posts, across pages. Used for sitemap/RSS generation. */
export async function getAllPosts(): Promise<BlogPost[]> {
  const perPage = 100;
  const first = await getPosts(1, perPage);
  if (first.totalPages <= 1) return first.posts;

  const rest = await Promise.all(
    Array.from({ length: first.totalPages - 1 }, (_, i) => getPosts(i + 2, perPage))
  );

  return [...first.posts, ...rest.flatMap((page) => page.posts)];
}

/** Resolves to `null` only when WordPress confirms there is no such post;
 * throws `WordPressUnavailableError` when it couldn't be asked. Wrapped in
 * `cache()` so `generateMetadata` and the page share one request per render
 * (fetch's built-in request memoization is skipped once a `signal` is set). */
export const getPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  const path = `/posts?slug=${encodeURIComponent(slug)}&_embed`;
  const res = await wpFetch<WordPressPost[]>(path);
  if (!res) throw new WordPressUnavailableError(path);

  const post = Array.isArray(res.data) ? res.data[0] : undefined;
  return post ? mapPost(post) : null;
});

/** Latest `limit + 1` posts, newest first, with no exclusion applied yet. Kept
 * separate from `getRelatedPosts` so the detail page can fetch this in
 * parallel with `getPostBySlug` (its result doesn't depend on the current
 * post's id) instead of waiting for the post to resolve first. */
export async function getRecentPosts(limit = 4): Promise<BlogPost[]> {
  const res = await wpFetch<WordPressPost[]>(
    `/posts?_embed&per_page=${limit}&orderby=date&order=desc&_fields=${LIST_FIELDS}`
  );
  return res ? mapPosts(res.data) : [];
}

/** Latest posts excluding the one currently being read (single-category site, so no category filter needed). */
export async function getRelatedPosts(excludeId: number, limit = 4): Promise<BlogPost[]> {
  const posts = await getRecentPosts(limit + 1);
  return posts.filter((post) => post.id !== excludeId).slice(0, limit);
}
