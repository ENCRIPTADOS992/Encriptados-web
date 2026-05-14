import type { SeoLocale } from "./constants";

const WP_BASE = process.env.NEXT_PUBLIC_WP_BLOG_API ?? "https://encriptados.io/wp-json";

const ALLOWED_TAGS = new Set([
  "b",
  "blockquote",
  "br",
  "code",
  "del",
  "div",
  "em",
  "figcaption",
  "figure",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "i",
  "iframe",
  "img",
  "li",
  "ol",
  "p",
  "pre",
  "span",
  "strong",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "tr",
  "u",
  "ul",
]);

const GLOBAL_ALLOWED_ATTRS = new Set([
  "alt",
  "aria-label",
  "class",
  "height",
  "href",
  "id",
  "loading",
  "rel",
  "src",
  "style",
  "target",
  "title",
  "width",
]);

const IFRAME_ALLOWED_ATTRS = new Set([
  "allow",
  "allowfullscreen",
  "frameborder",
  "referrerpolicy",
  "scrolling",
]);

type WordPressRendered = {
  rendered: string;
};

type WordPressPageItem = {
  id: number;
  date?: string;
  modified?: string;
  slug: string;
  link?: string;
  title: WordPressRendered;
  content: WordPressRendered;
  excerpt?: WordPressRendered;
  _embedded?: {
    author?: Array<{ name: string }>;
    "wp:featuredmedia"?: Array<{
      source_url: string;
      media_details?: {
        sizes?: {
          medium?: { source_url: string };
          large?: { source_url: string };
          full?: { source_url: string };
        };
      };
    }>;
  };
};

export type LegacySeoPageContent = {
  id: number;
  slug: string;
  locale: SeoLocale;
  title: string;
  description: string;
  content: string;
  author: string;
  date?: string;
  modified?: string;
  image?: string;
};

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&hellip;/g, "...")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"');
}

function stripHtml(html: string): string {
  return decodeHtmlEntities(html)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isSafeUrl(value: string): boolean {
  const trimmed = value.trim().toLowerCase();
  return !trimmed || trimmed.startsWith("/") || trimmed.startsWith("#") || /^(https?:|mailto:|tel:)/.test(trimmed);
}

function getAttrValue(attrs: string, name: string): string | null {
  const match = attrs.match(new RegExp(`${name}\\s*=\\s*("[^"]*"|'[^']*'|[^\\s"'>]+)`, "i"));
  return match ? match[1].replace(/^["']|["']$/g, "") : null;
}

function getContentPreviewImage(html: string): string | undefined {
  const candidates = Array.from(html.matchAll(/<img\b([^>]*)>/gi))
    .map((match) => {
      const attrs = match[1];
      const width = Number(getAttrValue(attrs, "width"));
      const height = Number(getAttrValue(attrs, "height"));
      return {
        src: getAttrValue(attrs, "src"),
        ratio: width > 0 && height > 0 ? width / height : 0,
      };
    })
    .filter((image): image is { src: string; ratio: number } => Boolean(image.src));

  const isShareRatio = (ratio: number) => ratio >= 1.7 && ratio <= 2.1;

  return (
    candidates.find((image) => /hacking[_-]etico/i.test(image.src) && isShareRatio(image.ratio))?.src ??
    candidates.find((image) => /hacking[_-]etico/i.test(image.src))?.src ??
    candidates.find((image) => !/telegram|productos[_-]relacionados/i.test(image.src))?.src
  );
}

function sanitizeHtml(html: string, previewImage?: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|object|embed|form|input|button|textarea|select|option|link|meta)[\s\S]*?<\/\1>/gi, "")
    .replace(/<\/?([a-z][a-z0-9-]*)(\s[^>]*)?>/gi, (match, rawTag: string, rawAttrs = "") => {
      const tag = rawTag.toLowerCase();

      if (!ALLOWED_TAGS.has(tag)) return "";
      if (match.startsWith("</")) return `</${tag}>`;

      if (tag === "img" && getAttrValue(rawAttrs, "src") !== previewImage) return "";

      const attrs: string[] = [];
      rawAttrs.replace(/([:\w-]+)(?:\s*=\s*("[^"]*"|'[^']*'|[^\s"'>]+))?/g, (_attrMatch: string, rawName: string, rawValue = "") => {
        const name = rawName.toLowerCase();
        if (name.startsWith("on")) return "";
        if (tag === "img" && (name === "class" || name === "loading" || name === "srcset" || name === "sizes" || name === "style")) return "";
        if (!GLOBAL_ALLOWED_ATTRS.has(name) && !(tag === "iframe" && IFRAME_ALLOWED_ATTRS.has(name))) return "";

        const unquotedValue = String(rawValue).replace(/^["']|["']$/g, "");
        if ((name === "href" || name === "src") && !isSafeUrl(unquotedValue)) return "";

        const escapedValue = unquotedValue.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
        attrs.push(`${name}="${escapedValue}"`);
        return "";
      });

      if (tag === "img") {
        attrs.push('class="legacy-preview-image"');
        attrs.push('loading="lazy"');
      }

      return `<${tag}${attrs.length ? ` ${attrs.join(" ")}` : ""}>`;
    });
}

function getImageFromEmbed(item: WordPressPageItem): string | undefined {
  const media = item._embedded?.["wp:featuredmedia"]?.[0];
  return media?.media_details?.sizes?.full?.source_url ?? media?.media_details?.sizes?.large?.source_url ?? media?.source_url;
}

function getAuthorFromEmbed(item: WordPressPageItem): string {
  return item._embedded?.author?.[0]?.name ?? "Equipo Encriptados";
}

function mapWpPage(item: WordPressPageItem, locale: SeoLocale): LegacySeoPageContent {
  const description = stripHtml(item.excerpt?.rendered ?? item.content.rendered).slice(0, 180);
  const previewImage = getContentPreviewImage(item.content.rendered) ?? getImageFromEmbed(item);

  return {
    id: item.id,
    slug: item.slug,
    locale,
    title: stripHtml(item.title.rendered),
    description,
    content: sanitizeHtml(item.content.rendered, previewImage),
    author: getAuthorFromEmbed(item),
    date: item.date,
    modified: item.modified,
    image: previewImage,
  };
}

async function fetchWordPressPage(slug: string, locale: SeoLocale | null): Promise<WordPressPageItem | null> {
  const params = new URLSearchParams({
    slug,
    per_page: "1",
    _embed: "1",
  });

  if (locale) params.set("lang", locale);

  const url = `${WP_BASE}/wp/v2/pages?${params.toString()}`;
  const response = await fetch(url, {
    next: { revalidate: 300 },
  });

  if (!response.ok) return null;

  const data = (await response.json()) as WordPressPageItem[];
  return data[0] ?? null;
}

export async function fetchLegacySeoPage(slug: string, locale: SeoLocale): Promise<LegacySeoPageContent | null> {
  const fallbackLocales = locale === "es" ? [locale, null] : [locale, "es" as const, null];

  for (const fallbackLocale of fallbackLocales) {
    const item = await fetchWordPressPage(slug, fallbackLocale);
    if (item) return mapWpPage(item, fallbackLocale ?? locale);
  }

  return null;
}