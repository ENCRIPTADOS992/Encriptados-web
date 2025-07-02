import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";

const PayForUse = () => {
  const Man = "/images/encrypted-sim/Encrypted_man_cellphone.png";

  const t = useTranslations("EncryptedSimPage");

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12">
      {/* Primera Tarjeta */}
      <div className="relative w-full lg:w-[680px] h-[350px] sm:h-[450px] lg:h-[500px] p-6 sm:p-8 lg:p-10 rounded-3xl shadow-md overflow-hidden bg-[#def7ff]">
        <div className="absolute inset-0 h-full bg-custom-gradient-img z-10"></div>

        <div className="absolute inset-0 z-0">
          <Image
            src={Man}
            alt="Man with cellphone"
            layout="fill"
            className="-scale-x-100 translate-y-10 lg:translate-y-40 object-cover"
          />
        </div>

        <div className="absolute inset-0 flex flex-col justify-start z-20 p-6 sm:p-8 lg:p-10">
          <h2 className="text-black font-semibold text-2xl sm:text-3xl lg:text-4xl mb-2">
            {t("payOnlyForWhatYouUseTitle")}
          </h2>
          <p className="text-black text-sm sm:text-base lg:text-lg">
            {t("payOnlyForWhatYouUseDescription")}
          </p>
        </div>
      </div>

      {/* Segunda Tarjeta */}
      <div className="relative w-full lg:w-[680px] h-[350px] sm:h-[450px] lg:h-[500px] border border-gray-300 rounded-3xl shadow-md flex justify-end items-center p-6 sm:p-8 lg:p-10 bg-gradient-to-b from-[#6ADDFF] via-[#6ADDFF] to-[#A8EBFF] bg-[length:80%_100%]">
        <ArrowUpRight className="absolute top-6 right-6 text-black h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20" />
        <p className="text-black font-bold text-3xl sm:text-4xl lg:text-6xl text-left self-center">
          {t("payOnlySecondCard")}
        </p>
      </div>
    </div>
  );
};

export default PayForUse;
