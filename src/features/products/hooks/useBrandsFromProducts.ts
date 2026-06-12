// src/features/products/hooks/useBrandsFromProducts.ts
// Genera opciones del dropdown "Proveedor" a partir de los nombres de producto
// (no del brand) para que productos con nombres similares como "Threema" y
// "Threema Work" aparezcan como opciones independientes.
import { useMemo } from "react";
import { Product } from "@/features/products/types/AllProductsResponse";

export const useBrandsFromProducts = (products: Product[] | undefined) => {
  return useMemo(() => {
    if (!products) return [{ label: "Todo", value: "all" }];

    // Usar nombre del producto en lugar de brand para generar opciones únicas
    const nameMap = new Map<string, string>();
    products.forEach((p) => {
      const name = p.name?.trim();
      if (name) {
        const key = name.toLowerCase();
        if (!nameMap.has(key)) {
          nameMap.set(key, name);
        }
      }
    });

    // Filtrar productos ocultos (Zion)
    const filteredNames = Array.from(nameMap.entries()).filter(([key]) => {
      const normalized = key.replace(/[^a-z0-9]/g, "");
      return !normalized.includes("zion") && !normalized.includes("zi0n");
    });

    // Orden fijo del selector
    const PROVIDER_ORDER = [
      "silent phone",
      "armadillo chat",
      "threema work",
      "threema",
      "nord vpn",
      "vaultchat",
      "salt",
      "vnclagoon",
    ];

    const sorted = filteredNames.sort(([keyA], [keyB]) => {
      const normalizedA = keyA.replace(/[^a-z0-9 ]/g, "").trim();
      const normalizedB = keyB.replace(/[^a-z0-9 ]/g, "").trim();
      const indexA = PROVIDER_ORDER.findIndex((p) => normalizedA.includes(p) || p.includes(normalizedA));
      const indexB = PROVIDER_ORDER.findIndex((p) => normalizedB.includes(p) || p.includes(normalizedB));
      // Productos no listados van al final, manteniendo su orden original
      const posA = indexA === -1 ? PROVIDER_ORDER.length : indexA;
      const posB = indexB === -1 ? PROVIDER_ORDER.length : indexB;
      return posA - posB;
    });

    return [
      { label: "Todo", value: "all" },
      ...sorted.map(([key, originalName]) => ({
        label: originalName,
        value: key,
      })),
    ];
  }, [products]);
};
