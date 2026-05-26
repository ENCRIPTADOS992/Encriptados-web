import { cache } from "react";
import { resolvePublicProduct } from "@/features/products/services";
import type { ProductById } from "@/features/products/types/AllProductsResponse";
import { getProductConfig, getProductLookupSlugs } from "./productConfig";

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

    return resolvePublicProduct({
      preferredProductId,
      slugs: getProductLookupSlugs(slug, config),
      lang: locale || "es",
      categoryId: config?.categoryId ?? null,
    });
  }
);
