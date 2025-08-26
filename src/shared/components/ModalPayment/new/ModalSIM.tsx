// src/shared/components/ModalPayment/new/ModalSIM.tsx
"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { getProductById } from "@/features/products/services";
import PurchaseScaffold from "./PurchaseScaffold";
import { useCheckout } from "@/shared/hooks/useCheckout";
import SimForm from "./SimForm";

type ProductFromAPI = Awaited<ReturnType<typeof getProductById>>;
type Variant = { id: number; licensetime: number; price: number; sku?: string; image?: string };
type ModalProduct = ProductFromAPI & { variants?: Variant[]; images?: { src: string }[]; price?: number | string; name?: string; licensetime?: number | string; };

export default function ModalSIM() {
  const { params } = useModalPayment();
  const { productid } = (params || {}) as { productid?: string };
  const { payUserId } = useCheckout();

  const { data: product } = useQuery<ModalProduct>({
    queryKey: ["productById", productid],
    queryFn: () => getProductById(productid!),
    enabled: !!productid,
  });

  const [selectedVariant, setSelectedVariant] = React.useState<Variant | null>(null);
  const [quantity, setQuantity] = React.useState(1);
  const [coupon, setCoupon] = React.useState("");
  const [discount, setDiscount] = React.useState(0);

  const variants = product?.variants ?? [];
  React.useEffect(() => { setSelectedVariant(variants[0] ?? null); }, [product]);

  const unitPrice =
    (variants.length ? selectedVariant?.price ?? variants[0]?.price : Number(product?.price)) || 0;

  const onApplyCoupon = () => setDiscount(coupon.trim().toUpperCase() === "DESCUENTO5" ? 5 : 0);

  type Shipping = {
    email: string;
    telegram?: string;
    fullName: string;
    address: string;
    country: string;
    postalCode: string;
    phone: string;
    method: "card" | "crypto";
  };

  const handleSubmit = async (data: Shipping) => {
    const amount = Math.max(unitPrice * quantity - discount, 0);
    const provider = data.method === "card" ? "stripe" : "kriptomus" as const;

    await payUserId({
      productId: Number(productid),
      email: data.email,
      provider,
      amount,
      currency: "USD",
      // si tu SDK acepta metadata, envía los datos de envío:
      // @ts-expect-error metadata opcional según implementación
      metadata: {
        type: "SIM_PHYSICAL",
        telegram: data.telegram,
        fullName: data.fullName,
        address: data.address,
        country: data.country,
        postalCode: data.postalCode,
        phone: data.phone,
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
      onChangeVariant={(id) => setSelectedVariant(variants.find(v => v.id === id) ?? null)}
      quantity={quantity}
      setQuantity={setQuantity}
      coupon={coupon}
      setCoupon={setCoupon}
      onApplyCoupon={onApplyCoupon}
      unitPrice={unitPrice}
    >
      <SimForm onSubmit={handleSubmit} />
    </PurchaseScaffold>
  );
}
