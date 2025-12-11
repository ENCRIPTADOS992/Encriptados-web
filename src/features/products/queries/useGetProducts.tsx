import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../services";
import { Allproducts } from "../types/AllProductsResponse";
import { useLocale } from "next-intl";

export const useGetProducts = (
  categoryId: number,
  provider: string,
  country?: string,
  options?: { enabled?: boolean }
) => {
  const locale = useLocale();
  const enabled = options?.enabled ?? true;

  return useQuery<Allproducts>({
    queryKey: ["products", categoryId, provider, country, locale],
    queryFn: async () => {
      const res = await getAllProducts(categoryId, locale, {
        simCountry: country ?? null,
      });
      console.log("✅ [useGetProducts] productos recibidos:", res);
      return res;
    },
    enabled,
  });
};
