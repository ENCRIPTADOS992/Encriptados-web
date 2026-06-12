import type { BlogPost, WordPressBlogItem } from "./types";
import { parseSpintax } from "./blogService";
import fs from "fs";
import path from "path";
import { WP_BLOG_API_BASE, WP_BLOG_CATEGORY_IDS } from "@/shared/constants/backend";

const WP_BASE = WP_BLOG_API_BASE;
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

type MarkdownSeoMeta = {
  slug: string;
  author: string;
  date: string;
  image: string;
  imageFull?: string;
  tags?: string[];
  title: Record<string, string>;
  description: Record<string, string>;
  seo?: Record<string, { title?: string; keywords?: string[] }>;
};

function stripHtml(html: string | undefined): string {
  return (html || "")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "-")
    .replace(/&hellip;/g, "...")
    .replace(/\s+/g, " ")
    .trim();
}

function getImageFullFromEmbed(item: WordPressBlogItem): string {
  const media = item._embedded?.["wp:featuredmedia"]?.[0];
  return media?.media_details?.sizes?.full?.source_url ?? media?.source_url ?? "";
}

function getAuthorFromEmbed(item: WordPressBlogItem): string {
  return item._embedded?.author?.[0]?.name ?? "Equipo Encriptados";
}

function getPathFromUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    return new URL(value).pathname;
  } catch {
    return value.startsWith("/") ? value : undefined;
  }
}

async function fetchWordPressPostById(id: string): Promise<WordPressBlogItem | null> {
  const res = await fetch(`${WP_BASE}/wp/v2/posts/${encodeURIComponent(id)}?_embed`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return null;
  return (await res.json()) as WordPressBlogItem;
}

async function fetchWordPressPostBySlug(slug: string, locale: string): Promise<WordPressBlogItem | null> {
  const catId = WP_BLOG_CATEGORY_IDS[locale] || WP_BLOG_CATEGORY_IDS.es;
  const res = await fetch(
    `${WP_BASE}/wp/v2/posts?categories=${catId}&slug=${encodeURIComponent(slug)}&per_page=1&_embed`,
    { next: { revalidate: 300 } },
  );
  if (!res.ok) return null;
  const data = (await res.json()) as WordPressBlogItem[];
  return data[0] ?? null;
}

export async function fetchBlogPostSeo(slug: string, locale: string): Promise<BlogPost | null> {
  try {
    const item =
      (await fetchWordPressPostBySlug(slug, locale)) ??
      (/^\d+$/.test(slug) ? await fetchWordPressPostById(slug) : null);

    if (!item) return null;

    const image = getImageFullFromEmbed(item);
    return {
      id: `wp-${item.id}`,
      slug: item.slug || String(item.id),
      wpId: item.id,
      legacyPath: getPathFromUrl(item.link),
      source: "wordpress",
      title: parseSpintax(stripHtml(item.title.rendered)),
      description: parseSpintax(stripHtml(item.excerpt.rendered)),
      image,
      imageFull: image,
      author: getAuthorFromEmbed(item),
      date: item.date,
      content: parseSpintax(item.content.rendered),
      translations: item.translations,
    };
  } catch {
    return null;
  }
}

export function fetchMarkdownBlogPostSeo(slug: string, locale: string): (BlogPost & { keywords?: string[] }) | null {
  try {
    const metaPath = path.join(BLOG_DIR, slug, "meta.json");
    if (!fs.existsSync(metaPath)) return null;

    const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8")) as MarkdownSeoMeta;
    const seo = meta.seo?.[locale] ?? meta.seo?.es;
    const title = seo?.title ?? meta.title[locale] ?? meta.title.es ?? meta.slug;
    const description = meta.description[locale] ?? meta.description.es ?? "";

    return {
      id: `md-${meta.slug}`,
      slug: meta.slug,
      source: "markdown",
      title,
      description,
      image: meta.image,
      imageFull: meta.imageFull ?? meta.image,
      author: meta.author,
      date: meta.date,
      content: "",
      keywords: seo?.keywords ?? meta.tags,
    };
  } catch {
    return null;
  }
}
