import axios from "axios";

// ════════════════════════════════════════════════════════════════
// Server-Side Request Local Routing Optimization (Cloudflare DNS Bottleneck Fix)
// ════════════════════════════════════════════════════════════════
if (typeof window === "undefined") {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async function (input: RequestInfo | URL, init?: RequestInit) {
    let urlStr = "";
    if (typeof input === "string") {
      urlStr = input;
    } else if (input instanceof URL) {
      urlStr = input.toString();
    } else if (input instanceof Request) {
      urlStr = input.url;
    }

    const isWpTarget = urlStr.startsWith("https://admin.encriptados.io") || urlStr.startsWith("https://encriptados.es");
    if (isWpTarget) {
      const localUrl = urlStr.replace(/https:\/\/(admin\.encriptados\.io|encriptados\.es)/, "http://127.0.0.1");

      if (input instanceof Request) {
        const newHeaders = new Headers(input.headers);
        newHeaders.set("Host", "admin.encriptados.io");
        
        if (init?.headers) {
          const initHeaders = new Headers(init.headers);
          initHeaders.forEach((val, key) => {
            newHeaders.set(key, val);
          });
        }

        const newRequest = new Request(localUrl, {
          method: input.method,
          headers: newHeaders,
          body: input.body,
          referrer: input.referrer,
          referrerPolicy: input.referrerPolicy,
          mode: input.mode,
          credentials: input.credentials,
          cache: input.cache,
          redirect: input.redirect,
          integrity: input.integrity,
          keepalive: input.keepalive,
          signal: input.signal,
          ...(init || {}),
        });

        return originalFetch(newRequest);
      } else {
        const newInit = { ...init };
        const headers = new Headers(init?.headers);
        headers.set("Host", "admin.encriptados.io");
        newInit.headers = headers;

        return originalFetch(localUrl, newInit);
      }
    }

    return originalFetch(input, init);
  };

  // ════════════════════════════════════════════════════════════════
  // Axios Request Local Routing Interceptor
  // ════════════════════════════════════════════════════════════════
  axios.interceptors.request.use((config) => {
    const url = config.url || "";
    const baseURL = config.baseURL || "";
    if (url.startsWith("http://127.0.0.1") || baseURL.startsWith("http://127.0.0.1")) {
      config.headers = config.headers || {};
      config.headers["Host"] = "admin.encriptados.io";
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
}

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

export const WP_API_BASE = trimTrailingSlash(
  isServer
    ? (rawWpApi.startsWith("https://admin.encriptados.io") || rawWpApi.startsWith("https://encriptados.es")
        ? rawWpApi.replace(/https:\/\/(admin\.encriptados\.io|encriptados\.es)/, "http://127.0.0.1")
        : rawWpApi)
    : "/api/wp-json"
);

export const WP_V1_BASE = `${WP_API_BASE}/encriptados/v1`;
export const WP_V3_BASE = `${WP_API_BASE}/encriptados/v3`;

export const WP_BLOG_API_BASE = isServer
  ? trimTrailingSlash(process.env.NEXT_PUBLIC_WP_BLOG_API || WP_API_BASE)
  : WP_API_BASE;

export const WP_POSTS_API_BASE = isServer
  ? trimTrailingSlash(process.env.NEXT_PUBLIC_WP_API_URL || `${WP_BLOG_API_BASE}/wp/v2`)
  : `${WP_BLOG_API_BASE}/wp/v2`;

export const SIMTIM_API_BASE = isServer
  ? trimTrailingSlash(process.env.NEXT_PUBLIC_SIMTIM_BASEURL || `${WP_V3_BASE}/simtim`)
  : `${WP_V3_BASE}/simtim`;

export const BLOGS_API_URL = withQuery(`${WP_V1_BASE}/blogs`, { lang: "es" });

export const buildWpApiUrl = (path: string, query?: QueryParams) =>
  withQuery(withPath(WP_API_BASE, path), query);

export const buildWpV1Url = (path: string, query?: QueryParams) =>
  withQuery(withPath(WP_V1_BASE, path), query);

export const buildWpV3Url = (path: string, query?: QueryParams) =>
  withQuery(withPath(WP_V3_BASE, path), query);

export const buildSimtimUrl = (path?: string, query?: QueryParams) =>
  withQuery(withPath(SIMTIM_API_BASE, path), query);
