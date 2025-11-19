// src/shared/components/ModalPayment/new/ModalSIM.tsx
"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { getProductById } from "@/features/products/services";
import PurchaseScaffold from "./PurchaseScaffold";
import { useCheckout } from "@/shared/hooks/useCheckout";
import RoningForm from "@/shared/components/ModalPayment/new/RoningForm";
import type { Provider as PayProvider } from "@/services/checkout";

type ProductFromAPI = Awaited<ReturnType<typeof getProductById>>;

type Variant = {
  id: number;
  licensetime: number;
  price: number;
  sku?: string;
  image?: string;
};

type ModalProduct = ProductFromAPI & {
  variants?: Variant[];
  images?: { src: string }[];
  price?: number | string;
  name?: string;
  licensetime?: number | string;
};

export default function ModalSIM() {
  const { params, closeModal } = useModalPayment();
  const { productid } = (params || {}) as { productid?: string };

  const { loading, payUserId } = useCheckout();

  const { data: product } = useQuery<ModalProduct>({
    queryKey: ["productById", productid],
    queryFn: () => getProductById(productid!),
    enabled: !!productid,
  });

  // --- Variantes / precio / descuento ---
  const [selectedVariant, setSelectedVariant] = React.useState<Variant | null>(
    null
  );
  const [quantity, setQuantity] = React.useState(1);
  const [coupon, setCoupon] = React.useState("");
  const [discount, setDiscount] = React.useState(0);

  const variants = product?.variants ?? [];

  React.useEffect(() => {
    setSelectedVariant(variants[0] ?? null);
  }, [product]);

  const unitPrice =
    (variants.length
      ? selectedVariant?.price ?? variants[0]?.price
      : Number(product?.price)) || 0;

  const onApplyCoupon = () =>
    setDiscount(coupon.trim().toUpperCase() === "DESCUENTO5" ? 5 : 0);

  const baseAmount = Number(unitPrice) * quantity - discount;
  const amountUsd = Math.max(baseAmount, 0);

  // 👇 mismo patrón que en ModalRoning para crypto, pero usando payUserId
  const payWithCrypto = async (email: string) => {
    const provider: PayProvider = "kriptomus";
    await payUserId({
      productId: Number(productid),
      email,
      provider,
      amount: amountUsd,
      currency: "USD",
      // @ts-expect-error metadata opcional
      metadata: {
        type: "SIM",
        quantity,
      },
    });
  };

  return (
    <PurchaseScaffold
      mode="sim"
      enableTabSwitch={false}
      showRechargeCTA={false}
      product={product}
      selectedVariantId={selectedVariant?.id ?? null}
      onChangeVariant={(id) =>
        setSelectedVariant(variants.find((v) => v.id === id) ?? null)
      }
      quantity={quantity}
      setQuantity={setQuantity}
      coupon={coupon}
      setCoupon={setCoupon}
      onApplyCoupon={onApplyCoupon}
      unitPrice={unitPrice}
    >
      <RoningForm
        quantity={quantity}
        email=""
        loading={loading}
        productId={Number(productid)}
        orderType="sim"          // ⚠️ agrega "sim" en tu OrderType
        amountUsd={amountUsd}
        onPayCrypto={payWithCrypto}
        onPaid={() => closeModal?.()}
      />
    </PurchaseScaffold>
  );
}
