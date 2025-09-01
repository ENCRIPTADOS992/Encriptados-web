"use client";

import * as React from "react";

type PaymentIntentLike = {
  id: string;
  amount: number;          // en cents
  currency: string;        // ej: "usd"
  created?: number;        // epoch seconds (opcional)
  receipt_email?: string | null;
  description?: string | null;
  status?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  intent: PaymentIntentLike | null;
  orderId?: number | null;
};

function formatMoney(amountCents: number, currency: string) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency?.toUpperCase() || "USD",
    }).format((amountCents || 0) / 100);
  } catch {
    // fallback
    return `$${(amountCents || 0) / 100} ${currency?.toUpperCase() || "USD"}`;
  }
}

export default function PaymentSuccessModal({ open, onClose, intent, orderId }: Props) {
  if (!open || !intent) return null;

  const createdDate =
    intent.created ? new Date(intent.created * 1000) : undefined;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pay-success-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal card */}
      <div className="relative z-10 w-[92vw] max-w-[520px] rounded-2xl bg-white shadow-xl">
        <div className="p-6">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            {/* check icon simple */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              className="text-green-600"
            >
              <path
                d="M20 6L9 17l-5-5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h3 id="pay-success-title" className="text-center text-xl font-semibold text-[#101010]">
            ¡Pago confirmado!
          </h3>

          <p className="mt-1 text-center text-sm text-[#555]">
            Tu transacción se realizó correctamente.
          </p>

          {/* Details */}
          <div className="mt-5 rounded-xl border border-[#EEE] bg-[#FAFAFA] p-4 text-sm">
            <div className="flex items-center justify-between py-1">
              <span className="text-[#666]">Importe</span>
              <strong className="text-[#101010]">
                {formatMoney(intent.amount, intent.currency)}
              </strong>
            </div>

            {orderId ? (
              <div className="flex items-center justify-between py-1">
                <span className="text-[#666]">N° de pedido</span>
                <span className="font-medium text-[#101010]">#{orderId}</span>
              </div>
            ) : null}

            <div className="flex items-center justify-between py-1">
              <span className="text-[#666]">ID de pago</span>
              <code className="rounded bg-white px-2 py-[2px] text-[12px] text-[#333]">
                {intent.id}
              </code>
            </div>

            {createdDate ? (
              <div className="flex items-center justify-between py-1">
                <span className="text-[#666]">Fecha</span>
                <span className="text-[#101010]">
                  {createdDate.toLocaleString()}
                </span>
              </div>
            ) : null}

            {intent.description ? (
              <div className="mt-2">
                <span className="text-[#666]">Descripción</span>
                <p className="mt-1 rounded bg-white px-2 py-2 text-[#101010]">
                  {intent.description}
                </p>
              </div>
            ) : null}
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-black px-5 text-sm font-semibold text-white hover:bg-black/90"
            >
              Entendido
            </button>
          </div>

          <p className="mt-3 text-center text-xs text-[#777]">
            Te enviaremos tu licencia por correo si aplica a tu compra.
          </p>
        </div>
      </div>
    </div>
  );
}
