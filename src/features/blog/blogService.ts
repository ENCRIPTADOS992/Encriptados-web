import type {
  BlogPost,
  BlogPostCard,
  WordPressBlogItem,
} from "./types";
import { WP_BLOG_API_BASE } from "@/shared/constants/backend";

const ALLOWED_TAGS = new Set([
  "a",
  "b",
  "blockquote",
  "br",
  "code",
  "del",
  "div",
  "em",
  "figcaption",
  "figure",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "i",
  "iframe",
  "img",
  "li",
  "ol",
  "p",
  "pre",
  "span",
  "strong",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "tr",
  "u",
  "ul",
]);

const GLOBAL_ALLOWED_ATTRS = new Set([
  "alt",
  "aria-label",
  "class",
  "height",
  "href",
  "id",
  "loading",
  "rel",
  "src",
  "style",
  "target",
  "title",
  "width",
]);

const IFRAME_ALLOWED_ATTRS = new Set([
  "allow",
  "allowfullscreen",
  "frameborder",
  "referrerpolicy",
  "scrolling",
]);

function isSafeUrl(value: string): boolean {
  const trimmed = value.trim().toLowerCase();
  return !trimmed || trimmed.startsWith("/") || trimmed.startsWith("#") || /^(https?:|mailto:|tel:)/.test(trimmed);
}

function sanitizeBlogHtml(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|object|embed|form|input|button|textarea|select|option|link|meta)[\s\S]*?<\/\1>/gi, "")
    .replace(/<\/?([a-z][a-z0-9-]*)(\s[^>]*)?>/gi, (match, rawTag: string, rawAttrs = "") => {
      const tag = rawTag.toLowerCase();

      if (!ALLOWED_TAGS.has(tag)) return "";
      if (match.startsWith("</")) return `</${tag}>`;

      const attrs: string[] = [];
      rawAttrs.replace(/([:\w-]+)(?:\s*=\s*("[^"]*"|'[^']*'|[^\s"'>]+))?/g, (_attrMatch: string, rawName: string, rawValue = "") => {
        const name = rawName.toLowerCase();
        if (name.startsWith("on")) return "";
        if (!GLOBAL_ALLOWED_ATTRS.has(name) && !(tag === "iframe" && IFRAME_ALLOWED_ATTRS.has(name))) return "";

        const unquotedValue = String(rawValue).replace(/^['"]|['"]$/g, "");
        if ((name === "href" || name === "src") && !isSafeUrl(unquotedValue)) return "";

        const escapedValue = unquotedValue.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
        attrs.push(`${name}="${escapedValue}"`);
        return "";
      });

      return `<${tag}${attrs.length ? ` ${attrs.join(" ")}` : ""}>`;
    });
}

type AppBlogListResponse = {
  items: BlogPostCard[];
};

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

/** Parses spintax like [spintax]{A|B|C}[/spintax] or {A|B} in text, selecting the first option */
export function parseSpintax(text: string): string {
  if (!text) return "";
  let cleaned = text.replace(/\[\/?spintax\]/gi, "");
  const regex = /\{([^{|}]+\|[^{}]*)\}/g;
  while (cleaned.match(regex)) {
    cleaned = cleaned.replace(regex, (match, choicesStr) => {
      const choices = choicesStr.split("|");
      return choices[0] ? choices[0].trim() : "";
    });
  }
  return cleaned;
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

function getPathFromUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    return new URL(value).pathname;
  } catch {
    return value.startsWith("/") ? value : undefined;
  }
}

function getCategorySlugFromLegacyPath(path: string | undefined): string | undefined {
  if (!path) return undefined;
  const parts = path.split("/").filter(Boolean);
  const blogsIndex = parts.indexOf("blogs");
  if (blogsIndex < 0) return undefined;
  return parts[blogsIndex + 1];
}

function toWpAbsoluteUrl(value: string | undefined): string {
  if (!value) return "";
  const trimmed = value.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  try {
    const wpOrigin = new URL(WP_BLOG_API_BASE).origin;
    return `${wpOrigin}${trimmed.startsWith("/") ? trimmed : `/${trimmed}`}`;
  } catch {
    return trimmed;
  }
}

function mapWpItemToCard(item: WordPressBlogItem): BlogPostCard {
  const legacyPath = getPathFromUrl(item.link);
  const imageRaw = getImageFromEmbed(item);
  const imageFullRaw = getImageFullFromEmbed(item);

  return {
    id: `wp-${item.id}`,
    slug: item.slug || String(item.id),
    wpId: item.id,
    legacyPath,
    categorySlug: getCategorySlugFromLegacyPath(legacyPath),
    source: "wordpress",
    title: parseSpintax(item.title.rendered),
    description: parseSpintax(stripHtml(item.excerpt.rendered)),
    image: toWpAbsoluteUrl(imageRaw),
    imageFull: toWpAbsoluteUrl(imageFullRaw || imageRaw),
    author: getAuthorFromEmbed(item),
    date: item.date,
    translations: item.translations,
  };
}

function mapWpItemToPost(item: WordPressBlogItem): BlogPost {
  const card = mapWpItemToCard(item);
  return {
    ...card,
    content: parseSpintax(sanitizeBlogHtml(item.content.rendered)),
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

/** Fetch a single WordPress blog post by legacy slug (via cached proxy) */
export async function fetchWordPressBlogPostBySlug(
  slug: string,
  locale: string,
): Promise<BlogPost | null> {
  try {
    const base = getBaseUrl();
    const res = await fetch(
      `${base}/api/wp-blog?slug=${encodeURIComponent(slug)}&lang=${encodeURIComponent(locale)}`,
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

/** Fetch all blog cards from the same unified endpoint consumed by the app */
export async function fetchAllBlogCards(
  locale: string,
): Promise<BlogPostCard[]> {
  try {
    const base = getBaseUrl();
    const res = await fetch(
      `${base}/api/app-blog?lang=${encodeURIComponent(locale)}`,
      { cache: "no-store" },
    );

    if (res.ok) {
      const data: AppBlogListResponse = await res.json();
      return data.items;
    }
  } catch {
    // Fall back to the legacy split fetch below.
  }

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
  const wpBySlug = await fetchWordPressBlogPostBySlug(postId, locale);
  if (wpBySlug) return wpBySlug;

  if (isWordPressId(postId)) {
    const wpById = await fetchWordPressBlogPost(postId, locale);
    if (wpById) return wpById;
  }

  return fetchMarkdownBlogPost(postId, locale);
}
