"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ActivarAppsModules() {
  const t = useTranslations("appsShared.productTemplate");

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 flex flex-col gap-6">
      {/* Module 1: Activa tus apps al instante */}
      <div className="relative w-full overflow-hidden rounded-[20px] mobile:h-[564px] tablet:h-[562px]">
        {/* Background Images - Using custom breakpoints to avoid globals.css md:hidden override */}
        <Image
          src="/images/activar-apps/mobile-acivar.instantaneo-background.png"
          alt=""
          fill
          className="object-cover hidden mobile:block desktop:!hidden"
          priority
        />
        <Image
          src="/images/activar-apps/tablet-acivar.instantaneo-background.png"
          alt=""
          fill
          className="object-cover hidden tablet:block desktop:!hidden"
          priority
        />
        <Image
          src="/images/activar-apps/desktop-acivar.instantaneo.png"
          alt=""
          width={2544}
          height={1084}
          className="w-full h-auto hidden desktop:block"
          priority
        />

        {/* Text Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center desktop:items-start justify-start pt-10 px-6 tablet:pt-12 desktop:justify-center desktop:pt-0 desktop:px-16">
          <Image
            src="/images/activar-apps/add_task.png"
            alt=""
            width={56}
            height={56}
            className="hidden desktop:block mb-2"
          />
          <h2 className="text-white font-bold text-[20px] tablet:text-[28px] desktop:text-[32px] text-center desktop:text-left leading-tight desktop:max-w-[540px]">
            {t("activarAppsTitle")}
          </h2>
          <p className="text-white text-[14px] tablet:text-[16px] desktop:text-[18px] text-center desktop:text-left mt-3 max-w-[300px] tablet:max-w-[380px] desktop:max-w-[540px] leading-relaxed">
            {t.rich("activarAppsDescription", {
              bold: (chunks) => <span className="font-bold">{chunks}</span>,
            })}
          </p>
        </div>
      </div>

      {/* Module 2: Más de 20 países disponibles */}
      <div className="relative w-full overflow-hidden rounded-[20px] mobile:h-[564px] tablet:h-[562px]">
        {/* Background Images */}
        <Image
          src="/images/activar-apps/mobile-countries-background.png"
          alt=""
          fill
          className="object-cover hidden mobile:block desktop:!hidden"
        />
        <Image
          src="/images/activar-apps/tablet-countries-background.png"
          alt=""
          fill
          className="object-cover hidden tablet:block desktop:!hidden"
        />
        <Image
          src="/images/activar-apps/desktop-countries-background.png"
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
              src="/images/activar-apps/globe_location_pin.png"
              alt=""
              width={56}
              height={56}
              className="hidden desktop:block mb-2"
            />
            <h2 className="text-white font-bold text-[20px] tablet:text-[28px] desktop:text-[32px] text-center desktop:text-left leading-tight desktop:max-w-[540px]">
              {t("activarAppsCountriesTitle")}
            </h2>
            <p className="text-white text-[14px] tablet:text-[16px] desktop:text-[18px] text-center desktop:text-left mt-3 max-w-[300px] tablet:max-w-[380px] desktop:max-w-[540px] leading-relaxed">
              {t("activarAppsCountriesDescription")}
            </p>
          </div>

          {/* Country Group Images - Responsive */}
          <div className="flex-1 flex items-center justify-center px-4 py-4 desktop:items-center desktop:justify-end desktop:pr-12">
            <Image
              src="/images/activar-apps/mobile-group-countries.png"
              alt="Países disponibles"
              width={746}
              height={552}
              className="w-[85%] max-w-[373px] h-auto hidden mobile:block"
            />
            <Image
              src="/images/activar-apps/tablet-group-countries.png"
              alt="Países disponibles"
              width={1078}
              height={456}
              className="w-[80%] max-w-[539px] h-auto hidden tablet:block"
            />
            <Image
              src="/images/activar-apps/desktop-group-countries.png"
              alt="Países disponibles"
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
