// src/shared/components/ModalPayment/new/ModalNewUser.tsx
"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { getProductById } from "@/features/products/services";
import PurchaseScaffold from "./PurchaseScaffold";
import type { SuccessDisplayData } from "../ModalPaymentController";
import UnifiedPurchaseForm, { type FormData } from "./UnifiedPurchaseForm";
import { useCheckout } from "@/shared/hooks/useCheckout";
import { useFormPolicy } from "./useFormPolicy";
import { validateCoupon } from "@/lib/payments/orderApi";
import { useToast } from "@/shared/context/ToastContext";
import { useTranslations } from "next-intl";

type Variant = { id: number; licensetime: number | string; price: number; sku?: string; image?: string };

type ModalProduct = {
  variants?: Variant[];
  images?: { src: string }[];
  iconUrl?: string;
  price?: number | string;
  name?: string;
  licensetime?: number | string;
  id?: number;
  description?: string;
  category?: { id: number; name: string };
  on_sale?: boolean | string;
  sale_price?: string;
};

type SilentPhoneMode = "new_user" | "roning_code" | "recharge";

export default function ModalNewUser({ onPaymentSuccess }: { onPaymentSuccess?: (data: SuccessDisplayData) => void }) {
  const { params, openModal, closeModal } = useModalPayment();
  const { productid, initialPrice, variantId } = (params || {}) as { productid?: string; initialPrice?: number; variantId?: number };
  const { payUserId, payRenewal, loading } = useCheckout();
  const { formType, policy } = useFormPolicy();
  const toast = useToast();
  const t = useTranslations("paymentModal");

  // Estado para Silent Phone: modo de tabs
  const [silentPhoneMode, setSilentPhoneMode] = React.useState<SilentPhoneMode>("roning_code");

  const { data: product, isLoading: isLoadingProduct } = useQuery<ModalProduct, Error, ModalProduct>({
    queryKey: ["productById", productid],
    queryFn: () => getProductById(productid!),
    enabled: !!productid,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const [selectedVariant, setSelectedVariant] = React.useState<Variant | null>(null);
  const [quantity, setQuantity] = React.useState(1);
  const [coupon, setCoupon] = React.useState("");
  const [discount, setDiscount] = React.useState(0);

  const variants = product?.variants ?? [];

  // Track si el usuario ha cambiado manualmente la variante
  const [userChangedVariant, setUserChangedVariant] = React.useState(false);

  React.useEffect(() => {
    // Prioridad 1: Si hay variantId, usarlo directamente
    if (variantId != null && variants.length > 0) {
      const matchingVariant = variants.find((v) => v.id === variantId);
      if (matchingVariant) {
        setSelectedVariant(matchingVariant);
        return;
      }
    }
    // Prioridad 2: Si hay un initialPrice, buscar la variante que coincida con ese precio
    if (initialPrice != null && initialPrice > 0 && variants.length > 0) {
      const matchingVariant = variants.find((v) => v.price === initialPrice);
      if (matchingVariant) {
        setSelectedVariant(matchingVariant);
        return;
      }
    }
    // Si no hay match o no hay initialPrice, usar el primero
    setSelectedVariant(variants.length ? variants[0] : null);
  }, [product, initialPrice, variantId]);

  // Detectar oferta — se desactiva si hay cupón aplicado (no dos descuentos a la vez)
  const productOnSale = product?.on_sale === true || (product as any)?.on_sale === "true";
  const hasCoupon = discount > 0;
  const effectiveOnSale = productOnSale && !hasCoupon;

  const unitPrice = (() => {
    if (variants.length) {
      const v = selectedVariant ?? variants[0];
      if (!v) return 0;
      // Si hay oferta activa (sin cupón), usar sale_price de la variante
      if (effectiveOnSale) {
        const vSale = parseFloat(String((v as any)?.sale_price ?? "0"));
        if (vSale > 0) return vSale;
      }
      return v.price ?? 0;
    }
    // Sin variantes: usar sale_price solo si no hay cupón
    if (effectiveOnSale && product?.sale_price) {
      const sp = parseFloat(String(product.sale_price));
      if (sp > 0) return sp;
    }
    return Number(product?.price) || 0;
  })();

  const onApplyCoupon = async () => {
    if (!coupon.trim()) return;
    try {
      const res = await validateCoupon(coupon.trim(), product?.name, productid);
      if (res.ok && typeof res.discount_amount === "number") {
        // Calcular descuento real: si es porcentaje, convertir a USD
        const rawAmount = res.discount_amount;
        const effectiveDiscount =
          res.discount_type === "percent"
            ? (unitPrice * quantity * rawAmount) / 100
            : rawAmount;
        setDiscount(Math.round(effectiveDiscount * 100) / 100);
        if (productOnSale) {
          toast.info(t("couponReplacesOffer"));
        } else {
          toast.success(res.message || "Cupón aplicado");
        }
      } else {
        setDiscount(0);
        toast.error(res.message || "Cupón inválido");
      }
    } catch (e) {
      setDiscount(0);
      toast.error("Error validando el cupón");
    }
  };

  const selectedOption = Number((params as any)?.selectedOption ?? NaN);
  const isRouterCheckout =
    selectedOption === 36 ||
    product?.category?.id === 36 ||
    /router|mifi|hotspot|cpe/i.test(product?.name ?? "");
  const shipping = isRouterCheckout ? 80 : undefined;

  // Lógica de oferta: calcular total original para mostrar "Antes" en el tag
  // No mostrar tag de oferta si hay cupón activo
  const isOnSale = effectiveOnSale;
  const originalTotal = React.useMemo(() => {
    if (!isOnSale) return undefined;
    let regularPrice: number;
    if (variants.length) {
      // Para productos con variantes: usar regular_price de la variante seleccionada
      const v = selectedVariant ?? variants[0];
      const vRegular = parseFloat(String((v as any)?.regular_price ?? "0"));
      regularPrice = vRegular > 0 ? vRegular : (v?.price ?? 0);
    } else {
      // Para productos simples: product.price es el precio regular
      regularPrice = parseFloat(String(product?.price ?? "0"));
    }
    if (!regularPrice || regularPrice <= unitPrice) return undefined;
    return regularPrice * quantity + (shipping ?? 0);
  }, [isOnSale, product, variants, selectedVariant, unitPrice, quantity, shipping]);

  const amount = Math.max(unitPrice * quantity + (shipping ?? 0) - discount, 0);
  const productIdNum = Number(productid);

  // Show loading skeleton while product is loading
  if (isLoadingProduct) {
    return (
      <div className="flex flex-col gap-4 p-4 animate-pulse">
        <div className="flex gap-4">
          <div className="w-[120px] h-[120px] bg-gray-200 rounded-lg" />
          <div className="flex-1 space-y-3">
            <div className="h-5 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
        <div className="h-10 bg-gray-200 rounded" />
        <div className="h-10 bg-gray-200 rounded" />
        <div className="h-12 bg-gray-300 rounded" />
      </div>
    );
  }

  const isRoamingProduct =
    product?.category?.id === 35 || // Sistemas (Secure MDM, etc.) -> Roaming
    (product?.category?.id === 38 && !/silent/i.test(product?.name ?? "")) || // Apps (except Silent Phone) -> Roaming
    /armadillo|threema|vault|vnc|nordvpn|salt/i.test(product?.name ?? "");

  const isSilentPhone = /silent/i.test(product?.name ?? "");

  const resolvedOrderType =
    isRoamingProduct || (isSilentPhone && silentPhoneMode === "roning_code")
      ? "roaming"
      : "userid";

  return (
    <PurchaseScaffold
      mode="new_user"
      enableTabSwitch={false}
      onSelectMode={(m) => openModal({ ...params, mode: m })}
      showRechargeCTA={false}
      product={product}
      selectedVariantId={selectedVariant?.id ?? null}
      onChangeVariant={(id) => {
        setSelectedVariant(variants.find((v) => v.id === id) ?? null);
        setUserChangedVariant(true);
      }}
      quantity={quantity}
      setQuantity={setQuantity}
      coupon={coupon}
      setCoupon={setCoupon}
      onApplyCoupon={onApplyCoupon}
      discount={discount}
      unitPrice={unitPrice}
      shipping={shipping}
      sourceUrl={params.sourceUrl}
      onSale={isOnSale}
      originalTotal={originalTotal}
      onRemoveCoupon={() => { setDiscount(0); setCoupon(""); }}
    >
      <UnifiedPurchaseForm
        quantity={quantity}
        email=""
        productId={productIdNum}
        amountUsd={amount}
        orderType={resolvedOrderType}
        silentPhoneMode={silentPhoneMode}
        onSilentPhoneModeChange={setSilentPhoneMode}
        purchaseMeta={{
          variantId: selectedVariant?.id ?? undefined,
          sku: selectedVariant?.sku,
          licensetime: selectedVariant?.licensetime ?? product?.licensetime,
          couponCode: coupon.trim() || undefined,
          discount,
          sourceUrl: params.sourceUrl,
          selectedOption: (params as any)?.selectedOption,
        }}
        onPayCrypto={async (formData: FormData) => {
          // === RENEWAL via crypto: use dedicated /orders/renewal endpoint ===
          if (formData.licenseType === "renew" && formData.renewIds && formData.renewIds.length > 0) {
            const lt = selectedVariant?.licensetime ?? product?.licensetime;
            const months = typeof lt === 'string' ? parseInt(lt as string) || 12 : (typeof lt === 'number' ? lt : 12);
            await payRenewal({
              productId: productIdNum,
              licenseIds: formData.renewIds,
              email: formData.email,
              provider: "kriptomus",
              amount,
              currency: "USD",
              qty: quantity,
              months,
            });
          } else {
            await payUserId({
              productId: productIdNum,
              email: formData.email,
              username: formData.telegramId || formData.usernames?.[0],
              provider: "kriptomus",
              amount,
              currency: "USD",
              qty: quantity,
              variantId: selectedVariant?.id ?? undefined,
              sku: selectedVariant?.sku,
              licensetime: selectedVariant?.licensetime ?? product?.licensetime,
              licenseType: formData.licenseType,
              renewId: formData.renewId,
              osType: formData.osType,
              silentPhoneMode: formData.silentPhoneMode,
              usernames: formData.usernames,
              couponCode: coupon.trim() || undefined,
              discount,
              sourceUrl: params.sourceUrl,
              selectedOption: (params as any)?.selectedOption,
              meta: {
                formType,
                productId: productIdNum,
                quantity,
                unitPrice,
                shipping,
                variantId: selectedVariant?.id ?? undefined,
                sku: selectedVariant?.sku,
                licensetime: selectedVariant?.licensetime ?? product?.licensetime,
                licenseType: formData.licenseType,
                renewId: formData.renewId,
                renewIds: formData.renewIds,
                shippingAddress: formData.shippingAddress,
                shippingFullName: formData.shippingFullName,
                shippingCountry: formData.shippingCountry,
                shippingPostalCode: formData.shippingPostalCode,
                shippingPhone: formData.shippingPhone,
                osType: formData.osType,
                silentPhoneMode: formData.silentPhoneMode,
                usernames: formData.usernames,
                couponCode: coupon.trim() || undefined,
                discount,
                sourceUrl: params.sourceUrl,
                selectedOption: (params as any)?.selectedOption,
              },
            });
          }
        }}
        onPaid={() => {
          closeModal();
        }}
        loading={loading}
        onSuccess={(data) => {
          if (onPaymentSuccess) {
            const brandKey =
              product?.category?.id === 38
                ? "app" as const
                : product?.category?.id === 35
                  ? "system" as const
                  : product?.category?.id === 36
                    ? "router" as const
                    : undefined;
            const lt = Number(selectedVariant?.licensetime ?? product?.licensetime);
            const licensePeriod =
              !isNaN(lt) && lt > 0
                ? `${lt} ${lt === 1 ? t("month") : t("months")}`
                : undefined;

            onPaymentSuccess({
              intent: data.intent,
              orderId: data.orderId,
              product: {
                name: product?.name ?? "Producto",
                image: selectedVariant?.image || product?.iconUrl || product?.images?.[0]?.src,
                brandKey,
                quantity,
                unitPrice,
                shippingCost: shipping,
                licenseMonths: !isNaN(lt) && lt > 0 ? lt : undefined,
                licensePeriod,
              },
            });
          }
        }}
      />
    </PurchaseScaffold>
  );
}
