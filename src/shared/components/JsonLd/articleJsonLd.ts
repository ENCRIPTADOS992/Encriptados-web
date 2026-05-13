import { SEO_ORGANIZATION, SEO_SITE_NAME } from "@/shared/seo/constants";
import { buildAbsoluteUrl, toAbsoluteUrl } from "@/shared/seo/url";

type ArticleJsonLdInput = {
  title: string;
  description: string;
  canonicalPath: string;
  image?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
};

export function buildArticleJsonLd(input: ArticleJsonLdInput) {
  const canonical = buildAbsoluteUrl(input.canonicalPath);
  const image = toAbsoluteUrl(input.image, "/images/our-products/two-cellphones.png");

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: canonical,
    mainEntityOfPage: canonical,
    image: [image],
    datePublished: input.datePublished,
    dateModified: input.dateModified || input.datePublished,
    author: {
      "@type": "Person",
      name: input.author || "Equipo Encriptados",
    },
    publisher: {
      "@type": "Organization",
      name: SEO_SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: buildAbsoluteUrl("/images/footer/encriptados-logo-201.png"),
      },
      legalName: SEO_ORGANIZATION.legalName,
    },
  };
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildAbsoluteUrl(item.path),
    })),
  };
}