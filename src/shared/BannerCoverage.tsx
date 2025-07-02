import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import SectionWrapper from "./components/SectionWrapper";

const BannerCoverage = () => {
  const FloatSimCard = "/images/encrypted-sim/Encrypted_world.png"; // Ruta de la imagen

  const t = useTranslations("EncryptedSimPage");

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Fondo full-width */}
      <Image
        src={FloatSimCard}
        alt="Cobertura mundial"
        fill
        style={{ objectFit: "cover" }}
        className="z-0"
      />
      <div className="absolute inset-0 bg-black opacity-35 z-10" />

      {/* Overlay centrándose con SectionWrapper */}
      <div className="absolute inset-0 flex items-center z-20">
        <SectionWrapper className="text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-bold text-[#33CDFB]">
            {t("coverageMoreThan200CountriesTitle")}
          </h2>
          <p className="text-base md:text-xl mt-4 text-white">
            {t("coverageMoreThan200CountriesDescription")}
          </p>
        </SectionWrapper>
      </div>
    </div>
  );
};

export default BannerCoverage;
