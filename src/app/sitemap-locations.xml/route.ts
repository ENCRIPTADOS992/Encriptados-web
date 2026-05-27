import { getIndexableLocationPaths } from "@/shared/seo/locationPages";
import { buildAbsoluteUrl } from "@/shared/seo/url";
import { buildUrlSet, xmlResponse, type SitemapUrlEntry } from "@/shared/seo/sitemapXml";

export const revalidate = 3600;

export function GET() {
  const paths = getIndexableLocationPaths();

  const entries: SitemapUrlEntry[] = paths.map((path) => ({
    loc: buildAbsoluteUrl(path),
    changefreq: "weekly",
    priority: 0.6,
  }));

  return xmlResponse(buildUrlSet(entries));
}
