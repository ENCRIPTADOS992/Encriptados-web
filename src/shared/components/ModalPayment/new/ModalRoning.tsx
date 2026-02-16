"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { getProductById } from "@/features/products/services";
import PurchaseScaffold from "./PurchaseScaffold";
import type { SuccessDisplayData } from "../ModalPaymentController";
import UnifiedPurchaseForm, { type FormData } from "./UnifiedPurchaseForm";
import { useCheckout } from "@/shared/hooks/useCheckout";
import type { Provider as PayProvider } from "@/services/checkout";
import { validateCoupon } from "@/lib/payments/orderApi";
import { useToast } from "@/shared/context/ToastContext";
import { useTranslations } from "next-intl";

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

export default function ModalRoning({ onPaymentSuccess }: { onPaymentSuccess?: (data: SuccessDisplayData) => void }) {
  const { params, openModal, closeModal } = useModalPayment();
  const { productid, initialPrice, variantId, iconUrl: paramIconUrl } = (params || {}) as { productid?: string; initialPrice?: number; variantId?: number; iconUrl?: string };
  const { loading, payRoaming } = useCheckout();
  const toast = useToast();
  const t = useTranslations("paymentModal");

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
      if (effectiveOnSale) {
        const vSale = parseFloat(String((v as any)?.sale_price ?? "0"));
        if (vSale > 0) return vSale;
      }
      return v.price ?? 0;
    }
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

  // Lógica de oferta: calcular total original para mostrar "Antes" en el tag
  // No mostrar tag de oferta si hay cupón activo
  const isOnSale = effectiveOnSale;
  const originalTotal = React.useMemo(() => {
    if (!isOnSale) return undefined;
    let regularPrice: number;
    if (variants.length) {
      const v = selectedVariant ?? variants[0];
      const vRegular = parseFloat(String((v as any)?.regular_price ?? "0"));
      regularPrice = vRegular > 0 ? vRegular : (v?.price ?? 0);
    } else {
      regularPrice = parseFloat(String(product?.price ?? "0"));
    }
    if (!regularPrice || regularPrice <= unitPrice) return undefined;
    return regularPrice * quantity;
  }, [isOnSale, product, variants, selectedVariant, unitPrice, quantity]);

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
      onSale={isOnSale}
      originalTotal={originalTotal}
      onRemoveCoupon={() => { setDiscount(0); setCoupon(""); }}
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

          onPaymentSuccess?.({
            intent: data.intent,
            orderId: data.orderId,
            product: {
              name: product?.name ?? "Producto",
              image: product?.iconUrl || paramIconUrl || product?.images?.[0]?.src,
              brandKey,
              quantity,
              unitPrice,
              licenseMonths: !isNaN(lt) && lt > 0 ? lt : undefined,
              licensePeriod,
            },
          });
        }}
      />
    </PurchaseScaffold>
  );
}
