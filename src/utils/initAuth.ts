import { getToken } from "@/features/products/authService";

export const initAuth = async () => {
  const existingToken = localStorage.getItem("token");
  if (!existingToken) {
    try {
      const token = await getToken();
      console.log("Token obtenido desde API:", token); 
      localStorage.setItem("token", token);
      console.log("Token guardado correctamente");
    } catch (error) {
      console.error("Error al obtener el token", error);
    }
  } else {
    console.log("Token ya existente en localStorage");
  }
};
