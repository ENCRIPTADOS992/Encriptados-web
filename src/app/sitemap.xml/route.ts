import { NextResponse } from "next/server";
import { buildAbsoluteUrl } from "@/shared/seo/url";
import { buildSitemapIndex, xmlResponse } from "@/shared/seo/sitemapXml";
import { SEO_LOCALES } from "@/shared/seo/constants";

export const revalidate = 3600;

export function GET() {
  const types = ["apps", "sim", "phone"];
  const sitemaps: string[] = [];

  for (const type of types) {
    for (const locale of SEO_LOCALES) {
      sitemaps.push(buildAbsoluteUrl(`/sitemaps/${type}-${locale}.xml`));
    }
  }

  // Add other sitemaps
  sitemaps.unshift(
    buildAbsoluteUrl("/sitemap-main.xml"),
    buildAbsoluteUrl("/sitemap-legacy.xml"),
  );

  return xmlResponse(buildSitemapIndex(sitemaps));
}
