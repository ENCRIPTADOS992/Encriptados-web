"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

const FeaturedProductCardMobile = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [price, setPrice] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(
          "https://encriptados.es/wp-json/encriptados/v1/products/by-category-language?category_id=35&lang=es&sim_region=global"
        );
        const data = await response.json();
        const renatiProduct = data.products.find(
          (p: any) => p.sku === "RENATI" || p.name === "Renati"
        );

        if (renatiProduct && renatiProduct.price) {
          setPrice(renatiProduct.price);
        }
      } catch (error) {
        console.error("Error fetching Renati price:", error);
      }
    };

    fetchPrice();
  }, []);

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
            src="/images/deliveries/image 316.webp"
            alt="Renati Logo"
            className="w-[79px] h-[73px] mb-1"
          />

          <h2 className="text-[20px] font-extrabold leading-snug">
            Celular Encriptado Renati
          </h2>

          <div className="flex items-baseline gap-1">
            <span className="text-[12px] font-normal">Desde:</span>
            <span className="text-[20px] font-medium">${price ? parseFloat(price).toFixed(2) : "..."}</span>
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
            src="/images/deliveries/cellphone.webp"
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
