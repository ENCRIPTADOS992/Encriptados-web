import { PRODUCT_ROUTES } from "@/shared/constants/productRoutes";

export const getProductLink = (productName: string, categoryId: number): string | null => {
  const baseName = productName.split(" - ")[0].trim();

  const item = PRODUCT_ROUTES.find(route => 
    route.name === baseName && route.categoryId === categoryId
  );

  return item ? item.link : null;
};