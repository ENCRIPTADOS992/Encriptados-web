import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ClientProviders } from "@/shared/components/Providers";
import JsonLd from "@/shared/components/JsonLd/JsonLd";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/shared/components/JsonLd/siteJsonLd";
import {
  SEO_DEFAULT_DESCRIPTION,
  SEO_DEFAULT_IMAGE,
  SEO_DEFAULT_KEYWORDS,
  SEO_DEFAULT_TITLE,
  SEO_SITE_NAME,
  SEO_TITLE_TEMPLATE,
} from "@/shared/seo/constants";
import { buildAbsoluteUrl, getSiteUrlObject } from "@/shared/seo/url";

export const metadata: Metadata = {
  metadataBase: getSiteUrlObject(),
  applicationName: SEO_SITE_NAME,
  title: {
    default: SEO_DEFAULT_TITLE,
    template: SEO_TITLE_TEMPLATE,
  },
  description: SEO_DEFAULT_DESCRIPTION,
  keywords: SEO_DEFAULT_KEYWORDS,
  authors: [{ name: SEO_SITE_NAME, url: buildAbsoluteUrl("/") }],
  creator: SEO_SITE_NAME,
  publisher: SEO_SITE_NAME,
  referrer: "origin-when-cross-origin",
  icons: {
    icon: [{ url: "/favicon.ico?v=2", type: "image/x-icon", sizes: "any" }],
    shortcut: [{ url: "/favicon.ico?v=2", type: "image/x-icon" }],
    apple: [{ url: "/favicon.ico?v=2", type: "image/x-icon" }],
  },
  alternates: {
    canonical: buildAbsoluteUrl("/"),
  },
  openGraph: {
    title: SEO_DEFAULT_TITLE,
    description: SEO_DEFAULT_DESCRIPTION,
    url: buildAbsoluteUrl("/"),
    siteName: SEO_SITE_NAME,
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: buildAbsoluteUrl(SEO_DEFAULT_IMAGE.url),
        width: SEO_DEFAULT_IMAGE.width,
        height: SEO_DEFAULT_IMAGE.height,
        alt: SEO_DEFAULT_IMAGE.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_DEFAULT_TITLE,
    description: SEO_DEFAULT_DESCRIPTION,
    images: [buildAbsoluteUrl(SEO_DEFAULT_IMAGE.url)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[buildOrganizationJsonLd(), buildWebSiteJsonLd()]} />
      <ClientProviders>
        {children}
      </ClientProviders>
    </>
  );
}
