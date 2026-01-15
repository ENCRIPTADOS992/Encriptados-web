import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../services";
import { Allproducts } from "../types/AllProductsResponse";
import { useLocale } from "next-intl";

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
    queryFn: async () => {
      console.log("🔍 [useGetProducts] LOCALE DETECTADO:", locale);
      console.log("🔍 [useGetProducts] PARAMS:", { categoryId, provider, country, region });
      const res = await getAllProducts(categoryId, locale, {
        simCountry: country ?? null,
        simRegion: region ?? null,
        provider: provider ?? null,
      });
      console.log("✅ [useGetProducts] productos recibidos:", res);
      console.log("✅ [useGetProducts] cantidad de productos:", res?.length);
      if (res && res.length > 0) {
        console.log("✅ [useGetProducts] primer producto:", res[0]);
        // Log de productos TIM para debug
        const timProducts = res.filter(p => p.provider?.toLowerCase() === "tim");
        console.log("✅ [useGetProducts] productos TIM encontrados:", timProducts.length);
        if (timProducts.length > 0) {
          console.log("✅ [useGetProducts] productos TIM:", timProducts.map(p => ({ id: p.id, name: p.name, provider: p.provider })));
        }
      } else {
        console.warn("⚠️ [useGetProducts] NO SE RECIBIERON PRODUCTOS");
      }
      return res;
    },
    enabled,
    staleTime: 0, // Siempre refetch cuando cambian los filtros
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};
