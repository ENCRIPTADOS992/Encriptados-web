// src/features/products/hooks/useBrandsFromProducts.ts
import { useMemo } from "react";
import { Product } from "@/features/products/types/AllProductsResponse";

export const useBrandsFromProducts = (products: Product[] | undefined) => {
  return useMemo(() => {

    console.log("[useBrandsFromProducts] products recibidos:", products);
    
    if (!products) return [];

    const uniqueBrands = Array.from(
      new Set(products.map((p) => p.brand?.trim()).filter(Boolean))
    );

    console.log("[useBrandsFromProducts] uniqueBrands:", uniqueBrands);

    return [
      { label: "TODO", value: "all" },
      ...uniqueBrands.map((brand) => ({
        label: brand,
        value: brand,
      })),
    ];
  }, [products]);
};
