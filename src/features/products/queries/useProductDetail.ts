import { useQuery } from "@tanstack/react-query";
import { getProductById, getProductBySlug } from "../services";
import { ProductById } from "../types/AllProductsResponse";

export const useProductDetail = (
    identifier: string,
    type: "id" | "slug",
    locale: string,
    options?: { enabled?: boolean; initialData?: ProductById | null }
) => {
    return useQuery<ProductById | null>({
        queryKey: ["product", type, identifier, locale],
        queryFn: async () => {
            if (type === "id") {
                return getProductById(identifier, locale);
            } else {
                return getProductBySlug(identifier, locale);
            }
        },
        enabled: options?.enabled ?? true,
        initialData: options?.initialData ?? undefined,
        staleTime: 5 * 60 * 1000, // 5 minutes cache
        refetchOnWindowFocus: false,
    });
};
