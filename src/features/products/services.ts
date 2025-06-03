import axios from "axios";
import { Allproducts, Product, ProductById } from "./types/AllProductsResponse";

const WP_API_BASE = process.env.NEXT_PUBLIC_WP_API || "";

export const getAllProducts = async (
  categoryId: number
): Promise<Allproducts> => {
  try {
    const response = await axios.get<{
      message: string;
      products: Record<string, Product>;
    }>(`${WP_API_BASE}/encriptados/v1/products/by-category-language`, {
      params: {
        category_id: categoryId,
        lang: "es",
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
  productId: string
): Promise<ProductById> => {
  try {
    const response = await axios.get<ProductById>(
      `${WP_API_BASE}/encriptados/v1/products/by-id`,
      {
        params: {
          product_id: productId,
          lang: "en",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error en getProductById:", error);
    throw error;
  }
};