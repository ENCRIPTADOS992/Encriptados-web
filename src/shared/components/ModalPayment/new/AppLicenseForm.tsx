// src/shared/components/ModalPayment/new/AppLicenseForm.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import PaymentSuccessModal from "@/payments/PaymentSuccessModal";
import { useStripeSplit } from "@/shared/hooks/useStripeSplit";
import { confirmCardPayment } from "@/payments/stripeClient";
import { createUserIdOrderAndIntent, fetchPublicStatus, type OrderType } from "@/lib/payments/orderApi";

const TERMS_URL = "https://encriptados.io/pages/terminos-y-condiciones/";

type LicenseType = "new" | "renew";
type Method = "card" | "crypto";

type Props = {
  email?: string;
  quantity?: number;
  productId: number;
  amountUsd: number;
  orderType?: OrderType;
  onPayCrypto?: (email: string, telegramId?: string) => Promise<void>;
  onPaid?: () => void;
  loading?: boolean;
};

export default function AppLicenseForm({
  email = "",
  productId,
  amountUsd,
  onPayCrypto,
  onPaid,
  loading = false,
}: Props) {
  // License type selection
  const [licenseType, setLicenseType] = React.useState<LicenseType>("new");

  const [emailVal, setEmailVal] = React.useState(email);
  const [telegramId, setTelegramId] = React.useState("");
  const [terms, setTerms] = React.useState(true);
  const [method, setMethod] = React.useState<Method>("crypto");

  const [cardName, setCardName] = React.useState("");
  const [postal, setPostal] = React.useState("");

  const { status: stripeStatus, error: mountError, stripeRef, splitRef } = useStripeSplit(method === "card");
  const [stripeError, setStripeError] = React.useState<string | null>(null);

  const [clientSecret, setClientSecret] = React.useState("");
  const [orderId, setOrderId] = React.useState<number | null>(null);

  const [polling, setPolling] = React.useState(false);
  const pollRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const pollStartedAtRef = React.useRef<number>(0);

  const [showSuccess, setShowSuccess] = React.useState(false);
  const [successPI, setSuccessPI] = React.useState<any>(null);

  React.useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const emailOk = /\S+@\S+\.\S+/.test(emailVal) && emailVal.length <= 100 && emailVal.length > 5;
  const onlyLetters = (s: string) => s.replace(/[^A-Za-zÀ-ÿ\u00f1\u00d1\s'.-]/g, "");

  const phase = method === "crypto" ? "crypto" : clientSecret ? "card_confirm" : "card_init";

  const canPay =
    !loading &&
    terms &&
    emailOk &&
    (phase === "crypto" ? true : stripeStatus === "ready" && cardName.trim().length > 1);

  const buttonLabel =
    method === "crypto"
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
        if (status === "fulfilled" || status === "pending_admin" || status === "cancelled") {
          clearInterval(pollRef.current!);
          setPolling(false);
        } else if (Date.now() - pollStartedAtRef.current > 75_000) {
          clearInterval(pollRef.current!);
          setPolling(false);
        }
      } catch {}
    };

    pollRef.current = setInterval(tick, 2000);
  }

  const handlePay = async () => {
    if (!canPay) return;

    if (method === "crypto") {
      await onPayCrypto?.(emailVal.trim(), telegramId.trim() || undefined);
      return;
    }

    if (!clientSecret) {
      try {
        setStripeError(null);

        const { order_id, client_secret } = await createUserIdOrderAndIntent({
          productId,
          email: emailVal.trim(),
          username: telegramId.trim() || undefined, // Using username field for telegram ID
          amountUsd,
          currency: "USD",
        });

        setOrderId(order_id);
        setClientSecret(client_secret);
      } catch (e: any) {
        setStripeError(e?.message || "No se pudo iniciar el pago.");
      }
      return;
    }

    try {
      if (!stripeRef.current || !splitRef.current?.number) throw new Error("Stripe no está listo.");
      setStripeError(null);
      if (orderId && !polling) startPolling(orderId);

      const res = await confirmCardPayment(
        stripeRef.current!,
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

      if (res.error) setStripeError(res.error);
    } catch (e: any) {
      setStripeError(e?.message || "Error confirmando el pago.");
    }
  };

  const errBorderFilled = (val: string, ok: boolean) =>
    `border-2 ${val.trim() ? (ok ? "border-transparent" : "border-red-500") : "border-transparent"}`;

  const nameOk = cardName.trim().length > 0;
  const postalOk = postal.trim().length > 0;

  const baseBtnClass =
    "h-11 rounded-[8px] px-[14px] text-[12px] leading-[12px] font-bold flex items-center justify-center text-center flex-1";
  const inactiveClass = "bg-[#EBEBEB] text-[#3D3D3D] border border-transparent";
  const activeClass = "bg-white text-black border-2 border-[#3D3D3D]";

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* License Type Buttons */}
        <div className="space-y-1.5">
          <p className="text-[12px] leading-[12px] font-bold text-[#010C0F]/80">
            Tipo de licencia
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              aria-pressed={licenseType === "new"}
              onClick={() => setLicenseType("new")}
              className={[baseBtnClass, licenseType === "new" ? activeClass : inactiveClass].join(" ")}
            >
              Nueva licencia
            </button>
            <button
              type="button"
              aria-pressed={licenseType === "renew"}
              onClick={() => setLicenseType("renew")}
              className={[baseBtnClass, licenseType === "renew" ? activeClass : inactiveClass].join(" ")}
            >
              Renovar licencia
            </button>
          </div>
        </div>

        {/* Email & Telegram ID - side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Email */}
          <div className="space-y-1.5">
            <p className="text-[12px] leading-[12px] font-bold text-[#010C0F]/80">Email</p>
            <div className="w-full h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center">
              <input
                value={emailVal}
                onChange={(e) => setEmailVal(e.target.value)}
                placeholder="correo@ejemplo.com"
                type="email"
                className="w-full bg-transparent outline-none text-[14px]"
              />
            </div>
          </div>

          {/* Telegram ID */}
          <div className="space-y-1.5">
            <p className="text-[12px] leading-[12px] font-bold text-[#010C0F]/80">
              ID Telegram <span className="font-normal text-[#010C0F]/50">(opcional)</span>
            </p>
            <div className="w-full h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center">
              <input
                value={telegramId}
                onChange={(e) => setTelegramId(e.target.value)}
                placeholder="@usuario o ID numérico"
                className="w-full bg-transparent outline-none text-[14px]"
              />
            </div>
          </div>
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
            <Link href={TERMS_URL} target="_blank" className="underline font-medium">
              términos y condiciones
            </Link>{" "}
            de la compra
          </span>
        </label>

        {/* Método de pago */}
        <div className="space-y-1.5">
          <p className="text-[12px] leading-[12px] font-bold text-[#010C0F]/80">Método de pago</p>

          <div className="grid grid-cols-2 gap-2 ipad:gap-[10px]">
            <button
              type="button"
              aria-pressed={method === "card"}
              onClick={() => setMethod("card")}
              className={[
                "w-full rounded-[8px] flex flex-col items-center justify-center gap-1",
                "h-[78px] px-2 py-2",
                method === "card" ? "bg-[#FAFAFA] border-2 border-[#3D3D3D]" : "bg-[#EBEBEB] border border-transparent",
              ].join(" ")}
            >
              <Image src="/images/home/add_card.webp" alt="" width={20} height={20} />
              <span className="text-[12px] font-bold text-[#3D3D3D] leading-tight text-center">Tarjeta de crédito</span>
            </button>

            <button
              type="button"
              aria-pressed={method === "crypto"}
              onClick={() => setMethod("crypto")}
              className={[
                "w-full rounded-[8px] flex flex-col items-center justify-center gap-1",
                "h-[78px] px-2 py-2",
                method === "crypto" ? "bg-[#FAFAFA] border-2 border-[#3D3D3D]" : "bg-[#EBEBEB] border border-transparent",
              ].join(" ")}
            >
              <Image src="/images/home/send_money.webp" alt="" width={20} height={20} />
              <span className="text-[12px] font-bold text-[#3D3D3D] leading-tight text-center">Criptomonedas</span>
            </button>
          </div>
        </div>

        {/* Campos tarjeta (Stripe Split Elements + billing básicos) */}
        {method === "card" && (
          <div className="space-y-1.5">
            {/* Titular */}
            <div className={`w-full h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center ${errBorderFilled(cardName, nameOk)}`}>
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

            {/* CP opcional para AVS */}
            <div className={`w-full h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center ${errBorderFilled(postal, postalOk)}`}>
              <input
                value={postal}
                onChange={(e) => setPostal(e.target.value)}
                placeholder="Código postal"
                className="w-full bg-transparent outline-none text-[14px]"
                autoComplete="postal-code"
              />
            </div>

            {(mountError || stripeError) && <p className="text-red-600 text-sm">{mountError || stripeError}</p>}
          </div>
        )}

        {/* Botón */}
        <button
          type="button"
          disabled={!canPay}
          onClick={handlePay}
          aria-disabled={!canPay}
          className={`mt-2 w-full h-[54px] rounded-lg px-4 inline-flex items-center justify-center gap-2.5
          text-white text-[14px] font-semibold ${
            canPay ? "bg-black hover:bg-black/90" : "bg-black/40 cursor-not-allowed"
          } focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30`}
        >
          {buttonLabel}
        </button>

        {method === "card" && polling && (
          <p className="text-xs text-[#3D3D3D]">Procesando la orden… puede tardar unos segundos.</p>
        )}
      </div>

      <PaymentSuccessModal
        open={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          onPaid?.();
        }}
        intent={successPI}
        orderId={orderId}
      />
    </>
  );
}
