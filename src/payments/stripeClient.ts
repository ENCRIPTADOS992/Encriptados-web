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
  return stripe.elements({ appearance: { theme: "stripe" } });
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

  const number = elements.create("cardNumber");
  const expiry = elements.create("cardExpiry");
  const cvc = elements.create("cardCvc");
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
