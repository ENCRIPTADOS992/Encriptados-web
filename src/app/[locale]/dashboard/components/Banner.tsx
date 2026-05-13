import AppleGenericSvg from "@/shared/svgs/AppleGenericSvg";

import GooglePlayGenericSvg from "@/shared/svgs/GooglePlayGenericSvg";

import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

const Banner = () => {
  const t = useTranslations("DashboardPage.promoBanner");
  const Man = "/images/dashboard/man.png";

  return (
    <div className="w-full bg-cyan-black-gradient flex flex-row items-center justify-center px-4">
      {/* Título */}

      <h1 className="font-bold text-sm xl:text-2xl mb-2 xl:mb-0 xl:w-[350px] items-center">
        {t("title")} <span className="text-[#35CDFB]">{t("highlight")}</span>
      </h1>

      <div className="xl:w-4/12 flex justify-center">
        <div style={{ width: "400px", height: "175px", overflow: "hidden" }}>
          <Image
            alt={t("imageAlt")}
            src={Man}
            width={450}
            height={450}
            className="object-cover object-top -translate-y-7"
          />
        </div>
      </div>

      <div className="w-full xl:w-4/12 flex flex-col items-start mt-2 xl:mt-0">
        <div className="gap-x-1">
          <div>
            <p className="mb-2">{t("downloadApp")}</p>

            <div className="flex gap-x-2">
              <AppleGenericSvg />
              <GooglePlayGenericSvg />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
