const SUPPORTED_LOCALES = ["en", "es", "fr", "it", "pt"];

function isExternalHref(href: string): boolean {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href);
}

function splitHref(href: string) {
  const hashIndex = href.indexOf("#");
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
  const withoutHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const queryIndex = withoutHash.indexOf("?");
  const query = queryIndex >= 0 ? withoutHash.slice(queryIndex) : "";
  const pathname = queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash;

  return { pathname, query, hash };
}

function stripLocalePrefix(pathname: string): string {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const parts = normalizedPath.split("/").filter(Boolean);
  const firstPart = parts[0];

  if (!SUPPORTED_LOCALES.includes(firstPart)) return normalizedPath;

  const withoutLocale = `/${parts.slice(1).join("/")}`;
  return withoutLocale === "/" ? "/" : withoutLocale;
}

export function localizeInternalHref(href: string, locale: string): string {
  if (!href || href === "#" || href.startsWith("#") || isExternalHref(href)) return href;

  const safeLocale = SUPPORTED_LOCALES.includes(locale) ? locale : "es";
  const { pathname, query, hash } = splitHref(href);
  const normalizedPath = stripLocalePrefix(pathname || "/");

  if (normalizedPath === "/") {
    return `${safeLocale === "es" ? "/" : `/${safeLocale}`}${query}${hash}`;
  }

  return `/${safeLocale}${normalizedPath}${query}${hash}`;
}