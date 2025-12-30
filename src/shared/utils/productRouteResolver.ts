import { PRODUCT_ROUTES, SIM_PRODUCT_ROUTES } from "@/shared/constants/productRoutes";

export const getProductLink = (
  productName: string,
  categoryId: number,
  productId?: number
): string | null => {
  const baseName = productName.split(" - ")[0].trim();

  if (baseName.toLowerCase().includes("silent phone")) {
    return "/apps/silent-circle";
  }

  // SIM products (categoryId 40) - Nueva ruta /sim/[slug]
  if (categoryId === 40 && productId) {
    // Buscar en las rutas de SIM por productId
    const simRoute = SIM_PRODUCT_ROUTES.find(
      (route) => route.productId === productId
    );
    if (simRoute) {
      return simRoute.link;
    }
    // Fallback: redirigir a SIM encriptada por defecto
    return `/sim/sim-encriptada`;
  }

  const item = PRODUCT_ROUTES.find(
    (route) => route.name === baseName && route.categoryId === categoryId
  );

  return item ? item.link : null;
};
