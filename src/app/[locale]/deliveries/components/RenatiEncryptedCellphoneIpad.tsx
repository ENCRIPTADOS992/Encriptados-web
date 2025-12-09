"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

const FeaturedProductCardTablet = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleBuyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const baseHref = "/apps/renati";
    let finalHref = baseHref;

    const match = pathname.match(/^\/([a-zA-Z-]+)(\/|$)/);
    if (match) {
      const locale = match[1];
      if (!baseHref.startsWith(`/${locale}/`)) {
        finalHref = `/${locale}${baseHref}`;
      }
    }

    try {
      router.push(finalHref);
    } catch (error) {
      console.error("[FeaturedProductCardTablet] Error en router.push", error);
      if (typeof window !== "undefined") {
        window.location.assign(finalHref);
      }
    }
  };

  return (
    <section className="py-10 bg-[#EAF2F6] hidden sm:flex lg:hidden flex justify-center">
      <div
        className="
          relative
          w-[716px] h-[444px]
          rounded-[24px]
          px-8 py-8
          flex items-center
          overflow-hidden
        "
        style={{
          background:
            "linear-gradient(160deg, black 40%, #740000 80%, red 100%)",
        }}
      >
        +{" "}
        <div className="w-[265px] h-[315px] flex-shrink-0 mt-8">
          <img
            src="/images/deliveries/cellphone.png"
            alt="Celular Encriptado Renati"
            className="w-[265px] h-[315px] object-contain"
          />
        </div>
        {/* Texto 308px de ancho */}
        {/* Texto 308 -> 428 y wrappers nuevos */}
        <div
          className="
    ml-6
    flex flex-col text-white
    w-[428px]           /* ≈ 427.59px */
    gap-5               /* ≈ 20px entre bloque de texto y botón */
  "
        >
          <img
            src="/images/deliveries/image 316.png"
            alt="Renati Logo"
            className="w-16 mb-1"
          />

          {/* div para h2 + precio: 427.59px de ancho, gap 8px */}
          <div
            className="
      flex flex-col
      w-full
      gap-2             /* ≈ 8px */
    "
          >
            <h2 className="text-[20px] font-bold leading-snug">
              Celular Encriptado Renati
            </h2>

            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-[12px] font-normal">Desde:</span>
              <span className="text-[18px] font-normal">$650.00</span>
            </div>

          </div>

          <button
            type="button"
            onClick={handleBuyClick}
            className="
      mt-4
      bg-white text-black
      px-10 py-2
      rounded-full
      font-semibold
      hover:bg-gray-200
      transition
      self-start
    "
          >
            Comprar
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductCardTablet;
