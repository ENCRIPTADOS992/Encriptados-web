import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type {
  BlogPostCard,
  MarkdownBlogMeta,
  WordPressBlogItem,
} from "@/features/blog/types";
import { WP_BLOG_API_BASE } from "@/shared/constants/backend";

const WP_BASE = WP_BLOG_API_BASE;
const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const WP_PER_PAGE = 100;
const LOCALE_TO_CATEGORY_ID: Record<string, number> = {
  es: 96,  // noticias
  en: 97,  // news
  pt: 101, // noticias-pt
  it: 100, // notizia
  fr: 98,  // nouvelles
};
const CACHE_TTL = 5 * 60 * 1000;

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

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&hellip;/g, "...")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getImageFromEmbed(item: WordPressBlogItem): string {
  const media = item._embedded?.["wp:featuredmedia"]?.[0];
  return media?.media_details?.sizes?.medium?.source_url ?? media?.source_url ?? "";
}

function getImageFullFromEmbed(item: WordPressBlogItem): string {
  const media = item._embedded?.["wp:featuredmedia"]?.[0];
  return media?.media_details?.sizes?.full?.source_url ?? media?.source_url ?? "";
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

function mapWpItemToCard(item: WordPressBlogItem): BlogPostCard {
  const legacyPath = getPathFromUrl(item.link);

  return {
    id: `wp-${item.id}`,
    slug: item.slug || String(item.id),
    wpId: item.id,
    legacyPath,
    categorySlug: getCategorySlugFromLegacyPath(legacyPath),
    source: "wordpress",
    title: item.title.rendered,
    description: stripHtml(item.excerpt.rendered),
    image: getImageFromEmbed(item),
    imageFull: getImageFullFromEmbed(item),
    author: getAuthorFromEmbed(item),
    date: item.date,
  };
}

function toWpAbsoluteUrl(value: string | undefined): string {
  if (!value) return "";
  const trimmed = value.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  const wpDomain = "https://admin.encriptados.io";
  return `${wpDomain}${trimmed.startsWith("/") ? trimmed : `/${trimmed}`}`;
}

function toAbsoluteUrl(value: string | undefined, origin: string): string {
  if (!value) return "";
  try {
    return new URL(value, origin).toString();
  } catch {
    return value;
  }
}

function mapToAppItem(item: BlogPostCard, locale: string, origin: string): AppBlogItem {
  const path = item.legacyPath ?? `/${locale}/blog/${item.slug}`;

  const isWp = item.source === "wordpress";
  const resolveImage = (img: string | undefined) => {
    if (!img) return "";
    const trimmed = img.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed;
    }
    if (isWp) {
      const wpDomain = "https://admin.encriptados.io";
      return `${wpDomain}${trimmed.startsWith("/") ? trimmed : `/${trimmed}`}`;
    }
    // For local Markdown posts, keep it relative to the current host
    return trimmed;
  };

  return {
    ...item,
    image: resolveImage(item.image),
    imageFull: resolveImage(item.imageFull ?? item.image),
    path,
    url: toAbsoluteUrl(path, origin),
  };
}

async function fetchWordPressCardsFirstPage(
  locale: string,
): Promise<{ cards: BlogPostCard[]; totalPages: number; firstPageItems: WordPressBlogItem[] }> {
  const catId = LOCALE_TO_CATEGORY_ID[locale] || 96;
  const firstUrl = `${WP_BASE}/wp/v2/posts?categories=${catId}&per_page=${WP_PER_PAGE}&page=1&_embed`;
  const firstRes = await fetch(firstUrl, { cache: "no-store" });

  if (!firstRes.ok) {
    throw new Error(`WordPress API error: ${firstRes.status}`);
  }

  const firstPageItems = (await firstRes.json()) as WordPressBlogItem[];
  const totalPages = Number(firstRes.headers.get("x-wp-totalpages") ?? 1);
  const cards = firstPageItems.map(mapWpItemToCard);

  return { cards, totalPages, firstPageItems };
}

async function fetchRemainingWordPressCardsInBackground(
  locale: string,
  firstPageItems: WordPressBlogItem[],
  markdownCards: BlogPostCard[],
  totalPages: number,
  origin: string,
  cacheKeyAll: string,
) {
  try {
    const remainingPages = Array.from(
      { length: Math.max(totalPages - 1, 0) },
      (_, index) => index + 2,
    );

    const catId = LOCALE_TO_CATEGORY_ID[locale] || 96;
    const remaining = await Promise.all(
      remainingPages.map(async (page) => {
        const url = `${WP_BASE}/wp/v2/posts?categories=${catId}&per_page=${WP_PER_PAGE}&page=${page}&_embed`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) return [] as WordPressBlogItem[];
        return (await res.json()) as WordPressBlogItem[];
      }),
    );

    const allWpCards = [...firstPageItems, ...remaining.flat()].map(mapWpItemToCard);

    const byId = new Map<string, BlogPostCard>();
    for (const post of [...allWpCards, ...markdownCards]) {
      byId.set(post.id, post);
    }

    const allItems = Array.from(byId.values())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map((item) => mapToAppItem(item, locale, origin));

    const data: AppBlogResponse = {
      locale,
      total: allItems.length,
      page: null,
      perPage: null,
      hasMore: false,
      sources: {
        wordpress: allWpCards.length,
        markdown: markdownCards.length,
      },
      items: allItems,
    };

    cache.set(cacheKeyAll, { data, ts: Date.now() });
  } catch (err) {
    console.error("Error in background fetch of remaining WP cards:", err);
  }
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

export async function GET(req: NextRequest) {
  const locale = normalizeLocale(req.nextUrl.searchParams.get("lang"));
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? req.nextUrl.origin;
  const pageParam = req.nextUrl.searchParams.get("page");
  const perPageParam = req.nextUrl.searchParams.get("per_page");
  const cacheKey = `app-blog-${locale}-${pageParam ?? "all"}-${perPageParam ?? "all"}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return NextResponse.json(cached.data, {
      headers: { ...responseHeaders, "X-Cache": "HIT" },
    });
  }

  try {
    const { cards: wordpressCards, totalPages, firstPageItems } = await fetchWordPressCardsFirstPage(locale);
    const markdownCards = fetchMarkdownCards(locale);

    const byId = new Map<string, BlogPostCard>();
    for (const post of [...wordpressCards, ...markdownCards]) {
      byId.set(post.id, post);
    }

    const allItems = Array.from(byId.values())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map((item) => mapToAppItem(item, locale, origin));
    const paginated = paginateItems(allItems, pageParam, perPageParam);
    const data: AppBlogResponse = {
      locale,
      total: allItems.length,
      page: paginated.page,
      perPage: paginated.perPage,
      hasMore: paginated.hasMore,
      sources: {
        wordpress: wordpressCards.length,
        markdown: markdownCards.length,
      },
      items: paginated.items,
    };

    cache.set(cacheKey, { data, ts: Date.now() });

    if (totalPages > 1) {
      fetchRemainingWordPressCardsInBackground(
        locale,
        firstPageItems,
        markdownCards,
        totalPages,
        origin,
        cacheKey,
      ).catch((err) => console.error("Error in background fetch of remaining WP cards:", err));
    }

    return NextResponse.json(data, {
      headers: {
        ...responseHeaders,
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
        "X-Cache": "MISS",
      },
    });
  } catch (err) {
    console.error("App blog endpoint error:", err);

    if (cached) {
      return NextResponse.json(cached.data, {
        headers: { ...responseHeaders, "X-Cache": "STALE" },
      });
    }

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
