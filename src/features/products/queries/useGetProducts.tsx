import { useQuery } from "@tanstack/react-query";
import { fetchProductsByCategory } from "@/services/wordpress";

export const useGetProducts = (categoryId: number) => {
  console.log("[useGetProducts] Hook llamado con categoryId:", categoryId);

  const query = useQuery({
    queryKey: ["products", categoryId],
    queryFn: async () => {
      console.log("[useGetProducts] Ejecutando queryFn para categoría:", categoryId);
      const data = await fetchProductsByCategory(categoryId);
      console.log("[useGetProducts] Resultado de fetchProductsByCategory:", data);
      return data;
    },
    enabled: !!categoryId,
  });

  console.log("[useGetProducts] Estado de query:", {
    isFetching: query.isFetching,
    isLoading: query.isLoading,
    isSuccess: query.isSuccess,
    isError: query.isError,
    data: query.data,
  });

  return query;
};
