"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { getProductById } from "@/features/products/services";
import type { ProductById } from "@/features/products/types/AllProductsResponse";
import { useSearchParams } from "next/navigation";
import TelegramButton from "@/shared/components/TelegramButton";

const RouterCamaleon = () => {
  const t = useTranslations("RouterCamaleonPage.product");
  const [product, setProduct] = useState<ProductById | null>(null);
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  useEffect(() => {
    if (productId) {
      getProductById(productId, "es").then(setProduct).catch(console.error);
    }
  }, [productId]);

  // Puedes poner el precio directamente aquí o traerlo de la API
  const price = product?.price ?? "750$ USD";

  return (
    <section className="
    bg-white
    mx-auto
    w-full
    max-w-[1440px]
    h-[560px]
    flex
    flex-col
    justify-center
    px-4
    py-10
    lg:px-10
    "
>
      {/* MOBILE */}
      <div className="block lg:hidden mb-6 flex justify-center">
        <Image
          src="/images/routercamaleon/router-standalone.png"
          alt="Router Camaleón"
          width={220}
          height={260}
          className="w-[80%] max-w-[250px]"
        />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Texto */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          {/* Logo */}
          <h2 className="font-bold text-[28px] leading-[100%] text-[#131313] mb-2 max-w-[464px]">
            Camaleón Router
          </h2>

          <p className="font-normal text-[14px] leading-[100%] text-[#000000] mb-5 max-w-[413px]">
            El Router Camaleón es la solución ideal para aquellos que buscan
            privacidad total y una conexión segura a Internet.
          </p>

          <ul className="text-[#1E293B] text-sm flex flex-col gap-2 mb-6">
            <li className="flex items-center gap-2">
              <span>✔</span> Cambio de IMEI dinámico
            </li>
            <li className="flex items-center gap-2">
              <span>✔</span> Doble VPN
            </li>
            <li className="flex items-center gap-2">
              <span>✔</span> Conexión segura
            </li>
          </ul>

          <hr className="mb-4" />

          <p className="text-xs text-[#64748B] mb-1">Desde</p>
          <p className="text-2xl font-bold text-[#0F172A] mb-5">{price}</p>

          {/* Botones */}
          <div className="flex flex-row gap-4 mb-6">
            <button className="bg-black text-white px-6 py-[10px] h-[54px] rounded-full text-[14px] flex items-center gap-2 hover:opacity-90">
              Comprar
              <Image
                src="/images/apps/cryptcom/shopping_cart.png"
                alt="Carrito"
                width={20}
                height={20}
              />
            </button>

            <TelegramButton />
          </div>
        </div>

        {/* Imagen grande y elementos visuales para DESKTOP */}
        <div className="hidden lg:flex w-full lg:w-1/2 flex-col items-center relative">
          {/* Background principal */}
          <Image
            src="/images/router/card_fondo.png"
            alt="Router Camaleón en mochila"
            width={520}
            height={329}
            className="rounded-2xl"
          />
          {/* Imagen flotante del router (opcional, puedes ajustarla con absolute para overlay) */}
          <Image
            src="/images/router/router.png"
            alt="Router Camaleón"
            width={250}
            height={230}
            className="absolute left-[50%] top-[30%] -translate-x-1/2 -translate-y-1/2 z-10"
          />
        </div>
      </div>
    </section>
  );
};

export default RouterCamaleon;
