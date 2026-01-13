// src/app/[locale]/encrypted-sim/components/CardSim.tsx
"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Button from "@/shared/components/Button";
import TravelSvg from "/public/images/encrypted-sim/icons/travel_explore.svg";
import WifiSvg from "/public/images/encrypted-sim/icons/wifi_tethering.svg";
import CheckSvg from "/public/images/encrypted-sim/icons/check.svg";
import StarSvg from "/public/images/encrypted-sim/icons/star_half2.svg";
import LocalMallSvg from "/public/images/encrypted-sim/icons/local_mall.svg";
import type { StaticImageData } from "next/image";




type ImageType = StaticImageData;

interface CardSimProps {
  productImage: string | ImageType;  
  features: string[];     
  priceRange: string;
  headerIcon: string | ImageType;
  headerTitle: string;
  onBuy?: () => void;
}

const CardSim: React.FC<CardSimProps> = ({
  productImage,
  features,
  priceRange,
  headerIcon,
  headerTitle,
  onBuy,
}) => {
  const t = useTranslations("EncryptedSimPage.CardSim");
  
  return (
    <div className="w-full max-w-[320px] sm:max-w-none sm:w-[45%] sm:shrink-0 md:shrink-0 md:w-[340px] lg:w-[380px] xl:w-[420px] mx-auto mb-4 sm:mb-0 bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col">
      {/* ------------------------------------------------------
          PARTE SUPERIOR: imagen de la SIM + "+200 países" / "5G LTE"
      ------------------------------------------------------ */}
      <div className="relative w-full aspect-[16/9] bg-[#5D5D5D] overflow-hidden">
        {/* Imagen que ocupa todo el espacio */}
        <Image
          src={productImage}
          alt="Sim Card"
          fill
          sizes="(max-width: 640px) 320px, (max-width: 768px) 340px, 420px"
          className="object-cover"
        />
        
        {/* Badges superpuestos en la esquina inferior derecha */}
        <div className="absolute bottom-3 right-3 flex gap-2">
          <div className="bg-[#FFFFFF] text-black px-2 py-1 rounded-full text-xs font-semibold flex gap-1 items-center">
            <Image src={TravelSvg} alt="Icon" className="w-4 h-4" />
            <span>{t("availableCountries")}</span>
          </div>

          <div className="bg-[#81E2FF] text-black px-2 py-1 rounded-full text-xs font-semibold flex gap-1 items-center">
            <span>{t("lteSpeed")}</span>
            <Image src={WifiSvg} alt="Icon" className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* ---------------------------------------------
          PARTE MEDIA: Título del producto y lista
      --------------------------------------------- */}
      <div className="p-6">
        {/* Header (icono + título). 
            Por ahora no pintamos headerIcon, pero lo dejamos en la interfaz */}
        <div className="flex items-center gap-2 mb-2">
          {/* Si en el futuro quisieras mostrar un icono en el título, descomenta: */}
          {/*
          <Image
            src={headerIcon}
            alt="Icon"
            width={24}
            height={24}
            className="w-6 h-6"
          />
          */}
          <h2 className="text-lg font-bold text-black">{headerTitle}</h2>
        </div>

        {/* Aquí iteramos sobre “features” y pintamos cada viñeta */}
        <ul className="space-y-2">
          {features.map((item, index) => (
            <li key={index} className="flex items-center text-sm gap-2">
              <Image src={CheckSvg} alt="Check" className="w-4 h-4" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <hr className="my-4" />

        {/* --------------------------------------------------
            PARTE INFERIOR: precio, rating y botón “Comprar Ahora”
        -------------------------------------------------- */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold">{priceRange}</span>
            <div className="flex items-center bg-[#EDF4F6] px-2 rounded-full">
              <Image
                src={StarSvg}
                alt="Icon"
                className="w-6 h-6 text-yellow-400"
              />
              <span className="ml-1 text-sm text-gray-600 font-semibold">
                {t("rating")}
              </span>
            </div>
          </div>
          <Button
            size="medium"
            rounded="full"
            intent="black"
            onClick={onBuy}
            icon={
              <Image
                src={LocalMallSvg}
                alt="Icon"
                className="w-5 h-5"
              />
            }
            iconPosition="right"
          >
            {t("buyNow")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardSim;