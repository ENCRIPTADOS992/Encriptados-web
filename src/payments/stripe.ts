// stripeClient.ts
"use client";

import { loadStripe } from "@stripe/stripe-js";
import type { Stripe, StripeElements } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null> | null = null;

const STRIPE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";
  
function maskKey(k: string) {
  if (!k) return k;
  return `${k.slice(0, 10)}…${k.slice(-6)}`;
}

export async function getStripe(): Promise<Stripe> {
  if (typeof window === "undefined") {
    throw new Error("getStripe() debe ejecutarse en el navegador.");
  }
  if (!STRIPE_PUBLISHABLE_KEY) {
    throw new Error("Falta STRIPE_PUBLISHABLE_KEY (NEXT_PUBLIC_...)");
  }
  if (
    STRIPE_PUBLISHABLE_KEY.includes("<") ||
    STRIPE_PUBLISHABLE_KEY.includes(">") ||
    !/^pk_(test|live)_[A-Za-z0-9_-]{10,}$/.test(STRIPE_PUBLISHABLE_KEY)
  ) {
    throw new Error("STRIPE_PUBLISHABLE_KEY inválida. Usa pk_test_... o pk_live_... reales.");
  }

  console.log("[stripe] publishable key:", maskKey(STRIPE_PUBLISHABLE_KEY));

  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }
  const stripe = await stripePromise;
  if (!stripe) throw new Error("No se pudo inicializar Stripe.");
  return stripe;
}


export async function createElements(
  stripe: Stripe,
  clientSecret: string
): Promise<StripeElements> {
  if (!clientSecret) {
    throw new Error("Falta el clientSecret para crear Elements.");
  }
  const elements = stripe.elements({
    clientSecret,
    appearance: { theme: "stripe" }, 
  });
  return elements;
}


export async function mountPaymentElement(
  elements: StripeElements,
  mountSelector: string
): Promise<void> {
  const mountPoint = document.querySelector<HTMLElement>(mountSelector);
  if (!mountPoint) {
    throw new Error(`No existe ningún elemento que haga match con '${mountSelector}'.`);
  }

  const existing = elements.getElement("payment");
  if (existing) {
    existing.unmount();
  }

  const paymentElement = elements.create("payment", { layout: "tabs" });
  paymentElement.mount(mountPoint);
}

export async function confirmPayment(
  stripe: Stripe,
  elements: StripeElements
): Promise<{
  status: "succeeded" | "processing" | "requires_action" | "canceled";
  error?: string;
}> {
  const { error, paymentIntent } = await stripe.confirmPayment({
    elements,
    redirect: "if_required",
  });

  if (error) {
    return {
      status: "requires_action",
      error: error.message ?? "No se pudo confirmar el pago.",
    };
  }

  if (!paymentIntent) {
    return {
      status: "requires_action",
      error: "Stripe no devolvió el PaymentIntent.",
    };
  }

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
