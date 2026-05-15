import { NextResponse } from "next/server";
import { buildAbsoluteUrl } from "@/shared/seo/url";

export function GET() {
  return NextResponse.redirect(buildAbsoluteUrl("/sitemap.xml"), 308);
}