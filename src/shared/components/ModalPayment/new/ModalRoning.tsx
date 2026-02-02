"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { getProductById } from "@/features/products/services";
import PurchaseScaffold from "./PurchaseScaffold";
import PaymentSuccessModal from "@/payments/PaymentSuccessModal";
import UnifiedPurchaseForm, { type FormData } from "./UnifiedPurchaseForm";
import { useCheckout } from "@/shared/hooks/useCheckout";
import type { Provider as PayProvider } from "@/services/checkout";
import { validateCoupon } from "@/lib/payments/orderApi";
import { useToast } from "@/shared/context/ToastContext";

type Variant = {
  id: number;
  licensetime: number | string;
  price: number;
  sku?: string;
  image?: string;
};

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

export default function ModalRoning() {
  const { params, openModal, closeModal } = useModalPayment();
  const { productid, initialPrice, variantId } = (params || {}) as { productid?: string; initialPrice?: number; variantId?: number };
  const { loading, payRoaming } = useCheckout();
  const toast = useToast();

  const { data: product } = useQuery<ModalProduct, Error, ModalProduct>({
    queryKey: ["productById", productid],
    queryFn: () => getProductById(productid!),
    enabled: !!productid,
  });

  const [selectedVariant, setSelectedVariant] = React.useState<Variant | null>(
    null
  );
  const [quantity, setQuantity] = React.useState(1);
  const [coupon, setCoupon] = React.useState("");
  const [discount, setDiscount] = React.useState(0);

  // Success state
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [successPI, setSuccessPI] = React.useState<any>(null);

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
    (variants.length
      ? selectedVariant?.price ?? variants[0]?.price
      : Number(product?.price)) || 0;

  const onApplyCoupon = async () => {
    if (!coupon.trim()) return;
    try {
      const res = await validateCoupon(coupon.trim(), product?.name, productid);
      if (res.ok && typeof res.discount_amount === "number") {
        setDiscount(res.discount_amount);
        toast.success(res.message || "Cupón aplicado");
      } else {
        setDiscount(0);
        toast.error(res.message || "Cupón inválido");
      }
    } catch (e) {
      setDiscount(0);
      toast.error("Error validando el cupón");
    }
  };

  const amountUsd = Math.max(Number(unitPrice) * quantity - discount, 0);

  const payWithCrypto = async (formData: FormData) => {
    const provider: PayProvider = "kriptomus";
    await payRoaming({
      productId: Number(productid),
      qty: quantity,
      email: formData.email,
      provider,
      amount: amountUsd,
      currency: "USD",
      variantId: selectedVariant?.id ?? undefined,
      sku: selectedVariant?.sku,
      licensetime: selectedVariant?.licensetime,
      couponCode: coupon.trim() || undefined,
      discount,
      sourceUrl: params.sourceUrl,
      selectedOption: (params as any)?.selectedOption,
      silentPhoneMode: formData.silentPhoneMode,
      usernames: formData.usernames,
      meta: {
        productId: Number(productid),
        quantity,
        unitPrice,
        variantId: selectedVariant?.id ?? undefined,
        sku: selectedVariant?.sku,
        licensetime: selectedVariant?.licensetime,
        couponCode: coupon.trim() || undefined,
        discount,
        sourceUrl: params.sourceUrl,
        selectedOption: (params as any)?.selectedOption,
        silentPhoneMode: formData.silentPhoneMode,
        usernames: formData.usernames,
      },
    });
  };

  if (showSuccess) {
    return (
      <PaymentSuccessModal
        open={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          closeModal();
        }}
        intent={successPI}
      />
    );
  }

  return (
    <PurchaseScaffold
      mode="roning_code"
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
      sourceUrl={params.sourceUrl}
    >
      <UnifiedPurchaseForm
        quantity={quantity}
        email=""
        productId={Number(productid)}
        amountUsd={amountUsd}
        orderType="roaming"
        purchaseMeta={{
          variantId: selectedVariant?.id ?? undefined,
          sku: selectedVariant?.sku,
          licensetime: selectedVariant?.licensetime,
          couponCode: coupon.trim() || undefined,
          discount,
          sourceUrl: params.sourceUrl,
          selectedOption: (params as any)?.selectedOption,
        }}
        onPayCrypto={payWithCrypto}
        onPaid={() => closeModal?.()}
        loading={loading}
        onSuccess={(data) => {
          setSuccessPI(data.intent);
          setShowSuccess(true);
        }}
      />
    </PurchaseScaffold>
  );
}
