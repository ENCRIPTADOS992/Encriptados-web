import { cache } from "react";
import { getProductById, resolvePublicProduct } from "@/features/products/services";
import type { ProductById } from "@/features/products/types/AllProductsResponse";
import { getSimProductConfig } from "./simProductConfig";

export const getCachedSimProduct = cache(
  async (
    productId: string | null | undefined,
    locale: string,
    simRegion?: string | null,
    slug?: string
  ): Promise<ProductById | null> => {
    if (productId) {
      const product = await getProductById(productId, locale, simRegion ? { simRegion, silent: true } : { silent: true }).catch(
        () => null
      );
      if (product) return product;
    }

    if (slug) {
      const config = getSimProductConfig(slug);
      return resolvePublicProduct({
        preferredProductId: undefined,
        slugs: [slug, config?.slug],
        lang: locale,
        categoryId: config?.categoryId ?? null,
      });
    }

    return null;
  }
);
