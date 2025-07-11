import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const OurObjetive = () => {
  const FloatSimCard = "/images/encrypted-sim/Encrypted_float_image.png";

  const t = useTranslations("EncryptedSimPage");
  return (
    <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-6 items-center text-center lg:text-left">
      {/* Texto */}
      <div className="w-full lg:w-5/12">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
          {t("ourObjetiveTitle")}
        </h1>
        <p className="mt-4 text-xs sm:text-sm lg:text-base text-gray-700">
          {t("ourObjetiveDescription")}
        </p>
      </div>

      {/* Imagen */}
      <div className="bg-[#6ADCFF] rounded-3xl p-6 sm:p-8 flex justify-center items-center">
        <Image
          alt="SimCard"
          width={400}
          height={400}
          src={FloatSimCard}
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default OurObjetive;
