import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const BannerCoverage = () => {
  const FloatSimCard = "/images/encrypted-sim/Encrypted_world.png"; // Ruta de la imagen

  const t = useTranslations("EncryptedSimPage");

  return (
    <div className="relative h-[500px] overflow-hidden">
      <Image
        src={FloatSimCard}
        alt="image"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      <div className="absolute inset-0 bg-black opacity-35 z-10" />{" "}
      {/* Ajustado opacidad */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 p-4 md:items-start md:ml-[200px] md:text-left">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-bold text-[#33CDFB]">
            {t("coverageMoreThan200CountriesTitle")}
          </h2>
          <p className="text-base md:text-xl mt-4">
            {t("coverageMoreThan200CountriesDescription")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BannerCoverage;
