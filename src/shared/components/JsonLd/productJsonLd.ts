import { SEO_SITE_NAME } from "@/shared/seo/constants";
import { buildAbsoluteUrl, toAbsoluteUrl } from "@/shared/seo/url";

type ProductJsonLdInput = {
  name: string;
  description?: string;
  canonicalPath: string;
  image?: string;
  price?: string | number;
  currency?: string;
};

export function buildProductJsonLd(input: ProductJsonLdInput) {
  const product: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description || input.name,
    image: [toAbsoluteUrl(input.image, "/images/our-products/two-cellphones.png")],
    url: buildAbsoluteUrl(input.canonicalPath),
    brand: {
      "@type": "Brand",
      name: SEO_SITE_NAME,
    },
  };

  if (input.price && Number(input.price) > 0) {
    product.offers = {
      "@type": "Offer",
      price: String(input.price),
      priceCurrency: input.currency || "USD",
      availability: "https://schema.org/InStock",
      url: buildAbsoluteUrl(input.canonicalPath),
      seller: {
        "@type": "Organization",
        name: SEO_SITE_NAME,
      },
    };
  }

  return product;
}