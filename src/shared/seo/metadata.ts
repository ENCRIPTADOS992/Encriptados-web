import type { Metadata } from "next";
import {
  SEO_DEFAULT_DESCRIPTION,
  SEO_DEFAULT_IMAGE,
  SEO_DEFAULT_KEYWORDS,
  SEO_LOCALES,
  SEO_SITE_NAME,
  type SeoLocale,
} from "./constants";
import { buildAbsoluteUrl, toAbsoluteUrl } from "./url";

type SeoImage = {
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
};

export type SeoMetadataInput = {
  title: string;
  description?: string;
  canonicalPath: string;
  locale?: SeoLocale | string;
  keywords?: string[];
  image?: SeoImage;
  images?: SeoImage[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  languages?: Record<string, string>;
  robots?: Metadata["robots"];
  /** Overrides for Open Graph specific fields (e.g. Rank Math Facebook tab). */
  openGraph?: {
    title?: string;
    description?: string;
    image?: SeoImage;
  };
  /** Overrides for Twitter card specific fields (e.g. Rank Math Twitter tab). */
  twitter?: {
    title?: string;
    description?: string;
    image?: string;
    card?: "summary" | "summary_large_image" | "app" | "player";
  };
};

const OPEN_GRAPH_LOCALE: Record<string, string> = {
  es: "es_CO",
  en: "en_US",
  fr: "fr_FR",
  it: "it_IT",
  pt: "pt_BR",
};

export function buildHomeLanguageAlternates(): Record<string, string> {
  return {
    es: buildAbsoluteUrl("/"),
    en: buildAbsoluteUrl("/en"),
    fr: buildAbsoluteUrl("/fr"),
    it: buildAbsoluteUrl("/it"),
    pt: buildAbsoluteUrl("/pt"),
    "x-default": buildAbsoluteUrl("/"),
  };
}

export function buildLocalizedLanguageAlternates(pathWithoutLocale: string): Record<string, string> {
  const cleanPath = pathWithoutLocale.startsWith("/") ? pathWithoutLocale : `/${pathWithoutLocale}`;
  return SEO_LOCALES.reduce<Record<string, string>>((acc, locale) => {
    acc[locale] = buildAbsoluteUrl(locale === "es" ? `/es${cleanPath}` : `/${locale}${cleanPath}`);
    return acc;
  }, { "x-default": buildAbsoluteUrl(`/es${cleanPath}`) });
}

export function buildSeoMetadata(input: SeoMetadataInput): Metadata {
  const description = input.description || SEO_DEFAULT_DESCRIPTION;
  const locale = input.locale || "es";
  const canonical = buildAbsoluteUrl(input.canonicalPath);
  const title = input.title;

  let ogImages: Array<{ url: string; width: number; height: number; alt: string }> = [];
  let twitterImageUrl = "";

  if (input.images && input.images.length > 0) {
    ogImages = input.images.map((img) => ({
      url: toAbsoluteUrl(img.url, SEO_DEFAULT_IMAGE.url),
      width: img.width || SEO_DEFAULT_IMAGE.width,
      height: img.height || SEO_DEFAULT_IMAGE.height,
      alt: img.alt || title,
    }));
    // For Twitter large card, look for a rectangular image or default to the last/first one
    const rectangularImg = input.images.find((img) => img.width && img.height && img.width > img.height) || input.images[0];
    twitterImageUrl = toAbsoluteUrl(rectangularImg.url, SEO_DEFAULT_IMAGE.url);
  } else {
    const image = input.image || SEO_DEFAULT_IMAGE;
    const imageUrl = toAbsoluteUrl(image.url, SEO_DEFAULT_IMAGE.url);
    ogImages = [
      {
        url: imageUrl,
        width: image.width || SEO_DEFAULT_IMAGE.width,
        height: image.height || SEO_DEFAULT_IMAGE.height,
        alt: image.alt || title,
      },
    ];
    twitterImageUrl = imageUrl;
  }

  return {
    title,
    description,
    keywords: input.keywords?.length ? input.keywords : SEO_DEFAULT_KEYWORDS,
    alternates: {
      canonical,
      languages: input.languages,
    },
    openGraph: {
      title: input.openGraph?.title || title,
      description: input.openGraph?.description || description,
      url: canonical,
      siteName: SEO_SITE_NAME,
      locale: OPEN_GRAPH_LOCALE[locale] || String(locale),
      type: input.type || "website",
      images: input.openGraph?.image?.url
        ? [
            {
              url: toAbsoluteUrl(input.openGraph.image.url, SEO_DEFAULT_IMAGE.url),
              width: input.openGraph.image.width || SEO_DEFAULT_IMAGE.width,
              height: input.openGraph.image.height || SEO_DEFAULT_IMAGE.height,
              alt: input.openGraph.image.alt || input.openGraph.title || title,
            },
          ]
        : ogImages,
      ...(input.type === "article"
        ? {
            publishedTime: input.publishedTime,
            modifiedTime: input.modifiedTime,
            authors: input.authors,
          }
        : {}),
    },
    twitter: {
      card: input.twitter?.card || "summary_large_image",
      title: input.twitter?.title || input.openGraph?.title || title,
      description: input.twitter?.description || input.openGraph?.description || description,
      images: [input.twitter?.image ? toAbsoluteUrl(input.twitter.image, SEO_DEFAULT_IMAGE.url) : twitterImageUrl],
    },
    robots: input.robots ?? {
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
}