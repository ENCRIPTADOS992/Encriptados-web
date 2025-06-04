import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../services";
import { Allproducts } from "../types/AllProductsResponse";
import { useLocale } from "next-intl";

export const useGetProducts = (categoryId: number) => {
  const locale = useLocale();

  return useQuery<Allproducts>({
    queryKey: ["products", categoryId],
    queryFn: () => getAllProducts(categoryId, locale),
  });
};
