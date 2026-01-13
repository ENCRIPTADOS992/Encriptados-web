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

const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";

function maskKey(k: string) {
  if (!k) return k;
  return `${k.slice(0, 10)}…${k.slice(-6)}`;
}

export async function getStripe(): Promise<Stripe> {
  if (typeof window === "undefined") throw new Error("client only");
  if (!STRIPE_PUBLISHABLE_KEY) throw new Error("Falta NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY");
  // eslint-disable-next-line no-console
  console.log("[stripe] pk:", maskKey(STRIPE_PUBLISHABLE_KEY));
  if (!stripePromise) stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  const stripe = await stripePromise;
  if (!stripe) throw new Error("No se pudo inicializar Stripe.");
  return stripe;
}

export function createCardElements(stripe: Stripe): StripeElements {
  // Para elementos individuales (cardNumber, cardExpiry, cardCvc)
  return stripe.elements({ locale: 'es' });
}

export type SplitCardElements = {
  number: StripeCardNumberElement;
  expiry: StripeCardExpiryElement;
  cvc: StripeCardCvcElement;
};

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

  try {
    elements.getElement("cardNumber")?.unmount();
    elements.getElement("cardExpiry")?.unmount();
    elements.getElement("cardCvc")?.unmount();
  } catch {}

  // Estilos base para los elementos de Stripe
  const elementStyle = {
    base: {
      fontSize: "14px",
      color: "#1a1a1a",
      fontFamily: "system-ui, -apple-system, sans-serif",
      "::placeholder": {
        color: "#9ca3af",
      },
    },
    invalid: {
      color: "#dc2626",
    },
  };

  // Crear elementos con placeholders personalizados
  const number = elements.create("cardNumber", {
    style: elementStyle,
    showIcon: true,
    placeholder: "1234 1234 1234 1234",
  });
  
  const expiry = elements.create("cardExpiry", {
    style: elementStyle,
    placeholder: "MM / AA",
  });
  
  const cvc = elements.create("cardCvc", {
    style: elementStyle,
    placeholder: "CVC",
  });
  
  number.mount(hostNumber);
  expiry.mount(hostExpiry);
  cvc.mount(hostCvc);
  
  return { number, expiry, cvc };
}

export function unmountSplitCardElements(elements: StripeElements): void {
  try {
    elements.getElement("cardNumber")?.unmount();
    elements.getElement("cardExpiry")?.unmount();
    elements.getElement("cardCvc")?.unmount();
  } catch {}
}

export async function confirmCardPayment(
  stripe: Stripe,
  clientSecret: string,
  cardNumberEl: StripeCardNumberElement,
  billing: { name?: string; email?: string; postal_code?: string }
): Promise<{
  status: "succeeded" | "processing" | "requires_action" | "canceled";
  error?: string;
  intent?: import("@stripe/stripe-js").PaymentIntent;
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

  if (error) {
    return { status: "requires_action", error: error.message };
  }
  if (!paymentIntent) {
    return { status: "requires_action", error: "Sin PaymentIntent" };
  }

  return { status: paymentIntent.status as any, intent: paymentIntent };
}
