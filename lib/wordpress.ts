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

function mapPost(post: WordPressPost): BlogPost {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title.rendered,
    excerpt: post.excerpt.rendered.replace(/<[^>]+>/g, "").trim(),
    content: post.content.rendered,
    date: post.date,
    featuredImage: getFeaturedImage(post),
  };
}

async function wpFetch(path: string): Promise<Response | null> {
  if (!API_BASE) return null;

  try {
    return await fetch(`${API_BASE}${path}`, {
      headers: getAuthHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    });
  } catch {
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
