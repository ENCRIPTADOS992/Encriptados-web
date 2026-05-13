import { SEO_ORGANIZATION, SEO_SITE_NAME } from "@/shared/seo/constants";
import { buildAbsoluteUrl } from "@/shared/seo/url";

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SEO_ORGANIZATION.name,
    legalName: SEO_ORGANIZATION.legalName,
    url: buildAbsoluteUrl("/"),
    email: SEO_ORGANIZATION.email,
    logo: buildAbsoluteUrl("/images/footer/encriptados-logo-201.png"),
    sameAs: SEO_ORGANIZATION.sameAs,
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SEO_SITE_NAME,
    url: buildAbsoluteUrl("/"),
    inLanguage: ["es", "en", "fr", "it", "pt"],
  };
}