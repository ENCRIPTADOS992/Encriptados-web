"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ActivarNumeroFijoModules() {
  const t = useTranslations("appsShared.productTemplate");

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 flex flex-col gap-6">
      {/* Module 1: Números disponibles en múltiples países */}
      <div className="relative w-full overflow-hidden rounded-[20px] mobile:h-[564px] tablet:h-[562px]">
        {/* Background Images */}
        <Image
          src="/images/numero-fijo/background-banner-1-mobile.webp"
          alt=""
          fill
          className="object-cover hidden mobile:block desktop:!hidden"
        />
        <Image
          src="/images/numero-fijo/background-banner-1-tablet.webp"
          alt=""
          fill
          className="object-cover hidden tablet:block desktop:!hidden"
        />
        <Image
          src="/images/numero-fijo/background-banner-1.webp"
          alt=""
          width={2544}
          height={1084}
          className="w-full h-auto hidden desktop:block"
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col desktop:flex-row">
          {/* Text */}
          <div className="flex flex-col items-center desktop:items-start desktop:justify-center pt-10 px-6 tablet:pt-12 desktop:pt-0 desktop:px-16 desktop:w-[45%]">
            <Image
              src="/images/activar-apps/globe_location_pin.webp"
              alt="International coverage"
              width={56}
              height={56}
              className="hidden desktop:block mb-2"
            />
            <h2 className="text-white font-bold text-[20px] tablet:text-[28px] desktop:text-[32px] text-center desktop:text-left leading-tight desktop:max-w-[540px]">
              {t("activarNumeroFijoCountriesTitle")}
            </h2>
            <p className="text-white text-[14px] tablet:text-[16px] desktop:text-[18px] text-center desktop:text-left mt-3 max-w-[300px] tablet:max-w-[380px] desktop:max-w-[540px] leading-relaxed">
              {t("activarNumeroFijoCountriesDescription")}
            </p>
          </div>

          {/* Country Group Images - Responsive */}
          <div className="flex-1 flex items-center justify-center min-h-0 px-4 py-4 desktop:items-center desktop:justify-end desktop:pr-12">
            <Image
              src="/images/numero-fijo/image-banner-1-desktop.webp"
              alt="Países disponibles"
              width={746}
              height={552}
              className="max-h-full w-auto hidden mobile:block"
            />
            <Image
              src="/images/numero-fijo/image-banner-1-desktop.webp"
              alt="Países disponibles"
              width={1078}
              height={456}
              className="max-h-full w-auto hidden tablet:block"
            />
            <Image
              src="/images/numero-fijo/image-banner-1-desktop.webp"
              alt="Países disponibles"
              width={1078}
              height={456}
              className="w-full max-w-[539px] h-auto hidden desktop:block"
            />
          </div>
        </div>
      </div>

      {/* Module 2: Un solo número para múltiples servicios */}
      <div className="relative w-full overflow-hidden rounded-[20px] mobile:h-[564px] tablet:h-[562px]">
        {/* Background Images */}
        <Image
          src="/images/numero-fijo/background-banner-2.webp"
          alt=""
          fill
          className="object-cover hidden mobile:block desktop:!hidden"
        />
        <Image
          src="/images/numero-fijo/background-banner-2.webp"
          alt=""
          fill
          className="object-cover hidden tablet:block desktop:!hidden"
        />
        <Image
          src="/images/numero-fijo/background-banner-2.webp"
          alt=""
          width={2544}
          height={1084}
          className="w-full h-auto hidden desktop:block"
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col desktop:flex-row">
          {/* Text */}
          <div className="flex flex-col items-center desktop:items-start desktop:justify-center pt-10 px-6 tablet:pt-12 desktop:pt-0 desktop:px-16 desktop:w-[45%]">
            <Image
              src="/images/activar-apps/add_task.webp"
              alt="Multiple services"
              width={56}
              height={56}
              className="hidden desktop:block mb-2"
            />
            <h2 className="text-white font-bold text-[20px] tablet:text-[28px] desktop:text-[32px] text-center desktop:text-left leading-tight desktop:max-w-[540px]">
              {t("activarNumeroFijoServicesTitle")}
            </h2>
            <p className="text-white text-[14px] tablet:text-[16px] desktop:text-[18px] text-center desktop:text-left mt-3 max-w-[300px] tablet:max-w-[380px] desktop:max-w-[540px] leading-relaxed">
              {t("activarNumeroFijoServicesDescription")}
            </p>
          </div>

          {/* App Icons Images - Responsive */}
          <div className="flex-1 flex items-center justify-center min-h-0 px-4 py-4 desktop:items-center desktop:justify-end desktop:pr-12">
            <Image
              src="/images/numero-fijo/image-banner-2-mobile.webp"
              alt="Servicios disponibles"
              width={746}
              height={552}
              className="max-h-full w-auto hidden mobile:block"
            />
            <Image
              src="/images/numero-fijo/image-banner-2-tablet.webp"
              alt="Servicios disponibles"
              width={1078}
              height={456}
              className="max-h-full w-auto hidden tablet:block"
            />
            <Image
              src="/images/numero-fijo/image-banner-2-desktop.webp"
              alt="Servicios disponibles"
              width={1078}
              height={456}
              className="w-full max-w-[539px] h-auto hidden desktop:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
