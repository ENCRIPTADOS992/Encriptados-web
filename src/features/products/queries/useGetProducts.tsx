import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../services";
import { Allproducts } from "../types/AllProductsResponse";
import { useLocale } from "next-intl";

export const useGetProducts = (categoryId: number, provider: string) => {
  const locale = useLocale();
  return useQuery<Allproducts>({
    queryKey: ["products", categoryId, provider],
    queryFn: () => getAllProducts(categoryId, locale),
  });
};
