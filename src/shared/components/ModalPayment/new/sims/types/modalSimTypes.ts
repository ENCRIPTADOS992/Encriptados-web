// src/shared/components/ModalPayment/new/sims/types/modalSimTypes.ts
"use client";

import type { Provider as PayProvider } from "@/services/checkout";
import type { FormType } from "./simFormTypes";
import type {
  TottoliCheckoutPayload,
  TottoliMethod,
} from "@/features/products/payments/tottoliCheckout";

export type Variant = {
  id: number;
  licensetime?: number | string;
  price: number;
  sku?: string;
  image?: string;
  name?: string;
  ussd?: string;
  gb?: string;
  cost?: number;
  days?: number;
  minutes?: number;
  minute_price?: number;
  currency?: string;
  label?: string;
  purchase_url?: string;
};

export type ConfigSim = {
  type: string;
  sku?: string;
  code?: string;
};

export type ModalProduct = {
  variants?: Variant[];
  images?: { src: string }[];
  price?: number | string;
  name?: string;
  licensetime?: number | string;
  config_sim?: ConfigSim[];
  provider?: string;
  brand?: string;
  shipping?: string;
  type_product?: string;
  category?: { id?: number | string; name?: string };
};

export type Shipping = {
  email: string;
  telegram?: string;
  fullName: string;
  address: string;
  country: string;
  postalCode: string;
  phone: string;
  method: "card" | "crypto";
  simNumber?: string;
  cardPostal?: string;
};

export type StripeConfirmFn = (
  clientSecret: string,
  billing?: { name?: string; email?: string; postal_code?: string }
) => Promise<any>;

export type SuccessPaymentData = {
  intent: {
    id: string;
    amount: number;
    currency: string;
    created?: number;
  };
  orderId?: number | null;
};

export type { PayProvider, FormType, TottoliCheckoutPayload, TottoliMethod };
