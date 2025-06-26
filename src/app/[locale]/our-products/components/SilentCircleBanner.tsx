"use client";

import React from "react";
import Image from "next/image";
import { useGetProducts } from "@/features/products/queries/useGetProducts";
import CardProductItem from "./CardProductItem";

const SilentCircleBanner = () => {
  const { data: allProducts } = useGetProducts(38, "all");

  const silentProduct = allProducts?.find((p) =>
    p.name.toLowerCase().includes("silent phone")
  );

  return (
    <>
      {/* —— MÓVIL únicamente —— */}
      <div
        className="block sm:hidden relative overflow-hidden w-screen left-1/2 -translate-x-1/2 text-white py-8 rounded-none"
        style={{ background: "linear-gradient(180deg, black 0%, black 60%, #FF0000 100%)" }}
      >
        {/* Contenido de texto */}
        <div className="relative z-10 px-4 space-y-4 text-center">
          <span className="inline-block bg-[#CB0808] px-4 py-1 rounded-full text-sm font-semibold">
            Silent Circle
          </span>
          <h2 className="text-2xl font-bold">Silent Phone</h2>
          <p className="text-sm text-gray-300">
            Desarrollada por expertos en tecnología móvil, esta app protege tus datos con máxima seguridad en todo momento.
          </p>
        </div>

        <div className="relative z-10 px-4 mt-4">
          <Image
            src="/images/our-products/aef4b25c090984d368c3328bbcfd54545ac75eef.png"
            alt="Silent Circle ilustración"
            width={400}
            height={200}
            className="mx-auto rounded-xl"
          />
        </div>
        <p className="text-xl font-semibold text-center mt-4">
          Compra aquí tu Silente Phone fácil y sin complicaciones
        </p>

        {/* Card */}
        {silentProduct && (
          <div className="relative z-10 mt-6 px-4">
            <CardProductItem product={silentProduct} />
          </div>
        )}
      </div>

      {/* —— TABLET+ (resto pantallas) —— */}
      <div className="hidden sm:block relative overflow-hidden w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rounded-3xl bg-[#101010] text-white">
        {/* Fondo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/our-products/aef4b25c090984d368c3328bbcfd54545ac75eef.png"
            alt="Fondo Silent Circle"
            fill
            className="object-cover opacity-30"
            style={{
              maskImage: "linear-gradient(to left, black 10%, transparent 70%)",
              WebkitMaskImage:
                "linear-gradient(to left, black 10%, transparent 100%)",
            }}
          />
        </div>

        {/* Contenido */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-6">
          {/* Texto */}
          <div className="w-full sm:w-1/2 sm:ml-8 lg:ml-12 text-center sm:text-left space-y-4">
            <span className="inline-block bg-[#CB0808] px-6 py-1 rounded-full text-sm font-semibold">
              Silent Circle
            </span>
            <h2 className="text-2xl sm:text-xl md:text-2xl font-bold">Silent Phone</h2>
            <p className="text-sm sm:text-xs md:text-sm text-gray-300 max-w-md">
              Desarrollada por expertos en tecnología móvil, esta app protege tus datos con máxima seguridad en todo momento.
            </p>
          </div>

          {/* Card */}
          {silentProduct && (
            <div className="w-full sm:w-2/5 flex justify-center sm:justify-end mt-4 sm:mt-0 mr-0 sm:mr-8 lg:mr-20">
              <div className="w-full max-w-sm">
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
