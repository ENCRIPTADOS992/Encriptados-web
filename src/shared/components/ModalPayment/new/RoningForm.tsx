"use client";

import React from "react";
import Link from "next/link";

const TERMS_URL = "https://encriptados.io/pages/terminos-y-condiciones/";

type Props = {
  quantity: number;
  email?: string;
  onSubmit?: () => void;
  onCodesChange?: (codes: string[]) => void; // opcional si quieres leerlos desde el padre
};

export default function RoningForm({
  quantity,
  email = "",
  onSubmit,
  onCodesChange,
}: Props) {
  // Códigos dinámicos por cantidad
  const [codes, setCodes] = React.useState<string[]>([]);
  const [emailVal, setEmailVal] = React.useState(email);
  const [terms, setTerms] = React.useState(false);
  const [method, setMethod] = React.useState<"card" | "crypto">("crypto");

  // Tarjeta (si eligen method=card)
  const [cardName, setCardName] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [exp, setExp] = React.useState("");
  const [cvc, setCvc] = React.useState("");
  const [postal, setPostal] = React.useState("");

  // === Helpers y validaciones ===
  // Código RONING: alfanumérico + guiones, 6 a 64 chars (ajusta si lo necesitas)
  const reCode = /^[A-Z0-9-]{6,64}$/;

  React.useEffect(() => {
    setCodes((prev) => {
      const next = [...prev];
      if (quantity > prev.length) {
        next.push(...Array(quantity - prev.length).fill(""));
      } else if (quantity < prev.length) {
        next.length = quantity;
      }
      return next;
    });
  }, [quantity]);

  React.useEffect(() => {
    onCodesChange?.(codes);
  }, [codes, onCodesChange]);

  const setCodeAt = (idx: number, val: string) => {
    setCodes((prev) => {
      const next = [...prev];
      // normaliza: quita espacios, mayúsculas
      next[idx] = val.replace(/\s+/g, "").toUpperCase();
      return next;
    });
  };

  const emailOk =
    /\S+@\S+\.\S+/.test(emailVal) &&
    emailVal.length <= 100 &&
    emailVal.length > 5;

  const errBorderFilled = (val: string, ok: boolean) =>
    `border-2 ${
      val.trim()
        ? ok
          ? "border-transparent"
          : "border-red-500"
        : "border-transparent"
    }`;

  const onlyLetters = (s: string) =>
    s.replace(/[^A-Za-zÀ-ÿ\u00f1\u00d1\s'.-]/g, "");

  const onlyDigits = (s: string, max = 99) =>
    s.replace(/\D/g, "").slice(0, max);

  const formatExpiry = (s: string) => {
    const d = s.replace(/\D/g, "").slice(0, 4);
    if (d.length <= 2) return d;
    return `${d.slice(0, 2)}/${d.slice(2)}`;
  };

  const isValidExpiry = (mmYY: string) => {
    if (!/^\d{2}\/\d{2}$/.test(mmYY)) return false;
    const [mmS, yyS] = mmYY.split("/");
    const mm = +mmS;
    if (mm < 1 || mm > 12) return false;

    const now = new Date();
    const yNow = now.getFullYear() % 100;
    const mNow = now.getMonth() + 1;
    const yy = +yyS;

    if (yy > yNow) return true;
    if (yy < yNow) return false;
    return mm >= mNow;
  };

  const isValidPostal = (cp: string) => {
    const s = cp.trim().toUpperCase();
    const patterns = [
      /^\d{5}(-\d{4})?$/, // US
      /^[A-Z]\d[A-Z][ -]?\d[A-Z]\d$/, // CA
      /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/, // ES
      /^\d{5}$/, // generic 5
      /^\d{6}$/, // generic 6
      /^\d{7}$/, // JP (7)
      /^[A-HJ-NP-Z]\d{4}[A-Z]{3}$|^\d{4}$/, // MX (satélite) | generic 4
    ];
    return patterns.some((rx) => rx.test(s));
  };

  const digitsCard = (cardNumber ?? "").replace(/\D/g, "");
  const nameOk =
    cardName.trim().length > 0 &&
    /^[A-Za-zÀ-ÿ\u00f1\u00d1\s'.-]+$/.test(cardName);
  const numberOk = digitsCard.length >= 13 && digitsCard.length <= 19;
  const expOk = isValidExpiry(exp);
  const cvcOk = /^\d{3}$/.test(cvc);
  const postalOk = isValidPostal(postal);

  const codesOk =
    codes.length === quantity && codes.every((c) => reCode.test(c));

  const canPay =
    terms &&
    emailOk &&
    codesOk &&
    (method === "crypto" || (nameOk && numberOk && expOk && cvcOk && postalOk));

  return (
    <div className="flex flex-col gap-3">
      {/* Email */}
      <div className="space-y-2">
        <p className="text-[12px] leading-[12px] font-bold text-[#010C0F]/80">
          Correo electrónico para recibir licencia
        </p>
        <div className="self-start w-[416px] h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center">
          <input
            value={emailVal}
            onChange={(e) => setEmailVal(e.target.value)}
            placeholder="Email"
            type="email"
            className="w-full bg-transparent outline-none text-[14px]"
          />
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
<div className="space-y-2">
  <p className="text-[12px] leading-[12px] font-bold text-[#010C0F]/80">
    Método de pago
  </p>

  {/* 2 columnas siempre */}
  <div className="grid grid-cols-2 gap-2 ipad:gap-3">
    <button
      type="button"
      aria-pressed={method === "card"}
      onClick={() => setMethod("card")}
      className={[
        "w-full rounded-[8px] border",
        // layout: vertical en móvil, horizontal desde sm/ipad
        "flex flex-col sm:flex-row items-center justify-center",
        "gap-1 sm:gap-2",
        // alturas/padding
        "h-[78px] px-2 py-2",            // móvil
        "sm:h-[76px] sm:px-3",           // sm/md
        "ipad:h-[60px] ipad:px-4",       // 744+
        method === "card"
          ? "bg-[#FAFAFA] border-2 border-[#3D3D3D]"
          : "bg-[#EBEBEB] border border-transparent",
        // accesibilidad/focus
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-1"
      ].join(" ")}
    >
      <img
        src="/images/home/add_card.png"
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
        "w-full rounded-[8px] border",
        "flex flex-col sm:flex-row items-center justify-center",
        "gap-1 sm:gap-2",
        "h-[78px] px-2 py-2",
        "sm:h-[76px] sm:px-3",
        "ipad:h-[60px] ipad:px-4",
        method === "crypto"
          ? "bg-[#FAFAFA] border-2 border-[#3D3D3D]"
          : "bg-[#EBEBEB] border border-transparent",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-1"
      ].join(" ")}
    >
      <img
        src="/images/home/send_money.png"
        alt=""
        className="w-5 h-5 sm:w-5 sm:h-5 ipad:w-6 ipad:h-6"
      />
      <span className="text-[12px] sm:text-[13px] ipad:text-[14px] font-bold text-[#3D3D3D] leading-tight text-center sm:text-left">
        Criptomonedas
      </span>
    </button>
  </div>
</div>


      {/* Campos tarjeta si corresponde */}
      {method === "card" && (
        <div className="space-y-2">
          <div
            className={`w-full h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center ${errBorderFilled(
              cardName,
              nameOk
            )}`}
          >
            <input
              value={cardName}
              onChange={(e) => setCardName(onlyLetters(e.target.value))}
              placeholder="Titular de la tarjeta"
              className="w-full bg-transparent outline-none text-[14px]"
            />
          </div>

          <div
            className={`w-full h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center justify-between ${errBorderFilled(
              cardNumber,
              numberOk
            )}`}
          >
            <input
              value={cardNumber}
              onChange={(e) => setCardNumber(onlyDigits(e.target.value, 19))}
              placeholder="Número de tarjeta"
              inputMode="numeric"
              className="flex-1 bg-transparent outline-none text-[14px] pr-[8px]"
            />
            <img
              src="/images/home/logos_mastercard.png"
              alt="Mastercard"
              width={24}
              height={24}
              className="shrink-0"
            />
          </div>

          <div className="grid grid-cols-2 gap-[8px]">
            <div
              className={`h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center ${errBorderFilled(
                exp,
                expOk
              )}`}
            >
              <input
                value={exp}
                onChange={(e) => setExp(formatExpiry(e.target.value))}
                placeholder="MM/AA"
                inputMode="numeric"
                className="w-full bg-transparent outline-none text-[14px]"
              />
            </div>
            <div
              className={`h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center ${errBorderFilled(
                cvc,
                cvcOk
              )}`}
            >
              <input
                type="password"
                value={cvc}
                onChange={(e) => setCvc(onlyDigits(e.target.value, 3))}
                placeholder="CVC"
                inputMode="numeric"
                autoComplete="cc-csc"
                className="w-full bg-transparent outline-none text-[14px]"
              />
            </div>
          </div>

          <div
            className={`w-full h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center ${errBorderFilled(
              postal,
              postalOk
            )}`}
          >
            <input
              value={postal}
              onChange={(e) => setPostal(e.target.value)}
              placeholder="Código postal"
              className="w-full bg-transparent outline-none text-[14px]"
            />
          </div>
        </div>
      )}

      <button
        type="button"
        disabled={!canPay}
        onClick={onSubmit}
        aria-disabled={!canPay}
        className={`mt-2 w-full h-[54px] rounded-[8px] px-[10px] inline-flex items-center justify-center gap-[10px]
        text-white text-[14px] font-semibold ${
          canPay
            ? "bg-black hover:bg-black/90"
            : "bg-black/40 cursor-not-allowed"
        } focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30`}
      >
        Pagar ahora
      </button>
    </div>
  );
}
