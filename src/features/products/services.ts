import axios from "axios";
import { Allproducts, Product, ProductById } from "./types/AllProductsResponse";

const WP_API_BASE = process.env.NEXT_PUBLIC_WP_API || "";

type GetAllProductsOptions = {
  simCountry?: string | null;
};

export const getAllProducts = async (
  categoryId: number,
  lang: string,
  options?: GetAllProductsOptions
): Promise<Allproducts> => {
  try {
    const params: Record<string, string | number> = {
      category_id: categoryId,
      lang,
    };
    if (options?.simCountry && categoryId === 40) {
      params.sim_country = options.simCountry;
    }

    const response = await axios.get<{
      message: string;
      products: Record<string, Product>;
    }>(`${WP_API_BASE}/encriptados/v1/products/by-category-language`, {
      params,
    });
    const rawProducts = response.data.products;
    const products: Allproducts = Object.values(rawProducts).map((p: any) => {
      const licenseVariants =
        p.variants?.map((v: any) => ({
          id: v.id,
          licensetime: String(v.licensetime),
          price: Number(v.price),
          sku: v.sku,
          image: v.image,
        })) ?? [];

      return {
        ...p,
        licenseVariants,
      } as Product;
    });

    return products;
  } catch (error) {
    console.error("Error en getAllProducts:", error);
    throw error;
  }
};

type ResponseProduct = {
  data: Product;
};

export const getProductById = async (
  productId: string,
  lang: string = "es"
): Promise<ProductById> => {
  try {
    const url = `${WP_API_BASE}/encriptados/v1/products/${encodeURIComponent(
      productId
    )}`;
    const response = await axios.get<ProductById>(url, {
      params: { lang },
    });
    return response.data;
  } catch (error) {
    console.error("Error en getProductById:", error);
    throw error;
  }
};
