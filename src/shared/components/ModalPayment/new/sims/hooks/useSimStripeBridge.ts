// src/shared/components/ModalPayment/new/sims/hooks/useSimStripeBridge.ts
"use client";

import React from "react";
import { useStripeSplit } from "@/shared/hooks/useStripeSplit";
import { confirmCardPayment } from "@/payments/stripeClient";
import type { StripeConfirmFn } from "../types/simFormTypes";

type Method = "card" | "crypto";

type UseSimStripeBridgeParams = {
  method: Method;
  onStripeConfirmReady?: (fn: StripeConfirmFn | null) => void;
};

export function useSimStripeBridge({
  method,
  onStripeConfirmReady,
}: UseSimStripeBridgeParams) {
  const { status, error, stripeRef, splitRef } = useStripeSplit(
    method === "card"
  );

  React.useEffect(() => {
    if (!onStripeConfirmReady) return;

    console.log("[SimForm] useSimStripeBridge check", {
      method,
      status,
      hasStripe: !!stripeRef.current,
      hasNumber: !!splitRef.current?.number,
    });

    if (
      method !== "card" ||
      status !== "ready" ||
      !stripeRef.current ||
      !splitRef.current?.number
    ) {
      console.log(
        "[SimForm] Stripe NO listo en bridge, mandando null al padre"
      );
      onStripeConfirmReady(null);
      return;
    }

    const fn: StripeConfirmFn = async (clientSecret, billing) => {
      console.log("[SimForm] StripeConfirmFn llamado con:", {
        clientSecret,
        billing,
      });

      if (!stripeRef.current || !splitRef.current?.number) {
        throw new Error("Stripe no está listo.");
      }

      return confirmCardPayment(
        stripeRef.current,
        clientSecret,
        splitRef.current.number,
        {
          name: billing?.name,
          email: billing?.email,
          postal_code: billing?.postal_code,
        }
      );
    };

    console.log("[SimForm] registrando stripeConfirm fn en el padre (bridge)");
    onStripeConfirmReady(fn);

    return () => {
      console.log("[SimForm] limpiando stripeConfirm fn (bridge)");
      onStripeConfirmReady(null);
    };
  }, [method, status, stripeRef, splitRef, onStripeConfirmReady]);

  return { stripeStatus: status, mountError: error };
}
