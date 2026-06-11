import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type {
  BlogPostCard,
  MarkdownBlogMeta,
  WordPressBlogItem,
} from "@/features/blog/types";
import { WP_BLOG_API_BASE, WP_BLOG_CATEGORY_IDS } from "@/shared/constants/backend";
import { resolveLegacyRoute } from "@/shared/seo/legacyRoutes";

const WP_BASE = WP_BLOG_API_BASE;
const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const WP_PER_PAGE = 100;
const CACHE_TTL = 4 * 60 * 60 * 1000; // 4 hours in-memory cache

type AppBlogResponse = {
  locale: string;
  total: number;
  page: number | null;
  perPage: number | null;
  hasMore: boolean;
  sources: {
    wordpress: number;
    markdown: number;
  };
  items: AppBlogItem[];
};

type AppBlogItem = BlogPostCard & {
  path: string;
  url: string;
};

type WordPressContentItem = {
  id: number;
  date?: string;
  modified?: string;
  slug: string;
  link?: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
  content?: { rendered: string };
  _embedded?: WordPressBlogItem["_embedded"];
};

const LEGACY_BLOG_EXCLUDED_SLUGS = new Set([
  "gracias",
  "pruebas",
  "router-camaleon",
  "securecrypt-red",
  "distribuidores-encriptados-formulario",
]);

const LEGACY_BLOG_EXCLUDED_SLUG_PARTS = [
  "agradecimiento",
  "checkout",
  "contacto",
  "encuesta",
  "formulario",
  "gracias",
  "herramienta",
  "landing",
  "pages-",
  "quiz",
  "simulador",
  "test",
];

const LEGACY_BLOG_MIN_CONTENT_LENGTH = 600;

const responseHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const cache = new Map<string, { data: AppBlogResponse; ts: number }>();

