import { WP_BLOG_API_BASE } from "@/shared/constants/backend";
import { buildAbsoluteUrl } from "@/shared/seo/url";
import { buildUrlSet, xmlResponse, type SitemapUrlEntry } from "@/shared/seo/sitemapXml";
import { resolveLegacyRoute } from "@/shared/seo/legacyRoutes";
import { isLegacyBlogPage } from "@/shared/seo/blogLegacyFilter";
import { SEO_LOCALES } from "@/shared/seo/constants";

const WP_BASE = WP_BLOG_API_BASE;

export const revalidate = 3600;

type WordPressPageItem = {
  id: number;
  slug: string;
  link?: string;
  modified?: string;
  date?: string;
};

async function fetchWordPressPages(locale: string): Promise<WordPressPageItem[]> {
  try {
    const params = new URLSearchParams({
      per_page: "100",
      page: "1",
      _fields: "id,slug,link,modified,date",
      orderby: "modified",
      order: "desc",
    });

    if (locale) {
      params.set("lang", locale);
    }

    const firstUrl = `${WP_BASE}/wp/v2/pages?${params.toString()}`;
    const firstRes = await fetch(firstUrl, { next: { revalidate } });
    if (!firstRes.ok) return [];

    const firstPage = (await firstRes.json()) as WordPressPageItem[];
    const totalPages = Math.min(Number(firstRes.headers.get("x-wp-totalpages") ?? 1), 10);
    const remainingPages = Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => index + 2);

    const remaining = await Promise.all(
      remainingPages.map(async (page) => {
        params.set("page", String(page));
        const url = `${WP_BASE}/wp/v2/pages?${params.toString()}`;
        const res = await fetch(url, { next: { revalidate } });
        if (!res.ok) return [] as WordPressPageItem[];
        return (await res.json()) as WordPressPageItem[];
      }),
    );

    return [...firstPage, ...remaining.flat()];
  } catch {
    return [];
  }
}

function getPathFromUrl(value: string | undefined): string | null {
  if (!value) return null;
  try {
    return new URL(value).pathname;
  } catch {
    return value.startsWith("/") ? value : null;
  }
}

export async function GET() {
  const entries: SitemapUrlEntry[] = [];

  for (const locale of SEO_LOCALES) {
    const pages = await fetchWordPressPages(locale);

    for (const page of pages) {
      const path = getPathFromUrl(page.link);
      if (!path) continue;

      const resolution = resolveLegacyRoute(path);
      if (resolution.type !== "wp-page") continue;

      // Skip editorial blog pages — they live in sitemap-blog-legacy.xml
      if (isLegacyBlogPage(page.slug)) continue;

      entries.push({
        loc: buildAbsoluteUrl(path),
        lastmod: page.modified ? new Date(page.modified).toISOString() : new Date().toISOString(),
        changefreq: "weekly",
        priority: 0.6,
      });
    }
  }

  // Deduplicate by URL
  const deduped = new Map<string, SitemapUrlEntry>();
  for (const entry of entries) {
    deduped.set(entry.loc, entry);
  }

  return xmlResponse(buildUrlSet(Array.from(deduped.values())));
}
