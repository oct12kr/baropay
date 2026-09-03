const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;
const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL;
const WORDPRESS_USERNAME = process.env.WORDPRESS_USERNAME;
const WORDPRESS_APP_PASSWORD = process.env.WORDPRESS_APP_PASSWORD;

export const isWordpressConfigured = Boolean(WORDPRESS_API_URL);

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category?: string;
  featuredImage?: string;
}

export interface BlogCategory {
  id: number;
  slug: string;
  name: string;
}

interface WPRenderedField {
  rendered: string;
}

interface WPEmbedded {
  "wp:featuredmedia"?: { source_url?: string }[];
  "wp:term"?: { id: number; name: string; taxonomy: string }[][];
}

interface WPPost {
  id: number;
  slug: string;
  date: string;
  title: WPRenderedField;
  excerpt: WPRenderedField;
  content: WPRenderedField;
  _embedded?: WPEmbedded;
}

interface WPCategory {
  id: number;
  slug: string;
  name: string;
}

function getAuthHeaders(): HeadersInit | undefined {
  if (!WORDPRESS_USERNAME || !WORDPRESS_APP_PASSWORD) return undefined;
  const token = Buffer.from(`${WORDPRESS_USERNAME}:${WORDPRESS_APP_PASSWORD}`).toString(
    "base64"
  );
  return { Authorization: `Basic ${token}` };
}

function mapPost(post: WPPost): BlogPost {
  const category = post._embedded?.["wp:term"]?.[0]?.find(
    (term) => term.taxonomy === "category"
  );

  return {
    id: post.id,
    slug: post.slug,
    title: post.title.rendered,
    excerpt: post.excerpt.rendered.replace(/<[^>]+>/g, "").trim(),
    content: post.content.rendered,
    date: post.date,
    category: category?.name,
    featuredImage: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url,
  };
}

/**
 * WordPress REST API endpoints this connects to once WORDPRESS_API_URL is set:
 *  - `${WORDPRESS_API_URL}/posts`
 *  - `${WORDPRESS_API_URL}/categories`
 *  - `${WORDPRESS_API_URL}/media`
 */
export async function fetchPosts(): Promise<BlogPost[]> {
  if (!WORDPRESS_API_URL) return [];

  try {
    const res = await fetch(`${WORDPRESS_API_URL}/posts?_embed&per_page=12`, {
      headers: getAuthHeaders(),
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const posts = (await res.json()) as WPPost[];
    return posts.map(mapPost);
  } catch {
    return [];
  }
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!WORDPRESS_API_URL) return null;

  try {
    const res = await fetch(`${WORDPRESS_API_URL}/posts?slug=${encodeURIComponent(slug)}&_embed`, {
      headers: getAuthHeaders(),
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const posts = (await res.json()) as WPPost[];
    return posts[0] ? mapPost(posts[0]) : null;
  } catch {
    return null;
  }
}

export async function fetchCategories(): Promise<BlogCategory[]> {
  if (!WORDPRESS_API_URL) return [];

  try {
    const res = await fetch(`${WORDPRESS_API_URL}/categories?per_page=20`, {
      headers: getAuthHeaders(),
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const categories = (await res.json()) as WPCategory[];
    return categories
      .filter((c) => c.name.toLowerCase() !== "uncategorized")
      .map((c) => ({ id: c.id, slug: c.slug, name: c.name }));
  } catch {
    return [];
  }
}

export const wordpressSiteUrl = WORDPRESS_URL;
