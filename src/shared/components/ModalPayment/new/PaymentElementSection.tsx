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
    if (clientSecret) {
      init({
        number: "#card-number-el",
        expiry: "#card-expiry-el",
        cvc: "#card-cvc-el",
      });
    }
  }, [clientSecret, init]);

  const onPay = async () => {
    const res = await confirm(clientSecret);
    if (res?.status === "succeeded") onPaid?.();
  };

  const isBusy =
    status === "mounting" || status === "confirming" || status === "processing";

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-2">
        <div id="card-number-el" className="p-3 border rounded-md" />
        <div className="grid grid-cols-2 gap-2">
          <div id="card-expiry-el" className="p-3 border rounded-md" />
          <div id="card-cvc-el" className="p-3 border rounded-md" />
        </div>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        onClick={onPay}
        disabled={isBusy || status !== "ready"}
        className="w-full rounded-md bg-black text-white px-4 py-2 disabled:opacity-50"
      >
        {status === "confirming" ? "Confirmando..." : payLabel}
      </button>

      <p className="text-xs text-neutral-500">Estado: {status}</p>
    </div>
  );
}
