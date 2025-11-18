import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const BannerSecure = () => {
  const FloatSimCard = "/images/encrypted-sim/Encryped_manwithphone.png";
  const t = useTranslations("EncryptedSimPage");

  return (
    <section className="bg-[#E7F4F8] px-4 py-10">
      <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center gap-8">
        {/* Imagen */}
        <div className="relative w-full md:w-[594px] lg:w-[594px] aspect-[4/3] rounded-3xl overflow-hidden">
          <Image
            src={FloatSimCard}
            alt="Persona usando un celular"
            fill
            className="object-cover -scale-x-100"
            priority
          />
        </div>

        {/* Burbujas */}
        <div className="relative flex-1 md:-ml-12 flex flex-col gap-2 md:gap-1">
          {/* Título */}
          <div
            className="
              bg-[#6ADDFF]
              rounded-[24px]
              shadow-md
              w-full
              md:w-[500px]
              md:h-[158px]
              flex
              items-center
              justify-center
              px-6 md:px-8
            "
          >
            <h2 className="text-xl md:text-2xl font-bold text-[#010101] text-center md:text-left">
              {t("secureAndEasyToUse")}
            </h2>
          </div>

          {/* Descripción, más pegada */}
          <div
            className="
              bg-[#DDF7FF]
              rounded-[24px]
              shadow-md
              w-full
              md:w-[500px]
              md:h-[158px]
              flex
              items-center
              justify-center
              px-6 md:px-8
            "
          >
            <p className="text-[17px] leading-snug text-[#6E6E6E] text-center md:text-left">
              {t("secureAndEasyToUseDescription")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSecure;
