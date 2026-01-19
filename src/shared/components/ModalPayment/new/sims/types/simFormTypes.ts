// src/shared/components/ModalPayment/new/sims/types/simFormTypes.ts

/**
 * Tipos de formulario para productos SIM
 * 
 * Encrypted (SIM Encriptada):
 * - encrypted_physical: SIM física encriptada
 * - encrypted_esim: eSIM encriptada (digital)
 * - encrypted_data: Recarga de datos
 * - encrypted_minutes: Recarga de minutos
 * - encrypted_esimData: eSIM con datos
 * - encrypted_generic: Fallback
 * 
 * TIM (SIM TIM):
 * - tim_physical: SIM TIM física
 * - tim_esim: eSIM TIM (digital)
 */
export type FormType =
  // Encrypted products
  | "encrypted_physical"
  | "encrypted_esim"
  | "encrypted_data"
  | "encrypted_minutes"
  | "encrypted_generic"
  | "encrypted_esimData"
  // TIM products
  | "tim_physical"
  | "tim_esim";

export type SimFormValues = {
  email: string;
  telegram: string;
  simNumber: string;
  simNumbers?: string[];
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
