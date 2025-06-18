"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

import CardDescriptionSimInfo from "./CardDescriptionSimInfo";
import CardSimInfo from "./CardSimInfo";

import { useGetProductByIdUpdate } from "@/features/products/queries/useGetProductById";

const FixedSimProductDetail: React.FC = () => {
  const t = useTranslations("EncryptedSimPage");
  const searchParams = useSearchParams();

  const selectedId = searchParams.get("productId");
  const selectedOption = searchParams.get("selectedOption") || "40";
  const categoryId = parseInt(selectedOption, 10);
  const locale = useLocale();

  console.log("🔍 ID recibido:", selectedId);
  console.log("📦 Categoría seleccionada:", categoryId);

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdUpdate(selectedId ?? "", categoryId);

   console.log("📡 Resultado de useGetProductByIdUpdate:", {
    isLoading,
    isError,
    product,
  });

  if (isLoading) {
    return <div className="text-center py-10">Cargando producto...</div>;
  }

  if (isError || !product) {
    return (
      <div className="text-center py-10 text-red-500">
        No se pudo cargar el producto.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div
        className={`bg-white gap-8 flex flex-col md:flex-row items-center justify-between py-10 px-6 md:px-12`}
      >
        <CardDescriptionSimInfo
          features={product.checks?.map((adv) => adv.name) || []}
          priceRange={`${product.price}$`}
          headerTitle={product.name}
          id={product.id}
          languageCode={locale}
        />

        <CardSimInfo productImage={product.images[0]?.src ?? ""} />
      </div>
    </div>
  );
};

export default FixedSimProductDetail;
