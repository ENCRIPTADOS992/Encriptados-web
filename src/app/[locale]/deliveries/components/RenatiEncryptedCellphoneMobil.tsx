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
    <section
      className="
        relative
        w-full
        py-10
        sm:hidden
        overflow-hidden
      "
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at left center, #000000 0%, #000000 55%, #D11827 100%)",
        }}
      />

      <div
        className="
          relative z-10
          w-full max-w-[414px]
          mx-auto
          px-5 py-6
          flex flex-col items-center
        "
      >
        {/* bloque texto 374px */}
        <div className="relative z-10 w-full w-[374px] h-[228px] flex flex-col gap-4 text-white">
          <img
            src="/images/deliveries/image 316.png"
            alt="Renati Logo"
            className="w-[79px] h-[73px] mb-1"
          />

          <h2 className="text-[20px] font-extrabold leading-snug">
            Celular Encriptado Renati
          </h2>

          <div>
            <span className="text-[20px] font-medium">$650.00</span>
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
                w-[374px]
                h-[54px]
                "
          >
            Comprar
          </button>
        </div>

          <div
        className="
          relative
          mt-6
          w-[375px] 
          h-[180px]          
          self-center
        "
      >
        <img
          src="/images/deliveries/cellphone.png"
          alt="Celular Encriptado Renati"
          className="
            w-[375px] 
            h-[308px]
            object-cover
            object-top        
          "
        />
      </div>
      </div>
    </section>
  );
};

export default FeaturedProductCardMobile;
