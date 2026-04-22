"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

import CardDescriptionSimInfo from "./CardDescriptionSimInfo";
import CardSimInfo from "./CardSimInfo";

import { useGetProductByIdUpdate } from "@/features/products/queries/useGetProductById";
import SectionWrapper from "@/shared/components/SectionWrapper";
import { getProductLink } from "@/shared/utils/productRouteResolver";

const FixedSimProductDetail: React.FC = () => {
  const t = useTranslations("EncryptedSimPage");
  const searchParams = useSearchParams();
  const router = useRouter();

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

  React.useEffect(() => {
    if (!product?.name) return;

    if (!/activar\s*apps?/i.test(product.name)) return;

    const targetPath = getProductLink(
      product.name,
      Number(product.category?.id ?? categoryId),
      product.id,
      (product as any)?.provider,
      (product as any)?.type_product
    );

    if (!targetPath) return;

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set("productId", String(product.id));
    nextParams.set("categoryId", String(product.category?.id ?? categoryId));

    router.replace(`/${locale}${targetPath}?${nextParams.toString()}`);
  }, [categoryId, locale, product, router, searchParams]);

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
    <div className="bg-white w-full">
      {/* SectionWrapper centra y limita el ancho del contenido interno */}
      <SectionWrapper className="py-10">
        <div className="
            flex flex-col md:flex-row 
            items-center 
            justify-center 
            gap-6
          ">
          <CardDescriptionSimInfo
            features={product.checks?.map((adv: { name: string }) => adv.name) || []}
            priceRange={`${product.price}$`}
            headerTitle={product.name}
            id={product.id}
            languageCode={locale}
            iconUrl={(product as any)?.iconUrl}
          />

          <CardSimInfo productImage={product.images[0]?.src ?? ""} />
        </div>
      </SectionWrapper>
    </div>
  );
};

export default FixedSimProductDetail;
