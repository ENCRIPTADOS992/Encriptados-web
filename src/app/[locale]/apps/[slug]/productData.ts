import { cache } from "react";
import { resolvePublicProduct } from "@/features/products/services";
import { getProductById } from "@/features/products/services";
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

    if (preferredProductId) {
      return getProductById(String(preferredProductId), locale || "es", { silent: true }).catch(() => null);
    }

    return resolvePublicProduct({
      preferredProductId: undefined,
      slugs: getProductLookupSlugs(slug, config),
      lang: locale || "es",
      categoryId: config?.categoryId ?? null,
    });
  }
);
