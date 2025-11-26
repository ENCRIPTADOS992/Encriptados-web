"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

const FeaturedProductCardMobile = () => {
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
      console.error("[FeaturedProductCardMobile] Error en router.push", error);
      if (typeof window !== "undefined") {
        window.location.assign(finalHref);
      }
    }
  };

  return (
    <section className="py-10 bg-[#EAF2F6] flex justify-center sm:hidden">
      <div
        className="
          relative
          w-[414px] h-[604px]
          rounded-[24px]
          px-5 py-6
          flex flex-col items-center
          overflow-hidden
        "
      >
        {/* Fondo: SIN z negativo */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top, #D11827 0%, #000000 60%)",
          }}
        />

        {/* bloque texto 374px */}
        <div className="relative z-10 w-full max-w-[320px] flex flex-col gap-4 text-white">
            <img
                src="/images/deliveries/image 316.png"
                alt="Renati Logo"
                className="w-[64px] h-[60px] mb-1"
            />

            <h2 className="text-[18px] font-bold leading-snug">
                Celular Encriptado Renati
            </h2>

            <div>
                <span className="text-[16px] font-normal">$650.00</span>
            </div>

            <button
                type="button"
                onClick={handleBuyClick}
                className="
                mt-2
                bg-white text-black
                px-8 py-2
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


        <div className="relative z-10 w-[285px] h-[308px] mt-8">
          <img
            src="/images/deliveries/cellphone.png"
            alt="Celular Encriptado Renati"
            className="w-[375px] h-[308px] object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductCardMobile;
