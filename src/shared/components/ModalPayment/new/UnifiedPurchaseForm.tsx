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
  onSuccess?: (data: { intent: any; orderId: number | null }) => void;
};

export interface FormData {
  email: string;
  telegramId?: string;
  usernames?: string[];
  licenseType?: LicenseType;
  renewId?: string;
  renewIds?: string[];
  shippingAddress?: string;
  shippingFullName?: string;
  shippingCountry?: string;
  shippingPostalCode?: string;
  shippingPhone?: string;
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
  onSuccess,
}: Props) {
  const t = useTranslations("paymentModal");
  const { policy, formType, isLoading: policyLoading, productName, categoryId } = useFormPolicy();

  // Estado del formulario
  const [emailVal, setEmailVal] = React.useState(email);
  const [telegramId, setTelegramId] = React.useState("");
  const [terms, setTerms] = React.useState(true);
  const [method, setMethod] = React.useState<Method>("crypto");

  // Para Software: tipo de licencia
  const [licenseType, setLicenseType] = React.useState<LicenseType>("new");

  // Para renovación: IDs del producto a renovar (uno por licencia según cantidad)
  const [renewIds, setRenewIds] = React.useState<string[]>([]);

  // Para SecureCrypt: sistema operativo
  const [osType, setOsType] = React.useState<OsType>("android");

  // Para Silent Phone: usernames
  const [usernames, setUsernames] = React.useState<string[]>([]);

  const isRouterCheckout = categoryId === 36 || purchaseMeta?.selectedOption === 36;
  const [shippingAddress, setShippingAddress] = React.useState("");
  const [shippingFullName, setShippingFullName] = React.useState("");
  const [shippingCountry, setShippingCountry] = React.useState("");
  const [shippingPostalCode, setShippingPostalCode] = React.useState("");
  const [shippingPhone, setShippingPhone] = React.useState("");

  // Card fields
  const [cardName, setCardName] = React.useState("");
  const [postal, setPostal] = React.useState("");

  // Stripe
  const { status: stripeStatus, error: mountError, stripeRef, splitRef } = useStripeSplit(method === "card");
  const [stripeError, setStripeError] = React.useState<string | null>(null);
  const [clientSecret, setClientSecret] = React.useState("");
  const [orderId, setOrderId] = React.useState<number | null>(null);

  // Track individual element completion
  const [cardState, setCardState] = React.useState({
    number: false,
    expiry: false,
    cvc: false,
  });

  React.useEffect(() => {
    if (stripeStatus !== "ready" || !splitRef.current) return;

    const { number, expiry, cvc } = splitRef.current;

    const onChange = (field: keyof typeof cardState) => (e: any) => {
      setCardState((prev) => ({ ...prev, [field]: e.complete }));
    };

    number.on("change", onChange("number"));
    expiry.on("change", onChange("expiry"));
    cvc.on("change", onChange("cvc"));

    // No dedicated cleanup needed as elements unmount handles it, 
    // but safe to leave as-is since stripe logic is robust.
  }, [stripeStatus, splitRef]);

  // Polling
  const [polling, setPolling] = React.useState(false);
  const pollRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const pollStartedAtRef = React.useRef<number>(0);

  // Success modal
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [successPI, setSuccessPI] = React.useState<any>(null);

  // Loading state for direct payment
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showErrors, setShowErrors] = React.useState(false);

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
    const shouldCollectRenewIds =
      policy.showLicenseTabs &&
      policy.licenseTabType === "new_renew" &&
      licenseType === "renew";
    if (!shouldCollectRenewIds) return;

    setRenewIds((prev) => {
      const next = [...prev];
      if (quantity > prev.length) next.push(...Array(quantity - prev.length).fill(""));
      else if (quantity < prev.length) next.length = quantity;
      return next;
    });
  }, [quantity, policy.showLicenseTabs, policy.licenseTabType, licenseType]);

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

  const setRenewIdAt = (idx: number, val: string) => {
    setRenewIds((prev) => {
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
  const requiresRenewIds =
    policy.showLicenseTabs && policy.licenseTabType === "new_renew" && licenseType === "renew";
  const renewIdsOk =
    !requiresRenewIds ||
    (renewIds.length === quantity && renewIds.every((id) => id.trim().length > 0));
  const shippingOk =
    !isRouterCheckout ||
    (shippingAddress.trim().length > 0 &&
      shippingFullName.trim().length > 0 &&
      shippingCountry.trim().length > 0 &&
      shippingPostalCode.trim().length > 0 &&
      shippingPhone.trim().length > 0);
  const onlyLetters = (s: string) => s.replace(/[^A-Za-zÀ-ÿ\u00f1\u00d1\s'.-]/g, "");

  const phase = method === "crypto" ? "crypto" : clientSecret ? "card_confirm" : "card_init";

  const canPay =
    !loading &&
    !isSubmitting &&
    terms &&
    emailOk &&
    usernamesOk &&
    renewIdsOk &&
    shippingOk &&
    (method === "crypto"
      ? true
      : stripeStatus === "ready" &&
      cardState.number &&
      cardState.expiry &&
      cardState.cvc &&
      cardName.trim().length > 1 &&
      postal.trim().length > 0);

  const isLoadingPayment = isSubmitting || polling || loading;
  const buttonLabel = isLoadingPayment ? (
    <div className="flex items-center justify-center gap-2">
      <span className="opacity-0 w-0 h-0 overflow-hidden">{t("processing")}</span>
      <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  ) : (
    t("payNow")
  );

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

  const getFormData = (): FormData => ({
    email: emailVal.trim(),
    telegramId: telegramId.trim() || undefined,
    usernames: policy.showUsernameFields ? usernames : undefined,
    licenseType: policy.showLicenseTabs && policy.licenseTabType === "new_renew" ? licenseType : undefined,
    renewId:
      licenseType === "renew" ? renewIds.find((x) => x.trim().length > 0)?.trim() || undefined : undefined,
    renewIds:
      licenseType === "renew"
        ? renewIds.map((x) => x.trim()).filter((x) => x.length > 0)
        : undefined,
    shippingAddress: isRouterCheckout ? shippingAddress.trim() || undefined : undefined,
    shippingFullName: isRouterCheckout ? shippingFullName.trim() || undefined : undefined,
    shippingCountry: isRouterCheckout ? shippingCountry.trim() || undefined : undefined,
    shippingPostalCode: isRouterCheckout ? shippingPostalCode.trim() || undefined : undefined,
    shippingPhone: isRouterCheckout ? shippingPhone.trim() || undefined : undefined,
    osType: policy.showOsSelector ? osType : undefined,
    silentPhoneMode: formType === "SILENT_PHONE" ? silentPhoneMode : undefined,
  });

  const handlePay = async () => {
    if (!canPay) {
      setShowErrors(true);
      return;
    }

    setIsSubmitting(true);
    setStripeError(null);

    // === CRYPTO PAYMENT ===
    if (method === "crypto") {
      try {
        await onPayCrypto?.(getFormData());
      } catch (error) {
        // Handle crypto error if any (usually handled in onPayCrypto)
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // === CARD PAYMENT ===
    try {
      // 1. Validate Stripe elements
      if (!stripeRef.current || !splitRef.current?.number) {
        throw new Error("Stripe no está listo.");
      }

      // 2. Create Order & Intent (if not already created)
      let currentClientSecret = clientSecret;
      let currentOrderId = orderId;

      if (!currentClientSecret) {
        const form = getFormData();
        const primaryUsername = usernames[0]?.trim() || form.telegramId?.trim() || undefined;
        const meta = {
          ...purchaseMeta,
          email: form.email,
          telegramId: form.telegramId,
          usernames: form.usernames,
          licenseType: form.licenseType,
          renewId: form.renewId,
          renewIds: form.renewIds,
          shippingAddress: form.shippingAddress,
          shippingFullName: form.shippingFullName,
          shippingCountry: form.shippingCountry,
          shippingPostalCode: form.shippingPostalCode,
          shippingPhone: form.shippingPhone,
          osType: form.osType,
          silentPhoneMode: form.silentPhoneMode,
          quantity,
        };

        let orderResult: { order_id: number; client_secret: string };

        const isThreema = /threema/i.test(productName || "") || productId === 136;
        console.log("🐛 [UnifiedPurchaseForm] Threema Debug:", { productName, isThreema, originalLicenseTime: purchaseMeta?.licensetime });
        const resolvedLicenseTime = isThreema ? null : purchaseMeta?.licensetime;
        console.log("🐛 [UnifiedPurchaseForm] resolvedLicenseTime:", resolvedLicenseTime);

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
            licensetime: resolvedLicenseTime,
            couponCode: purchaseMeta?.couponCode,
            discount: purchaseMeta?.discount,
            sourceUrl: purchaseMeta?.sourceUrl,
            selectedOption: purchaseMeta?.selectedOption,
            silentPhoneMode: form.silentPhoneMode,
            usernames: form.usernames,
            osType: form.osType,
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
            licensetime: resolvedLicenseTime,
            licenseType: form.licenseType,
            renewId: form.renewId,
            osType: form.osType,
            silentPhoneMode: form.silentPhoneMode,
            usernames: form.usernames,
            couponCode: purchaseMeta?.couponCode,
            discount: purchaseMeta?.discount,
            sourceUrl: purchaseMeta?.sourceUrl,
            selectedOption: purchaseMeta?.selectedOption,
            meta: { ...meta, renewIds: form.renewIds },
          });
        }

        currentOrderId = orderResult.order_id;
        currentClientSecret = orderResult.client_secret;

        setOrderId(currentOrderId);
        setClientSecret(currentClientSecret);
      }

      // 3. Start polling for status
      if (currentOrderId && !polling) {
        startPolling(currentOrderId);
      }

      // 4. Confirm Card Payment
      const res = await confirmCardPayment(
        stripeRef.current!,
        currentClientSecret,
        splitRef.current.number,
        {
          name: cardName.trim() || undefined,
          email: emailVal.trim(),
          postal_code: postal.trim() || undefined,
        }
      );

      if (res?.status === "succeeded") {
        if (onSuccess) {
          onSuccess({ intent: res.intent ?? null, orderId: currentOrderId });
        } else {
          setSuccessPI(res.intent ?? null);
          setShowSuccess(true);
        }
        if (pollRef.current) clearInterval(pollRef.current);
        setPolling(false);
      } else if (res.error) {
        setStripeError(res.error);
      } else {
        setStripeError("Error desconocido al procesar el pago.");
      }

    } catch (e: any) {
      setStripeError(e?.message || "Error procesando el pago.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const baseBtnClass =
    "h-11 rounded-[8px] px-[14px] text-[12px] leading-[12px] font-bold flex items-center justify-center text-center flex-1";
  const inactiveClass = "bg-[#EBEBEB] text-[#3D3D3D] border border-transparent";
  const activeClass = "bg-white text-black border-2 border-[#3D3D3D]";

  // Determinar si mostrar el formulario de pago (ocultar cuando Silent Phone está en modo recharge)
  const isRechargeMode = formType === "SILENT_PHONE" && silentPhoneMode === "recharge";
  const showPaymentForm = !isRechargeMode;
  const supportOnly = policy.paymentMethods.length === 0;

  if (policyLoading) {
    return (
      <div className="flex flex-col gap-3 animate-pulse">
        <div className="h-10 bg-gray-200 rounded" />
        <div className="h-10 bg-gray-200 rounded" />
        <div className="h-12 bg-gray-300 rounded" />
      </div>
    );
  }

  if (supportOnly) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10 sm:py-14">
        <p className="text-[18px] leading-[22px] font-semibold text-black">{t("needHelp")}</p>
        <div className="mt-5 w-full max-w-[320px]">
          <TelegramButton
            className="
              w-full h-[48px]
              rounded-full px-4
              flex items-center justify-center gap-[10px]
              !bg-[#1CB9EC] text-white
              min-w-0
              [&>svg]:w-5 [&>svg]:h-5
              [&>svg]:mr-[10px]
            "
          >
            {t("chatNow")}
          </TelegramButton>
        </div>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <PaymentSuccessModal
        open={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          onPaid?.();
        }}
        intent={successPI}
      />
    );
  }

  return (
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
            {renewIds.map((val, idx) => (
              <div
                key={idx}
                className={`w-full h-[42px] rounded-[8px] px-[14px] flex items-center ${showErrors && val.trim().length === 0 ? "bg-red-50 ring-1 ring-red-500" : "bg-[#EBEBEB]"}`}
              >
                <input
                  value={val}
                  onChange={(e) => setRenewIdAt(idx, e.target.value)}
                  placeholder={t("enterIdPlaceholder")}
                  className="w-full bg-transparent outline-none text-[14px]"
                />
              </div>
            ))}
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
              aria-pressed={silentPhoneMode === "roning_code"}
              onClick={() => onSilentPhoneModeChange?.("roning_code")}
              className={[baseBtnClass, silentPhoneMode === "roning_code" ? activeClass : inactiveClass].join(" ")}
            >
              {t("roningCode")}
            </button>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {usernames.map((u, idx) => (
              <div key={idx} className={`w-full h-[42px] rounded-[8px] px-[14px] flex items-center ${showErrors && !reUser.test(u) ? "bg-red-50 ring-1 ring-red-500" : "bg-[#EBEBEB]"}`}>
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
                  <div className={`w-full h-[42px] rounded-[8px] px-[14px] flex items-center ${showErrors && !emailOk ? "bg-red-50 ring-1 ring-red-500" : "bg-[#EBEBEB]"}`}>
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
                  <div className={`w-full h-[42px] rounded-[8px] px-[14px] flex items-center ${showErrors && !emailOk ? "bg-red-50 ring-1 ring-red-500" : "bg-[#EBEBEB]"}`}>
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

          {isRouterCheckout && (
            <div className="space-y-3">
              <div className={`w-full h-[42px] rounded-[8px] px-[14px] flex items-center ${showErrors && shippingAddress.trim().length === 0 ? "bg-red-50 ring-1 ring-red-500" : "bg-[#EBEBEB]"}`}>
                <input
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Dirección de envío"
                  className="w-full bg-transparent outline-none text-[14px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className={`w-full h-[42px] rounded-[8px] px-[14px] flex items-center ${showErrors && shippingFullName.trim().length === 0 ? "bg-red-50 ring-1 ring-red-500" : "bg-[#EBEBEB]"}`}>
                  <input
                    value={shippingFullName}
                    onChange={(e) => setShippingFullName(e.target.value)}
                    placeholder="Nombre completo"
                    className="w-full bg-transparent outline-none text-[14px]"
                  />
                </div>
                <div className={`w-full h-[42px] rounded-[8px] px-[14px] flex items-center ${showErrors && shippingCountry.trim().length === 0 ? "bg-red-50 ring-1 ring-red-500" : "bg-[#EBEBEB]"}`}>
                  <input
                    value={shippingCountry}
                    onChange={(e) => setShippingCountry(e.target.value)}
                    placeholder="País"
                    className="w-full bg-transparent outline-none text-[14px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className={`w-full h-[42px] rounded-[8px] px-[14px] flex items-center ${showErrors && shippingPostalCode.trim().length === 0 ? "bg-red-50 ring-1 ring-red-500" : "bg-[#EBEBEB]"}`}>
                  <input
                    value={shippingPostalCode}
                    onChange={(e) => setShippingPostalCode(e.target.value)}
                    placeholder="Código postal"
                    className="w-full bg-transparent outline-none text-[14px]"
                  />
                </div>
                <div className={`w-full h-[42px] rounded-[8px] px-[14px] flex items-center ${showErrors && shippingPhone.trim().length === 0 ? "bg-red-50 ring-1 ring-red-500" : "bg-[#EBEBEB]"}`}>
                  <input
                    value={shippingPhone}
                    onChange={(e) => setShippingPhone(e.target.value)}
                    placeholder="Teléfono"
                    className="w-full bg-transparent outline-none text-[14px]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* === TERMS === */}
          <label className="flex items-center gap-2 text-[12px] leading-[18px] text-[#010C0F]">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              className={`w-[18px] h-[18px] border-2 rounded-[2px] accent-black focus:outline-none focus:ring-0 ${showErrors && !terms ? "border-red-500" : "border-black"}`}
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
                  className={`flex-1 h-[90px] rounded-[8px] border-2 flex flex-col items-center justify-center gap-2 transition-all ${method === "card" ? "border-[#010C0F] bg-white" : "border-transparent bg-[#F5F5F5]"
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
                  className={`flex-1 h-[90px] rounded-[8px] border-2 flex flex-col items-center justify-center gap-2 transition-all ${method === "crypto" ? "border-[#010C0F] bg-white" : "border-transparent bg-[#F5F5F5]"
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
                <div className={`w-full h-[42px] rounded-[8px] px-[14px] flex items-center ${showErrors && cardName.trim().length <= 1 ? "bg-red-50 ring-1 ring-red-500" : "bg-[#EBEBEB]"}`}>
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
                <div id="card-number-el" className={`w-full min-h-[42px] rounded-[8px] px-[14px] py-[10px] ${showErrors && !cardState.number ? "bg-red-50 ring-1 ring-red-500" : "bg-[#EBEBEB]"}`} />
              </div>

              {/* Expiry + CVC */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <div id="card-expiry-el" className={`w-full min-h-[42px] rounded-[8px] px-[14px] py-[10px] ${showErrors && !cardState.expiry ? "bg-red-50 ring-1 ring-red-500" : "bg-[#EBEBEB]"}`} />
                </div>
                <div className="space-y-1.5">
                  <div id="card-cvc-el" className={`w-full min-h-[42px] rounded-[8px] px-[14px] py-[10px] ${showErrors && !cardState.cvc ? "bg-red-50 ring-1 ring-red-500" : "bg-[#EBEBEB]"}`} />
                </div>
              </div>

              {/* Postal code */}
              <div className="space-y-1.5">
                <div className={`w-full h-[42px] rounded-[8px] px-[14px] flex items-center ${showErrors && postal.trim().length === 0 ? "bg-red-50 ring-1 ring-red-500" : "bg-[#EBEBEB]"}`}>
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
            disabled={isLoadingPayment}
            className={`w-full h-[54px] rounded-[8px] text-[16px] font-bold transition-all ${canPay
              ? "bg-[#010C0F] text-white hover:bg-[#1a1a1a]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            {buttonLabel}
          </button>
        </>
      )}
    </div>
  );
}
