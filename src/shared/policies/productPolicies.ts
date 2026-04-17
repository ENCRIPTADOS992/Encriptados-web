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
    showShippingFields: false,
    allowTelegramId: false,
    allowQuantity: true,
    allowCoupon: true,
    paymentMethods: ["credit_card", "crypto"],
  },
  ROUTERS: {
    requireEmail: true,
    requireTerms: true,
    showShippingFields: true,
    allowTelegramId: false,
    allowQuantity: true,
    allowCoupon: true,
    paymentMethods: ["credit_card", "crypto"],
  },
  APLICACIONES: {
    requireEmail: true,
    requireTerms: true,
    showShippingFields: false,
    allowTelegramId: false,
    allowQuantity: true,
    allowCoupon: true,
    paymentMethods: ["credit_card", "crypto"],
  },
  SOFTWARE: {
    requireEmail: true,
    requireTerms: true,
    showShippingFields: false,
    allowTelegramId: false,
    allowQuantity: true,
    allowCoupon: true,
    paymentMethods: ["credit_card", "crypto"],
  },
  DESCONOCIDO: {
    requireEmail: true,
    requireTerms: true,
    showShippingFields: false,
    allowTelegramId: false,
    allowQuantity: true,
    allowCoupon: true,
    paymentMethods: ["credit_card", "crypto"],
  },
};
