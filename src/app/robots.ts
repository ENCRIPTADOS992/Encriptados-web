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
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        disallow: "/",
      },
      {
        userAgent: "Google-Extended",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        userAgent: "anthropic-ai",
        disallow: "/",
      },
      {
        userAgent: "Claude-Web",
        disallow: "/",
      },
      {
        userAgent: "PerplexityBot",
        disallow: "/",
      },
    ],
    sitemap: buildAbsoluteUrl("/sitemap.xml"),
    host: getCanonicalSiteUrl(),
  };
}