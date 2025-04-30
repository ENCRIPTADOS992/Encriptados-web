import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../services";

type ProductType = "app" | "sim" | "phone";

export const useGetProducts = (productType: ProductType) => {
  const query = useQuery({
    queryKey: ["products", productType], // Construye la queryKey dinámicamente
    queryFn: () => getAllProducts(productType), // Pasa el parámetro al servicio
  });

  return query;
};
