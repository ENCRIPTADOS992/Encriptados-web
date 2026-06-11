import { NextRequest } from "next/server";
import { buildAbsoluteUrl } from "@/shared/seo/url";
import { buildUrlSet, xmlResponse, type SitemapUrlEntry } from "@/shared/seo/sitemapXml";
import { APP_PATTERNS, SIM_PATTERNS, PHONE_PATTERNS, LOCATION_CITIES } from "@/shared/seo/locationPages";
import { SEO_LOCALES, type SeoLocale } from "@/shared/seo/constants";

export const revalidate = 3600;

const TYPE_TO_PATTERNS = {
  apps: APP_PATTERNS,
  sim: SIM_PATTERNS,
  phone: PHONE_PATTERNS,
};

function parseFilename(filename: string): { type: string; locale: SeoLocale } | null {
  const match = filename.match(/^(apps|sim|phone)-([a-z]{2})\.xml$/i);
  if (!match) return null;

  const type = match[1].toLowerCase();
  const locale = match[2].toLowerCase() as SeoLocale;

  if (!SEO_LOCALES.includes(locale)) return null;
  if (!(type in TYPE_TO_PATTERNS)) return null;

  return { type, locale };
}

export function GET(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  // Handle async params in Next.js 15
  return params.then((resolvedParams) => {
    const filename = resolvedParams.slug.join("/");
    const parsed = parseFilename(filename);

    if (!parsed) {
      // For unknown sitemap paths, return empty sitemap
      return xmlResponse(buildUrlSet([]));
    }

    const { type, locale } = parsed;
    const patterns = TYPE_TO_PATTERNS[type as keyof typeof TYPE_TO_PATTERNS];
    const entries: SitemapUrlEntry[] = [];

    for (const pattern of patterns) {
      // Global variant (no city)
      const globalPath = locale === "en"
        ? `/location/${pattern.legacyPrefix}`
        : `/location/${locale}/${pattern.legacyPrefix}`;

      entries.push({
        loc: buildAbsoluteUrl(globalPath),
        changefreq: "weekly",
        priority: 0.6,
      });

      // City variants
      for (const city of LOCATION_CITIES) {
        const cityPath = locale === "en"
          ? `/location/${pattern.legacyPrefix}-${city}`
          : `/location/${locale}/${pattern.legacyPrefix}-${city}`;

        entries.push({
          loc: buildAbsoluteUrl(cityPath),
          changefreq: "weekly",
          priority: 0.6,
        });
      }
    }

    return xmlResponse(buildUrlSet(entries));
  });
}
