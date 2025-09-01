"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { getProductById } from "@/features/products/services";
import PurchaseScaffold from "./PurchaseScaffold";
import RoningForm from "./RoningForm";
import { useCheckout } from "@/shared/hooks/useCheckout";
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

export default function ModalRoning() {
  const { params, openModal, closeModal } = useModalPayment();
  const { productid } = (params || {}) as { productid?: string };
  const { loading, payRoaming } = useCheckout();

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

  React.useEffect(() => {
    setSelectedVariant(variants.length ? variants[0] : null);
  }, [product]);

  const unitPrice =
    (variants.length
      ? selectedVariant?.price ?? variants[0]?.price
      : Number(product?.price)) || 0;

  const onApplyCoupon = () =>
    setDiscount(coupon.trim().toUpperCase() === "DESCUENTO5" ? 5 : 0);

  const amountUsd = Math.max(Number(unitPrice) * quantity - discount, 0);

  const payWithCrypto = async (email: string) => {
    const provider: PayProvider = "kriptomus";
    await payRoaming({
      productId: Number(productid),
      qty: quantity,
      email,
      provider,
      amount: amountUsd,
      currency: "USD",
    });
  };

  const handleSubmit = async (data: {
    email: string;
    method: "card" | "crypto";
  }) => {
    try {
      const productIdNum = Number(productid);
      const amount = Math.max(Number(unitPrice) * quantity - discount, 0);
      const currency = "USD";
      const provider: PayProvider =
        data.method === "card" ? "stripe" : "kriptomus";

      await payRoaming({
        productId: productIdNum,
        qty: quantity,
        email: data.email,
        provider,
        amount,
        currency,
      });
    } catch (e: any) {
      if (e?.code === "out_of_stock") {
        alert("Stock insuficiente");
      } else {
        alert(e?.message || "Error procesando el pago");
      }
    }
  };

  return (
    <PurchaseScaffold
      mode="roning_code"
      enableTabSwitch={true}
      onSelectMode={(m) => openModal({ ...params, mode: m })}
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
        orderType="roaming"             
        amountUsd={amountUsd}
        onPayCrypto={payWithCrypto}
        onPaid={() => closeModal?.()}
      />
    </PurchaseScaffold>
  );
}
