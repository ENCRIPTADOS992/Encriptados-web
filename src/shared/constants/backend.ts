import axios from "axios";

type QueryValue = string | number | boolean | null | undefined;
type QueryParams = Record<string, QueryValue>;

const DEFAULT_WP_API_BASE = "https://admin.encriptados.io/wp-json";

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");
const normalizePath = (path: string) => (path.startsWith("/") ? path : `/${path}`);

const withQuery = (baseUrl: string, query?: QueryParams) => {
  const base = typeof window !== "undefined" ? window.location.origin : "http://127.0.0.1";
  const url = baseUrl.startsWith("http") ? new URL(baseUrl) : new URL(baseUrl, base);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });
  }

  // If the input was a relative URL, return the relative URL part
  return baseUrl.startsWith("http") ? url.toString() : url.pathname + url.search;
};

const withPath = (baseUrl: string, path?: string) =>
  path ? `${baseUrl}${normalizePath(path)}` : baseUrl;

const isServer = typeof window === "undefined";
const rawWpApi = process.env.NEXT_PUBLIC_WP_API || DEFAULT_WP_API_BASE;
const rawWpBlogApi = process.env.NEXT_PUBLIC_WP_BLOG_API || DEFAULT_WP_API_BASE;

export const WP_API_BASE = trimTrailingSlash(
  isServer
    ? rawWpApi
    : "/api/wp-json"
);

export const WP_V1_BASE = `${WP_API_BASE}/encriptados/v1`;
export const WP_V3_BASE = `${WP_API_BASE}/encriptados/v3`;

export const WP_BLOG_API_BASE = isServer
  // Legacy SEO/blog content must resolve from the admin WordPress even if the
  // generic storefront WP API points somewhere else.
  ? trimTrailingSlash(rawWpBlogApi)
  : WP_API_BASE;

export const WP_POSTS_API_BASE = isServer
  ? trimTrailingSlash(process.env.NEXT_PUBLIC_WP_API_URL || `${WP_BLOG_API_BASE}/wp/v2`)
  : `${WP_BLOG_API_BASE}/wp/v2`;

export const SIMTIM_API_BASE = isServer
  ? trimTrailingSlash(process.env.NEXT_PUBLIC_SIMTIM_BASEURL || `${WP_V3_BASE}/simtim`)
  : `${WP_V3_BASE}/simtim`;

export const BLOGS_API_URL = withQuery(`${WP_V1_BASE}/blogs`, { lang: "es" });

export const WP_BLOG_CATEGORY_IDS: Record<string, number> = {
  es: 1,   // noticias
  en: 12,  // news
  pt: 393, // noticias-pt
  it: 180, // notizia
  fr: 16,  // nouvelles
};

export const buildWpApiUrl = (path: string, query?: QueryParams) =>
  withQuery(withPath(WP_API_BASE, path), query);

export const buildWpV1Url = (path: string, query?: QueryParams) =>
  withQuery(withPath(WP_V1_BASE, path), query);

export const buildWpV3Url = (path: string, query?: QueryParams) =>
  withQuery(withPath(WP_V3_BASE, path), query);

export const buildSimtimUrl = (path?: string, query?: QueryParams) =>
  withQuery(withPath(SIMTIM_API_BASE, path), query);
