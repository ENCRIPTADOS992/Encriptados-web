import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../services";
import { Allproducts } from "../types/AllProductsResponse";

export const useGetProducts = (categoryId: number) => {
  return useQuery<Allproducts>({
    queryKey: ["products", categoryId],
    queryFn: () => getAllProducts(categoryId),
  });
};
