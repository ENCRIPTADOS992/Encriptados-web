import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const BannerSecure = () => {
  const FloatSimCard = "/images/encrypted-sim/Encryped_manwithphone.png";
  const t = useTranslations("EncryptedSimPage");

  return (
    <section className="bg-[#E7F4F8]">
      <div className="mx-auto max-w-5xl flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
        {/* Imagen */}
        <div className="relative w-full lg:w-1/2 max-w-[594px] aspect-[4/3] rounded-3xl overflow-hidden">
          <Image
            src={FloatSimCard}
            alt="Persona usando un celular"
            fill
            className="object-cover -scale-x-100"
            priority
          />
        </div>

        {/* Burbujas */}
        <div className="relative flex-1 lg:-ml-12 flex flex-col gap-4 lg:gap-2 w-full">
          {/* Título */}
          <div
            className="
              bg-[#6ADDFF]
              rounded-[24px]
              shadow-md
              w-full
              lg:w-[500px]
              min-h-[120px]
              lg:h-[158px]
              flex
              items-center
              justify-center
              px-6 py-6
              lg:px-8 lg:py-0
            "
          >
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#010101] text-center lg:text-left">
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
              lg:w-[500px]
              min-h-[120px]
              lg:h-[158px]
              flex
              items-center
              justify-center
              px-6 py-6
              lg:px-8 lg:py-0
            "
          >
            <p className="text-sm sm:text-base lg:text-[17px] leading-snug text-[#6E6E6E] text-center lg:text-left">
              {t("secureAndEasyToUseDescription")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSecure;
