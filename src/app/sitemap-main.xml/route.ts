import type { WordPressBlogItem } from "@/features/blog/types";
import { getAllProductSlugs } from "@/app/[locale]/apps/[slug]/productConfig";
import { getAllSimProductSlugs } from "@/app/[locale]/sim/[slug]/simProductConfig";
import { SEO_LOCALES } from "@/shared/seo/constants";
import { getStaticPageSitemapPaths } from "@/shared/seo/staticPages";
import { buildAbsoluteUrl } from "@/shared/seo/url";
import { getProductCategoryApiParam } from "@/shared/constants/productCategories";
import { getProductLink } from "@/shared/utils/productRouteResolver";
import { WP_BLOG_API_BASE, WP_API_BASE } from "@/shared/constants/backend";
import { buildUrlSet, xmlResponse, type SitemapUrlEntry } from "@/shared/seo/sitemapXml";

const WP_BASE = WP_BLOG_API_BASE;
const STORE_API_BASE = WP_API_BASE;
const PUBLIC_PRODUCT_CATEGORY_IDS = [35, 36, 38, 40, 371] as const;

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
    const catId = (locale === "en" ? 97 : locale === "pt" ? 101 : locale === "it" ? 100 : locale === "fr" ? 98 : 96);
    const firstUrl = `${WP_BASE}/wp/v2/posts?categories=${catId}&per_page=100&page=1&_fields=link,modified,date&orderby=modified&order=desc`;
    const firstRes = await fetch(firstUrl, { next: { revalidate } });
    if (!firstRes.ok) return [];

    const firstPage = (await firstRes.json()) as WordPressBlogItem[];
    const totalPages = Math.min(Number(firstRes.headers.get("x-wp-totalpages") ?? 1), 10);
    const remainingPages = Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => index + 2);
    const remaining = await Promise.all(
      remainingPages.map(async (page) => {
        const url = `${WP_BASE}/wp/v2/posts?categories=${catId}&per_page=100&page=${page}&_fields=link,modified,date&orderby=modified&order=desc`;
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

type StoreProduct = {
  id?: number;
  name?: string;
  provider?: string;
  type_product?: string;
  modified?: string;
  date_modified?: string;
  updated_at?: string;
  category?: { id?: number };
};

type SitemapPath = { path: string; lastModified?: string };

async function fetchStoreProducts(categoryId: number, locale: string): Promise<StoreProduct[]> {
  if (!STORE_API_BASE) return [];

  try {
    const url = new URL("/encriptados/v3/store/products", STORE_API_BASE);
    url.searchParams.set("category_id", getProductCategoryApiParam(categoryId) ?? String(categoryId));
    url.searchParams.set("lang", locale);

    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) return [];

    const data = (await res.json()) as { products?: Record<string, StoreProduct> | StoreProduct[] };
    if (Array.isArray(data.products)) return data.products;
    return Object.values(data.products || {});
  } catch {
    return [];
  }
}

async function fetchStoreProductPaths(locale: string): Promise<SitemapPath[]> {
  const categories = await Promise.all(
    PUBLIC_PRODUCT_CATEGORY_IDS.map(async (categoryId) => {
      const products = await fetchStoreProducts(categoryId, locale);

      return products
        .map((product): SitemapPath | null => {
          const name = String(product.name || "").trim();
          if (!name) return null;

          const productCategoryId = Number(product.category?.id || categoryId);
          const route = getProductLink(
            name,
            productCategoryId,
            product.id,
            product.provider,
            product.type_product,
          );
          if (!route) return null;

          const cleanRoute = route.split("?")[0].replace(/\/+$/, "") || "/";
          return {
            path: `/${locale}${cleanRoute}`,
            lastModified: product.modified || product.date_modified || product.updated_at,
          };
        })
        .filter((item): item is SitemapPath => item !== null);
    }),
  );

  return categories.flat();
}

function makeEntry(path: string, priority: number, changefreq: string = "weekly", lastModified?: string): SitemapUrlEntry {
  return {
    loc: buildAbsoluteUrl(path),
    priority,
    changefreq,
    lastmod: lastModified ? new Date(lastModified).toISOString() : new Date().toISOString(),
  };
}

export async function GET() {
  const entries: SitemapUrlEntry[] = [];

  // Static pages
  const staticPaths = ["/", "/en", "/fr", "/it", "/pt", ...getStaticPageSitemapPaths()];
  for (const path of staticPaths) {
    entries.push(makeEntry(path, path === "/" ? 1.0 : 0.7, path === "/" ? "daily" : "weekly"));
  }

  // App pages
  for (const locale of SEO_LOCALES) {
    for (const slug of getAllProductSlugs()) {
      entries.push(makeEntry(`/${locale}/apps/${slug}`, 0.8));
    }
  }

  // SIM pages
  for (const locale of SEO_LOCALES) {
    for (const slug of getAllSimProductSlugs()) {
      entries.push(makeEntry(`/${locale}/sim/${slug}`, 0.8));
    }
  }

  // Store products
  const storeProductPaths = (await Promise.all(SEO_LOCALES.map((locale) => fetchStoreProductPaths(locale)))).flat();
  for (const item of storeProductPaths) {
    entries.push(makeEntry(item.path, 0.8, "weekly", item.lastModified));
  }

  // Blog posts
  const blogPaths = (await Promise.all(SEO_LOCALES.map((locale) => fetchWordPressBlogPaths(locale)))).flat();
  for (const item of blogPaths) {
    entries.push(makeEntry(item.path, 0.6, "weekly", item.lastModified));
  }

  // Deduplicate by URL
  const deduped = new Map<string, SitemapUrlEntry>();
  for (const entry of entries) {
    deduped.set(entry.loc, entry);
  }

  return xmlResponse(buildUrlSet(Array.from(deduped.values())));
}
