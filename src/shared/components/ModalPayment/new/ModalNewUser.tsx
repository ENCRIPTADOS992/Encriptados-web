// src/shared/components/ModalPayment/new/ModalNewUser.tsx
"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { getProductById } from "@/features/products/services";
import PurchaseScaffold from "./PurchaseScaffold";
import NewUserForm from "./NewUserForm";
import AppLicenseForm from "./AppLicenseForm";
import SimpleEmailForm from "./SimpleEmailForm";
import { useCheckout } from "@/shared/hooks/useCheckout";
import { usePurchaseKind } from "../PurchaseKindContext";

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

export default function ModalNewUser() {
  const { params, openModal, closeModal } = useModalPayment();
  const { productid, initialPrice } = (params || {}) as { productid?: string; initialPrice?: number };
  const { payUserId, loading } = useCheckout();
  const kind = usePurchaseKind();

  // Products that use SimpleEmailForm (only email, no usernames, no license type, no Telegram)
  const SIMPLE_EMAIL_PRODUCTS = [
    "vnclagoon",
    "armadillo",
    "vaultchat",
    "nordvpn",
    "salt",
    "threema work",
    "threema",
  ];

  // Silent Phone uses NewUserForm (with username field)
  const USERNAME_PRODUCTS = [
    "silent phone",
  ];

  const { data: product, isLoading: isLoadingProduct } = useQuery<ModalProduct, Error, ModalProduct>({
    queryKey: ["productById", productid],
    queryFn: () => getProductById(productid!),
    enabled: !!productid,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // Determine if this is an App/Software product that needs the full AppLicenseForm
  const productNameLower = (product?.name || "").toLowerCase();
  const isSimpleEmailProduct = SIMPLE_EMAIL_PRODUCTS.some(name => productNameLower.includes(name));
  const isUsernameProduct = USERNAME_PRODUCTS.some(name => productNameLower.includes(name));
  const isAppOrSoftware = (kind === "APLICACIONES" || kind === "SOFTWARE") && !isSimpleEmailProduct && !isUsernameProduct;

  const [selectedVariant, setSelectedVariant] = React.useState<Variant | null>(null);
  const [quantity, setQuantity] = React.useState(1);
  const [coupon, setCoupon] = React.useState("");
  const [discount, setDiscount] = React.useState(0);

  const variants = product?.variants ?? [];

  // Track si el usuario ha cambiado manualmente la variante
  const [userChangedVariant, setUserChangedVariant] = React.useState(false);

  React.useEffect(() => {
    // Si hay un initialPrice, buscar la variante que coincida con ese precio
    if (initialPrice != null && initialPrice > 0 && variants.length > 0) {
      const matchingVariant = variants.find((v) => v.price === initialPrice);
      if (matchingVariant) {
        setSelectedVariant(matchingVariant);
        return;
      }
    }
    // Si no hay match o no hay initialPrice, usar el primero
    setSelectedVariant(variants.length ? variants[0] : null);
  }, [product, initialPrice]);

  const unitPrice =
    (variants.length ? selectedVariant?.price ?? variants[0]?.price : Number(product?.price)) || 0;

  const onApplyCoupon = () => setDiscount(coupon.trim().toUpperCase() === "DESCUENTO5" ? 5 : 0);

  const amount = Math.max(unitPrice * quantity - discount, 0);
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

   return (
    <PurchaseScaffold
      mode="new_user"
      enableTabSwitch={true}
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
    >
      {isAppOrSoftware ? (
        <AppLicenseForm
          quantity={quantity}
          email=""
          productId={productIdNum}
          amountUsd={amount}
          orderType="userid"
          onPayCrypto={async (email, telegramId) => {
            await payUserId({
              productId: productIdNum,
              email,
              username: telegramId,
              provider: "kriptomus",
              amount,
              currency: "USD",
            });
          }}
          onPaid={() => {
            closeModal();
          }}
          loading={loading}
        />
      ) : isSimpleEmailProduct ? (
        <SimpleEmailForm
          email=""
          productId={productIdNum}
          amountUsd={amount}
          onPayCrypto={async (email) => {
            await payUserId({
              productId: productIdNum,
              email,
              username: undefined,
              provider: "kriptomus",
              amount,
              currency: "USD",
            });
          }}
          onPaid={() => {
            closeModal();
          }}
          loading={loading}
        />
      ) : (
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
              provider: "kriptomus",
              amount,
              currency: "USD",
            });
          }}
          onPaid={() => {
            closeModal();
          }}
          loading={loading}
        />
      )}
    </PurchaseScaffold>
  );
}