import { NextResponse } from "next/server";
import { buildAbsoluteUrl } from "@/shared/seo/url";
import {
  buildSitemapIndex,
  xmlResponse,
  type SitemapIndexEntry,
} from "@/shared/seo/sitemapXml";
import { SEO_LOCALES } from "@/shared/seo/constants";

export const revalidate = 3600;

export function GET() {
  const types = ["apps", "sim", "phone"];
  const lastmod = new Date().toISOString().split("T")[0];
  const entries: SitemapIndexEntry[] = [];

  for (const type of types) {
    for (const locale of SEO_LOCALES) {
      entries.push({
        loc: buildAbsoluteUrl(`/sitemaps/${type}-${locale}.xml`),
        lastmod,
      });
    }
  }

  // Add other sitemaps at the start
  entries.unshift(
    { loc: buildAbsoluteUrl("/sitemap-main.xml"), lastmod },
    { loc: buildAbsoluteUrl("/sitemap-legacy.xml"), lastmod },
    { loc: buildAbsoluteUrl("/sitemap-blog-legacy.xml"), lastmod },
  );

  return xmlResponse(buildSitemapIndex(entries));
}
