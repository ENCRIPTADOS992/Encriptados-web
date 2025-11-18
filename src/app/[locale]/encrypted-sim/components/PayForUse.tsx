import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";

const PayForUse = () => {
  const Man = "/images/encrypted-sim/Encrypted_man_cellphone.png";
  const t = useTranslations("EncryptedSimPage");

  return (
    <section className="flex flex-col lg:flex-row justify-center items-stretch gap-4 lg:gap-6">
      {/* Primera Tarjeta */}
      <div
        className="
      relative
      w-full
      max-w-[417px]
      h-[420px] sm:h-[520px] lg:h-[524px]
      rounded-[34px]
      shadow-md
      overflow-hidden
      bg-[#DDF7FF]
    "
      >
        <div className="relative w-[417px] h-[603px] rounded-b-[34px] overflow-hidden flex items-end justify-center">
          {/* Contenedor más pequeño solo para la imagen */}
          <div className="relative w-[450px] h-[370px]">
            <Image
              src={Man}
              alt="Man with cellphone"
              fill
              className="-scale-x-100 object-cover"
            />
          </div>
        </div>

        {/* Overlay DIFUMINADO superior */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[34px]"
          style={{
            background:
              "linear-gradient(to bottom, #DDF7FF 0%, #DDF7FF 45%, rgba(221,247,255,0) 100%)",
          }}
        />

        {/* Texto encima */}
        <div className="absolute inset-x-0 top-0 z-20 px-6 sm:px-8 pt-6 sm:pt-8 space-y-3">
          <h2 className="text-[38px] font-semibold text-black leading-tight">
            {t("payOnlyForWhatYouUseTitle")}
          </h2>
          <p className="text-[20px] text-black leading-snug max-w-[423px]">
            {t("payOnlyForWhatYouUseDescription")}
          </p>
        </div>
      </div>

      {/* Segunda Tarjeta */}
      <div
        className="
          relative
          w-full
          max-w-[417px]
          h-[420px] sm:h-[520px] lg:h-[514px]
          rounded-[34px]
          shadow-md
          flex
          items-center
          p-6 sm:p-8 lg:p-10
          bg-gradient-to-b
          from-[#6ADDFF]
          to-[#A8EBFF]
        "
      >
        <ArrowUpRight className="absolute top-6 right-6 text-black h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14" />

        <p className="text-black font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight">
          {t("payOnlySecondCard")}
        </p>
      </div>
    </section>
  );
};

export default PayForUse;
