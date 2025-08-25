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
  const { params, openModal } = useModalPayment();
  const { productid } = (params || {}) as { productid?: string };
  const { payUserId, loading } = useCheckout();

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
    (variants.length
      ? selectedVariant?.price ?? variants[0]?.price
      : Number(product?.price)) || 0;

  const onApplyCoupon = () =>
    setDiscount(coupon.trim().toUpperCase() === "DESCUENTO5" ? 5 : 0);

  const handleSubmit = async (data: { email: string; usernames: string[]; method: "card" | "crypto" }) => {
    try {
      const productIdNum = Number(productid);
      const amount = Math.max(unitPrice * quantity - discount, 0);
      const currency = "USD" as const;
      const provider = data.method === "card" ? "stripe" : "kriptomus" as const;

      await payUserId({
        productId: productIdNum,
        email: data.email,
        username: data.usernames[0] || undefined,
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
      mode="new_user"
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
      <NewUserForm
        quantity={quantity} 
        email=""
        onSubmit={handleSubmit}
      />
    </PurchaseScaffold>
  );
}
