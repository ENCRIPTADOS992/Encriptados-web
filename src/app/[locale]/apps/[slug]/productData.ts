import { cache } from "react";
import { unstable_cache } from "next/cache";
import { resolvePublicProduct } from "@/features/products/services";
import { getProductById } from "@/features/products/services";
import type { ProductById } from "@/features/products/types/AllProductsResponse";
import { getProductConfig, getProductLookupSlugs } from "./productConfig";

const getCachedProductById = unstable_cache(
  async (productId: string, locale: string): Promise<ProductById> =>
    getProductById(productId, locale, { silent: true }),
  ["public-app-product-by-id"],
  { revalidate: 300 }
);

export const getResolvedAppProduct = cache(
  async (
    slug: string,
    locale: string,
    explicitProductId?: string
  ): Promise<ProductById | null> => {
    const config = getProductConfig(slug);
    const preferredProductId = config?.productId
      ? String(config.productId)
      : explicitProductId;

    if (preferredProductId) {
      return getCachedProductById(String(preferredProductId), locale || "es").catch(() => null);
    }

    return resolvePublicProduct({
      preferredProductId: undefined,
      slugs: getProductLookupSlugs(slug, config),
      lang: locale || "es",
      categoryId: config?.categoryId ?? null,
    });
  }
);
