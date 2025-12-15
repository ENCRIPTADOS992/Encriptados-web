import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";

const PayForUse = () => {
  const Man = "/images/encrypted-sim/Encrypted_man_cellphone.png";
  const t = useTranslations("EncryptedSimPage");

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-[900px] mx-auto">
      {/* Primera Tarjeta */}
      <div
        className="
      relative
      w-full
      h-[420px] sm:h-[480px] md:h-[520px] lg:h-[524px]
      rounded-[34px]
      shadow-md
      overflow-hidden
      bg-[#DDF7FF]
    "
      >
        <div className="relative w-full h-full rounded-b-[34px] overflow-hidden flex items-end justify-center">
          {/* Contenedor más pequeño solo para la imagen */}
          <div className="relative w-full h-[280px] sm:h-[340px] md:h-[380px]">
            <Image
              src={Man}
              alt="Man with cellphone"
              fill
              className="-scale-x-100 object-cover object-top"
            />
          </div>
        </div>

        {/* Overlay DIFUMINADO superior */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[34px]"
          style={{
            background:
              "linear-gradient(to bottom, #DDF7FF 0%, #DDF7FF 40%, rgba(221,247,255,0) 100%)",
          }}
        />

        {/* Texto encima */}
        <div className="absolute inset-x-0 top-0 z-20 px-6 sm:px-8 pt-6 sm:pt-8 space-y-2 sm:space-y-3">
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-semibold text-black leading-tight">
            {t("payOnlyForWhatYouUseTitle")}
          </h2>
          <p className="text-base sm:text-lg lg:text-[20px] text-black leading-snug">
            {t("payOnlyForWhatYouUseDescription")}
          </p>
        </div>
      </div>

      {/* Segunda Tarjeta */}
      <div
        className="
          relative
          w-full
          h-[420px] sm:h-[480px] md:h-[520px] lg:h-[524px]
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
        <ArrowUpRight className="absolute top-6 right-6 text-black h-8 w-8 sm:h-10 sm:w-10 lg:h-14 lg:w-14" />

        <p className="text-black font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight pr-8">
          {t("payOnlySecondCard")}
        </p>
      </div>
    </section>
  );
};

export default PayForUse;
