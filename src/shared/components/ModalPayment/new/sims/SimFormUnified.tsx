// src/shared/components/ModalPayment/new/sims/SimFormUnified.tsx
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { buildSimFormConfig } from "./config/simFormConfig";
import type { FormType, SimFormValues } from "./types/simFormTypes";
import type { ModalProduct, SuccessPaymentData } from "./types/modalSimTypes";

import { useStripeSplit } from "@/shared/hooks/useStripeSplit";
import { confirmCardPayment } from "@/payments/stripeClient";
import { tottoliCheckout } from "@/features/products/payments/tottoliCheckout";

import { SimTypeAlertSection } from "./components/SimTypeAlertSection";
import { BuyerFieldsSection } from "./components/BuyerFieldsSection";
import { PaymentMethodSection } from "./components/PaymentMethodSection";

const TERMS_URL = "https://encriptados.io/pages/terminos-y-condiciones/";

type SimFormUnifiedProps = {
  formType: FormType;
  productid?: string;
  product?: ModalProduct;
  unitPrice: number;
  quantity: number;
  discount?: number;
  hideSimField?: boolean;
  selectedPlanId?: string | number | null;
  selectedVariantId?: number | null;
  sourceUrl?: string;
  onSuccess?: (data: SuccessPaymentData) => void;
  loading?: boolean;
};

type Method = "card" | "crypto";
type Phase = "form" | "card_confirm";

