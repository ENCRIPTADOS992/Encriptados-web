// src/features/products/hooks/useBrandsFromProducts.ts
import { useMemo } from "react";
import { Product } from "@/features/products/types/AllProductsResponse";

export const useBrandsFromProducts = (products: Product[] | undefined) => {
  return useMemo(() => {

    console.log("[useBrandsFromProducts] products recibidos:", products);

    if (!products) return [{ label: "Todo", value: "all" }];

    const uniqueBrands = Array.from(
      new Set(products.map((p) => p.brand?.trim()).filter(Boolean))
    );

    console.log("[useBrandsFromProducts] uniqueBrands:", uniqueBrands);

    // Helper para convertir a Title Case
    const toTitleCase = (str: string | undefined): string => {
      if (!str) return "";
      return str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
    };

    return [
      { label: "Todo", value: "all" },
      ...uniqueBrands.map((brand) => ({
        label: toTitleCase(brand),
        value: brand,
      })),
    ];
  }, [products]);
};
