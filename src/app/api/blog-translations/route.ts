import { NextRequest, NextResponse } from "next/server";
import { WP_BLOG_API_BASE, WP_BLOG_CATEGORY_IDS } from "@/shared/constants/backend";

const WP_BASE = WP_BLOG_API_BASE;

// In-memory cache: slug+lang → translations map
const cache = new Map<string, { data: unknown; ts: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

type TranslationRef = { id: number; slug: string };

/**
 * GET /api/blog-translations?slug={slug}&lang={locale}
 *
 * Returns the translation map for a blog post:
 * { es: { id, slug }, en: { id, slug }, fr: { id, slug }, ... }
 *
 * Resolves the post by slug + category, then reads the `translations`
 * field exposed by the Polylang mu-plugin.
 */
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  const lang = req.nextUrl.searchParams.get("lang") ?? "es";

  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  const cacheKey = `${lang}:${slug}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return NextResponse.json(cached.data, { headers: { "X-Cache": "HIT" } });
  }

  try {
    const catId = WP_BLOG_CATEGORY_IDS[lang] || WP_BLOG_CATEGORY_IDS.es;
    const url = `${WP_BASE}/wp/v2/posts?categories=${catId}&slug=${encodeURIComponent(slug)}&per_page=1&_fields=id,slug,lang,translations`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ error: "WP API error" }, { status: res.status });
    }

    const data = (await res.json()) as Array<{
      id: number;
      slug: string;
      lang?: string;
      translations?: Record<string, TranslationRef>;
    }>;

    const post = data[0];
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const translations = post.translations ?? { [lang]: { id: post.id, slug: post.slug } };

    cache.set(cacheKey, { data: translations, ts: Date.now() });

    return NextResponse.json(translations, { headers: { "X-Cache": "MISS" } });
  } catch (err) {
    console.error("blog-translations proxy error:", err);
    if (cached) {
      return NextResponse.json(cached.data, { headers: { "X-Cache": "STALE" } });
    }
    return NextResponse.json({ error: "Failed to fetch translations" }, { status: 502 });
  }
}