export default function SimFormUnified({
  formType,
  // productid y product se mantienen para posible uso futuro (ej: TIM)
  productid: _productid = undefined,
  product: _product = undefined,
  unitPrice,
  quantity,
  discount = 0,
  hideSimField = false,
  selectedPlanId = null,
  selectedVariantId = null,
  sourceUrl = undefined,
  onSuccess,
  loading = false,
}: SimFormUnifiedProps) {
  // Suprimir warnings de variables no usadas
  void _productid;
  void _product;
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
      simNumbers: [""],
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
  const simNumbers = watch("simNumbers") ?? [];
  const fullName = watch("fullName");
  const address = watch("address");
  const country = watch("country");
  const postalCode = watch("postalCode");
  const phone = watch("phone");
  const cardName = watch("cardName");
  const method = watch("method") as Method;

  const [terms, setTerms] = React.useState(true);
  const [phase, setPhase] = React.useState<Phase>("form");
  const [clientSecret, setClientSecret] = React.useState<string | null>(null);
  const [stripeError, setStripeError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState<SimFormValues | null>(null);

  // Stripe - solo se activa cuando método es "card"
  const { status: stripeStatus, error: mountError, stripeRef, splitRef } = useStripeSplit(method === "card");

  const CFG = React.useMemo(
    () => buildSimFormConfig(formType, hideSimField),
    [formType, hideSimField]
  );

  // Validaciones
  const emailOk = /\S+@\S+\.\S+/.test(email) && email.length <= 100;
  const phoneOk = phone.trim().length >= 7;
  const useMultiSimNumbers = quantity > 1;
  const normalizedSimNumbers = (useMultiSimNumbers ? simNumbers : [simNumber])
    .map((x) => String(x ?? "").trim())
    .filter((x) => x.length > 0);
  const simOk = CFG.showSimNumber
    ? normalizedSimNumbers.length === (useMultiSimNumbers ? quantity : 1) &&
    normalizedSimNumbers.every((n) => n.length >= 6)
    : true;
  const postalOk = postalCode.trim().length > 0;
  const fullNameOk = fullName.trim() !== "";
  const addressOk = address.trim() !== "";
  const countryOk = country.trim() !== "";

  const isPhysical = formType === "encrypted_physical" || formType === "encrypted_generic";

  const typeSpecificOk =
    isPhysical
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

  const canPay = terms && emailOk && typeSpecificOk && methodSpecificOk && !isSubmitting && !loading;

  React.useEffect(() => {
    if (!CFG.showSimNumber) return;
    if (quantity <= 1) return;
    const current = (watch("simNumbers") ?? []) as string[];
    const next = [...current];
    if (quantity > next.length) next.push(...Array(quantity - next.length).fill(""));
    else if (quantity < next.length) next.length = quantity;
    setValue("simNumbers", next, { shouldValidate: false });
  }, [quantity, CFG.showSimNumber, setValue, watch]);

  // Calcular montos
  const shippingFee = isPhysical ? 75 : 0;
  const baseAmount = Number(unitPrice) * quantity - discount;
  const amountUsd = Math.max(baseAmount + shippingFee, 0);

  const buttonLabel = React.useMemo(() => {
    if (isSubmitting || loading) return "Procesando...";
    return "Pagar ahora";
  }, [isSubmitting, loading]);

  // Paso 1: Crear orden y obtener client_secret (o redirigir a crypto)
  // Handler unificado de pago directo
  const handlePay = async () => {
    await handleSubmit(async (data: SimFormValues) => {
      console.log("[SimFormUnified] START PAY 👉", { data, method });
      setFormData(data);
      setStripeError(null);
      setIsSubmitting(true);

      try {
        // === 1. PREPARE TOTTOLI CHECKOUT PAYLOAD ===
        const productName = (() => {
          switch (formType) {
            case "encrypted_esim":
            case "encrypted_esimData":
            case "tim_esim":
              return "esim";
            case "encrypted_data":
            case "tim_data":
              return "data";
            case "encrypted_minutes":
            case "tim_minutes":
              return "minutes";
            default:
              return "sim_physical";
          }
        })();

        const tottoliMethod = method === "card" ? "card" : "cryptomus";

        const payload: any = {
          email: data.email,
          method: tottoliMethod,
          amount: amountUsd,
          currency: "USD",
          product: productName,
          meta: {
            formType,
            quantity,
            unitPrice,
            discount,
            shippingFee,
            selectedPlanId,
            selectedVariantId,
            sourceUrl,
            simNumbers:
              quantity > 1
                ? (data.simNumbers ?? [])
                  .map((x) => String(x ?? "").trim())
                  .filter((x) => x.length > 0)
                : [String(data.simNumber ?? "").trim()].filter((x) => x.length > 0),
          },
        };

        // Add type-specific fields
        if (productName === "esim") {
          payload.qty = quantity;
        } else if (productName === "data" || productName === "minutes") {
          const nums = (quantity > 1 ? (data.simNumbers ?? []) : [data.simNumber])
            .map((x) => String(x ?? "").trim())
            .filter((x) => x.length > 0);
          payload.sim_number = nums.join(",");
        } else {
          payload.shipping_payload = {
            shipping_name: data.fullName,
            country: data.country,
            postal_code: data.postalCode,
            phone: data.phone,
            telegram_id: data.telegram,
          };
        }

        console.log("[SimFormUnified] Payload:", payload);

        // === 2. EXECUTE CHECKOUT (Create Order/Intent) ===
        const res = await tottoliCheckout(payload);
        console.log("[SimFormUnified] Response:", res);

        // === 3. HANDLE CRYPTO ===
        if (tottoliMethod === "cryptomus") {
          if ((res as any).payment_url) {
            window.location.href = (res as any).payment_url;
          } else {
            setStripeError("No se recibió URL de pago crypto.");
          }
          return; // Redirecting or error, stop here
        }

        // === 4. HANDLE CARD CONFIRMATION ===
        const secret = (res as any).client_secret;
        if (!secret) {
          throw new Error("No se recibió client_secret para el pago.");
        }
        setClientSecret(secret); // Save state just in case, though we use `secret` var

        if (!stripeRef.current || !splitRef.current?.number) {
          throw new Error("Stripe no está listo.");
        }

        const billing = {
          name: data.cardName || data.fullName || undefined,
          email: data.email,
          postal_code: data.cardPostal || data.postalCode || undefined,
        };

        console.log("[SimFormUnified] Confirming payment with Stripe...");
        const confirmRes = await confirmCardPayment(
          stripeRef.current,
          secret,
          splitRef.current.number,
          billing
        );

        if (confirmRes?.status === "succeeded") {
          const intent = confirmRes.intent;
          onSuccess?.({
            intent: {
              id: intent?.id || "unknown",
              amount: amountUsd * 100,
              currency: "usd",
              created: Math.floor(Date.now() / 1000),
            },
            orderId: null,
          });
        } else if (confirmRes?.error) {
          setStripeError(confirmRes.error);
        } else {
          setStripeError("No se pudo completar el pago.");
        }

      } catch (err: any) {
        console.error("[SimFormUnified] Error:", err);
        setStripeError(err?.message || "Error al procesar el pago.");
      } finally {
        setIsSubmitting(false);
      }
    })(); // Execute handleSubmit logic
  };

  const onlyLetters = (s: string) => s.replace(/[^A-Za-zÀ-ÿ\u00f1\u00d1\s'.-]/g, "");

  return (
    <div className="space-y-2">
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
        quantity={quantity}
      />

      <label className="flex items-center gap-2 text-[12px] leading-[18px] text-[#010C0F] !mt-1.5">
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

      <PaymentMethodSection method={method} setValue={setValue} />

      {/* Card Fields - Solo cuando método es card */}
      {method === "card" && (
        <div className="space-y-1.5">
          {/* Titular */}
          <div className="w-full h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center">
            <input
              {...register("cardName")}
              onChange={(e) => setValue("cardName", onlyLetters(e.target.value))}
              placeholder="Titular de la tarjeta"
              className="w-full bg-transparent outline-none text-[14px]"
              autoComplete="cc-name"
            />
          </div>

          {/* Card number */}
          <div className="relative">
            <div
              id="card-number-el"
              className="w-full min-h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] py-[10px]"
            />
            {(stripeStatus === "idle" || stripeStatus === "loading") && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#EBEBEB] rounded-[8px]">
                <span className="text-[12px] text-gray-500 animate-pulse">Cargando...</span>
              </div>
            )}
          </div>

          {/* Exp / CVC */}
          <div className="grid grid-cols-2 gap-[8px]">
            <div id="card-expiry-el" className="w-full min-h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] py-[10px]" />
            <div id="card-cvc-el" className="w-full min-h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] py-[10px]" />
          </div>

          {/* Postal code */}
          <div className="w-full h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center">
            <input
              {...register("cardPostal")}
              placeholder="Código postal"
              className="w-full bg-transparent outline-none text-[14px]"
              autoComplete="postal-code"
            />
          </div>

          {mountError && (
            <p className="text-red-600 text-sm">{mountError}</p>
          )}

          {(stripeStatus === "idle" || stripeStatus === "loading") && !mountError && (
            <p className="text-[12px] text-gray-500">Inicializando formulario de pago...</p>
          )}
        </div>
      )}

      {/* Stripe Error */}
      {stripeError && (
        <p className="text-red-600 text-sm">{stripeError}</p>
      )}

      {/* Botón de pago */}
      <button
        type="button"
        onClick={handlePay}
        disabled={!canPay || loading}
        aria-disabled={!canPay || loading}
        className={`mt-4 w-full h-[54px]
          rounded-lg px-4
          inline-flex items-center justify-center gap-2.5
          text-white text-sm font-semibold
          ${canPay && !loading
            ? "bg-black hover:bg-black/90"
            : "bg-black/40 cursor-not-allowed"
          }
          focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30`}
      >
        {buttonLabel}
      </button>
    </div>
  );
}
