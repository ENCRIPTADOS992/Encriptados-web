import axios from "axios";
import { Allproducts, Product, ProductById } from "./types/AllProductsResponse";

const WP_API_BASE = process.env.NEXT_PUBLIC_WP_API || "";

export const getAllProducts = async (
  categoryId: number,
  lang: string
): Promise<Allproducts> => {
  try {
    const response = await axios.get<{
      message: string;
      products: Record<string, Product>;
    }>(`${WP_API_BASE}/encriptados/v1/products/by-category-language`, {
      params: {
        category_id: categoryId,
        lang: lang,
      },
    });
    const rawProducts = response.data.products;
    return Object.values(rawProducts);
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
    const url = `${WP_API_BASE}/encriptados/v1/products/${encodeURIComponent(productId)}`;
    const response = await axios.get<ProductById>(url, {
      params: { lang },
    });
    return response.data;
  } catch (error) {
    console.error("Error en getProductById:", error);
    throw error;
  }
};