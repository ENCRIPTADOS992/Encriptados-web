// src/app/[locale]/encrypted-sim/components/CardSim.tsx
"use client";

import Image from "next/image";
import Button from "@/shared/components/Button";
import TravelSvg from "/public/images/encrypted-sim/icons/travel_explore.svg";
import WifiSvg from "/public/images/encrypted-sim/icons/wifi_tethering.svg";
import CheckSvg from "/public/images/encrypted-sim/icons/check.svg";
import StarSvg from "/public/images/encrypted-sim/icons/star_half2.svg";
import LocalMallSvg from "/public/images/encrypted-sim/icons/local_mall.svg";

interface CardSimProps {
  productImage: string;    // URL (o import) de la imagen de la SIM
  features: string[];      // ← aquí va tu array de “featuresCardSim”
  priceRange: string;
  headerIcon: string;      // (opcional, lo dejamos por si en el futuro lo quieres usar)
  headerTitle: string;
}

const CardSim: React.FC<CardSimProps> = ({
  productImage,
  features,
  priceRange,
  headerIcon,
  headerTitle,
}) => {
  return (
    <div className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
      {/* ------------------------------------------------------
          PARTE SUPERIOR: imagen de la SIM + “+200 países” / “5G LTE”
      ------------------------------------------------------ */}
      <div className="p-2 bg-[#5D5D5D]">
        <Image
          src={productImage}
          width={200}
          height={200}
          alt="Sim Card"
          className="w-full h-48 object-contain"
        />
        <div className="p-2">
          <div className="flex justify-end gap-2 mb-1 text-sm text-gray-600">
            <div className="bg-[#FFFFFF] text-black px-2 py-1 rounded-full text-xs font-semibold flex gap-1">
              <Image src={TravelSvg} alt="Icon" className="w-4 h-4" />
              <span>+200 países disponibles</span>
            </div>

            <div className="bg-[#81E2FF] text-black px-2 py-1 rounded-full text-xs font-semibold flex gap-1">
              <span>5G LTE</span>
              <Image src={WifiSvg} alt="Icon" className="w-4 h-4" />
            </div>
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
                5/5
              </span>
            </div>
          </div>
          <Button
            size="medium"
            rounded="full"
            intent="black"
            icon={
              <Image
                src={LocalMallSvg}
                alt="Icon"
                className="w-5 h-5"
              />
            }
            iconPosition="right"
          >
            Comprar Ahora
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardSim;
