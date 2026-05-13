const PRODUCTION_ORIGIN = "https://encriptados.io";

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

function normalizeOrigin(value: string | undefined): string {
  if (!value) return PRODUCTION_ORIGIN;

  try {
    const url = new URL(value);
    if (url.hostname === "encriptados.net" || url.hostname.endsWith(".encriptados.net")) {
      return PRODUCTION_ORIGIN;
    }
    return trimTrailingSlash(url.origin);
  } catch {
    return PRODUCTION_ORIGIN;
  }
}

export function getCanonicalSiteUrl(): string {
  return normalizeOrigin(
    process.env.NEXT_PUBLIC_CANONICAL_SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL,
  );
}

export function getSiteUrlObject(): URL {
  return new URL(getCanonicalSiteUrl());
}

export function normalizePath(path: string): string {
  if (!path) return "/";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (cleanPath === "/") return cleanPath;
  return cleanPath.replace(/\/+/g, "/");
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