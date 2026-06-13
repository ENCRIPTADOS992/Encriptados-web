import { getToken } from "@/features/products/authService";

export const initAuth = async () => {
  const existingToken = localStorage.getItem("token");
  if (!existingToken) {
    try {
      const token = await getToken();
      localStorage.setItem("token", token);
    } catch {
      // Token retrieval failed — user will be unauthenticated
    }
  }
};
