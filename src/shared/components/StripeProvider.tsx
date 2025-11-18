// src/shared/components/StripeProvider.tsx
"use client";

import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";

const STRIPE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

let stripePromise: Promise<Stripe | null> | null = null;

if (STRIPE_PUBLISHABLE_KEY) {
  stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
} else {
  console.warn("🚨 NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

export const StripeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  if (!stripePromise) {
    return <>{children}</>;
  }

  return <Elements stripe={stripePromise}>{children}</Elements>;
};
