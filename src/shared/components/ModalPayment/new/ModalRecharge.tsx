// src/shared/components/ModalPayment/new/ModalRecharge.tsx
"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { getProductById } from "@/features/products/services";
import PurchaseScaffold from "./PurchaseScaffold";
import type { Mode } from "./PurchaseTabs";

// --- Tipos locales para que TS no grite ---
type ProductFromAPI = Awaited<ReturnType<typeof getProductById>>;
type Variant = { id: number; licensetime: number; price: number; sku?: string; image?: string };

// Extendemos lo que venga del API con lo que la UI necesita
type ModalProduct = ProductFromAPI & {
  variants?: Variant[];
  images?: { src: string }[];
  price?: number | string;
  name?: string;
  licensetime?: number | string;
};

export default function ModalRecharge() {
  const { params, openModal } = useModalPayment();
  const { productid, mode = "recharge" } = (params || {}) as {
    productid?: string;
    mode?: Mode;
  };

  // Tipamos el query con ModalProduct
  const { data: product } = useQuery<ModalProduct, Error, ModalProduct>({
    queryKey: ["productById", productid],
    queryFn: () => getProductById(productid!),
    enabled: !!productid,
  });

  const [selectedVariant, setSelectedVariant] = React.useState<Variant | null>(null);
  const [quantity, setQuantity] = React.useState(1);
  const [coupon, setCoupon] = React.useState("");
  const [discount, setDiscount] = React.useState(0);

  // Tomamos variantes de forma segura
  const variants = product?.variants ?? [];

  React.useEffect(() => {
    setSelectedVariant(variants.length ? variants[0] : null);
  }, [product]); // eslint-disable-line react-hooks/exhaustive-deps

  const unitPrice =
    (variants.length
      ? selectedVariant?.price ?? variants[0]?.price
      : Number(product?.price)) || 0;

  const onApplyCoupon = () => {
    setDiscount(coupon.trim().toUpperCase() === "DESCUENTO5" ? 5 : 0);
  };

  return (
    <PurchaseScaffold
      mode="recharge"
      enableTabSwitch={true}                  // pon true si quieres cambiar de pestaña
      onSelectMode={(m) => openModal({ ...params, mode: m })}
      showRechargeCTA={true}                   // bloque Telegram
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
      {/* Contenido específico de "Recargar" (si hace falta) */}
    </PurchaseScaffold>
  );
}
