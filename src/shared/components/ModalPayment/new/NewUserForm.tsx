// src/shared/components/ModalPayment/new/NewUserForm.tsx
"use client";

import React from "react";
import Link from "next/link";

const TERMS_URL = "https://encriptados.io/pages/terminos-y-condiciones/";

type Props = {
  email?: string;
  onSubmit?: () => void;
};

export default function NewUserForm({ email = "", onSubmit }: Props) {
  // ---- state
  const [suggest1, setSuggest1] = React.useState("j41b5");
  const [suggest2, setSuggest2] = React.useState("1O14");
  const [customUser, setCustomUser] = React.useState("");
  const [emailVal, setEmailVal] = React.useState(email);
  const [terms, setTerms] = React.useState(false);
  const [method, setMethod] = React.useState<"card" | "crypto">("card");

  // credit card fields
  const [cardName, setCardName] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [exp, setExp] = React.useState(""); // MM/AA
  const [cvc, setCvc] = React.useState("");
  const [postal, setPostal] = React.useState("");

  // ---- validation (simple, para estilos)
  const reUser = /^[a-zA-Z0-9]{4,20}$/;
  const invalid1 = suggest1.length > 0 && !reUser.test(suggest1);
  const invalid2 = suggest2.length > 0 && !reUser.test(suggest2);

  const emailOk =
    /\S+@\S+\.\S+/.test(emailVal) &&
    emailVal.length <= 100 &&
    emailVal.length > 5;

  const canPay =
    terms &&
    emailOk &&
    (method === "crypto" || (cardName && cardNumber && exp && cvc));

  // ---- styles helpers
  const inputBase =
    "h-[36px] rounded-[6px] px-3 text-[14px] border outline-none focus:ring-1 focus:ring-black/20";
  const inputOk = "border-gray-300 bg-white";
  const inputErr = "border-red-500 bg-white";

  return (
    <div className="flex flex-col gap-3">
      {/* --- Sugerencias --- */}
      <div className="space-y-2">
        <p className="text-[12px] leading-[12px] font-bold text-[#010C0F]/80">
          Ingresa los nombres sugeridos
        </p>
        <p className="rounded-[8px] px-3 py-2 text-[12px] leading-[14px] bg-amber-50 border border-amber-200">
          Puedes sugerir nombres de usuarios con un mínimo de 4 caracteres y
          máximo 20 alfanuméricos.
        </p>

        {/* Sugerencia 1 */}
        <div
          className={`w-full h-[42px] rounded-[8px] border-2 ${
            invalid1 ? "border-red-500" : "border-[#3D3D3D]"
          } px-[14px] py-[8px] flex items-center gap-[10px]`}
        >
          <input
            value={suggest1}
            onChange={(e) => setSuggest1(e.target.value)}
            placeholder="Ingresa nombre de usuario"
            className="w-full bg-transparent outline-none text-[14px]"
          />
        </div>

        {/* Sugerencia 2 */}
        <div
          className={`w-full h-[42px] rounded-[8px] border-2 ${
            invalid2 ? "border-red-500" : "border-[#3D3D3D]"
          } px-[14px] py-[8px] flex items-center gap-[10px]`}
        >
          <input
            value={suggest2}
            onChange={(e) => setSuggest2(e.target.value)}
            placeholder="Ingresa nombre de usuario"
            className="w-full bg-transparent outline-none text-[14px]"
          />
        </div>

        {/* Custom */}
        <div className="w-full h-[42px] rounded-[8px] border-2 border-[#3D3D3D] px-[14px] py-[8px] flex items-center gap-[10px]">
          <input
            value={customUser}
            onChange={(e) => setCustomUser(e.target.value)}
            placeholder="Ingresa nombre de usuario"
            className="w-full bg-transparent outline-none text-[14px]"
          />
        </div>
      </div>

      {/* --- Email --- */}
      <div className="space-y-2">
        <p className="text-[12px] leading-[12px] font-bold text-[#010C0F]/80">
          Correo electrónico para recibir licencia
        </p>

        {/* pegado a la izquierda: self-start; 416x42, r=8, p=14, bg #EBEBEB */}
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

      {/* --- TyC --- */}
      <label className="flex items-center gap-2 text-[12px] leading-[18px] text-[#010C0F]">
        <input
          type="checkbox"
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
          className="
      w-[18px] h-[18px]
      border-2 border-black           
      rounded-[2px]
      accent-black                
      focus:outline-none focus:ring-0
    "
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

      {/* --- Método de pago --- */}
      <div className="space-y-2">
        <p className="text-[12px] leading-[12px] font-bold text-[#010C0F]/80">
          Método de pago
        </p>
        <div className="grid grid-cols-2 gap-[10px]">
          {/* Tarjeta */}
          <button
            type="button"
            aria-pressed={method === "card"}
            onClick={() => setMethod("card")}
            className={`
      w-[228px] h-[80px]
      rounded-[8px] px-[14px] pt-[24px] pb-[24px]
      flex flex-col items-center justify-center gap-[10px]
      ${
        method === "card"
          ? "bg-[#FAFAFA] border-2 border-[#3D3D3D]"
          : "bg-[#EBEBEB] border border-transparent"
      }
    `}
          >
            <img
              src="/images/home/add_card.png"
              alt=""
              width={24}
              height={24}
              className="block"
            />
            <span className="text-[14px] font-bold text-[#3D3D3D]">
              Tarjeta de crédito
            </span>
          </button>

          {/* Cripto */}
          <button
            type="button"
            aria-pressed={method === "crypto"}
            onClick={() => setMethod("crypto")}
            className={`
      w-[228px] h-[80px]
      rounded-[8px] px-[14px] pt-[24px] pb-[24px]
      flex flex-col items-center justify-center gap-[10px]
      ${
        method === "crypto"
          ? "bg-[#FAFAFA] border-2 border-[#3D3D3D]"
          : "bg-[#EBEBEB] border border-transparent"
      }
    `}
          >
            <img
              src="/images/home/send_money.png"
              alt=""
              width={24}
              height={24}
              className="block"
            />
            <span className="text-[14px] font-bold text-[#3D3D3D]">
              Criptomonedas
            </span>
          </button>
        </div>
      </div>

      {/* --- Form tarjeta --- */}
      {method === "card" && (
        <div className="space-y-2">
          <div className="w-full h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center">
            <input
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="Titular de la tarjeta"
              className="w-full bg-transparent outline-none text-[14px]"
            />
          </div>

          <div className="w-full h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center justify-between">
            <input
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
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
            <div className="h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center">
              <input
                value={exp}
                onChange={(e) => setExp(e.target.value)}
                placeholder="MM/AA"
                inputMode="numeric"
                className="w-full bg-transparent outline-none text-[14px]"
              />
            </div>

            <div className="h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center">
              <input
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                placeholder="CVC"
                inputMode="numeric"
                className="w-full bg-transparent outline-none text-[14px]"
              />
            </div>
          </div>

          <div className="w-full h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center">
            <input
              value={postal}
              onChange={(e) => setPostal(e.target.value)}
              placeholder="Código postal"
              className="w-full bg-transparent outline-none text-[14px]"
            />
          </div>
        </div>
      )}

      {/* --- CTA --- */}
      <button
        type="button"
        disabled={!canPay}
        onClick={onSubmit}
        aria-disabled={!canPay}
        className={`
    mt-2 w-full h-[54px] 
    rounded-[8px] px-[10px]
    inline-flex items-center justify-center gap-[10px]
    text-white text-[14px] font-semibold
    ${canPay ? "bg-black hover:bg-black/90" : "bg-black/40 cursor-not-allowed"}
    focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30
  `}
      >
        Pagar ahora
      </button>
    </div>
  );
}
