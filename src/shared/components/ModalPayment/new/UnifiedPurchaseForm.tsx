// src/shared/components/ModalPayment/new/UnifiedPurchaseForm.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import PaymentSuccessModal from "@/payments/PaymentSuccessModal";
import { useStripeSplit } from "@/shared/hooks/useStripeSplit";
import { confirmCardPayment } from "@/payments/stripeClient";
import { createUserIdOrderAndIntent, createOrderAndIntent, fetchPublicStatus, type OrderType } from "@/lib/payments/orderApi";
import { useFormPolicy } from "./useFormPolicy";
import TelegramButtonOriginal from "@/shared/components/TelegramButton";

const TelegramButton = TelegramButtonOriginal as unknown as React.ComponentType<{
  className?: string;
  children?: React.ReactNode;
}>;

const TERMS_URL = "https://encriptados.io/pages/terminos-y-condiciones/";

type LicenseType = "new" | "renew";
type OsType = "android" | "ios";
type Method = "card" | "crypto";

// Para Silent Phone: modo de tabs de 3 opciones
type SilentPhoneMode = "new_user" | "roning_code" | "recharge";

type Props = {
  email?: string;
  quantity?: number;
  productId: number;
  amountUsd: number;
  orderType?: OrderType;
  onPayCrypto?: (formData: FormData) => Promise<void>;
  onPaid?: () => void;
  loading?: boolean;
  // Para Silent Phone: modo activo de las tabs
  silentPhoneMode?: SilentPhoneMode;
  onSilentPhoneModeChange?: (mode: SilentPhoneMode) => void;
  purchaseMeta?: {
    variantId?: number;
    sku?: string;
    licensetime?: number | string;
    couponCode?: string;
    discount?: number;
    sourceUrl?: string;
    selectedOption?: number;
  };
};

export interface FormData {
  email: string;
  telegramId?: string;
  usernames?: string[];
  licenseType?: LicenseType;
  renewId?: string;
  osType?: OsType;
  silentPhoneMode?: SilentPhoneMode;
}

