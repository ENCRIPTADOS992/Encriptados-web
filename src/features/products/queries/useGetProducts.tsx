import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../services";
import { Allproducts, Product } from "../types/AllProductsResponse";
import { useLocale } from "next-intl";

const dedupeProductsById = (products: Allproducts): Allproducts => {
  const uniqueProducts = new Map<number, Product>();

  for (const product of products) {
    if (!uniqueProducts.has(product.id)) {
      uniqueProducts.set(product.id, product);
    }
  }

  return Array.from(uniqueProducts.values());
};

export const useGetProducts = (
  categoryId: number,
  provider: string,
  country?: string,
  region?: string,
  options?: { enabled?: boolean }
) => {
  const locale = useLocale();
  const enabled = options?.enabled ?? true;

  return useQuery<Allproducts>({
    queryKey: ["products", categoryId, provider, country, region, locale],
    queryFn: async () =>
      getAllProducts(categoryId, locale, {
        simCountry: country ?? null,
        simRegion: region ?? null,
        provider: provider ?? null,
      }),
    enabled,
    select: dedupeProductsById,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
  });
};
