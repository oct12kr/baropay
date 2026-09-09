export interface WordPressRenderedField {
  rendered: string;
}

export interface WordPressMedia {
  id: number;
  source_url: string;
  alt_text?: string;
  media_details?: {
    width?: number;
    height?: number;
  };
}

export interface WordPressTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

export interface WordPressEmbedded {
  "wp:featuredmedia"?: WordPressMedia[];
  "wp:term"?: WordPressTerm[][];
}

export interface WordPressPost {
  id: number;
  slug: string;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  title: WordPressRenderedField;
  excerpt: WordPressRenderedField;
  content: WordPressRenderedField;
  featured_media: number;
  categories: number[];
  _embedded?: WordPressEmbedded;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  modified: string;
  featuredImage: string | null;
  featuredImageAlt: string | null;
}

export interface PaginatedPosts {
  posts: BlogPost[];
  total: number;
  totalPages: number;
  page: number;
}