export default function UnifiedPurchaseForm({
  email = "",
  quantity = 1,
  productId,
  amountUsd,
  orderType = "userid",
  onPayCrypto,
  onPaid,
  loading = false,
  silentPhoneMode = "new_user",
  onSilentPhoneModeChange,
  purchaseMeta,
}: Props) {
  const t = useTranslations("paymentModal");
  const { policy, formType, isLoading: policyLoading, productName } = useFormPolicy();

  // Estado del formulario
  const [emailVal, setEmailVal] = React.useState(email);
  const [telegramId, setTelegramId] = React.useState("");
  const [terms, setTerms] = React.useState(true);
  const [method, setMethod] = React.useState<Method>("crypto");

  // Para Software: tipo de licencia
  const [licenseType, setLicenseType] = React.useState<LicenseType>("new");
  
  // Para renovación: ID del producto a renovar
  const [renewId, setRenewId] = React.useState("");
  
  // Para SecureCrypt: sistema operativo
  const [osType, setOsType] = React.useState<OsType>("android");

  // Para Silent Phone: usernames
  const [usernames, setUsernames] = React.useState<string[]>([]);

  // Card fields
  const [cardName, setCardName] = React.useState("");
  const [postal, setPostal] = React.useState("");

  // Stripe
  const { status: stripeStatus, error: mountError, stripeRef, splitRef } = useStripeSplit(method === "card");
  const [stripeError, setStripeError] = React.useState<string | null>(null);
  const [clientSecret, setClientSecret] = React.useState("");
  const [orderId, setOrderId] = React.useState<number | null>(null);

  // Polling
  const [polling, setPolling] = React.useState(false);
  const pollRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const pollStartedAtRef = React.useRef<number>(0);

  // Success modal
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [successPI, setSuccessPI] = React.useState<any>(null);

  // Ajustar usernames cuando cambia la cantidad
  React.useEffect(() => {
    if (policy.showUsernameFields) {
      setUsernames((prev) => {
        const next = [...prev];
        if (quantity > prev.length) next.push(...Array(quantity - prev.length).fill(""));
        else if (quantity < prev.length) next.length = quantity;
        return next;
      });
    }
  }, [quantity, policy.showUsernameFields]);

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

  // Validaciones
  const reUser = /^[a-zA-Z0-9]{4,20}$/;
  // Solo validar usernames si showUsernameFields es true Y estamos en modo "new_user"
  // En modo "roning_code" o "recharge" no se requieren usernames
  const requiresUsernames = policy.showUsernameFields && silentPhoneMode === "new_user";
  const usernamesOk = !requiresUsernames || 
    (usernames.length === quantity && usernames.every((u) => reUser.test(u)));
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
      ? t("payNow")
      : phase === "card_init"
      ? t("continue")
      : polling
      ? t("processing")
      : t("confirmPayment");

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

  const getFormData = (): FormData => ({
    email: emailVal.trim(),
    telegramId: telegramId.trim() || undefined,
    usernames: policy.showUsernameFields ? usernames : undefined,
    licenseType: policy.showLicenseTabs && policy.licenseTabType === "new_renew" ? licenseType : undefined,
    renewId: licenseType === "renew" ? renewId.trim() || undefined : undefined,
    osType: policy.showOsSelector ? osType : undefined,
    silentPhoneMode: formType === "SILENT_PHONE" ? silentPhoneMode : undefined,
  });

  const handlePay = async () => {
    if (!canPay) return;

    if (method === "crypto") {
      await onPayCrypto?.(getFormData());
      return;
    }

    if (!clientSecret) {
      try {
        setStripeError(null);
        const form = getFormData();
        const primaryUsername = usernames[0]?.trim() || form.telegramId?.trim() || undefined;
        const meta = {
          ...purchaseMeta,
          email: form.email,
          telegramId: form.telegramId,
          usernames: form.usernames,
          licenseType: form.licenseType,
          renewId: form.renewId,
          osType: form.osType,
          silentPhoneMode: form.silentPhoneMode,
          quantity,
        };

        // Usar la API correcta según el tipo de orden
        let orderResult: { order_id: number; client_secret: string };
        
        if (orderType === "roaming") {
          orderResult = await createOrderAndIntent({
            orderType: "roaming",
            productId,
            email: emailVal.trim(),
            quantity,
            amountUsd,
            currency: "USD",
            variantId: purchaseMeta?.variantId,
            sku: purchaseMeta?.sku,
            licensetime: purchaseMeta?.licensetime,
            couponCode: purchaseMeta?.couponCode,
            discount: purchaseMeta?.discount,
            sourceUrl: purchaseMeta?.sourceUrl,
            selectedOption: purchaseMeta?.selectedOption,
            silentPhoneMode: form.silentPhoneMode,
            usernames: form.usernames,
            meta,
          });
        } else {
          orderResult = await createUserIdOrderAndIntent({
            productId,
            email: emailVal.trim(),
            username: primaryUsername,
            amountUsd,
            currency: "USD",
            qty: quantity,
            variantId: purchaseMeta?.variantId,
            sku: purchaseMeta?.sku,
            licensetime: purchaseMeta?.licensetime,
            licenseType: form.licenseType,
            renewId: form.renewId,
            osType: form.osType,
            silentPhoneMode: form.silentPhoneMode,
            usernames: form.usernames,
            couponCode: purchaseMeta?.couponCode,
            discount: purchaseMeta?.discount,
            sourceUrl: purchaseMeta?.sourceUrl,
            selectedOption: purchaseMeta?.selectedOption,
            meta,
          });
        }

        setOrderId(orderResult.order_id);
        setClientSecret(orderResult.client_secret);
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

  const baseBtnClass =
    "h-11 rounded-[8px] px-[14px] text-[12px] leading-[12px] font-bold flex items-center justify-center text-center flex-1";
  const inactiveClass = "bg-[#EBEBEB] text-[#3D3D3D] border border-transparent";
  const activeClass = "bg-white text-black border-2 border-[#3D3D3D]";

  // Determinar si mostrar el formulario de pago (ocultar cuando Silent Phone está en modo recharge)
  const isRechargeMode = formType === "SILENT_PHONE" && silentPhoneMode === "recharge";
  const showPaymentForm = !isRechargeMode;

  if (policyLoading) {
    return (
      <div className="flex flex-col gap-3 animate-pulse">
        <div className="h-10 bg-gray-200 rounded" />
        <div className="h-10 bg-gray-200 rounded" />
        <div className="h-12 bg-gray-300 rounded" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* === OS SELECTOR (solo SecureCrypt) === */}
        {policy.showOsSelector && (
          <div className="space-y-1.5">
            <p className="text-[12px] leading-[12px] font-bold text-[#010C0F]/80">
              Selecciona tu sistema operativo
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                aria-pressed={osType === "android"}
                onClick={() => setOsType("android")}
                className={[baseBtnClass, osType === "android" ? activeClass : inactiveClass, "flex items-center justify-center gap-2"].join(" ")}
              >
                Android
                <Image src="/icons/androi-icono.svg" alt="" width={20} height={20} />
              </button>
              <button
                type="button"
                aria-pressed={osType === "ios"}
                onClick={() => setOsType("ios")}
                className={[baseBtnClass, osType === "ios" ? activeClass : inactiveClass, "flex items-center justify-center gap-2"].join(" ")}
              >
                iOS (iPhone)
                <Image src="/icons/ios-icono.svg" alt="" width={20} height={20} />
              </button>
            </div>
          </div>
        )}

        {/* === LICENSE TABS (Nueva/Renovar para Software) === */}
        {policy.showLicenseTabs && policy.licenseTabType === "new_renew" && (
          <div className="space-y-1.5">
            <p className="text-[12px] leading-[12px] font-bold text-[#010C0F]/80">
              {t("licenseQuestion")}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                aria-pressed={licenseType === "new"}
                onClick={() => setLicenseType("new")}
                className={[baseBtnClass, licenseType === "new" ? activeClass : inactiveClass].join(" ")}
              >
                {t("newLicense")}
              </button>
              <button
                type="button"
                aria-pressed={licenseType === "renew"}
                onClick={() => setLicenseType("renew")}
                className={[baseBtnClass, licenseType === "renew" ? activeClass : inactiveClass].join(" ")}
              >
                {t("renewLicense")}
              </button>
            </div>
          </div>
        )}

        {/* === RENEW ID FIELD (cuando se selecciona Renovar licencia) === */}
        {policy.showLicenseTabs && policy.licenseTabType === "new_renew" && licenseType === "renew" && (
          <div className="space-y-1.5">
            <p className="text-[12px] leading-[12px] font-bold text-[#010C0F]/80">
              {t("enterProductId", { productName: productName || t("product") })}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="w-full h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center">
                <input
                  value={renewId}
                  onChange={(e) => setRenewId(e.target.value)}
                  placeholder={t("enterIdPlaceholder")}
                  className="w-full bg-transparent outline-none text-[14px]"
                />
              </div>
            </div>
          </div>
        )}

        {/* === THREE-WAY TABS (Silent Phone) === */}
        {policy.showLicenseTabs && policy.licenseTabType === "three_way" && (
          <div className="space-y-1.5">
            <p className="text-[12px] leading-[12px] font-bold text-[#010C0F]/80">
              {t("licenseQuestion")}
            </p>
            <div className="w-full h-11 grid grid-cols-3 gap-2">
              <button
                type="button"
                aria-pressed={silentPhoneMode === "new_user"}
                onClick={() => onSilentPhoneModeChange?.("new_user")}
                className={[baseBtnClass, silentPhoneMode === "new_user" ? activeClass : inactiveClass].join(" ")}
              >
                {t("wantMyUser")}
              </button>
              <button
                type="button"
                aria-pressed={silentPhoneMode === "roning_code"}
                onClick={() => onSilentPhoneModeChange?.("roning_code")}
                className={[baseBtnClass, silentPhoneMode === "roning_code" ? activeClass : inactiveClass].join(" ")}
              >
                {t("roningCode")}
              </button>
              <button
                type="button"
                aria-pressed={silentPhoneMode === "recharge"}
                onClick={() => onSilentPhoneModeChange?.("recharge")}
                className={[baseBtnClass, silentPhoneMode === "recharge" ? activeClass : inactiveClass].join(" ")}
              >
                {t("recharge")}
              </button>
            </div>
          </div>
        )}

        {/* === RECHARGE CTA (Silent Phone - Recargar) === */}
        {formType === "SILENT_PHONE" && silentPhoneMode === "recharge" && (
          <div className="pt-2">
            <div className="text-center py-4">
              <Image
                src="/images/home/currency_exchange.webp"
                alt={t("recharge")}
                width={28}
                height={28}
                className="mx-auto"
                priority
              />
              <p className="mt-3 text-[24px] leading-[22px] font-semibold text-black">
                {t("rechargeTitle")}
              </p>
              <p className="text-[24px] leading-[28px] font-semibold text-black">
                {t("rechargeSubtitle")}
              </p>
            </div>

            <div className="w-full flex justify-center">
              <TelegramButton
                className="
                  w-full sm:w-[416px] max-w-[416px] h-[54px]
                  rounded-[8px] px-[10px] py-[10px]
                  flex items-center justify-center gap-[10px]
                  !bg-[#1CB9EC] text-white
                  min-w-0
                  [&>svg]:w-5 [&>svg]:h-5
                  [&>svg]:mr-[10px]
                "
              >
                {t("goToTelegram")}
              </TelegramButton>
            </div>
          </div>
        )}

        {/* === USERNAME FIELDS (Silent Phone) === */}
        {policy.showUsernameFields && silentPhoneMode === "new_user" && (
          <div className="space-y-2">
            <p className="text-[12px] leading-[12px] font-bold text-[#010C0F]/80">
              {t("suggestedUsernames")}
            </p>
            <div className="rounded-[12px] bg-[#E3F0FB] p-3">
              <p className="text-[11px] leading-[14px] text-[#010C0F]/80">
                {t("usernameHint")}
              </p>
            </div>
            <div className="space-y-2">
              {usernames.map((u, idx) => (
                <div key={idx} className="w-full sm:w-[calc(50%-6px)] h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center">
                  <input
                    value={u}
                    onChange={(e) => setUsernameAt(idx, e.target.value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 20))}
                    placeholder={t("usernamePlaceholder")}
                    className="w-full bg-transparent outline-none text-[14px]"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === PAYMENT FORM (oculto cuando es Silent Phone en modo Recargar) === */}
        {showPaymentForm && (
          <>
            {/* === EMAIL FIELD === */}
            {policy.showEmailField && (
              <div className="space-y-1.5">
                <p className="text-[12px] leading-[12px] font-bold text-[#010C0F]/80">
                  {policy.emailLabel}
                </p>
                {policy.showTelegramField ? (
                  // Email + Telegram side by side
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="w-full h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center">
                      <input
                        value={emailVal}
                        onChange={(e) => setEmailVal(e.target.value)}
                        placeholder={policy.emailPlaceholder}
                        type="email"
                        className="w-full bg-transparent outline-none text-[14px]"
                  />
                </div>
                <div className="w-full h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center">
                  <input
                    value={telegramId}
                    onChange={(e) => setTelegramId(e.target.value)}
                    placeholder="ID Telegram (opcional)"
                    className="w-full bg-transparent outline-none text-[14px]"
                  />
                </div>
              </div>
            ) : (
              // Solo email - ocupa media columna
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="w-full h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center">
                  <input
                    value={emailVal}
                    onChange={(e) => setEmailVal(e.target.value)}
                    placeholder={policy.emailPlaceholder}
                    type="email"
                    className="w-full bg-transparent outline-none text-[14px]"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* === TERMS === */}
        <label className="flex items-center gap-2 text-[12px] leading-[18px] text-[#010C0F]">
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            className="w-[18px] h-[18px] border-2 border-black rounded-[2px] accent-black focus:outline-none focus:ring-0"
          />
          <span className="select-none">
            {t("acceptTerms")}{" "}
            <Link href={TERMS_URL} target="_blank" className="underline font-medium">
              {t("termsAndConditions")}
            </Link>{" "}
            {t("ofPurchase")}
          </span>
        </label>

        {/* === PAYMENT METHODS === */}
        <div className="space-y-1.5">
          <p className="text-[12px] leading-[12px] font-bold text-[#010C0F]/80">
            {t("paymentMethod")}
          </p>
          <div className="flex gap-3">
            {policy.paymentMethods.includes("card") && (
              <button
                type="button"
                onClick={() => setMethod("card")}
                className={`flex-1 h-[90px] rounded-[8px] border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                  method === "card" ? "border-[#010C0F] bg-white" : "border-transparent bg-[#F5F5F5]"
                }`}
              >
                <Image src="/icons/tarjeta-credito-icono.svg" alt="" width={28} height={28} />
                <span className="text-[14px] font-medium">{t("creditCard")}</span>
              </button>
            )}
            {policy.paymentMethods.includes("crypto") && (
              <button
                type="button"
                onClick={() => setMethod("crypto")}
                className={`flex-1 h-[90px] rounded-[8px] border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                  method === "crypto" ? "border-[#010C0F] bg-white" : "border-transparent bg-[#F5F5F5]"
                }`}
              >
                <Image src="/icons/cripto-icono.svg" alt="" width={28} height={28} />
                <span className="text-[14px] font-medium">{t("cryptocurrency")}</span>
              </button>
            )}
          </div>
        </div>

        {/* === CARD FIELDS (when card is selected) === */}
        {method === "card" && (
          <div className="space-y-3 mt-2">
            {/* Cardholder name */}
            <div className="space-y-1.5">
              <div className="w-full h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center">
                <input
                  value={cardName}
                  onChange={(e) => setCardName(onlyLetters(e.target.value))}
                  placeholder={t("cardholderName")}
                  className="w-full bg-transparent outline-none text-[14px] placeholder:text-[#9ca3af]"
                />
              </div>
            </div>

            {/* Card number */}
            <div className="space-y-1.5">
              <div id="card-number-el" className="w-full min-h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] py-[10px]" />
            </div>

            {/* Expiry + CVC */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <div id="card-expiry-el" className="w-full min-h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] py-[10px]" />
              </div>
              <div className="space-y-1.5">
                <div id="card-cvc-el" className="w-full min-h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] py-[10px]" />
              </div>
            </div>

            {/* Postal code */}
            <div className="space-y-1.5">
              <div className="w-full h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center">
                <input
                  value={postal}
                  onChange={(e) => setPostal(e.target.value)}
                  placeholder={t("postalCode")}
                  className="w-full bg-transparent outline-none text-[14px] placeholder:text-[#9ca3af]"
                />
              </div>
            </div>

            {stripeStatus === "idle" && (
              <p className="text-[12px] text-gray-500">{t("loadingPaymentForm")}</p>
            )}
            {mountError && (
              <p className="text-[12px] text-red-500">{mountError}</p>
            )}
          </div>
        )}

        {/* === STRIPE ERROR === */}
        {stripeError && (
          <p className="text-[12px] text-red-500">{stripeError}</p>
        )}

        {/* === PAY BUTTON === */}
        <button
          type="button"
          onClick={handlePay}
          disabled={!canPay}
          className={`w-full h-[54px] rounded-[8px] text-[16px] font-bold transition-all ${
            canPay
              ? "bg-[#010C0F] text-white hover:bg-[#1a1a1a]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {buttonLabel}
        </button>
          </>
        )}
      </div>

      {/* === SUCCESS MODAL === */}
      {showSuccess && (
        <PaymentSuccessModal
          open={showSuccess}
          onClose={() => {
            setShowSuccess(false);
            onPaid?.();
          }}
          intent={successPI}
        />
      )}
    </>
  );
}
