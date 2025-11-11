// src/shared/components/ModalPayment/new/SimForm.tsx
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

const TERMS_URL = "https://encriptados.io/pages/terminos-y-condiciones/";

type FormType =
  | "encrypted_physical"
  | "encrypted_esim"
  | "encrypted_data"
  | "encrypted_minutes"
  | "encrypted_generic";

export default function SimForm({
  onSubmit,
  formType = "encrypted_generic",
}: {
  onSubmit: (data: any) => void | Promise<void>;
  formType?:
    | "encrypted_physical"
    | "encrypted_esim"
    | "encrypted_data"
    | "encrypted_minutes"
    | "encrypted_generic";
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
      simNumber: "",
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

  const email = watch("email");
  const simNumber = watch("simNumber");
  const fullName = watch("fullName");
  const address = watch("address");
  const country = watch("country");
  const postalCode = watch("postalCode");
  const phone = watch("phone");

  const cardName = watch("cardName");
  const cardNumber = watch("cardNumber");
  const exp = watch("exp");
  const cvc = watch("cvc");
  const cardPostal = watch("cardPostal");

  const method = watch("method");
  const [terms, setTerms] = React.useState(true);

  const emailOk = /\S+@\S+\.\S+/.test(email) && email.length <= 100;
  const phoneOk = phone.trim().length >= 7; // sencillo (evitamos over-validar)
  const simOk = simNumber.trim().length >= 6; // idem
  const postalOk = postalCode.trim().length > 0;

  // Validadores simples de tarjeta
  const cardNameOk = cardName.trim().length > 1;
  const cardNumberOk =
    cardNumber.replace(/\s+/g, "").replace(/-/g, "").length >= 12;
  const expOk = /^(\d{2})\/(\d{2})$/.test(exp); // MM/AA
  const cvcOk = /^\d{3,4}$/.test(cvc);
  const cardPostalOk = cardPostal.trim().length > 0;

  const CFG = React.useMemo(() => {
    switch (formType) {
      case "encrypted_physical":
        return {
          emailFullWidth: false,
          showTelegram: true,
          showFullName: true,
          reqFullName: true,
          showAddress: true,
          reqAddress: true,
          showCountry: true,
          reqCountry: true,
          showPostal: true,
          reqPostal: true,
          showPhone: true,
          reqPhone: true,
          showSimNumber: false,
          reqSimNumber: false,
        };
      case "encrypted_esim":
        return {
          emailFullWidth: true,
          showTelegram: false,
          showFullName: false,
          reqFullName: false,
          showAddress: false,
          reqAddress: false,
          showCountry: false,
          reqCountry: false,
          showPostal: false,
          reqPostal: false,
          showPhone: false,
          reqPhone: false,
          showSimNumber: false,
          reqSimNumber: false,
        };
      case "encrypted_data":
      case "encrypted_minutes":
        return {
          emailFullWidth: true,
          showTelegram: false,
          showFullName: false,
          reqFullName: false,
          showAddress: false,
          reqAddress: false,
          showCountry: false,
          reqCountry: false,
          showPostal: false,
          reqPostal: false,
          showPhone: false,
          reqPhone: false,
          showSimNumber: true,
          reqSimNumber: true,
        };
      default:
        return {
          emailFullWidth: false,
          showTelegram: true,
          showFullName: true,
          reqFullName: true,
          showAddress: true,
          reqAddress: true,
          showCountry: true,
          reqCountry: true,
          showPostal: true,
          reqPostal: true,
          showPhone: true,
          reqPhone: true,
          showSimNumber: false,
          reqSimNumber: false,
        };
    }
  }, [formType]);

  const typeSpecificOk =
    formType === "encrypted_physical" || formType === "encrypted_generic"
      ? fullName.trim() !== "" &&
        address.trim() !== "" &&
        country.trim() !== "" &&
        postalOk &&
        phoneOk
      : formType === "encrypted_data" || formType === "encrypted_minutes"
      ? simOk
      : /* encrypted_esim */ true;

  const methodSpecificOk =
    method === "crypto"
      ? true
      : cardNameOk && cardNumberOk && expOk && cvcOk && cardPostalOk;

  const canPay = terms && emailOk && typeSpecificOk && methodSpecificOk;

  const wrap = (invalid?: boolean) =>
    `h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center ${
      invalid ? "border-2 border-red-500" : "border-2 border-transparent"
    }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      {/* Email (full width para eSIM/recargas)  Telegram opcional */}
      {CFG.emailFullWidth ? (
        <div className={`${wrap(!!errors.email)} w-[416px] max-w-full`}>
          <input
            {...register("email", { required: true })}
            placeholder="Ingresa tu Email"
            type="email"
            className="w-full bg-transparent outline-none text-[14px]"
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <div className={wrap(!!errors.email)}>
            <input
              {...register("email", { required: true })}
              placeholder="Ingresa tu Email"
              type="email"
              className="w-full bg-transparent outline-none text-[14px]"
            />
          </div>
          {CFG.showTelegram ? (
            <div className={wrap()}>
              <input
                {...register("telegram")}
                placeholder="ID Telegram (opcional)"
                className="w-full bg-transparent outline-none text-[14px]"
              />
            </div>
          ) : (
            <div />
          )}
        </div>
      )}

      {/* Número de SIM (solo recargas datos/minutos) */}
      {CFG.showSimNumber && (
  <div className={`${wrap(!!errors.simNumber)} w-[416px] max-w-full`}>
    <input
      {...register("simNumber", { required: CFG.reqSimNumber })}
      placeholder="Número de SIM"
      className="w-full bg-transparent outline-none text-[14px]"
    />
  </div>
)}


      {/* Nombre envío (solo físico/genérico) */}
      <div className="grid grid-cols-2 gap-3">
        {CFG.showFullName && (
          <div className={wrap(!!errors.fullName)}>
            <input
              {...register("fullName", { required: CFG.reqFullName })}
              placeholder="Nombre de envío"
              className="w-full bg-transparent outline-none text-[14px]"
            />
          </div>
        )}

        {/* Dirección / País (solo físico/genérico) */}
        {CFG.showCountry ? (
          <div
            className={wrap(
              !!errors.country || (country.length > 0 && country.trim() === "")
            )}
          >
            <input
              {...register("country", {
                required: CFG.reqCountry,
                maxLength: 64,
              })}
              placeholder="País"
              className="w-full bg-transparent outline-none text-[14px]"
              autoComplete="country-name"
              autoCapitalize="words"
            />
          </div>
        ) : (
          <div />
        )}
      </div>

      {/* Código postal / Teléfono */}
      {/* Código postal / Teléfono (solo físico/genérico) */}
      {(CFG.showPostal || CFG.showPhone) && (
        <div className="grid grid-cols-2 gap-3">
          {CFG.showPostal ? (
            <div className={wrap(!!errors.postalCode)}>
              <input
                {...register("postalCode", { required: CFG.reqPostal })}
                placeholder="Código postal"
                className="w-full bg-transparent outline-none text-[14px]"
              />
            </div>
          ) : (
            <div />
          )}
          {CFG.showPhone ? (
            <div className={wrap(!!errors.phone)}>
              <input
                {...register("phone", { required: CFG.reqPhone })}
                placeholder="Teléfono"
                className="w-full bg-transparent outline-none text-[14px]"
              />
            </div>
          ) : (
            <div />
          )}
        </div>
      )}
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
        disabled={!canPay}
        aria-disabled={!canPay}
        className={`mt-2 w-full h-[54px]
          rounded-[8px] px-[10px]
          inline-flex items-center justify-center gap-[10px]
          text-white text-[14px] font-semibold
          ${
            canPay
              ? "bg-black hover:bg-black/90"
              : "bg-black/40 cursor-not-allowed"
          }
          focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30`}
        title={
          !canPay
            ? "Completa los datos requeridos y acepta los términos"
            : "Pagar ahora"
        }
      >
        Pagar ahora
      </button>
    </form>
  );
}
