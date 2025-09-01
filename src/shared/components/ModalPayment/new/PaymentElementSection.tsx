"use client";
import * as React from "react";
import { useStripePayment } from "@/shared/stripe/useStripePayment";

export default function PaymentElementSection({
  clientSecret,
  onPaid,
  payLabel = "Pagar",
}: {
  clientSecret: string;
  onPaid?: () => void;
  payLabel?: string;
}) {
  const { init, confirm, status, error } = useStripePayment();

  React.useEffect(() => {
    if (clientSecret) init("#payment-element", clientSecret);
  }, [clientSecret, init]);

  const onPay = async () => {
    const res = await confirm();
    if (res?.status === "succeeded") onPaid?.();
  };

  return (
    <div className="space-y-3">
      <div id="payment-element" />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button
        onClick={onPay}
        disabled={status === "confirming" || status === "processing"}
        className="w-full rounded-md bg-black text-white px-4 py-2 disabled:opacity-50"
      >
        {status === "confirming" ? "Confirmando..." : payLabel}
      </button>
      <p className="text-xs text-neutral-500">Estado: {status}</p>
    </div>
  );
}
