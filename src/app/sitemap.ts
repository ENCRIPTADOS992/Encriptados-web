import type { MetadataRoute } from "next";
import type { WordPressBlogItem } from "@/features/blog/types";
import { getAllProductSlugs } from "@/app/[locale]/apps/[slug]/productConfig";
import { getAllSimProductSlugs } from "@/app/[locale]/sim/[slug]/simProductConfig";
import { SEO_LOCALES } from "@/shared/seo/constants";
import { getStaticPageSitemapPaths } from "@/shared/seo/staticPages";
import { buildAbsoluteUrl } from "@/shared/seo/url";

const WP_BASE = process.env.NEXT_PUBLIC_WP_BLOG_API ?? "https://encriptados.io/wp-json";

export const revalidate = 3600;

function getPathFromUrl(value: string | undefined): string | null {
  if (!value) return null;
  try {
    return new URL(value).pathname;
  } catch {
    return value.startsWith("/") ? value : null;
  }
}

async function fetchWordPressBlogPaths(locale: string): Promise<Array<{ path: string; lastModified?: string }>> {
  try {
    const firstUrl = `${WP_BASE}/wp/v2/posts?lang=${encodeURIComponent(locale)}&per_page=100&page=1&_fields=link,modified,date&orderby=modified&order=desc`;
    const firstRes = await fetch(firstUrl, { next: { revalidate } });
    if (!firstRes.ok) return [];

    const firstPage = (await firstRes.json()) as WordPressBlogItem[];
    const totalPages = Math.min(Number(firstRes.headers.get("x-wp-totalpages") ?? 1), 10);
    const remainingPages = Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => index + 2);
    const remaining = await Promise.all(
      remainingPages.map(async (page) => {
        const url = `${WP_BASE}/wp/v2/posts?lang=${encodeURIComponent(locale)}&per_page=100&page=${page}&_fields=link,modified,date&orderby=modified&order=desc`;
        const res = await fetch(url, { next: { revalidate } });
        if (!res.ok) return [] as WordPressBlogItem[];
        return (await res.json()) as WordPressBlogItem[];
      }),
    );

    return [...firstPage, ...remaining.flat()]
      .map((item) => {
        const path = getPathFromUrl(item.link);
        if (!path) return null;
        return { path, lastModified: item.date } as { path: string; lastModified?: string };
      })
      .filter((item): item is { path: string; lastModified?: string } => item !== null);
  } catch {
    return [];
  }
}

function entry(path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly", lastModified?: string) {
  return {
    url: buildAbsoluteUrl(path),
    lastModified: lastModified ? new Date(lastModified) : new Date(),
    changeFrequency,
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = ["/", "/en", "/fr", "/it", "/pt", ...getStaticPageSitemapPaths()].map((path) =>
    entry(path, path === "/" ? 1 : 0.7, path === "/" ? "daily" : "weekly"),
  );
  const appEntries = SEO_LOCALES.flatMap((locale) =>
    getAllProductSlugs().map((slug) => entry(`/${locale}/apps/${slug}`, 0.8, "weekly")),
  );
  const simEntries = SEO_LOCALES.flatMap((locale) =>
    getAllSimProductSlugs().map((slug) => entry(`/${locale}/sim/${slug}`, 0.8, "weekly")),
  );
  const blogPaths = (await Promise.all(SEO_LOCALES.map((locale) => fetchWordPressBlogPaths(locale)))).flat();
  const blogEntries = blogPaths.map((item) => entry(item.path, 0.6, "weekly", item.lastModified));
  const deduped = new Map<string, MetadataRoute.Sitemap[number]>();

  for (const item of [...staticEntries, ...appEntries, ...simEntries, ...blogEntries]) {
    deduped.set(item.url, item);
  }

  return Array.from(deduped.values());
}