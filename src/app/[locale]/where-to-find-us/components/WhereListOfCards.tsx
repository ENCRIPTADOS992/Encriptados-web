import React from "react";
import Image from "next/image";
import WhereCard from "./WhereCard";
import { useTranslations } from "next-intl";

const WhereListOfCards = () => {
  const EncryptedBanner = "/images/where-to-find-us/backgroundbanner2.png";

  const t = useTranslations();

  return (
    <div className="relative w-full">
      {/* Imagen de fondo */}
      <Image
        src={EncryptedBanner}
        alt="Background Banner"
        layout="fill"
        objectFit="cover"
        priority
        className="z-0"
      />
      {/* Capa de gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-[#031B20]"></div>
      {/* Contenido */}
      <div className="relative z-10 h-full py-20 sm:py-32 md:py-44 flex flex-col items-center px-4 sm:px-6 md:px-8">
        {/* Contenedor del texto */}
        <div className="w-full sm:w-8/12 lg:w-6/12 text-center mb-8">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold p-4 rounded">
            {t("WhereToFindUs.whereCards.title")}{" "}
            <span className="text-[#6ADDFF]">
              {t("WhereToFindUs.whereCards.titleEncrypted")}
            </span>
          </h1>
        </div>
        {/* Tarjetas */}
        <WhereCard
          leftTitle={t("WhereToFindUs.whereCards.paymentPoint.title")}
          leftDescription={t(
            "WhereToFindUs.whereCards.paymentPoint.description"
          )}
          leftNumber="36.732"
          rightTitle={t("WhereToFindUs.whereCards.countriesAvailable.title")}
          rightDescription={t(
            "WhereToFindUs.whereCards.countriesAvailable.description"
          )}
          rightNumber="76"
          rightGradient="from-[#193376] via-[#061531] to-[#131313]"
          leftGradient="from-[#197647] via-[#052515] to-[#131313]"
        />
      </div>
    </div>
  );
};

export default WhereListOfCards;
