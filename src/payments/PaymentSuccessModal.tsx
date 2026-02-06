"use client";

import * as React from "react";
import { CircleCheck, Star, X } from "lucide-react";
import Image from "next/image";
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

export type ProductSuccessInfo = {
  name: string;
  image?: string;
  brand?: string;
  quantity?: number;
  unitPrice?: number;
  shippingCost?: number;
  /** Precio fijo de la eSIM sola (ej: 12 USD) — si se pasa, se muestra desglose */
  esimPrice?: number;
  /** Monto del plan de recarga (datos/minutos) */
  rechargeAmount?: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  intent: PaymentIntentLike | null;
  orderId?: number | null;
  product?: ProductSuccessInfo | null;
};

function formatMoney(amountCents: number, currency: string) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency?.toUpperCase() || "USD",
    }).format((amountCents || 0) / 100);
  } catch {
    return `$${(amountCents || 0) / 100} ${currency?.toUpperCase() || "USD"}`;
  }
}

function formatUsd(amount: number) {
  return `${amount % 1 === 0 ? amount : amount.toFixed(2)} USD`;
}

export default function PaymentSuccessModal({ open, onClose, intent, orderId, product }: Props) {
  if (!open || !intent) return null;

  const createdDate =
    intent.created ? new Date(intent.created * 1000) : undefined;

  const telegramUrl = "https://t.me/encriptados";

  /* ─── Enriched SIM / Product layout ─── */
  if (product) {
    const qty = product.quantity ?? 1;
    const unitPrice = product.unitPrice ?? intent.amount / 100;
    const shipping = product.shippingCost ?? 0;
    const hasEsimBreakdown = product.esimPrice != null && product.rechargeAmount != null;
    const subtotal = unitPrice * qty;
    const total = subtotal + shipping;

    return (
      <div
        className="fixed inset-0 z-[99999] flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

        <div
          className="relative z-10 w-[94vw] max-w-[540px] rounded-2xl bg-white shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 grid place-items-center rounded-full hover:bg-black/5 transition-colors z-10"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5 text-[#999]" />
          </button>

          <div className="px-14 py-10">
            {/* Success icon */}
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CircleCheck className="h-7 w-7 text-green-500" strokeWidth={1.5} />
            </div>

            <h3 className="text-center text-lg font-bold text-[#101010]">
              ¡Gracias por tu compra!
            </h3>

            {/* Product card */}
            <div className="mt-4 mx-auto flex items-center gap-3 rounded-xl bg-[#F7F7F7] px-4 py-3 w-fit">
              {product.image ? (
                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-black">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : null}
              <div>
                <p className="text-sm font-semibold text-[#101010]">{product.name}</p>
                {product.brand ? (
                  <p className="text-xs text-[#666]">{product.brand}</p>
                ) : null}
              </div>
            </div>

            {/* Stars */}
            <div className="mt-2 flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Details */}
            <div className="mt-4 rounded-xl border border-[#EEE] bg-white text-sm divide-y divide-[#EEE]">
              {/* Row 1: Product name + qty */}
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-[#333]">
                  {product.name} ({qty})
                </span>
                <span className="font-semibold text-[#101010]">
                  {hasEsimBreakdown ? "-" : formatUsd(subtotal)}
                </span>
              </div>

              {/* Row 2: Order number */}
              {orderId ? (
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-[#333]">N° de orden:</span>
                  <span className="font-semibold text-[#101010]">#{orderId}</span>
                </div>
              ) : null}

              {/* eSIM breakdown rows */}
              {hasEsimBreakdown ? (
                <>
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-[#333]">Precio de eSIM</span>
                    <span className="font-semibold text-[#101010]">
                      {formatUsd(product.esimPrice! * qty)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-[#333]">Monto de recarga</span>
                    <span className="font-semibold text-[#101010]">
                      {formatUsd(product.rechargeAmount! * qty)}
                    </span>
                  </div>
                </>
              ) : null}

              {/* Shipping (physical SIMs) */}
              {!hasEsimBreakdown && shipping > 0 ? (
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-[#333]">Envío:</span>
                  <span className="font-semibold text-[#101010]">{formatUsd(shipping)}</span>
                </div>
              ) : null}

              {/* Total */}
              <div className="flex items-center justify-between px-4 py-3">
                <span className="font-semibold text-[#333]">Total:</span>
                <span className="font-bold text-[#101010]">{formatUsd(total)}</span>
              </div>
            </div>

            {/* Message */}
            <p className="mt-5 text-center text-xs text-[#555] leading-relaxed">
              ¡Tu pedido será despachado de forma inmediata!
              <br />
              Si tienes cualquier duda contáctanos
            </p>

            {/* Telegram button */}
            <div className="mt-4 flex justify-center">
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
          </div>
        </div>
      </div>
    );
  }

  /* ─── Original generic layout (apps, licenses, etc.) ─── */
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
