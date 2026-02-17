// src/shared/components/ModalPayment/new/NewUserForm.tsx
"use client";

import React from "react";
import Link from "next/link";
import PaymentSuccessModal from "@/payments/PaymentSuccessModal";
import { useStripeSplit } from "@/shared/hooks/useStripeSplit";
import { confirmCardPayment } from "@/payments/stripeClient";
import { createUserIdOrderAndIntent, fetchPublicStatus, type OrderType } from "@/lib/payments/orderApi";

const TERMS_URL = "/es/pages/terminos-y-condiciones";

type Method = "card" | "crypto";

type Props = {
  email?: string;
  quantity: number;
  productId: number;
  amountUsd: number;
  orderType: OrderType;
  onPayCrypto?: (email: string) => Promise<void>;
  onPaid?: () => void;
  loading?: boolean;
};

export default function NewUserForm({
  email = "",
  quantity,
  productId,
  amountUsd,
  orderType,
  onPayCrypto,
  onPaid,
  loading = false,
}: Props) {
  const [usernames, setUsernames] = React.useState<string[]>([]);

  const [emailVal, setEmailVal] = React.useState(email);
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
    setUsernames((prev) => {
      const next = [...prev];
      if (quantity > prev.length) next.push(...Array(quantity - prev.length).fill(""));
      else if (quantity < prev.length) next.length = quantity;
      return next;
    });
  }, [quantity]);

  React.useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const setUsernameAt = (idx: number, val: string) => {
    setUsernames((prev) => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
  };

  const reUser = /^[a-zA-Z0-9]{4,20}$/;
  const usernamesOk = usernames.length === quantity && usernames.every((u) => reUser.test(u));

  const emailOk = /\S+@\S+\.\S+/.test(emailVal) && emailVal.length <= 100 && emailVal.length > 5;
  const onlyLetters = (s: string) => s.replace(/[^A-Za-zÀ-ÿ\u00f1\u00d1\s'.-]/g, "");

  const phase = method === "crypto" ? "crypto" : clientSecret ? "card_confirm" : "card_init";

  const canPay =
    !loading &&
    terms &&
    emailOk &&
    usernamesOk &&
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
      } catch { }
    };

    pollRef.current = setInterval(tick, 2000);
  }

  const handlePay = async () => {
    if (!canPay) return;

    if (method === "crypto") {
      await onPayCrypto?.(emailVal.trim());
      return;
    }

    if (!clientSecret) {
      try {
        setStripeError(null);
        // Pasar todos los usernames y validar que qty coincida
        const trimmedUsernames = usernames.map(u => u.trim()).filter(u => u.length > 0);

        const { order_id, client_secret } = await createUserIdOrderAndIntent({
          productId,
          email: emailVal.trim(),
          usernames: trimmedUsernames,
          qty: quantity,
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

  return (
    <>
      <div className="flex flex-col gap-2">
        {/* Usernames */}
        <div className="space-y-1.5">
          <p className="text-[12px] leading-[12px] font-bold text-[#010C0F]/80">Ingresa los nombres sugeridos</p>
          <p className="w-full h-[42px] rounded-[8px] px-[14px] text-[14px] leading-[42px] bg-amber-50 border border-amber-200 flex items-center">
            Mínimo 4 y máximo 20 caracteres alfanuméricos.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {usernames.map((val, idx) => {
              const invalid = val.length > 0 && !reUser.test(val);
              return (
                <div
                  key={idx}
                  className={`w-full h-[42px] rounded-[8px] border-2 ${invalid ? "border-red-500" : "border-[#3D3D3D]"
                    } px-[14px] py-[8px] flex items-center gap-[10px]`}
                >
                  <input
                    value={val}
                    onChange={(e) => setUsernameAt(idx, e.target.value)}
                    placeholder="Ingresa nombre de usuario"
                    className="w-full bg-transparent outline-none text-[14px]"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <p className="text-[12px] leading-[12px] font-bold text-[#010C0F]/80">Correo electrónico para recibir licencia</p>
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
              <img src="/images/home/add_card.webp" alt="" className="w-5 h-5" />
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
              <img src="/images/home/send_money.webp" alt="" className="w-5 h-5" />
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
          className={`mt-4 w-full h-[54px] rounded-lg px-4 inline-flex items-center justify-center gap-2.5
          text-white text-[14px] font-semibold ${canPay ? "bg-black hover:bg-black/90" : "bg-black/40 cursor-not-allowed"
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
