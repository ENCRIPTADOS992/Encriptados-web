import type { WordPressBlogItem } from "@/features/blog/types";
import { getCanonicalProductSlugs } from "@/app/[locale]/apps/[slug]/productConfig";
import { getAllSimProductSlugs } from "@/app/[locale]/sim/[slug]/simProductConfig";
import { SEO_LOCALES } from "@/shared/seo/constants";
import { getStaticPageSitemapPaths } from "@/shared/seo/staticPages";
import { buildAbsoluteUrl } from "@/shared/seo/url";
import { getProductCategoryApiParam } from "@/shared/constants/productCategories";
import { getProductLink } from "@/shared/utils/productRouteResolver";
import { WP_BLOG_API_BASE, WP_API_BASE, WP_BLOG_CATEGORY_IDS } from "@/shared/constants/backend";
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
    const catId = WP_BLOG_CATEGORY_IDS[locale] || 1;
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
        // Only include URLs that look like blog content (same filter as app-blog)
        if (!path.toLowerCase().includes("blog")) return null;
        return { path, lastModified: item.modified || item.date } as { path: string; lastModified?: string };
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
    ...(lastModified ? { lastmod: new Date(lastModified).toISOString() } : {}),
  };
}

// Legacy WordPress paths that must remain in the sitemap.
// These are old-format URLs (no locale prefix for ES, /pages/ prefix, IT/PT
// variants, author archives, etc.) that are still served by the legacy
// routing system and need to stay discoverable.
const LEGACY_SITEMAP_PATHS: string[] = [
  // ── ES default (no locale prefix) ──────────────────────────────────
  "/compra-con-atm-de-criptomonedas",
  "/comunicaciones-seguras-encriptacion-y-ciberseguridad",
  "/donde-encontrar-encriptados",
  "/entrega-rapida",
  "/noticias",
  "/ofertas",
  "/redes-sociales",
  "/se-socio-de-encriptados",
  "/test-de-seguridad",

  // ── ES /pages/ product pages ───────────────────────────────────────
  "/pages/armadillo-chat",
  "/pages/armadillo-phone",
  "/pages/celulares-encriptados-distribuidores",
  "/pages/chatmail",
  "/pages/cryptcom",
  "/pages/dec-secure",
  "/pages/Elyon",
  "/pages/elyon",
  "/pages/ghost-chat",
  "/pages/intact-phone",
  "/pages/nordvpn",
  "/pages/nosotros",
  "/pages/parrot",
  "/pages/politica-de-tratamiendo-de-datos",
  "/pages/renati",
  "/pages/salt",
  "/pages/securecrypt",
  "/pages/securecrypt-app",
  "/pages/secure-mdm-android",
  "/pages/secure-mdm-iphone",
  "/pages/silent-circle",
  "/pages/sim-encriptada",
  "/pages/t2-communicator",
  "/pages/terminos-y-condiciones",
  "/pages/threema-app",
  "/pages/threema-work",
  "/pages/totalsec",
  "/pages/tribu-phone",
  "/pages/ultrax",
  "/pages/vaultchat",
  "/pages/vaultchat-app",
  "/pages/verificacion-de-identidad-id",
  "/pages/vnclagoon",

  // ── EN /pages/ product pages ───────────────────────────────────────
  "/en/pages/armadillo-chat",
  "/en/pages/armadillo-phone",
  "/en/pages/chatmail",
  "/en/pages/cryptcom",
  "/en/pages/dec-secure",
  "/en/pages/elyon",
  "/en/pages/encrypted-sim-card",
  "/en/pages/ghost-chat",
  "/en/pages/intact-phone",
  "/en/pages/nordvpn",
  "/en/pages/parrot",
  "/en/pages/renati",
  "/en/pages/salt",
  "/en/pages/securecrypt",
  "/en/pages/securecrypt-app",
  "/en/pages/secure-mdm-iphone",
  "/en/pages/silent-circle",
  "/en/pages/t2-communicator",
  "/en/pages/threema-app",
  "/en/pages/threema-work",
  "/en/pages/totalsec",
  "/en/pages/tribu-phone",
  "/en/pages/ultrax",
  "/en/pages/vaultchat",
  "/en/pages/vaultchat-app",
  "/en/pages/vnclagoon",

  // ── EN utility pages ───────────────────────────────────────────────
  "/en/secure-communications-encryption-and-cybersecurity",
  "/en/security-test",

  // ── FR /pages/ product pages ───────────────────────────────────────
  "/fr/pages/armadillo-chat",
  "/fr/pages/armadillo-phone",
  "/fr/pages/carte-sim-cryptee",
  "/fr/pages/chatmail",
  "/fr/pages/cryptcom",
  "/fr/pages/dec-secure",
  "/fr/pages/ghost-chat",
  "/fr/pages/intact-phone",
  "/fr/pages/nordvpn",
  "/fr/pages/parrot",
  "/fr/pages/renati",
  "/fr/pages/salt",
  "/fr/pages/securecrypt",
  "/fr/pages/securecrypt-app",
  "/fr/pages/secure-mdm-android",
  "/fr/pages/secure-mdm-iphone",
  "/fr/pages/silent-circle",
  "/fr/pages/t2-communicator",
  "/fr/pages/threema-app",
  "/fr/pages/threema-work",
  "/fr/pages/totalsec",
  "/fr/pages/tribu-phone",
  "/fr/pages/ultrax",
  "/fr/pages/vaultchat",
  "/fr/pages/vaultchat-app",
  "/fr/pages/vnclagoon",

  // ── FR utility pages ───────────────────────────────────────────────
  "/fr/id-encriptados-verification-didentite",
  "/fr/termes-et-conditions",
  "/fr/test-de-securite",

  // ── IT legacy product pages (no /pages/ prefix) ────────────────────
  "/it/pagina-iniziale",
  "/it/armadillo-chat",
  "/it/chatmail",
  "/it/consegna-rapida",
  "/it/cryptcom",
  "/it/distributori",
  "/it/elyon",
  "/it/nord-vpn",
  "/it/renati",
  "/it/salt",
  "/it/securecrypt",
  "/it/secure-mdm-iphone",
  "/it/silent-circle",
  "/it/threema-work",
  "/it/total-sec",
  "/it/vaultchat",
  "/it/vault-chat",
  "/it/vnc-lagoon",

  // ── PT legacy product pages (no /pages/ prefix) ────────────────────
  "/pt/pagina-inicial",
  "/pt/chatmail",
  "/pt/cryptcom",
  "/pt/distribuidores",
  "/pt/elyon",
  "/pt/entrega-rapida",
  "/pt/nord-vpn",
  "/pt/renati",
  "/pt/salt",
  "/pt/securecrypt",
  "/pt/secure-mdm-android",
  "/pt/secure-mdm-iphone",
  "/pt/silent-circle",
  "/pt/threema-work",
  "/pt/vaultchat",
  "/pt/vault-chat",
  "/pt/vnc-lagoon",

  // ── IT/PT blog posts ───────────────────────────────────────────────
  "/it/blogs/sin-categoria-it/cina-lo-stato-che-vede-tutto-la-rete-di-videosorveglianza-piu-grande-del-mondo-che-compromette-la-privacy",
  "/pt/blogs/sin-categoria-pt/china-o-estado-que-tudo-ve-a-maior-rede-de-vigilancia-do-mundo-que-compromete-a-privacidade",

  // ── Author archives ────────────────────────────────────────────────
  "/author/pablo",
  "/author/pablo/page/2",
  "/author/pablo/page/3",
  "/author/pablo/page/4",
  "/author/pablo/page/5",
  "/author/webmaster",
  "/en/author/pablo",
  "/en/author/pablo/page/2",
  "/en/author/pablo/page/3",
  "/en/author/pablo/page/4",
  "/en/author/pablo/page/5",
  "/en/author/webmaster",
  "/fr/author/pablo",
  "/fr/author/pablo/page/2",
  "/fr/author/pablo/page/4",
  "/fr/author/pablo/page/5",
  "/fr/author/webmaster",
  "/it/author/webmaster",
  "/pt/author/webmaster",
];

