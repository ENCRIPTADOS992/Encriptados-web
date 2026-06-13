// src/payments/stripeClient.ts
"use client";

import { loadStripe } from "@stripe/stripe-js";
import type {
  Stripe,
  StripeElements,
  StripeCardNumberElement,
  StripeCardExpiryElement,
  StripeCardCvcElement,
} from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null> | null = null;

const STRIPE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";

/** Log helper (no imprime la key completa) */
function maskKey(k: string) {
  if (!k) return k;
  return `${k.slice(0, 10)}…${k.slice(-6)}`;
}

/** Carga Stripe en el navegador */
export async function getStripe(): Promise<Stripe> {
  if (typeof window === "undefined") throw new Error("client only");
  if (!STRIPE_PUBLISHABLE_KEY)
    throw new Error("Falta NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY");
  // (opcional) valida formato
  if (!/^pk_(test|live)_[A-Za-z0-9_-]{10,}$/.test(STRIPE_PUBLISHABLE_KEY)) {
    throw new Error("STRIPE_PUBLISHABLE_KEY inválida.");
  }

  if (!stripePromise) stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  const stripe = await stripePromise;
  if (!stripe) throw new Error("No se pudo inicializar Stripe.");
  return stripe;
}

/** Crea un objeto Elements (no requiere clientSecret para split elements) */
export function createCardElements(stripe: Stripe): StripeElements {
  return stripe.elements({
    appearance: { theme: "stripe" },
  });
}

export type SplitCardElements = {
  number: StripeCardNumberElement;
  expiry: StripeCardExpiryElement;
  cvc: StripeCardCvcElement;
};

/**
 * Monta los 3 Elements separados dentro de tus propios contenedores.
 * Los selectores deben apuntar a nodos existentes (e.g. #card-number-el).
 */
export function mountSplitCardElements(
  elements: StripeElements,
  selectors: { number: string; expiry: string; cvc: string }
): SplitCardElements {
  const hostNumber = document.querySelector<HTMLElement>(selectors.number);
  const hostExpiry = document.querySelector<HTMLElement>(selectors.expiry);
  const hostCvc = document.querySelector<HTMLElement>(selectors.cvc);

  if (!hostNumber) throw new Error(`No existe ${selectors.number}`);
  if (!hostExpiry) throw new Error(`No existe ${selectors.expiry}`);
  if (!hostCvc) throw new Error(`No existe ${selectors.cvc}`);

  // Desmonta si ya existían
  try {
    elements.getElement("cardNumber")?.unmount();
    elements.getElement("cardExpiry")?.unmount();
    elements.getElement("cardCvc")?.unmount();
  } catch {}

  // Crea y monta
  const number = elements.create("cardNumber");
  const expiry = elements.create("cardExpiry");
  const cvc = elements.create("cardCvc");

  number.mount(hostNumber);
  expiry.mount(hostExpiry);
  cvc.mount(hostCvc);

  return { number, expiry, cvc };
}

/** Utilidad opcional para limpieza */
export function unmountSplitCardElements(elements: StripeElements): void {
  try {
    elements.getElement("cardNumber")?.unmount();
    elements.getElement("cardExpiry")?.unmount();
    elements.getElement("cardCvc")?.unmount();
  } catch {}
}

/**
 * Confirma el pago con un PaymentIntent (clientSecret) usando el CardNumberElement.
 * Pasa billing_details relevantes (name/email/postal_code).
 */
export async function confirmCardPayment(
  stripe: Stripe,
  clientSecret: string,
  cardNumberEl: StripeCardNumberElement,
  billing: { name?: string; email?: string; postal_code?: string }
): Promise<{
  status: "succeeded" | "processing" | "requires_action" | "canceled";
  error?: string;
}> {
  const { error, paymentIntent } = await stripe.confirmCardPayment(
    clientSecret,
    {
      payment_method: {
        card: cardNumberEl,
        billing_details: {
          name: billing.name,
          email: billing.email,
          address: billing.postal_code
            ? { postal_code: billing.postal_code }
            : undefined,
        },
      },
    }
  );

  if (error) return { status: "requires_action", error: error.message };
  if (!paymentIntent)
    return { status: "requires_action", error: "Sin PaymentIntent" };

  switch (paymentIntent.status) {
    case "succeeded":
      return { status: "succeeded" };
    case "processing":
      return { status: "processing" };
    case "requires_action":
      return { status: "requires_action" };
    case "canceled":
      return { status: "canceled" };
    default:
      return {
        status: "requires_action",
        error: `Estado inesperado: ${paymentIntent.status}`,
      };
  }
}
