// src/shared/components/ModalPayment/new/ModalNewUser.tsx
"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { getProductById } from "@/features/products/services";
import PurchaseScaffold from "./PurchaseScaffold";
import UnifiedPurchaseForm, { type FormData } from "./UnifiedPurchaseForm";
import { useCheckout } from "@/shared/hooks/useCheckout";
import { useFormPolicy } from "./useFormPolicy";

type Variant = { id: number; licensetime: number | string; price: number; sku?: string; image?: string };

type ModalProduct = {
  variants?: Variant[];
  images?: { src: string }[];
  price?: number | string;
  name?: string;
  licensetime?: number | string;
  id?: number;
  description?: string;
  category?: { id: number; name: string };
};

type SilentPhoneMode = "new_user" | "roning_code" | "recharge";

export default function ModalNewUser() {
  const { params, openModal, closeModal } = useModalPayment();
  const { productid, initialPrice, variantId } = (params || {}) as { productid?: string; initialPrice?: number; variantId?: number };
  const { payUserId, loading } = useCheckout();
  const { formType, policy } = useFormPolicy();

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

  const unitPrice =
    (variants.length ? selectedVariant?.price ?? variants[0]?.price : Number(product?.price)) || 0;

  const onApplyCoupon = () => setDiscount(coupon.trim().toUpperCase() === "DESCUENTO5" ? 5 : 0);

  const selectedOption = Number((params as any)?.selectedOption ?? NaN);
  const isRouterCheckout =
    selectedOption === 36 ||
    product?.category?.id === 36 ||
    /router|mifi|hotspot|cpe/i.test(product?.name ?? "");
  const shipping = isRouterCheckout ? 80 : undefined;

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
      unitPrice={unitPrice}
      shipping={shipping}
      sourceUrl={params.sourceUrl}
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
          licensetime: selectedVariant?.licensetime,
          couponCode: coupon.trim() || undefined,
          discount,
          sourceUrl: params.sourceUrl,
          selectedOption: (params as any)?.selectedOption,
        }}
        onPayCrypto={async (formData: FormData) => {
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
            licensetime: selectedVariant?.licensetime,
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
              licensetime: selectedVariant?.licensetime,
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
        }}
        onPaid={() => {
          closeModal();
        }}
        loading={loading}
      />
    </PurchaseScaffold>
  );
}
