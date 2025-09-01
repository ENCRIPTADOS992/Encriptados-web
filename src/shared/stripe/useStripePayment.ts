"use client";

import * as React from "react";
import type { Stripe, StripeElements } from "@stripe/stripe-js";
import {
  getStripe,
  createElements,
  mountPaymentElement,
  confirmPayment as doConfirm,
} from "@/payments/stripe";

type Status =
  | "idle"
  | "ready"
  | "confirming"
  | "succeeded"
  | "processing"
  | "requires_action"
  | "canceled";

export function useStripePayment() {
  const stripeRef = React.useRef<Stripe | null>(null);
  const elementsRef = React.useRef<StripeElements | null>(null);
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState<string | undefined>(undefined);

  const init = React.useCallback(
    async (mountSelector: string, clientSecret: string) => {
      setError(undefined);
      const stripe = await getStripe();
      const elements = await createElements(stripe, clientSecret);
      await mountPaymentElement(elements, mountSelector);
      stripeRef.current = stripe;
      elementsRef.current = elements;
      setStatus("ready");
    },
    []
  );

  const confirm = React.useCallback(async () => {
    if (!stripeRef.current || !elementsRef.current) return;
    setStatus("confirming");
    setError(undefined);
    const res = await doConfirm(stripeRef.current, elementsRef.current);
    if (res.error) setError(res.error);
    setStatus(res.status as Status);
    return res;
  }, []);

  React.useEffect(() => {
    return () => {
      // Cleanup al desmontar el modal
      const el = elementsRef.current?.getElement("payment");
      el?.unmount();
      elementsRef.current = null;
      stripeRef.current = null;
    };
  }, []);

  return { init, confirm, status, error };
}
