import "server-only";
import type { BlogPost, PaginatedPosts, WordPressPost } from "@/types/wordpress";

const WORDPRESS_URL = process.env.WORDPRESS_URL?.replace(/\/+$/, "");
const WORDPRESS_USERNAME = process.env.WORDPRESS_USERNAME;
const WORDPRESS_APP_PASSWORD = process.env.WORDPRESS_APP_PASSWORD;

const API_BASE = WORDPRESS_URL ? `${WORDPRESS_URL}/wp-json/wp/v2` : null;

export const isWordpressConfigured = Boolean(API_BASE);
export const BLOG_PLACEHOLDER_IMAGE = "/images/blog-placeholder.svg";

const REVALIDATE_SECONDS = 300;

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
  return `${gmtDateString}Z`;
}

function mapPost(post: WordPressPost): BlogPost {
  return {
    id: post.id,
    slug: post.slug,
    title: decodeHtmlEntities(post.title.rendered),
    excerpt: decodeHtmlEntities(post.excerpt.rendered.replace(/<[^>]+>/g, "").trim()),
    content: post.content.rendered,
    date: toIsoUtc(post.date_gmt),
    modified: toIsoUtc(post.modified_gmt || post.date_gmt),
    featuredImage: getFeaturedImage(post),
    featuredImageAlt: getFeaturedImageAlt(post),
  };
}

async function wpFetch(path: string): Promise<Response | null> {
  if (!API_BASE) {
    console.error("[wordpress] WORDPRESS_URL is not configured; returning empty results.");
    return null;
  }

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: getAuthHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      console.error(`[wordpress] request failed: ${res.status} ${res.statusText} (${path})`);
    }

    return res;
  } catch (error) {
    console.error(
      `[wordpress] request error for ${path}:`,
      error instanceof Error ? error.message : error
    );
    return null;
  }
}

/** Latest N published posts, newest first. Used on the homepage. */
export async function getLatestPosts(limit = 16): Promise<BlogPost[]> {
  const res = await wpFetch(`/posts?_embed&per_page=${limit}&orderby=date&order=desc`);
  if (!res || !res.ok) return [];

  const posts = (await res.json()) as WordPressPost[];
  return posts.map(mapPost);
}

/** Paginated post list for /blog. */
export async function getPosts(page = 1, perPage = 16): Promise<PaginatedPosts> {
  const res = await wpFetch(
    `/posts?_embed&per_page=${perPage}&page=${page}&orderby=date&order=desc`
  );

  if (!res || !res.ok) {
    return { posts: [], total: 0, totalPages: 0, page };
  }

  const posts = (await res.json()) as WordPressPost[];
  const total = Number(res.headers.get("X-WP-Total") ?? posts.length);
  const totalPages = Number(res.headers.get("X-WP-TotalPages") ?? 1);

  return { posts: posts.map(mapPost), total, totalPages, page };
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

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const res = await wpFetch(`/posts?slug=${encodeURIComponent(slug)}&_embed`);
  if (!res || !res.ok) return null;

  const posts = (await res.json()) as WordPressPost[];
  return posts[0] ? mapPost(posts[0]) : null;
}

/** Latest posts excluding the one currently being read (single-category site, so no category filter needed). */
export async function getRelatedPosts(excludeId: number, limit = 4): Promise<BlogPost[]> {
  const res = await wpFetch(`/posts?_embed&per_page=${limit + 1}&orderby=date&order=desc`);
  if (!res || !res.ok) return [];

  const posts = (await res.json()) as WordPressPost[];
  return posts
    .filter((post) => post.id !== excludeId)
    .slice(0, limit)
    .map(mapPost);
}
