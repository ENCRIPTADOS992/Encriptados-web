import DOMPurify from "isomorphic-dompurify";
import type {
  BlogPost,
  BlogPostCard,
  WordPressBlogItem,
} from "./types";

const WP_BLOGS_BASE =
  process.env.NEXT_PUBLIC_WP_BLOG_API ?? "https://encriptados.io/wp-json";

/** Resolve the base URL for internal API calls (works SSR + client) */
function getBaseUrl(): string {
  if (typeof window !== "undefined") return ""; // client-side: relative
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

// ─── WordPress (standard REST API) ────────────────────────────

/** Strip HTML tags to get plain text for descriptions */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&hellip;/g, "…").replace(/\n/g, " ").trim();
}

function getImageFromEmbed(item: WordPressBlogItem): string {
  const media = item._embedded?.["wp:featuredmedia"]?.[0];
  return media?.media_details?.sizes?.medium?.source_url
    ?? media?.source_url
    ?? "";
}

function getImageFullFromEmbed(item: WordPressBlogItem): string {
  const media = item._embedded?.["wp:featuredmedia"]?.[0];
  return media?.media_details?.sizes?.full?.source_url
    ?? media?.source_url
    ?? "";
}

function getAuthorFromEmbed(item: WordPressBlogItem): string {
  return item._embedded?.author?.[0]?.name ?? "Equipo Encriptados";
}

function mapWpItemToCard(item: WordPressBlogItem): BlogPostCard {
  return {
    id: `wp-${item.id}`,
    slug: String(item.id),
    source: "wordpress",
    title: item.title.rendered,
    description: stripHtml(item.excerpt.rendered),
    image: getImageFromEmbed(item),
    imageFull: getImageFullFromEmbed(item),
    author: getAuthorFromEmbed(item),
    date: item.date,
  };
}

function mapWpItemToPost(item: WordPressBlogItem): BlogPost {
  return {
    ...mapWpItemToCard(item),
    content: DOMPurify.sanitize(item.content.rendered, {
      ADD_TAGS: ["iframe"],
      ADD_ATTR: [
        "allow",
        "allowfullscreen",
        "frameborder",
        "scrolling",
        "loading",
        "referrerpolicy",
        "title",
      ],
    }),
  };
}

/** Fetch all WordPress blog cards for a given locale (via cached proxy) */
export async function fetchWordPressBlogCards(
  locale: string,
): Promise<BlogPostCard[]> {
  try {
    const base = getBaseUrl();
    const res = await fetch(
      `${base}/api/wp-blog?lang=${encodeURIComponent(locale)}&per_page=10`,
    );
    if (!res.ok) return [];
    const data: WordPressBlogItem[] = await res.json();
    return data.map(mapWpItemToCard);
  } catch {
    return [];
  }
}

/** Fetch remaining WordPress blog cards (page 2+) */
export async function fetchWordPressBlogCardsRemaining(
  locale: string,
): Promise<BlogPostCard[]> {
  try {
    const base = getBaseUrl();
    const res = await fetch(
      `${base}/api/wp-blog?lang=${encodeURIComponent(locale)}&per_page=90&page=2`,
    );
    if (!res.ok) return [];
    const data: WordPressBlogItem[] = await res.json();
    return data.map(mapWpItemToCard);
  } catch {
    return [];
  }
}

/** Fetch a single WordPress blog post by numeric ID (via cached proxy) */
export async function fetchWordPressBlogPost(
  wpId: string,
  locale: string,
): Promise<BlogPost | null> {
  try {
    const base = getBaseUrl();
    const res = await fetch(
      `${base}/api/wp-blog?id=${encodeURIComponent(wpId)}`,
    );
    if (!res.ok) return null;
    const item: WordPressBlogItem = await res.json();
    return mapWpItemToPost(item);
  } catch {
    return null;
  }
}

// ─── Markdown (local API routes reading from content/blog/) ──

/** Fetch all Markdown blog cards for a given locale */
export async function fetchMarkdownBlogCards(
  locale: string,
): Promise<BlogPostCard[]> {
  try {
    const base = getBaseUrl();
    const res = await fetch(
      `${base}/api/md-blog?lang=${encodeURIComponent(locale)}`,
      { cache: "no-store" },
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

/** Fetch a single Markdown blog post by slug */
export async function fetchMarkdownBlogPost(
  slug: string,
  locale: string,
): Promise<BlogPost | null> {
  try {
    const base = getBaseUrl();
    const res = await fetch(
      `${base}/api/md-blog?slug=${encodeURIComponent(slug)}&lang=${encodeURIComponent(locale)}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// ─── Unified (Hybrid) ───────────────────────────────────────

/** Fetch first batch of blog cards (10 WP + all MD) — fast initial load */
export async function fetchAllBlogCards(
  locale: string,
): Promise<BlogPostCard[]> {
  const [wpCards, mdCards] = await Promise.all([
    fetchWordPressBlogCards(locale),
    fetchMarkdownBlogCards(locale),
  ]);

  const all = [...wpCards, ...mdCards];
  all.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  return all;
}

/** Fetch remaining WP blog cards (page 2+) for lazy loading */
export async function fetchRemainingBlogCards(
  locale: string,
): Promise<BlogPostCard[]> {
  return fetchWordPressBlogCardsRemaining(locale);
}

/** Detect if a postId is a WordPress numeric ID */
export function isWordPressId(postId: string): boolean {
  return /^\d+$/.test(postId);
}

/** Fetch a single blog post by postId (auto-detects source) */
export async function fetchBlogPost(
  postId: string,
  locale: string,
): Promise<BlogPost | null> {
  if (isWordPressId(postId)) {
    return fetchWordPressBlogPost(postId, locale);
  }
  return fetchMarkdownBlogPost(postId, locale);
}
