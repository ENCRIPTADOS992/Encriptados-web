import { useQuery } from "@tanstack/react-query";
import { fetchProductsByCategory } from "@/services/wordpress"; 

export const useGetProducts = (categoryId: number) => {
  return useQuery({
    queryKey: ["products", categoryId],
    queryFn: () => fetchProductsByCategory(categoryId),
    enabled: !!categoryId,
  });
};
