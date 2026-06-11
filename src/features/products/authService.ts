import axios from "axios";
import { WP_API_BASE } from "@/shared/constants/backend";

const API_URL = WP_API_BASE;

export const getToken = async () => {
  try {
    console.log("Enviando credentials:", {
      username: process.env.NEXT_PUBLIC_WP_USERNAME,
      password: process.env.NEXT_PUBLIC_WP_PASSWORD,
    });

    const response = await axios.post(`${API_URL}/jwt-auth/v1/token`, {
      username: process.env.NEXT_PUBLIC_WP_USERNAME,
      password: process.env.NEXT_PUBLIC_WP_PASSWORD,
    });

    const { token } = response.data;
    return token;
  } catch (error) {
    console.error("Error al obtener el token JWT", error);
    throw error;
  }
};
