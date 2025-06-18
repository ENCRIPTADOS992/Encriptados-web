import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const BannerSecure = () => {
  const FloatSimCard = "/images/encrypted-sim/Encryped_manwithphone.png";
  const t = useTranslations("EncryptedSimPage");

  return (
    <div className="w-full px-1 sm:px-2 lg:px-4 xl:px-8 relative">
      {/* Imagen */}
      <div className="relative w-[600px] h-[500px] rounded-3xl overflow-hidden">
        <Image
          quality={100}
          title="Image"
          src={FloatSimCard}
          alt="Image"
          loading="eager"
          layout="fill"
          objectFit="cover"
          className="-scale-x-100"
        />
      </div>

      {/* Bloque de texto superpuesto */}
      <div className="absolute top-20 right-5 w-[320px] lg:w-[500px] z-10 flex flex-col gap-4">
        <div className="bg-[#6ADDFF] py-[60px] px-6 rounded-2xl text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {t("secureAndEasyToUse")}
          </h2>
        </div>
        <div className="bg-[#DDF7FF] py-[50px] rounded-2xl text-center">
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            {t("secureAndEasyToUseDescription")}
          </p>
        </div>
      </div>

    </div>
  );
};

export default BannerSecure;
