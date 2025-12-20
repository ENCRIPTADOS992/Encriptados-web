// src/shared/components/ModalPayment/new/SimForm.tsx
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { buildSimFormConfig } from "./sims/config/simFormConfig";
import type { FormType, SimFormValues } from "./sims/types/simFormTypes";
import { useSimStripeBridge } from "./sims/hooks/useSimStripeBridge";

import { SimTypeAlertSection } from "./sims/components/SimTypeAlertSection";
import { BuyerFieldsSection } from "./sims/components/BuyerFieldsSection";
import { PaymentMethodSection } from "./sims/components/PaymentMethodSection";
import { CardFieldsSection } from "./sims/components/CardFieldsSection";

const TERMS_URL = "https://encriptados.io/pages/terminos-y-condiciones/";

type SimFormProps = {
  onSubmit: (data: SimFormValues) => void | Promise<void>;
  formType?: FormType;
  loading?: boolean;
  hideSimField?: boolean;
  onStripeConfirmReady?: (fn: ((...args: any[]) => Promise<any>) | null) => void;
};

export default function SimForm({
  onSubmit,
  formType = "encrypted_generic",
  loading = false,
  hideSimField = false,
  onStripeConfirmReady,
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
  const method = watch("method");

  const [terms, setTerms] = React.useState(true);

  const { stripeStatus, mountError } = useSimStripeBridge({
    method,
    onStripeConfirmReady,
  });

  const CFG = React.useMemo(
    () => buildSimFormConfig(formType, hideSimField),
    [formType, hideSimField]
  );

  const emailOk = /\S+@\S+\.\S+/.test(email) && email.length <= 100;
  const phoneOk = phone.trim().length >= 7;
  const simOk = simNumber.trim().length >= 6;
  const postalOk = postalCode.trim().length > 0;
  const fullNameOk = fullName.trim() !== "";
  const addressOk = address.trim() !== "";
  const countryOk = country.trim() !== "";

  const typeSpecificOk =
    formType === "encrypted_physical" || formType === "encrypted_generic"
      ? fullNameOk && addressOk && countryOk && postalOk && phoneOk
      : formType === "encrypted_data"
      ? !CFG.showSimNumber || simOk
      : formType === "encrypted_minutes"
      ? simOk
      : true;

  const methodSpecificOk =
    method === "crypto"
      ? true
      : stripeStatus === "ready" && cardName.trim().length > 1;

  const canPay = terms && emailOk && typeSpecificOk && methodSpecificOk;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <SimTypeAlertSection formType={formType} />

      <p className="text-[14px] font-bold leading-[14px] text-[#010C0F]/80 !mt-1.5">
        Datos de compra
      </p>

      <BuyerFieldsSection
        formType={formType}
        cfg={CFG}
        register={register}
        errors={errors}
        countryValue={country}
      />

      <label className="flex items-center gap-2 text-[12px] leading-[18px] text-[#010C0F] !mt-1.5">
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

      <PaymentMethodSection method={method} setValue={setValue} />

      <CardFieldsSection
        method={method}
        register={register}
        mountError={mountError ?? null}
      />

      <button
        type="submit"
        disabled={!canPay || loading}
        aria-disabled={!canPay || loading}
        className={`!mt-2 w-full h-[54px]
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
