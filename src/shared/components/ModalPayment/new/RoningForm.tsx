// src/components/RoningForm.tsx
"use client";

import React from "react";
import Link from "next/link";
import PaymentSuccessModal from "@/payments/PaymentSuccessModal";
import { confirmCardPayment } from "@/payments/stripeClient";
import { useStripeSplit } from "@/shared/hooks/useStripeSplit";
import {
  createOrderAndIntent,
  createManualOrderAndIntent,
  fetchPublicStatus,
  type OrderType,
} from "@/payments/orderApi";

const TERMS_URL = "https://encriptados.io/pages/terminos-y-condiciones/";
const MANUAL_PRODUCT_IDS = new Set<number>([134, 133, 127, 137]);
const DEFAULT_SUCCESS_URL = "https://t.me/encriptados";

type Props = {
  quantity: number;
  email?: string;
  loading?: boolean;
  productId: number;
  orderType: OrderType;
  amountUsd: number;
  onPayCrypto?: (email: string) => Promise<void>;
  onPaid?: () => void;
};


export default function RoningForm({
  quantity,
  email = "",
  loading = false,
  productId,
  orderType,
  amountUsd,
  onPayCrypto,
  onPaid,
}: Props) {
  const [emailVal, setEmailVal] = React.useState(email);
  const [terms, setTerms] = React.useState(true);
  const [method, setMethod] = React.useState<"card" | "crypto">("crypto");

  // Billing visibles
  const [cardName, setCardName] = React.useState("");
  const [postal, setPostal] = React.useState("");

  // Stripe split elements
  const {
    status: stripeStatus,
    error: mountError,
    stripeRef,
    splitRef,
  } = useStripeSplit(method === "card"); // el hook monta #card-number-el, #card-expiry-el, #card-cvc-el

  const [stripeError, setStripeError] = React.useState<string | null>(null);
  const [clientSecret, setClientSecret] = React.useState("");
  const [orderId, setOrderId] = React.useState<number | null>(null);

  // Polling
  const [polling, setPolling] = React.useState(false);
  const pollRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const pollStartedAtRef = React.useRef<number>(0);

  // Modal éxito
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [successPI, setSuccessPI] = React.useState<any>(null);

  React.useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const emailOk =
    /\S+@\S+\.\S+/.test(emailVal) && emailVal.length <= 100 && emailVal.length > 5;

  const phase =
    method === "crypto" ? "crypto" : clientSecret ? "card_confirm" : "card_init";

  const canPay =
    terms &&
    emailOk &&
    (phase === "crypto" ? true : stripeStatus === "ready" && cardName.trim().length > 1);

  const buttonLabel =
    phase === "crypto"
      ? "Pagar ahora"
      : phase === "card_init"
      ? "Continuar"
      : polling
      ? "Procesando…"
      : "Confirmar pago";

  function startPolling(id: number) {
    if (pollRef.current) clearInterval(pollRef.current);
    setPolling(true);
    pollStartedAtRef.current = Date.now();

    const tick = async () => {
      try {
        const { status } = await fetchPublicStatus(id);
        if (status === "fulfilled" || status === "pending_admin") {
          clearInterval(pollRef.current!);
          setPolling(false);
          // NO cerrar aquí; dejemos que el usuario vea el modal de éxito
        } else if (Date.now() - pollStartedAtRef.current > 75_000) {
          clearInterval(pollRef.current!);
          setPolling(false);
        }
      } catch {}
    };

    pollRef.current = setInterval(tick, 1500);
  }

  const handlePay = async () => {
    if (!canPay) return;

    if (method === "crypto") {
      await onPayCrypto?.(emailVal.trim());
      return;
    }

    // FASE 1: crear orden + intent
    if (!clientSecret) {
      try {
        setStripeError(null);
        const isManual = MANUAL_PRODUCT_IDS.has(productId);
        const { order_id, client_secret } = isManual
      ? await createManualOrderAndIntent({
          productId,
          email: emailVal,
          quantity,
          amountUsd,
          currency: "USD",
          successUrl: DEFAULT_SUCCESS_URL, 
        })
      : await createOrderAndIntent({
          orderType,      
          productId,
          email: emailVal,
          quantity,
          amountUsd,
        });

        setOrderId(order_id);
        setClientSecret(client_secret);
      } catch (e: any) {
        setStripeError(e?.message || "No se pudo iniciar el pago.");
      }
      return;
    }

    // FASE 2: confirmar con el Split Number Element
    try {
      if (!stripeRef.current || !splitRef.current?.number)
        throw new Error("Stripe no está listo.");

      setStripeError(null);
      if (orderId && !polling) startPolling(orderId);

      const res = await confirmCardPayment(
        stripeRef.current,
        clientSecret,
        splitRef.current.number,
        {
          name: cardName.trim() || undefined,
          email: emailVal.trim(),
          postal_code: postal.trim() || undefined,
        }
      );

      if (res?.status === "succeeded") {
        setSuccessPI(res.intent ?? null);
        setShowSuccess(true);
        if (pollRef.current) clearInterval(pollRef.current);
        setPolling(false);
        return;
      }

      if (res.error) {
        setStripeError(res.error);
      }
    } catch (e: any) {
      setStripeError(e?.message || "Error confirmando el pago.");
    }
  };

  const onlyLetters = (s: string) =>
    s.replace(/[^A-Za-zÀ-ÿ\u00f1\u00d1\s'.-]/g, "");

  return (
    <>
      <div className="flex flex-col gap-2">
        {/* Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <p className="text-[12px] leading-[12px] font-bold text-[#010C0F]/80">
              Correo electrónico para recibir licencia
            </p>
            <div className="w-full h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center">
              <input
                value={emailVal}
                onChange={(e) => setEmailVal(e.target.value)}
                placeholder="Email"
                type="email"
                className="w-full bg-transparent outline-none text-[14px]"
              />
            </div>
          </div>
          {/* Empty div to maintain grid structure */}
          <div className="hidden sm:block" />
        </div>

        {/* Términos */}
        <label className="flex items-center gap-2 text-[12px] leading-[18px] text-[#010C0F]">
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            className="w-[18px] h-[18px] border-2 border-black rounded-[2px] accent-black focus:outline-none focus:ring-0"
          />
          <span className="select-none">
            Acepto{" "}
            <Link
              href={TERMS_URL}
              target="_blank"
              className="underline font-medium"
            >
              términos y condiciones
            </Link>{" "}
            de la compra
          </span>
        </label>

        {/* Método de pago */}
        <div className="space-y-1.5">
          <p className="text-[12px] leading-[12px] font-bold text-[#010C0F]/80">
            Método de pago
          </p>
          <div className="grid grid-cols-2 gap-2 ipad:gap-3">
            <button
              type="button"
              aria-pressed={method === "card"}
              onClick={() => setMethod("card")}
              className={[
                "w-full rounded-[8px] border flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2",
                "h-[78px] px-2 py-2 sm:h-[76px] sm:px-3 ipad:h-[60px] ipad:px-4",
                method === "card"
                  ? "bg-[#FAFAFA] border-2 border-[#3D3D3D]"
                  : "bg-[#EBEBEB] border border-transparent",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-1",
              ].join(" ")}
            >
              <img
                src="/images/home/add_card.webp"
                alt=""
                className="w-5 h-5 sm:w-5 sm:h-5 ipad:w-6 ipad:h-6"
              />
              <span className="text-[12px] sm:text-[13px] ipad:text-[14px] font-bold text-[#3D3D3D] leading-tight text-center sm:text-left">
                Tarjeta de crédito
              </span>
            </button>

            <button
              type="button"
              aria-pressed={method === "crypto"}
              onClick={() => setMethod("crypto")}
              className={[
                "w-full rounded-[8px] border flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2",
                "h-[78px] px-2 py-2 sm:h-[76px] sm:px-3 ipad:h-[60px] ipad:px-4",
                method === "crypto"
                  ? "bg-[#FAFAFA] border-2 border-[#3D3D3D]"
                  : "bg-[#EBEBEB] border border-transparent",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-1",
              ].join(" ")}
            >
              <img
                src="/images/home/send_money.webp"
                alt=""
                className="w-5 h-5 sm:w-5 sm:h-5 ipad:w-6 ipad:h-6"
              />
              <span className="text-[12px] sm:text-[13px] ipad:text-[14px] font-bold text-[#3D3D3D] leading-tight text-center sm:text-left">
                Criptomonedas
              </span>
            </button>
          </div>
        </div>

        {/* Campos tarjeta */}
        {method === "card" && (
          <div className="space-y-1.5">
            {/* Titular */}
            <div className="w-full h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center">
              <input
                value={cardName}
                onChange={(e) => setCardName(onlyLetters(e.target.value))}
                placeholder="Titular de la tarjeta"
                className="w-full bg-transparent outline-none text-[14px]"
                autoComplete="cc-name"
              />
            </div>

            {/* Split Elements */}
            <div className="w-full h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center">
              <div id="card-number-el" className="w-full" />
            </div>

            <div className="grid grid-cols-2 gap-[8px]">
              <div className="h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center">
                <div id="card-expiry-el" className="w-full" />
              </div>
              <div className="h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center">
                <div id="card-cvc-el" className="w-full" />
              </div>
            </div>

            {/* Código postal (opcional AVS) */}
            <div className="w-full h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center">
              <input
                value={postal}
                onChange={(e) => setPostal(e.target.value)}
                placeholder="Código postal"
                className="w-full bg-transparent outline-none text-[14px]"
                autoComplete="postal-code"
              />
            </div>

            {(mountError || stripeError) && (
              <p className="text-red-600 text-sm">{mountError || stripeError}</p>
            )}
          </div>
        )}

        <button
          type="button"
          disabled={!canPay}
          onClick={handlePay}
          aria-disabled={!canPay}
          className={`mt-4 w-full h-[54px] rounded-lg px-4 inline-flex items-center justify-center gap-2.5
          text-white text-[14px] font-semibold ${
            canPay ? "bg-black hover:bg-black/90" : "bg-black/40 cursor-not-allowed"
          } focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30`}
        >
          {buttonLabel}
        </button>

        {method === "card" && polling && (
          <p className="text-xs text-[#3D3D3D]">
            Procesando la orden… puede tardar unos segundos.
          </p>
        )}
      </div>

      {/* Modal de éxito */}
      <PaymentSuccessModal
        open={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          onPaid?.(); 
        }}
        intent={successPI}
        orderId={orderId ?? undefined}
      />
    </>
  );
}
