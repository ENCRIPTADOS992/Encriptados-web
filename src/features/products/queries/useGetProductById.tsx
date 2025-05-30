import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../services";
import { PRODUCT_BY_ID_QUERY_KEY } from "../constants/queryProductsKeys";

export const useGetProductById = (id: string) => {
  const query = useQuery({
    queryKey: PRODUCT_BY_ID_QUERY_KEY,
    queryFn: () => getProductById(id),
  });

  return query;
};
