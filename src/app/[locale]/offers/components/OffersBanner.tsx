import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const OffersBanner = () => {
  const t = useTranslations("OffersPage");

  return (
    <section className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/fondo.png')" }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0, 0, 0, 0.9) 30%, rgba(41, 171, 226, 0.3) 100%)",
        }}
      />

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center">
        <div className="z-10 max-w-[60%] sm:max-w-md">
          <h1 className="text-[30px] sm:text-[38px] lg:text-[44px] font-extrabold italic uppercase text-white leading-[1.3] tracking-tight">
            {t("banner.titleOffers")}<br />
            {t("banner.titleEncrypted")}
          </h1>
          <p className="mt-3 sm:mt-5 text-base sm:text-lg text-white/90 italic leading-relaxed">
            {t("banner.description")}
          </p>
        </div>

        <div className="absolute right-0 bottom-0 h-full flex items-end pointer-events-none">
          <Image
            src="/images/hombre.png"
            alt="Offers figure"
            width={800}
            height={800}
            className="h-[85%] sm:h-[90%] md:h-full w-auto object-contain object-bottom max-w-[50vw] sm:max-w-none"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default OffersBanner;
