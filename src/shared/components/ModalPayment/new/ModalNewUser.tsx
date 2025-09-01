// src/shared/components/ModalPayment/new/ModalNewUser.tsx
"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { getProductById } from "@/features/products/services";
import PurchaseScaffold from "./PurchaseScaffold";
import NewUserForm from "./NewUserForm";
import { useCheckout } from "@/shared/hooks/useCheckout";

type ProductFromAPI = Awaited<ReturnType<typeof getProductById>>;
type Variant = { id: number; licensetime: number; price: number; sku?: string; image?: string };

type ModalProduct = ProductFromAPI & {
  variants?: Variant[];
  images?: { src: string }[];
  price?: number | string;
  name?: string;
  licensetime?: number | string;
};

export default function ModalNewUser() {
  const { params, openModal, closeModal } = useModalPayment();
  const { productid } = (params || {}) as { productid?: string };
  const { payUserId, loading } = useCheckout(); // lo usamos para CRYPTO

  const { data: product } = useQuery<ModalProduct, Error, ModalProduct>({
    queryKey: ["productById", productid],
    queryFn: () => getProductById(productid!),
    enabled: !!productid,
  });

  const [selectedVariant, setSelectedVariant] = React.useState<Variant | null>(null);
  const [quantity, setQuantity] = React.useState(1);
  const [coupon, setCoupon] = React.useState("");
  const [discount, setDiscount] = React.useState(0);

  const variants = product?.variants ?? [];

  React.useEffect(() => {
    setSelectedVariant(variants.length ? variants[0] : null);
  }, [product]);

  const unitPrice =
    (variants.length ? selectedVariant?.price ?? variants[0]?.price : Number(product?.price)) || 0;

  const onApplyCoupon = () => setDiscount(coupon.trim().toUpperCase() === "DESCUENTO5" ? 5 : 0);

  const amount = Math.max(unitPrice * quantity - discount, 0);
  const productIdNum = Number(productid);

   return (
    <PurchaseScaffold
      mode="new_user"
      enableTabSwitch={true}
      onSelectMode={(m) => openModal({ ...params, mode: m })}
      showRechargeCTA={false}
      product={product}
      selectedVariantId={selectedVariant?.id ?? null}
      onChangeVariant={(id) => setSelectedVariant(variants.find((v) => v.id === id) ?? null)}
      quantity={quantity}
      setQuantity={setQuantity}
      coupon={coupon}
      setCoupon={setCoupon}
      onApplyCoupon={onApplyCoupon}
      unitPrice={unitPrice}
    >
      <NewUserForm
        quantity={quantity}
        email=""
        productId={productIdNum}
        amountUsd={amount}
        orderType="userid"
        onPayCrypto={async (email) => {
          await payUserId({
            productId: productIdNum,
            email,
            username: undefined,
            provider: "kriptomus", // usa el literal que acepta tu tipo Provider
            amount,
            currency: "USD",
          });
        }}
        onPaid={() => {
          // 👇 aquí cerramos el modal grande del provider
          closeModal();
        }}
        loading={loading}
      />
    </PurchaseScaffold>
  );
}