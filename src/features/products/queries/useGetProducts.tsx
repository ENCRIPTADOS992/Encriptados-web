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
      console.log("🔍 [useGetProducts] LOCALE DETECTADO:", locale);
      console.log("🔍 [useGetProducts] PARAMS:", { categoryId, provider, country });
      const res = await getAllProducts(categoryId, locale, {
        simCountry: country ?? null,
      });
      console.log("✅ [useGetProducts] productos recibidos:", res);
      console.log("✅ [useGetProducts] cantidad de productos:", res?.length);
      if (res && res.length > 0) {
        console.log("✅ [useGetProducts] primer producto:", res[0]);
      } else {
        console.warn("⚠️ [useGetProducts] NO SE RECIBIERON PRODUCTOS");
      }
      return res;
    },
    enabled,
  });
};
