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
    <div className="mt-44">
      {/* Imagen principal */}
      <div className="flex items-center justify-center w-full">
        <Image
          src={offersImage}
          alt="Sim Offers"
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
      <div className="flex items-center justify-center mt-8">
        <div className="w-full md:w-6/12 p-2">
          <h2 className="text-center text-white font-extrabold text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tight">
            {t("discoverSimTitle")}
          </h2>
        </div>
      </div>

      {/* Descripción */}
      <div className="flex items-center justify-center mt-6">
        <div className="w-full md:w-6/12 p-2">
          <p className="text-center text-white/80 text-sm sm:text-base md:text-lg leading-relaxed">
            {t("discoverSimDescription")}
          </p>
        </div>
      </div>

      {/* Sección de tarjetas */}
      <div className="mt-10">
        <FeaturesGrid />
      </div>
    </div>
  );
};

export default CardSection;
