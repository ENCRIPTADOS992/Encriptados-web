import axiosInstance from "../../../config/axionsInstance";
import { Allproducts, Product } from "./types/AllProductsResponse";

export const getAllProducts = async (
  category: "app" | "sim" | "phone"
): Promise<Allproducts> => {
  try {
    const response = await axiosInstance.get(
      `/products/?lang=en&category=${category}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

type ResponseProduct = {
  data: Product;
};

export const getProductById = async (
  productId: string
): Promise<ResponseProduct> => {
  try {
    const response = await axiosInstance.get(`/products/${productId}?lang=en`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
