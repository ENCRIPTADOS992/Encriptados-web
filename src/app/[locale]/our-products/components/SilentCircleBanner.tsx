"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetProducts } from "@/features/products/queries/useGetProducts";
import CardProductItem from "./CardProductItem";
import Typography from "@/shared/components/Typography";
import Paragraph from "@/shared/components/Paragraph";
import Button from "@/shared/components/Button";
import { useTranslations } from "next-intl";

const SilentCircleBanner: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations("OurProductsPage.silentCircle");

  // 1) Leer productId desde la URL (?productId= o ?id=)
  const productIdFromQuery = useMemo(() => {
    const param = searchParams.get("productId") ?? searchParams.get("id");
    return param ? Number(param) : null;
  }, [searchParams]);

  // 2) Traer los productos de la categoría 38 (Aplicaciones)
  const { data: allProducts, isLoading } = useGetProducts(38, "all");

  // 3) Buscar el producto de Silent Phone
  const silentProduct = useMemo(() => {
    if (!allProducts) return undefined;

    if (productIdFromQuery) {
      return allProducts.find((p) => p.id === productIdFromQuery);
    }

    return allProducts.find((p) =>
      p.name.toLowerCase().includes("silent phone")
    );
  }, [allProducts, productIdFromQuery]);

  // 4) Handler de "Más información"
  const handleMoreInfo = () => {
    const id = productIdFromQuery ?? silentProduct?.id;
    if (!id) return;

    // Next se encarga de anteponer /es según el locale actual
    router.push(`/apps/silent-circle?productId=${id}`);

    // Si quisieras hardcodear el idioma:
    // router.push(`/es/apps/silent-circle?productId=${id}`);
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      {/* Versión Móvil */}
      <div
        className="block sm:hidden relative overflow-hidden w-screen left-1/2 -translate-x-1/2 text-white py-6 xs:py-8 rounded-none"
        style={{
          background:
            "linear-gradient(180deg, black 0%, black 60%, #FF0000 100%)",
        }}
      >
        {/* Contenido de texto */}
        <div className="relative z-10 px-4 xs:px-6 space-y-3 xs:space-y-4 text-center">
          <span className="inline-block bg-[#CB0808] px-3 xs:px-4 py-1 rounded-full text-xs xs:text-sm font-semibold">
            {t("badge")}
          </span>
          
          <Typography variant="h3" as="h2" className="text-xl xs:text-2xl">
            {t("title")}
          </Typography>
          
          <Paragraph 
            variant="body" 
            color="secondary" 
            className="text-sm xs:text-base text-center max-w-md mx-auto"
          >
            {t("description")}
          </Paragraph>
        </div>

        <div className="relative z-10 px-4 xs:px-6 mt-4">
          <Image
            src="/images/our-products/aef4b25c090984d368c3328bbcfd54545ac75eef.png"
            alt="Silent Circle ilustración"
            width={400}
            height={200}
            className="mx-auto rounded-xl"
          />
        </div>

        <Typography 
          variant="h5" 
          className="text-lg xs:text-xl text-center mt-4 px-4 xs:px-6"
        >
          {t("cta")}
        </Typography>

        {/* Card + botón */}
        {silentProduct && (
          <div className="relative z-10 mt-6 px-4 xs:px-6 space-y-3">
            <CardProductItem product={silentProduct} />
          </div>
        )}
      </div>

      {/* Versión Tablet+ */}
      <div className="hidden sm:block relative overflow-hidden w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 rounded-2xl sm:rounded-3xl bg-[#101010] text-white">
        {/* Fondo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/our-products/aef4b25c090984d368c3328bbcfd54545ac75eef.png"
            alt="Fondo Silent Circle"
            fill
            className="object-cover opacity-30"
            style={{
              maskImage:
                "linear-gradient(to left, black 10%, transparent 70%)",
              WebkitMaskImage:
                "linear-gradient(to left, black 10%, transparent 100%)",
            }}
          />
        </div>

        {/* Contenido */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center lg:justify-between gap-4 sm:gap-6">
          {/* Texto */}
          <div className="w-full lg:w-1/2 sm:ml-4 md:ml-8 lg:ml-12 text-center lg:text-left space-y-3 sm:space-y-4">
            <span className="inline-block bg-[#CB0808] px-4 sm:px-6 py-1 rounded-full text-xs sm:text-sm font-semibold">
              {t("badge")}
            </span>
            
            <Typography 
              variant="h3" 
              as="h2" 
              className="text-xl sm:text-2xl md:text-[30px]"
            >
              {t("title")}
            </Typography>
            
            <Paragraph 
              variant="body" 
              color="secondary" 
              className="text-sm sm:text-base max-w-md mx-auto lg:mx-0"
            >
              {t("description")}
            </Paragraph>
          </div>

          {/* Card + botón */}
          {silentProduct && (
            <div className="w-full lg:w-2/5 flex justify-center lg:justify-end mt-4 lg:mt-0 mr-0 sm:mr-4 md:mr-8 lg:mr-20">
              <div className="w-full max-w-sm space-y-3">
                <CardProductItem product={silentProduct} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SilentCircleBanner;
