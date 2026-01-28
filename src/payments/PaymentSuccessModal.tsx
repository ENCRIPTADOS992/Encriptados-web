"use client";

import * as React from "react";
import { CircleCheck } from "lucide-react";
import TelegramIcon from "@/shared/svgs/TelegramIcon";

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

  const telegramUrl = "https://t.me/encriptados";

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pay-success-title"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black"
        aria-hidden="true"
      />

      {/* Modal card */}
      <div
        className="relative z-10 w-[92vw] max-w-[520px] rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Icono CircleCheck con contenedor cuadrado de bordes redondeados */}
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-green-100">
            <CircleCheck className="h-9 w-9 text-green-500" strokeWidth={1.5} />
          </div>

          <h3 id="pay-success-title" className="text-center text-xl font-semibold text-[#101010]">
            Pago confirmado
          </h3>

          <p className="mt-1 text-center text-sm text-[#555]">
            Tu transacción se realizó correctamente
          </p>

          {/* Details */}
          <div className="mt-5 rounded-xl border border-[#EEE] bg-white p-4 text-sm">
            <div className="flex items-center justify-between py-2">
              <span className="text-[#666]">Importe</span>
              <strong className="text-[#101010]">
                {formatMoney(intent.amount, intent.currency)}
              </strong>
            </div>

            {orderId ? (
              <div className="flex items-center justify-between py-2">
                <span className="text-[#666]">N° de pedido</span>
                <span className="font-semibold text-[#101010]">#{orderId}</span>
              </div>
            ) : null}

            <div className="flex items-center justify-between py-2">
              <span className="text-[#666]">ID de pago</span>
              <code className="rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] px-3 py-1 text-[13px] text-[#333]">
                {intent.id}
              </code>
            </div>

            {createdDate ? (
              <div className="flex items-center justify-between py-2">
                <span className="text-[#666]">Fecha</span>
                <span className="font-semibold text-[#101010]">
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

          {/* Botón Chatear ahora estilo Telegram */}
          <div className="mt-6 flex justify-center">
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#12b4e7] px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-[#0da8d8]"
            >
              <TelegramIcon className="h-5 w-5 flex-shrink-0 text-white" />
              <span>Chatear ahora</span>
            </a>
          </div>

          <p className="mt-4 text-center text-xs text-[#777]">
            Te enviaremos tu licencia por correo si aplica a tu compra
          </p>
        </div>
      </div>
    </div>
  );
}
