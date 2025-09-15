// src/shared/policies/productPolicies.ts
import type { CategoryKind } from "@/shared/utils/getProductCategoryKind";

type FieldPolicy = {
  requireEmail: boolean;
  requireTerms: boolean;
  showShippingFields: boolean;   // address, city, country, postal, phone
  allowTelegramId: boolean;
  allowQuantity: boolean;
  allowCoupon: boolean;
  paymentMethods: Array<"credit_card" | "crypto">;
  // extras por si quieres copy/UX:
  titleOverride?: string;
};

export const ProductPolicies: Record<CategoryKind, FieldPolicy> = {
  SIM: {
    requireEmail: true,
    requireTerms: true,
    showShippingFields: false,    // eSIM no; si deseas distinguir física vs eSIM añade otra señal
    allowTelegramId: true,
    allowQuantity: true,
    allowCoupon: true,
    paymentMethods: ["credit_card", "crypto"],
  },
  ROUTERS: {
    requireEmail: true,
    requireTerms: true,
    showShippingFields: true,     // routers normalmente requieren envío
    allowTelegramId: true,
    allowQuantity: true,
    allowCoupon: true,
    paymentMethods: ["credit_card", "crypto"],
  },
  APLICACIONES: {
    requireEmail: true,
    requireTerms: true,
    showShippingFields: false,    // ⬅️ lo que querías ocultar
    allowTelegramId: true,
    allowQuantity: true,
    allowCoupon: true,
    paymentMethods: ["credit_card", "crypto"],
  },
  SOFTWARE: {
    requireEmail: true,
    requireTerms: true,
    showShippingFields: false,    // ⬅️ también oculto
    allowTelegramId: true,
    allowQuantity: true,
    allowCoupon: true,
    paymentMethods: ["credit_card", "crypto"],
  },
  DESCONOCIDO: {
    requireEmail: true,
    requireTerms: true,
    showShippingFields: false,
    allowTelegramId: true,
    allowQuantity: true,
    allowCoupon: true,
    paymentMethods: ["credit_card", "crypto"],
  },
};
