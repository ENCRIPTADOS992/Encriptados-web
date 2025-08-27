// src/shared/components/ModalPayment/new/SimForm.tsx
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

const TERMS_URL = "https://encriptados.io/pages/terminos-y-condiciones/";


export default function SimForm({
  onSubmit,
}: {
  onSubmit: (data: any) => void | Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      telegram: "",
      fullName: "",
      address: "",
      country: "",
      postalCode: "",
      phone: "",
      method: "crypto",
      cardName: "",
      cardNumber: "",
      exp: "",
      cvc: "",
      cardPostal: "",
    },
  });

  const method = watch("method");
  const [terms, setTerms] = React.useState(true);
  
  const wrap = (invalid?: boolean) =>
    `h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center ${
      invalid ? "border-2 border-red-500" : "border-2 border-transparent"
    }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      {/* Email / Telegram */}
      <div className="grid grid-cols-2 gap-3">
        <div className={wrap(!!errors.email)}>
          <input
            {...register("email", { required: true })}
            placeholder="Ingresa tu Email"
            type="email"
            className="w-full bg-transparent outline-none text-[14px]"
          />
        </div>
        <div className={wrap()}>
          <input
            {...register("telegram")}
            placeholder="ID Telegram (opcional)"
            className="w-full bg-transparent outline-none text-[14px]"
          />
        </div>
      </div>

      {/* Nombre envío */}
      <div className={wrap(!!errors.fullName)}>
        <input
          {...register("fullName", { required: true })}
          placeholder="Nombre de envío"
          className="w-full bg-transparent outline-none text-[14px]"
        />
      </div>

      {/* Dirección / País */}
      <div className="grid grid-cols-2 gap-3">
        <div className={wrap(!!errors.address)}>
          <input
            {...register("address", { required: true })}
            placeholder="Dirección de envío"
            className="w-full bg-transparent outline-none text-[14px]"
          />
        </div>
        <div className={wrap(!!errors.country)}>
          <select
            {...register("country", { required: true })}
            className="w-full bg-transparent outline-none text-[14px]"
          >
            <option value="">País</option>
            <option value="US">Estados Unidos</option>
            <option value="MX">México</option>
            <option value="CO">Colombia</option>
          </select>
        </div>
      </div>

      {/* Código postal / Teléfono */}
      <div className="grid grid-cols-2 gap-3">
        <div className={wrap(!!errors.postalCode)}>
          <input
            {...register("postalCode", { required: true })}
            placeholder="Código postal"
            className="w-full bg-transparent outline-none text-[14px]"
          />
        </div>
        <div className={wrap(!!errors.phone)}>
          <input
            {...register("phone", { required: true })}
            placeholder="Teléfono"
            className="w-full bg-transparent outline-none text-[14px]"
          />
        </div>
      </div>
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

      {/* Método de pago (mismo estilo que NewUserForm) */}
      <div className="space-y-2">
        <p className="text-[12px] leading-[12px] font-bold text-[#010C0F]/80">
          Método de pago
        </p>

        <div className="grid grid-cols-2 gap-2 ipad:gap-[10px]">
          <label
            className={[
              "w-full rounded-[8px] flex flex-col items-center justify-center",
              "gap-1 sm:gap-2 ipad:gap-[10px]",
              "h-[78px] px-2 py-2",
              "sm:h-[76px] sm:px-3 sm:py-3",
              "ipad:h-[80px] ipad:px-[14px] ipad:pt-[24px] ipad:pb-[24px]",
              method === "card"
                ? "bg-[#FAFAFA] border-2 border-[#3D3D3D]"
                : "bg-[#EBEBEB] border border-transparent",
            ].join(" ")}
          >
            <input
              type="radio"
              value="card"
              {...register("method")}
              className="hidden"
            />
            <img
              src="/images/home/add_card.png"
              alt=""
              className="w-5 h-5 sm:w-6 sm:h-6 ipad:w-6 ipad:h-6"
            />
            <span className="text-[12px] sm:text-[13px] ipad:text-[14px] font-bold text-[#3D3D3D] leading-tight text-center">
              Tarjeta de crédito
            </span>
          </label>

          <label
            className={[
              "w-full rounded-[8px] flex flex-col items-center justify-center",
              "gap-1 sm:gap-2 ipad:gap-[10px]",
              "h-[78px] px-2 py-2",
              "sm:h-[76px] sm:px-3 sm:py-3",
              "ipad:h-[80px] ipad:px-[14px] ipad:pt-[24px] ipad:pb-[24px]",
              method === "crypto"
                ? "bg-[#FAFAFA] border-2 border-[#3D3D3D]"
                : "bg-[#EBEBEB] border border-transparent",
            ].join(" ")}
          >
            <input
              type="radio"
              value="crypto"
              {...register("method")}
              className="hidden"
            />
            <img
              src="/images/home/send_money.png"
              alt=""
              className="w-5 h-5 sm:w-6 sm:h-6 ipad:w-6 ipad:h-6"
            />
            <span className="text-[12px] sm:text-[13px] ipad:text-[14px] font-bold text-[#3D3D3D] leading-tight text-center">
              Criptomonedas
            </span>
          </label>
        </div>
      </div>

      {/* Campos de tarjeta cuando el método es "card" (mismo look) */}
      {method === "card" && (
        <div className="space-y-2">
          <div className={wrap()}>
            <input
              {...register("cardName")}
              placeholder="Titular de la tarjeta"
              className="w-full bg-transparent outline-none text-[14px]"
            />
          </div>

          <div className={`${wrap()} justify-between`}>
            <input
              {...register("cardNumber")}
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
            <div className={wrap()}>
              <input
                {...register("exp")}
                placeholder="MM/AA"
                inputMode="numeric"
                className="w-full bg-transparent outline-none text-[14px]"
              />
            </div>
            <div className={wrap()}>
              <input
                type="password"
                {...register("cvc")}
                placeholder="CVC"
                inputMode="numeric"
                autoComplete="cc-csc"
                className="w-full bg-transparent outline-none text-[14px]"
              />
            </div>
          </div>

          <div className={wrap()}>
            <input
              {...register("cardPostal")}
              placeholder="Código postal"
              className="w-full bg-transparent outline-none text-[14px]"
            />
          </div>
        </div>
      )}

      {/* Botón pagar */}
      <button
        type="submit"
        className="
          mt-2 w-full h-[54px]
          rounded-[8px] px-[10px]
          inline-flex items-center justify-center gap-[10px]
          text-white text-[14px] font-semibold
          bg-black hover:bg-black/90
          focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30
        "
      >
        Pagar ahora
      </button>
    </form>
  );
}
