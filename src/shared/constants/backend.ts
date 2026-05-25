type QueryValue = string | number | boolean | null | undefined;
type QueryParams = Record<string, QueryValue>;

const DEFAULT_WP_API_BASE = "https://admin.encriptados.io/wp-json";

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");
const normalizePath = (path: string) => (path.startsWith("/") ? path : `/${path}`);

const withQuery = (baseUrl: string, query?: QueryParams) => {
  const url = new URL(baseUrl);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
};

const withPath = (baseUrl: string, path?: string) =>
  path ? `${baseUrl}${normalizePath(path)}` : baseUrl;

export const WP_API_BASE = trimTrailingSlash(
  process.env.NEXT_PUBLIC_WP_API || DEFAULT_WP_API_BASE
);

export const WP_V1_BASE = `${WP_API_BASE}/encriptados/v1`;
export const WP_V3_BASE = `${WP_API_BASE}/encriptados/v3`;
export const WP_BLOG_API_BASE = trimTrailingSlash(
  process.env.NEXT_PUBLIC_WP_BLOG_API || WP_API_BASE
);
export const WP_POSTS_API_BASE = trimTrailingSlash(
  process.env.NEXT_PUBLIC_WP_API_URL || `${WP_BLOG_API_BASE}/wp/v2`
);
export const SIMTIM_API_BASE = trimTrailingSlash(
  process.env.NEXT_PUBLIC_SIMTIM_BASEURL || `${WP_V3_BASE}/simtim`
);

export const BLOGS_API_URL = withQuery(`${WP_V1_BASE}/blogs`, { lang: "es" });

export const buildWpApiUrl = (path: string, query?: QueryParams) =>
  withQuery(withPath(WP_API_BASE, path), query);

export const buildWpV1Url = (path: string, query?: QueryParams) =>
  withQuery(withPath(WP_V1_BASE, path), query);

export const buildWpV3Url = (path: string, query?: QueryParams) =>
  withQuery(withPath(WP_V3_BASE, path), query);

export const buildSimtimUrl = (path?: string, query?: QueryParams) =>
  withQuery(withPath(SIMTIM_API_BASE, path), query);
