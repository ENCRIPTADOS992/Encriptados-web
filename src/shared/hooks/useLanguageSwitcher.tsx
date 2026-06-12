"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { getBlogTranslations } from "@/shared/context/BlogTranslationStore";

export type LocaleLanguages = "es" | "en" | "pt" | "it" | "fr";

const LOCALES: LocaleLanguages[] = ["es", "en", "pt", "it", "fr"];

const normalizePath = (path: string) => {
  if (!path) return "/";

  const pathWithSlash = path.startsWith("/") ? path : `/${path}`;
  return pathWithSlash.length > 1 ? pathWithSlash.replace(/\/$/, "") : pathWithSlash;
};

const stripLocalePrefix = (path: string) => {
  const normalizedPath = normalizePath(path);
  const matchedLocale = LOCALES.find(
    (locale) => normalizedPath === `/${locale}` || normalizedPath.startsWith(`/${locale}/`)
  );

  if (!matchedLocale) return normalizedPath;

  const withoutLocale = normalizedPath.slice(matchedLocale.length + 1);
  return withoutLocale ? normalizePath(withoutLocale) : "/";
};

const patternToRegExp = (pattern: string) => {
  const params: string[] = [];
  const escapedPattern = normalizePath(pattern)
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\\\[([^/]+?)\\\]/g, (_, paramName: string) => {
      params.push(paramName);
      return "([^/]+)";
    });

  return { params, regExp: new RegExp(`^${escapedPattern}$`) };
};

const fillDynamicPath = (pattern: string, params: string[], values: string[]) => {
  return params.reduce(
    (path, paramName, index) => path.replace(`[${paramName}]`, values[index] ?? ""),
    normalizePath(pattern)
  );
};

const getLocalizedPathWithoutLocale = (
  pathname: string,
  currentLocale: LocaleLanguages,
  nextLocale: LocaleLanguages
) => {
  const pathWithoutLocale = stripLocalePrefix(pathname);

  for (const [routeKey, routeValue] of Object.entries(routing.pathnames)) {
    if (typeof routeValue === "string") {
      if (normalizePath(routeValue) === pathWithoutLocale || normalizePath(routeKey) === pathWithoutLocale) {
        return normalizePath(routeValue);
      }
      continue;
    }

    const currentPattern = normalizePath(routeValue[currentLocale] ?? routeKey);
    const targetPattern = normalizePath(routeValue[nextLocale] ?? routeKey);

    if (currentPattern === pathWithoutLocale || normalizePath(routeKey) === pathWithoutLocale) {
      return targetPattern;
    }

    const { params, regExp } = patternToRegExp(currentPattern);
    const match = pathWithoutLocale.match(regExp);

    if (match) {
      return fillDynamicPath(targetPattern, params, match.slice(1));
    }
  }

  return pathWithoutLocale;
};

const prefixPathWithLocale = (path: string, locale: LocaleLanguages) => {
  const normalizedPath = normalizePath(path);

  if (normalizedPath === "/") {
    return locale === "es" ? "/" : `/${locale}`;
  }

  return `/${locale}${normalizedPath}`;
};

/** Detect if a path (without locale) is a blog post route and extract the slug */
const extractBlogSlug = (pathWithoutLocale: string): string | null => {
  // Matches /blog/{slug} or /blogs/{category}/{slug}
  const blogMatch = pathWithoutLocale.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) return blogMatch[1];

  const blogsMatch = pathWithoutLocale.match(/^\/blogs\/[^/]+\/([^/]+)$/);
  if (blogsMatch) return blogsMatch[1];

  return null;
};

const useLanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const currentLocale: LocaleLanguages = LOCALES.includes(locale as LocaleLanguages)
    ? (locale as LocaleLanguages)
    : "es";

  const changeLanguage = (nextLocale: LocaleLanguages) => {
    const pathWithoutLocale = stripLocalePrefix(pathname);

    // Blog post translation: use stored translations to resolve the correct slug
    const blogSlug = extractBlogSlug(pathWithoutLocale);
    if (blogSlug) {
      const translations = getBlogTranslations();
      const translated = translations?.[nextLocale];
      if (translated?.slug) {
        const newPath = prefixPathWithLocale(`/blog/${translated.slug}`, nextLocale);
        router.push(newPath);
        return;
      }
      // Fallback: try the same slug in the new locale (may 404 but better than nothing)
    }

    const localizedPath = getLocalizedPathWithoutLocale(pathname, currentLocale, nextLocale);
    const newPath = prefixPathWithLocale(localizedPath, nextLocale);
    const qs = searchParams?.toString() || "";

    router.push(qs ? `${newPath}?${qs}` : newPath);
  };

  return {
    currentLocale,
    changeLanguage,
  };
};

export default useLanguageSwitcher;
