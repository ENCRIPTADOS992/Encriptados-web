// Shared filter logic for identifying legacy blog pages among WordPress pages.
// This matches the heuristic used in the app-blog endpoint.

export const LEGACY_BLOG_EXCLUDED_SLUGS = new Set([
  "gracias",
  "pruebas",
  "router-camaleon",
  "securecrypt-red",
  "distribuidores-encriptados-formulario",
]);

export const LEGACY_BLOG_EXCLUDED_SLUG_PARTS = [
  "agradecimiento",
  "checkout",
  "contacto",
  "encuesta",
  "formulario",
  "gracias",
  "herramienta",
  "landing",
  "pages-",
  "quiz",
  "simulador",
  "test",
];

export const LEGACY_BLOG_MIN_CONTENT_LENGTH = 600;

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&hellip;/g, "...")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Determine whether a WordPress page slug looks like a legacy blog article.
 * When contentHtml is provided it also checks minimum content length.
 */
export function isLegacyBlogPage(slug: string, contentHtml?: string): boolean {
  const normalizedSlug = slug.toLowerCase();

  if (LEGACY_BLOG_EXCLUDED_SLUGS.has(normalizedSlug)) return false;
  if (LEGACY_BLOG_EXCLUDED_SLUG_PARTS.some((part) => normalizedSlug.includes(part))) return false;

  const hyphenCount = normalizedSlug.split("-").length - 1;
  if (hyphenCount < 3) return false;

  if (contentHtml) {
    const text = stripHtml(contentHtml);
    if (text.length < LEGACY_BLOG_MIN_CONTENT_LENGTH) return false;
  }

  return true;
}
