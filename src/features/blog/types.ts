// Unified blog types for hybrid WordPress + Markdown blog system

export type BlogSource = "wordpress" | "markdown";

/** Card-level data shown in blog listings */
export interface BlogPostCard {
  id: string;
  slug: string;
  source: BlogSource;
  title: string;
  description: string;
  image: string;
  imageFull?: string;
  author: string;
  date: string; // ISO 8601
}

/** Full blog post including content */
export interface BlogPost extends BlogPostCard {
  content: string; // HTML (WP raw or MD converted)
}

/** Standard WordPress REST API post (/wp/v2/posts?_embed) */
export interface WordPressBlogItem {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  author: number;
  featured_media: number;
  _embedded?: {
    author?: Array<{ name: string }>;
    "wp:featuredmedia"?: Array<{
      source_url: string;
      media_details?: {
        sizes?: {
          medium?: { source_url: string };
          large?: { source_url: string };
          full?: { source_url: string };
        };
      };
    }>;
  };
}

/** Markdown blog metadata (meta.json) */
export interface MarkdownBlogMeta {
  slug: string;
  author: string;
  date: string;
  image: string;
  imageFull?: string;
  tags?: string[];
  title: Record<string, string>;       // { es: "...", en: "..." }
  description: Record<string, string>; // { es: "...", en: "..." }
}
