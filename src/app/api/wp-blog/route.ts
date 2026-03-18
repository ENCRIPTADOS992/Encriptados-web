import { NextRequest, NextResponse } from "next/server";

const WP_BASE =
  process.env.NEXT_PUBLIC_WP_BLOG_API ?? "https://encriptados.io/wp-json";

// Simple in-memory cache for WP responses
const cache = new Map<string, { data: unknown; ts: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET(req: NextRequest) {
  const lang = req.nextUrl.searchParams.get("lang") ?? "es";
  const id = req.nextUrl.searchParams.get("id"); // optional: single post
  const perPage = req.nextUrl.searchParams.get("per_page") ?? "100";
  const page = req.nextUrl.searchParams.get("page") ?? "1";

  const cacheKey = id ? `wp-post-${id}` : `wp-cards-${lang}-p${page}-n${perPage}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return NextResponse.json(cached.data, {
      headers: { "X-Cache": "HIT" },
    });
  }

  try {
    const url = id
      ? `${WP_BASE}/wp/v2/posts/${encodeURIComponent(id)}?_embed`
      : `${WP_BASE}/wp/v2/posts?lang=${encodeURIComponent(lang)}&per_page=${encodeURIComponent(perPage)}&page=${encodeURIComponent(page)}&_embed`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json(
        { error: "WP API error" },
        { status: res.status },
      );
    }

    const data = await res.json();
    cache.set(cacheKey, { data, ts: Date.now() });

    return NextResponse.json(data, {
      headers: { "X-Cache": "MISS" },
    });
  } catch (err) {
    console.error("WP proxy error:", err);
    // Return stale cache if available
    if (cached) {
      return NextResponse.json(cached.data, {
        headers: { "X-Cache": "STALE" },
      });
    }
    return NextResponse.json(
      { error: "Failed to fetch from WP" },
      { status: 502 },
    );
  }
}
