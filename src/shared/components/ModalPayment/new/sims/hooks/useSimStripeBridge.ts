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

  // Referencia estable para evitar re-creaciones innecesarias
  const confirmFnRef = React.useRef<StripeConfirmFn | null>(null);

  React.useEffect(() => {
    if (!onStripeConfirmReady) return;

    console.log("[useSimStripeBridge] Estado actualizado:", {
      method,
      status,
      hasStripe: !!stripeRef.current,
      hasNumber: !!splitRef.current?.number,
    });

    // Si no es método card o no está listo, enviar null
    if (
      method !== "card" ||
      status !== "ready" ||
      !stripeRef.current ||
      !splitRef.current?.number
    ) {
      if (confirmFnRef.current !== null) {
        console.log("[useSimStripeBridge] ❌ Stripe no listo, enviando null");
        confirmFnRef.current = null;
        onStripeConfirmReady(null);
      }
      return;
    }

    // Crear la función de confirmación
    const fn: StripeConfirmFn = async (clientSecret, billing) => {
      console.log("[useSimStripeBridge] ✅ Confirmando pago con:", {
        clientSecret: clientSecret?.slice(0, 20) + "...",
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

    // Solo actualizar si la función cambió
    if (confirmFnRef.current !== fn) {
      console.log("[useSimStripeBridge] ✅ Stripe listo, registrando confirmFn");
      confirmFnRef.current = fn;
      onStripeConfirmReady(fn);
    }

    return () => {
      // No limpiamos al desmontar porque puede causar race conditions
      // El padre debe manejar el estado null cuando sea necesario
    };
  }, [method, status, stripeRef, splitRef, onStripeConfirmReady]);

  return { stripeStatus: status, mountError: error };
}
