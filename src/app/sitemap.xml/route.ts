import { NextResponse } from "next/server";
import { buildAbsoluteUrl } from "@/shared/seo/url";
import { buildSitemapIndex, xmlResponse } from "@/shared/seo/sitemapXml";

export const revalidate = 3600;

export function GET() {
  const sitemaps = [
    buildAbsoluteUrl("/sitemap-main.xml"),
    buildAbsoluteUrl("/sitemap-legacy.xml"),
    buildAbsoluteUrl("/sitemap-locations.xml"),
  ];

  return xmlResponse(buildSitemapIndex(sitemaps));
}
