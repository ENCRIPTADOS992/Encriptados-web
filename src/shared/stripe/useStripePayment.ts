// src/shared/stripe/useStripePayment.ts
"use client";

import * as React from "react";
import type { Stripe, StripeElements } from "@stripe/stripe-js";
import {
  getStripe,
  createCardElements,
  mountSplitCardElements,
  unmountSplitCardElements,
  confirmCardPayment as doConfirm, // ← mismo alias que usabas
  type SplitCardElements,
} from "@/payments/stripeClient";

type Status =
  | "idle"
  | "mounting"
  | "ready"
  | "confirming"
  | "succeeded"
  | "processing"
  | "requires_action"
  | "canceled";

export function useStripePayment() {
  const stripeRef = React.useRef<Stripe | null>(null);
  const elementsRef = React.useRef<StripeElements | null>(null);
  const splitRef = React.useRef<SplitCardElements | null>(null);

  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState<string | undefined>(undefined);

  /**
   * Monta los split elements (número, vencimiento, cvc) en los selectores dados.
   * Ejemplo de uso:
   *   init({ number: "#card-number-el", expiry: "#card-expiry-el", cvc: "#card-cvc-el" })
   */
  const init = React.useCallback(
    async (selectors: { number: string; expiry: string; cvc: string }) => {
      setError(undefined);
      setStatus("mounting");

      const stripe = await getStripe();
      const elements = createCardElements(stripe);
      const split = mountSplitCardElements(elements, selectors);

      stripeRef.current = stripe;
      elementsRef.current = elements;
      splitRef.current = split;

      setStatus("ready");
    },
    []
  );

  /**
   * Confirma el pago usando el cardNumber element montado.
   * Debes pasar el clientSecret del PaymentIntent y (opcional) billing details.
   */
  const confirm = React.useCallback(
    async (
      clientSecret: string,
      billing?: { name?: string; email?: string; postal_code?: string }
    ) => {
      if (!stripeRef.current || !splitRef.current?.number) return;

      setStatus("confirming");
      setError(undefined);

      const res = await doConfirm(
        stripeRef.current,
        clientSecret,
        splitRef.current.number,
        billing ?? {}
      );

      if (res.error) setError(res.error);
      setStatus(res.status as Status);
      return res;
    },
    []
  );

  React.useEffect(() => {
    return () => {
      // Cleanup al desmontar
      if (elementsRef.current) unmountSplitCardElements(elementsRef.current);
      splitRef.current = null;
      elementsRef.current = null;
      stripeRef.current = null;
      setStatus("idle");
    };
  }, []);

  return { init, confirm, status, error };
}
