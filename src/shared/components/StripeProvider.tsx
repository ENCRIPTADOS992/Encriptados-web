// src/shared/components/StripeProvider.tsx
"use client";

import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
);

export const StripeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
    console.warn("🚨 STRIPE PUBLIC KEY is not defined");
  }
  console.log("Stripe loaded:", stripePromise);
  return <Elements stripe={stripePromise}>{children}</Elements>;
};
