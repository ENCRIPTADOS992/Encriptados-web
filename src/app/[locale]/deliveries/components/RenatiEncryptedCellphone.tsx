"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

const FeaturedProductCard = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleBuyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const baseHref = "/apps/renati";
    let finalHref = baseHref;

    // Detectar locale desde el pathname: /es/..., /en/..., etc.
    const match = pathname.match(/^\/([a-zA-Z-]+)(\/|$)/);
    if (match) {
      const locale = match[1]; // 'es', 'en', etc.
      if (!baseHref.startsWith(`/${locale}/`)) {
        finalHref = `/${locale}${baseHref}`; // -> /es/apps/renati
      }
    }

    console.log("[FeaturedProductCard] Navegando a:", {
      pathname,
      finalHref,
    });

    try {
      router.push(finalHref);
    } catch (error) {
      console.error("[FeaturedProductCard] Error en router.push", error);
      if (typeof window !== "undefined") {
        window.location.assign(finalHref);
      }
    }
  };

  return (
    <section className="py-10 bg-[#EAF2F6] flex justify-center">
      <div
        className="relative w-full max-w-6xl rounded-2xl p-6 flex items-center overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, black 40%, #740000 80%, red 100%)",
        }}
      >
        {/* Imagen del celular */}
        <div className="w-[45%] relative bottom-[-25px] left-6">
          <img
            src="/images/deliveries/image 315.png"
            alt="Celular Encriptado Renati"
            className="w-[90%] h-auto"
          />
        </div>

        {/* Contenido de la tarjeta */}
        <div className="w-1/2 text-white pl-6 ">
          {/* Logo de Renati */}
          <img
            src="/images/deliveries/image 316.png"
            alt="Renati Logo"
            className="w-16 mb-2"
          />
          <h2 className="text-xl font-bold">Celular Encriptado Renati</h2>

          {/* Precio con descuento */}
          <div className="mt-2">
            <span className="text-m font-normal">$650.00</span>
            <span className="text-sm left-15 text-[#FF4B59] line-through ml-2">
              $750.00
            </span>
          </div>

          {/* Botón de compra */}
          <button
            type="button"
            onClick={handleBuyClick}
            className="mt-4 bg-white text-black px-10 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Comprar
          </button>
        </div>

        {/* Etiqueta de Descuento */}
        <div className="absolute top-0 right-20 bg-red-600 text-white px-4 py-4 rounded-b-xl text-center">
          <span className="block text-2xl text-black font-extrabold mt-2">
            20%
          </span>
          <span className="block text-xs text-black font-semibold ">
            Dscto
          </span>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductCard;
