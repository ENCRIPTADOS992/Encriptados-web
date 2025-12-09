// src/shared/components/ModalPayment/new/sims/types/simFormTypes.ts
export type FormType =
  | "encrypted_physical"
  | "encrypted_esim"
  | "encrypted_data"
  | "encrypted_minutes"
  | "encrypted_generic"
  | "encrypted_esimData";

export type SimFormValues = {
  email: string;
  telegram: string;
  simNumber: string;
  fullName: string;
  address: string;
  country: string;
  postalCode: string;
  phone: string;
  method: "card" | "crypto";
  cardName: string;
  cardNumber: string;
  exp: string;
  cvc: string;
  cardPostal: string;
};

export type StripeConfirmFn = (
  clientSecret: string,
  billing?: { name?: string; email?: string; postal_code?: string }
) => Promise<any>;
