const DEFAULT_CANONICAL_ORIGIN = "https://encriptados.io";

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

function normalizeOrigin(value: string | undefined): string {
  if (!value) return DEFAULT_CANONICAL_ORIGIN;

  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return DEFAULT_CANONICAL_ORIGIN;
    return trimTrailingSlash(url.origin);
  } catch {
    return DEFAULT_CANONICAL_ORIGIN;
  }
}

export function getCanonicalSiteUrl(): string {
  if (typeof window !== "undefined") {
    return trimTrailingSlash(window.location.origin);
  }
  const envUrl = process.env.NEXT_PUBLIC_CANONICAL_SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl && !envUrl.includes("encriptados.net")) {
    return normalizeOrigin(envUrl);
  }
  return DEFAULT_CANONICAL_ORIGIN;
}

export function getSiteUrlObject(): URL {
  return new URL(getCanonicalSiteUrl());
}

export function normalizePath(path: string): string {
  if (!path) return "/";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (cleanPath === "/") return cleanPath;
  const clean = cleanPath.replace(/\/+/g, "/");
  // Don't add trailing slash to file paths (e.g. /sitemap.xml, /sitemaps/apps-es.xml, /robots.txt)
  const lastSegment = clean.split("/").pop() ?? "";
  if (lastSegment.includes(".")) return clean;
  return clean.endsWith("/") ? clean : `${clean}/`;
}

export function buildAbsoluteUrl(path: string): string {
  return new URL(normalizePath(path), `${getCanonicalSiteUrl()}/`).toString();
}

export function toAbsoluteUrl(value: string | undefined, fallbackPath = "/"): string {
  if (!value) return buildAbsoluteUrl(fallbackPath);
  try {
    return new URL(value, `${getCanonicalSiteUrl()}/`).toString();
  } catch {
    return buildAbsoluteUrl(fallbackPath);
  }
}

export function withTrailingSlash(path: string): string {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}