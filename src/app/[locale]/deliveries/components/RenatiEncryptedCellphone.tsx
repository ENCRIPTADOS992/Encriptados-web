"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

const FeaturedProductCard = () => {
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
          (p: any) => p.sku === "RENATI" || p.name === "Renati" // Check by SKU or Name to be safe
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
    <section className="py-10 bg-[#EAF2F6] hidden xl:flex lg:justify-center">
      <div
        className="relative w-full max-w-6xl rounded-2xl p-6 flex items-center overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, black 40%, #740000 80%, red 100%)",
        }}
      >
        <div className="w-[45%] relative bottom-[-25px] left-6">
          <img
            src="/images/deliveries/image 315.webp"
            alt="Celular Encriptado Renati"
            className="w-[90%] h-auto"
          />
        </div>

        <div className="w-1/2 text-white pl-6 ">
          <img
            src="/images/deliveries/image 316.webp"
            alt="Renati Logo"
            className="w-16 mb-2"
          />
          <h2 className="text-xl font-bold">Celular Encriptado Renati</h2>

          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xs font-normal">Desde:</span>
            <span className="text-base font-normal">${price ? parseFloat(price).toFixed(2) : "..."}</span>
          </div>


          <button
            type="button"
            onClick={handleBuyClick}
            className="mt-4 bg-white text-black px-10 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Comprar
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductCard;
