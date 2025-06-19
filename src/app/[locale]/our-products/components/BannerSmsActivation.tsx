"use client";

import Image from "next/image";
import React from "react";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import Button from "@/shared/components/Button";
import { useTranslations } from "next-intl";

const BannerSmsActivation = () => {
  const { openModal } = useModalPayment();

  const handleBuyClick = () => {
    openModal({ productid: "503", languageCode: "es" });
  };

  return (
    <section className="w-full bg-[#0B0B0B] text-white py-10 px-4 sm:px-6 md:px-10 rounded-3xl overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Texto a la izquierda */}
        <div className="flex-1 space-y-6 text-left">
          <h2 className="text-3xl sm:text-4xl font-bold leading-snug">
            Activa APPs por SMS <br /> con Encriptados
          </h2>
          <p className="text-[#9CA3AF] text-lg">
            Regístrate en cualquier aplicación <br /> con un número de teléfono virtual
          </p>
          <p className="text-[#9CA3AF] italic text-sm flex items-center gap-2">
            <span className="text-2xl">🇨🇴</span> *Se genera un número colombiano
          </p>

          <Button
            size="medium"
            rounded="full"
            intent="cyan"
            customStyles="text-sm px-8 py-3 w-fit"
            onClick={handleBuyClick}
          >
            Comprar ahora
          </Button>
        </div>

        {/* Imagen a la derecha */}
        <div className="flex-1 relative w-full h-[360px] max-w-md">
          <Image
            src="/images/our-products/Wire 2025-06-18 at 11_48.png"
            alt="Imagen mujer globe"
            layout="fill"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default BannerSmsActivation;
