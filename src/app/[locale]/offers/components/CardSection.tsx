import ListOfCards from "@/shared/components/ListOfCards/ListOfCards";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import MSIChangeOffer from "../icons/MSIChangeOffer";
import SubstituteOffer from "../icons/SubstituteOffer";
import PlansOffer from "../icons/PlansOffer";
import GlobalOffer from "../icons/GlobalOffer";
import MaxSecurityOffer from "../icons/MaxSecurityOffer";
import MultipleDeviceOffer from "../icons/MultipleDeviceOffer";
import FeaturesGrid from "./FeaturesGrid";

const CardSection = () => {
  const offersImage = "/images/offers/sim.png";

  const t = useTranslations("OffersPage");

  return (
    <div className="py-16 md:py-20">
      {/* Imagen principal */}
      <div className="flex items-center justify-center w-full">
        <Image
          src={offersImage}
          alt="Oferta de SIM encriptado"
          width={500}
          height={300}
          className="rounded-lg"
          style={{
            filter:
              "drop-shadow(0 1px 10px rgba(1,255,194,0.35)) drop-shadow(0 3px 16px rgba(16,180,231,0.25))",
          }}
        />
      </div>

      {/* Título */}
      <div className="flex items-center justify-center mt-10 md:mt-12">
        <div className="w-full md:w-6/12 px-4">
          <h2 className="text-center text-white font-bold text-[24px] sm:text-[30px] lg:text-[38px] leading-[1.3]">
            {t("discoverSimTitle")}
          </h2>
        </div>
      </div>

      {/* Descripción */}
      <div className="flex items-center justify-center mt-5 md:mt-6">
        <div className="w-full md:w-6/12 px-4">
          <p className="text-center text-gray-300 text-base sm:text-lg leading-relaxed">
            {t("discoverSimDescription")}
          </p>
        </div>
      </div>

      {/* Sección de tarjetas */}
      <div className="mt-12 md:mt-16">
        <FeaturesGrid />
      </div>
    </div>
  );
};

export default CardSection;
