import type { MetadataRoute } from "next";
import { buildAbsoluteUrl, getCanonicalSiteUrl } from "@/shared/seo/url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/dashboard/",
          "/*/dashboard/",
          "/login",
          "/*/login",
          "/*/test",
          "/*/test-design-system",
          "/*/test-payment-modal",
          "/*/products-test",
          "/*/encrypted-test",
          "/*/security-test",
          "/*/checkout",
        ],
      },
    ],
    sitemap: buildAbsoluteUrl("/sitemap.xml"),
    host: getCanonicalSiteUrl(),
  };
}