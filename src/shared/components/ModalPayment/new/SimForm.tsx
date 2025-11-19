// src/shared/components/ModalPayment/new/SimForm.tsx
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useStripeSplit } from "@/shared/hooks/useStripeSplit";

const TERMS_URL = "https://encriptados.io/pages/terminos-y-condiciones/";

type FormType =
  | "encrypted_physical"
  | "encrypted_esim"
  | "encrypted_data"
  | "encrypted_minutes"
  | "encrypted_generic";

export type SimFormValues = {
  email: string;
  telegram: string;
  simNumber: string;
  fullName: string;
  address: string;
  country: string;
  postalCode: string;
  phone: string;
  method: "card" | "crypto";
  cardName: string;
  cardNumber: string;
  exp: string;
  cvc: string;
  cardPostal: string;
};

type SimFormProps = {
  onSubmit: (data: SimFormValues) => void | Promise<void>;
  formType?: FormType;
  loading?: boolean;
};

export default function SimForm({
  onSubmit,
  formType = "encrypted_generic",
  loading = false, 
}: SimFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<SimFormValues>({

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

  const {
    status: stripeStatus,
    error: mountError,
  } = useStripeSplit(method === "card");


  const emailOk = /\S+@\S+\.\S+/.test(email) && email.length <= 100;
  const phoneOk = phone.trim().length >= 7;
  const simOk = simNumber.trim().length >= 6;
  const postalOk = postalCode.trim().length > 0;

  const cardNameOk = cardName.trim().length > 1;
  const cardNumberOk =
    cardNumber.replace(/\s+/g, "").replace(/-/g, "").length >= 12;
  const expOk = /^(\d{2})\/(\d{2})$/.test(exp);
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
      : true;

    const methodSpecificOk =
      method === "crypto"
        ? true
        : stripeStatus === "ready" && cardName.trim().length > 1;

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

      {/* Método de pago (mismo look & feel que RoningForm) */}
      <div className="space-y-2">
        <p className="text-[12px] leading-[12px] font-bold text-[#010C0F]/80">
          Método de pago
        </p>

        <div className="grid grid-cols-2 gap-2 ipad:gap-3">
          <button
            type="button"
            aria-pressed={method === "card"}
            onClick={() => setValue("method", "card", { shouldValidate: true })}
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
            onClick={() => setValue("method", "crypto", { shouldValidate: true })}
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


      {/* Campos de tarjeta cuando el método es "card" (mismo look) */}
            {method === "card" && (
        <div className="space-y-2">
          {/* Titular */}
          <div className={wrap()}>
            <input
              {...register("cardName")}
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

          {/* Código postal (igual que en RoningForm) */}
          <div className="w-full h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center">
            <input
              {...register("cardPostal")}
              placeholder="Código postal"
              className="w-full bg-transparent outline-none text-[14px]"
              autoComplete="postal-code"
            />
          </div>

          {(mountError) && (
            <p className="text-red-600 text-sm">{mountError}</p>
          )}
        </div>
      )}

      {/* Botón pagar */}
      <button
        type="submit"
        disabled={!canPay || loading}
        aria-disabled={!canPay || loading}
        className={`mt-2 w-full h-[54px]
          rounded-[8px] px-[10px]
          inline-flex items-center justify-center gap-[10px]
          text-white text-[14px] font-semibold
          ${
            canPay && !loading
              ? "bg-black hover:bg-black/90"
              : "bg-black/40 cursor-not-allowed"
          }
          focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30`}
      >
        {loading ? "Procesando..." : "Pagar ahora"}
      </button>
    </form>
  );
}
