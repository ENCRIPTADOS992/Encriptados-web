/**
 * Rank Math bridge for the Encriptados frontend.
 *
 * Isolated helper that receives the raw `rank_math` payload exposed by the
 * WordPress plugin (see `Encriptados-plugin/includes/class-encriptados-rank-math-rest.php`)
 * and normalizes it into a strongly-typed structure that layouts and
 * `generateMetadata` callers can consume.
 *
 * Intentionally does NOT propagate the `robots` array from WordPress. Indexation
 * on `encriptados.io` is decided by the Next.js SEO layer, never by the CMS —
 * this avoids the admin/staging `noindex,nofollow` value leaking to production.
 */

export type RankMathRawPayload = {
  title?: string;
  description?: string;
  canonical_url?: string;
  focus_keyword?: string;
  breadcrumb_title?: string;
  primary_category?: number;
  robots?: string[];
  facebook?: {
    title?: string;
    description?: string;
    image?: string;
    image_id?: number;
  };
  twitter?: {
    use_facebook?: boolean;
    card_type?: string;
    title?: string;
    description?: string;
    image?: string;
    image_id?: number;
  };
  schema?: {
    article?: Record<string, unknown> | null;
    faq?: Record<string, unknown> | null;
  };
  source?: string;
  source_host?: string;
};

export type RankMathSeo = {
  title: string;
  description: string;
  canonicalPath?: string;
  focusKeyword?: string;
  breadcrumbTitle?: string;
  openGraph: {
    title?: string;
    description?: string;
    image?: string;
  };
  twitter: {
    title?: string;
    description?: string;
    image?: string;
    card?: string;
  };
  schema: {
    article: Record<string, unknown> | null;
    faq: Record<string, unknown> | null;
  };
};

const CANONICAL_HOSTS = new Set(["encriptados.io", "www.encriptados.io"]);

function emptyString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function toCanonicalPath(url: string | undefined): string | undefined {
  const trimmed = emptyString(url);
  if (!trimmed) return undefined;
  try {
    const parsed = new URL(trimmed);
    if (!CANONICAL_HOSTS.has(parsed.hostname.toLowerCase())) return undefined;
    return parsed.pathname + parsed.search;
  } catch {
    return undefined;
  }
}

/**
 * Normalize a `rank_math` payload into typed frontend data.
 * Returns `null` when the payload is empty or missing the essentials
 * (both `title` and `description` empty).
 */
export function parseRankMathPayload(raw: RankMathRawPayload | null | undefined): RankMathSeo | null {
  if (!raw) return null;

  const title = emptyString(raw.title);
  const description = emptyString(raw.description);
  if (!title && !description) return null;

  const fb = raw.facebook ?? {};
  const tw = raw.twitter ?? {};
  const useFacebookForTwitter = tw.use_facebook !== false;

  return {
    title,
    description,
    canonicalPath: toCanonicalPath(raw.canonical_url),
    focusKeyword: emptyString(raw.focus_keyword) || undefined,
    breadcrumbTitle: emptyString(raw.breadcrumb_title) || undefined,
    openGraph: {
      title: emptyString(fb.title) || undefined,
      description: emptyString(fb.description) || undefined,
      image: emptyString(fb.image) || undefined,
    },
    twitter: {
      title: emptyString(tw.title) || (useFacebookForTwitter ? emptyString(fb.title) : "") || undefined,
      description:
        emptyString(tw.description) || (useFacebookForTwitter ? emptyString(fb.description) : "") || undefined,
      image: emptyString(tw.image) || (useFacebookForTwitter ? emptyString(fb.image) : "") || undefined,
      card: emptyString(tw.card_type) || undefined,
    },
    schema: {
      article: raw.schema?.article ?? null,
      faq: raw.schema?.faq ?? null,
    },
  };
}
