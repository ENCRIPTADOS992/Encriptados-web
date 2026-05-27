import { cache } from "react";
import { getProductById } from "@/features/products/services";
import type { ProductById } from "@/features/products/types/AllProductsResponse";

export const getCachedSimProduct = cache(
  async (
    productId: string | null | undefined,
    locale: string,
    simRegion?: string | null
  ): Promise<ProductById | null> => {
    if (!productId) return null;

    return getProductById(productId, locale, simRegion ? { simRegion } : undefined).catch(
      () => null
    );
  }
);
