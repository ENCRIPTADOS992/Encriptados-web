import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type {
  BlogPostCard,
  MarkdownBlogMeta,
  WordPressBlogItem,
} from "@/features/blog/types";

const WP_BASE =
  process.env.NEXT_PUBLIC_WP_BLOG_API ?? "https://encriptados.io/wp-json";
const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const WP_PER_PAGE = 100;
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

function toAbsoluteUrl(value: string | undefined, origin: string): string {
  if (!value) return "";
  try {
    return new URL(value, origin).toString();
  } catch {
    return value;
  }
}

function mapToAppItem(item: BlogPostCard, locale: string, origin: string): AppBlogItem {
  const path = `/${locale}/blog/${item.slug}`;

  return {
    ...item,
    image: toAbsoluteUrl(item.image, origin),
    imageFull: toAbsoluteUrl(item.imageFull ?? item.image, origin),
    path,
    url: toAbsoluteUrl(path, origin),
  };
}

async function fetchWordPressCards(locale: string): Promise<BlogPostCard[]> {
  const firstUrl = `${WP_BASE}/wp/v2/posts?lang=${encodeURIComponent(locale)}&per_page=${WP_PER_PAGE}&page=1&_embed`;
  const firstRes = await fetch(firstUrl, { cache: "no-store" });

  if (!firstRes.ok) {
    throw new Error(`WordPress API error: ${firstRes.status}`);
  }

  const firstPage = (await firstRes.json()) as WordPressBlogItem[];
  const totalPages = Number(firstRes.headers.get("x-wp-totalpages") ?? 1);
  const remainingPages = Array.from(
    { length: Math.max(totalPages - 1, 0) },
    (_, index) => index + 2,
  );

  const remaining = await Promise.all(
    remainingPages.map(async (page) => {
      const url = `${WP_BASE}/wp/v2/posts?lang=${encodeURIComponent(locale)}&per_page=${WP_PER_PAGE}&page=${page}&_embed`;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) return [] as WordPressBlogItem[];
      return (await res.json()) as WordPressBlogItem[];
    }),
  );

  return [...firstPage, ...remaining.flat()].map(mapWpItemToCard);
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
    const [wordpressCards, markdownCards] = await Promise.all([
      fetchWordPressCards(locale),
      Promise.resolve(fetchMarkdownCards(locale)),
    ]);

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