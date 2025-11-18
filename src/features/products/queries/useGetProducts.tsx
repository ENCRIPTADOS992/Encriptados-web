import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../services";
import { Allproducts } from "../types/AllProductsResponse";
import { useLocale } from "next-intl";

export const useGetProducts = (
  categoryId: number,
  provider: string,
  options?: { enabled?: boolean }
) => {
  const locale = useLocale();
  const enabled = options?.enabled ?? true;

  return useQuery<Allproducts>({
    queryKey: ["products", categoryId, provider, locale],
    queryFn: () => getAllProducts(categoryId, locale),
    enabled,
  });
};
