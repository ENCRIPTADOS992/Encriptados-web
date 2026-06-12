import type { MetadataRoute } from "next";
import { buildAbsoluteUrl } from "@/shared/seo/url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/data/",
          "/site-access",
          "/dashboard/",
          "/*/dashboard/",
          "/login",
          "/*/login",
          "/*/test",
          "/*/test-design-system",
          "/*/test-payment-modal",
          "/*/products-test",
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
  };
}