export async function GET() {
  const entries: SitemapUrlEntry[] = [];

  // Fresh lastmod stamp for destination URLs (apps/sim/site pages) so Google
  // sees them as recently updated on every sitemap revalidation (revalidate=3600).
  // Legacy /pages/* URLs are intentionally left without lastmod: we want Google
  // to keep crawling them but not treat them as "fresher" than the destinations.
  const NOW_ISO = new Date().toISOString();

  // Static pages
  const staticPaths = ["/", "/en", "/fr", "/it", "/pt", ...getStaticPageSitemapPaths()];
  for (const path of staticPaths) {
    entries.push(makeEntry(path, path === "/" ? 1.0 : 0.7, path === "/" ? "daily" : "weekly", NOW_ISO));
  }

  // Legacy WordPress paths
  for (const path of LEGACY_SITEMAP_PATHS) {
    entries.push(makeEntry(path, 0.6, "monthly"));
  }

  // App pages
  for (const locale of SEO_LOCALES) {
    for (const slug of getCanonicalProductSlugs()) {
      entries.push(makeEntry(`/${locale}/apps/${slug}`, 0.8, "weekly", NOW_ISO));
    }
  }

  // SIM pages
  for (const locale of SEO_LOCALES) {
    for (const slug of getAllSimProductSlugs()) {
      entries.push(makeEntry(`/${locale}/sim/${slug}`, 0.8, "weekly", NOW_ISO));
    }
  }

  // Additional pages not covered by static page definitions
  const ENCRYPTED_SIM_PATHS: Record<string, string> = {
    es: "/es/sim-encriptada",
    en: "/en/encrypted-sim",
    fr: "/fr/sim-cryptee",
    it: "/it/sim-crittografata",
    pt: "/pt/sim-encriptada",
  };
  const ENCRYPTED_TEST_PATHS: Record<string, string> = {
    es: "/es/prueba-encriptada",
    en: "/en/encrypted-test",
    fr: "/fr/test-chiffré",
    it: "/it/test-crittografato",
    pt: "/pt/teste-encriptado",
  };
  for (const path of Object.values(ENCRYPTED_SIM_PATHS)) {
    entries.push(makeEntry(path, 0.8, "weekly", NOW_ISO));
  }
  for (const path of Object.values(ENCRYPTED_TEST_PATHS)) {
    entries.push(makeEntry(path, 0.6, "weekly", NOW_ISO));
  }
  for (const locale of SEO_LOCALES) {
    entries.push(makeEntry(`/${locale}/tim-sim`, 0.8, "weekly", NOW_ISO));
    entries.push(makeEntry(`/${locale}/ira-sim`, 0.8, "weekly", NOW_ISO));
    entries.push(makeEntry(`/${locale}/blog`, 0.7, "weekly", NOW_ISO));
    entries.push(makeEntry(`/${locale}/become-an-encrypted-partner`, 0.6, "weekly", NOW_ISO));
    entries.push(makeEntry(`/${locale}/activar-apps`, 0.7, "weekly", NOW_ISO));
    entries.push(makeEntry(`/${locale}/identity-verification`, 0.5, "weekly", NOW_ISO));
    entries.push(makeEntry(`/${locale}/pages/politica-de-privacidad`, 0.4, "monthly"));
    entries.push(makeEntry(`/${locale}/pages/terminos-y-condiciones`, 0.4, "monthly"));
    entries.push(makeEntry(`/${locale}/pages/politica-de-cookies`, 0.4, "monthly"));
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