function normalizeLocale(locale: string | null): string {
  if (!locale || !/^[a-z]{2}$/i.test(locale)) return "es";
  return locale.toLowerCase();
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&hellip;/g, "...")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseSpintax(text: string): string {
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

function getImageFromEmbed(item: WordPressContentItem): string {
  const media = item._embedded?.["wp:featuredmedia"]?.[0];
  return media?.media_details?.sizes?.medium?.source_url ?? media?.source_url ?? "";
}

function getImageFullFromEmbed(item: WordPressContentItem): string {
  const media = item._embedded?.["wp:featuredmedia"]?.[0];
  return media?.media_details?.sizes?.full?.source_url ?? media?.source_url ?? "";
}

function getAuthorFromEmbed(item: WordPressContentItem): string {
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

function getDescriptionFromWpItem(item: WordPressContentItem): string {
  return stripHtml(item.excerpt?.rendered ?? item.content?.rendered ?? "");
}

function mapWpItemToCard(item: WordPressContentItem, idPrefix = "wp"): BlogPostCard {
  const legacyPath = getPathFromUrl(item.link);

  return {
    id: `${idPrefix}-${item.id}`,
    slug: item.slug || String(item.id),
    wpId: item.id,
    legacyPath,
    categorySlug: getCategorySlugFromLegacyPath(legacyPath),
    source: "wordpress",
    title: parseSpintax(item.title.rendered),
    description: parseSpintax(getDescriptionFromWpItem(item)),
    image: getImageFromEmbed(item),
    imageFull: getImageFullFromEmbed(item),
    author: getAuthorFromEmbed(item),
    date: item.modified ?? item.date ?? "",
  };
}

function mapToAppItem(item: BlogPostCard, locale: string): AppBlogItem {
  const path = item.legacyPath ?? `/${locale}/blog/${item.slug}`;
  const wpOrigin = (() => {
    try {
      return new URL(WP_BASE).origin;
    } catch {
      return "";
    }
  })();

  const isWp = item.source === "wordpress";
  const resolveImage = (img: string | undefined) => {
    if (!img) return "";
    const trimmed = img.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed;
    }
    if (isWp && wpOrigin) {
      return `${wpOrigin}${trimmed.startsWith("/") ? trimmed : `/${trimmed}`}`;
    }
    // For local Markdown posts, keep it relative to the current host
    return trimmed;
  };

  return {
    ...item,
    image: resolveImage(item.image),
    imageFull: resolveImage(item.imageFull ?? item.image),
    path,
    // Keep links relative so staging/prod domain changes do not require data rewrites.
    url: path,
  };
}

async function fetchWordPressJson<T>(url: string): Promise<{
  data: T;
  headers: Headers;
}> {
  let lastError: unknown;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch(url, {
        cache: "no-store",
        headers: {
          connection: "close",
        },
      });

      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status}`);
      }

      return {
        data: (await response.json()) as T,
        headers: response.headers,
      };
    } catch (error) {
      lastError = error;
      if (attempt === 0) {
        await wait(250);
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Unknown WordPress fetch error");
}

async function fetchWordPressCollection(
  endpoint: "posts" | "pages",
  locale: string,
  extraParams?: Record<string, string>,
): Promise<WordPressContentItem[]> {
  const params = new URLSearchParams({
    per_page: String(WP_PER_PAGE),
    page: "1",
    _embed: "1",
    ...(extraParams ?? {}),
  });

  if (locale) {
    params.set("lang", locale);
  }

  const firstUrl = `${WP_BASE}/wp/v2/${endpoint}?${params.toString()}`;
  const firstResponse = await fetchWordPressJson<WordPressContentItem[]>(firstUrl);
  const firstPageItems = firstResponse.data;
  const totalPages = Number(firstResponse.headers.get("x-wp-totalpages") ?? 1);

  if (totalPages <= 1) {
    return firstPageItems;
  }

  // Fetch remaining pages in parallel to maximize loading speed (10x faster)
  const promises: Promise<{ data: WordPressContentItem[] }>[] = [];
  for (let page = 2; page <= totalPages; page += 1) {
    const pageParams = new URLSearchParams(params);
    pageParams.set("page", String(page));
    const url = `${WP_BASE}/wp/v2/${endpoint}?${pageParams.toString()}`;
    promises.push(fetchWordPressJson<WordPressContentItem[]>(url));
  }

  const results = await Promise.allSettled(promises);
  const remaining: WordPressContentItem[] = [];

  results.forEach((result, idx) => {
    if (result.status === "fulfilled") {
      remaining.push(...result.value.data);
    } else {
      console.error(`Failed to fetch WordPress ${endpoint} page ${idx + 2}:`, result.reason);
    }
  });

  return [...firstPageItems, ...remaining];
}

function isLegacyListingPage(item: WordPressContentItem): boolean {
  const legacyPath = getPathFromUrl(item.link);
  if (!legacyPath) return false;

  const resolution = resolveLegacyRoute(legacyPath);
  if (resolution.type !== "wp-page" || resolution.slug !== item.slug) {
    return false;
  }

  const slug = item.slug.toLowerCase();
  const hyphenCount = slug.split("-").length - 1;
  const articleText = stripHtml(item.content?.rendered ?? item.excerpt?.rendered ?? "");

  if (LEGACY_BLOG_EXCLUDED_SLUGS.has(slug)) return false;
  if (LEGACY_BLOG_EXCLUDED_SLUG_PARTS.some((part) => slug.includes(part))) return false;
  if (articleText.length < LEGACY_BLOG_MIN_CONTENT_LENGTH) return false;

  // Keep long-form editorial pages and skip short utility/product landing slugs.
  return hyphenCount >= 3;
}

async function fetchWordPressPostCards(locale: string): Promise<BlogPostCard[]> {
  const catId = WP_BLOG_CATEGORY_IDS[locale] || 1;
  const items = await fetchWordPressCollection("posts", locale, {
    categories: String(catId),
  });

  return items.map((item) => mapWpItemToCard(item, "wp-post"));
}

async function fetchLegacyWordPressPageCards(locale: string): Promise<BlogPostCard[]> {
  const items = await fetchWordPressCollection("pages", locale, {
    orderby: "modified",
    order: "desc",
  });

  return items
    .filter(isLegacyListingPage)
    .map((item) => mapWpItemToCard(item, "wp-page"));
}

function fetchMarkdownCards(locale: string): BlogPostCard[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const cards: BlogPostCard[] = [];
  const entries = fs.readdirSync(BLOG_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const postDir = path.join(BLOG_DIR, entry.name);
    const metaPath = path.join(postDir, "meta.json");
    if (!fs.existsSync(metaPath)) continue;

    const localeFile = path.join(postDir, `${locale}.md`);
    const fallbackFile = path.join(postDir, "es.md");
    if (!fs.existsSync(localeFile) && !fs.existsSync(fallbackFile)) continue;

    try {
      const meta = JSON.parse(
        fs.readFileSync(metaPath, "utf-8"),
      ) as MarkdownBlogMeta;

      cards.push({
        id: `md-${meta.slug}`,
        slug: meta.slug,
        source: "markdown",
        title: meta.title[locale] ?? meta.title.es ?? "",
        description: meta.description[locale] ?? meta.description.es ?? "",
        image: meta.image,
        imageFull: meta.imageFull ?? meta.image,
        author: meta.author,
        date: meta.date,
      });
    } catch (err) {
      console.error(`Invalid blog metadata for ${entry.name}:`, err);
    }
  }

  return cards;
}

function paginateItems(
  items: AppBlogItem[],
  pageParam: string | null,
  perPageParam: string | null,
) {
  const page = pageParam ? Number(pageParam) : null;
  const perPage = perPageParam ? Number(perPageParam) : null;

  if (!page || !perPage || page < 1 || perPage < 1) {
    return { items, page: null, perPage: null, hasMore: false };
  }

  const start = (page - 1) * perPage;
  const paginated = items.slice(start, start + perPage);
  return {
    items: paginated,
    page,
    perPage,
    hasMore: start + perPage < items.length,
  };
}

const activeRefreshes = new Set<string>();

async function refreshBlogCache(locale: string): Promise<AppBlogItem[]> {
  const [wordpressPostCards, legacyPageCards] = await Promise.all([
    fetchWordPressPostCards(locale),
    fetchLegacyWordPressPageCards(locale),
  ]);
  const markdownCards = fetchMarkdownCards(locale);

  const byId = new Map<string, BlogPostCard>();
  const wordpressCards = [...wordpressPostCards, ...legacyPageCards];

  for (const post of [...wordpressCards, ...markdownCards]) {
    byId.set(post.id, post);
  }

  const allItems = Array.from(byId.values())
    .filter((item) => {
      const path = item.legacyPath ?? `/${locale}/blog/${item.slug}`;
      return path.toLowerCase().includes("blog");
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((item) => mapToAppItem(item, locale));

  const cacheDir = path.join(process.cwd(), ".blog-cache");
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }

  const cacheFile = path.join(cacheDir, `blog-cache-${locale}.json`);
  const cacheData = {
    ts: Date.now(),
    wordpressCount: wordpressCards.length,
    markdownCount: markdownCards.length,
    items: allItems,
  };

  fs.writeFileSync(cacheFile, JSON.stringify(cacheData), "utf-8");
  return allItems;
}

export async function GET(req: NextRequest) {
  const locale = normalizeLocale(req.nextUrl.searchParams.get("lang"));
  const pageParam = req.nextUrl.searchParams.get("page");
  const perPageParam = req.nextUrl.searchParams.get("per_page");

  const cacheDir = path.join(process.cwd(), ".blog-cache");
  const cacheFile = path.join(cacheDir, `blog-cache-${locale}.json`);

  let cacheData: {
    ts: number;
    wordpressCount: number;
    markdownCount: number;
    items: AppBlogItem[];
  } | null = null;

  if (fs.existsSync(cacheFile)) {
    try {
      cacheData = JSON.parse(fs.readFileSync(cacheFile, "utf-8"));
    } catch (err) {
      console.error(`Failed to parse blog cache for ${locale}:`, err);
    }
  }

  const now = Date.now();
  const isExpired = !cacheData || now - cacheData.ts > CACHE_TTL;

  if (cacheData) {
    if (isExpired && !activeRefreshes.has(locale)) {
      activeRefreshes.add(locale);
      refreshBlogCache(locale)
        .then(() => {
          console.log(`Successfully refreshed blog cache in background for ${locale}`);
        })
        .catch((err) => {
          console.error(`Failed to refresh blog cache in background for ${locale}:`, err);
        })
        .finally(() => {
          activeRefreshes.delete(locale);
        });
    }

    const paginated = paginateItems(cacheData.items, pageParam, perPageParam);
    const responseData: AppBlogResponse = {
      locale,
      total: cacheData.items.length,
      page: paginated.page,
      perPage: paginated.perPage,
      hasMore: paginated.hasMore,
      sources: {
        wordpress: cacheData.wordpressCount,
        markdown: cacheData.markdownCount,
      },
      items: paginated.items,
    };

    return NextResponse.json(responseData, {
      headers: {
        ...responseHeaders,
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400", // 1h CDN cache, 24h stale background update
        "X-Cache": isExpired ? "STALE" : "HIT",
      },
    });
  }

  try {
    const items = await refreshBlogCache(locale);
    const wordpressCount = items.filter((i) => i.source === "wordpress").length;
    const markdownCount = items.filter((i) => i.source === "markdown").length;

    const paginated = paginateItems(items, pageParam, perPageParam);
    const responseData: AppBlogResponse = {
      locale,
      total: items.length,
      page: paginated.page,
      perPage: paginated.perPage,
      hasMore: paginated.hasMore,
      sources: {
        wordpress: wordpressCount,
        markdown: markdownCount,
      },
      items: paginated.items,
    };

    return NextResponse.json(responseData, {
      headers: {
        ...responseHeaders,
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        "X-Cache": "MISS",
      },
    });
  } catch (err) {
    console.error(`App blog endpoint error on cache MISS for ${locale}:`, err);
    return NextResponse.json(
      { error: "Failed to fetch blog list" },
      { status: 502, headers: responseHeaders },
    );
  }
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: responseHeaders,
  });
}
