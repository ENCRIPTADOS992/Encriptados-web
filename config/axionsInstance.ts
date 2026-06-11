import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { WP_API_BASE } from "@/shared/constants/backend";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: WP_API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

const getToken = (): string | null => {
  return localStorage.getItem("token");
};

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getToken();
    if (token) {
      // Forzamos el tipo de headers para evitar el error
      (config.headers as Record<string, string>)[
        "Authorization"
      ] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
