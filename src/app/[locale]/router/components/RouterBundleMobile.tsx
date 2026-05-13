// src/app/[locale]/our-products/components/RouterBundleMobile.tsx
"use client";

import React from "react";
import Image from "next/image";
import CheckSvg from "/public/images/encrypted-sim/icons/check.svg";
import { useTranslations } from "next-intl";

interface RouterBundleProps {
  imageUrl: string;
  alt?: string;
}

const RouterBundleMobile: React.FC<RouterBundleProps> = ({
  imageUrl,
  alt,
}) => {
  const t = useTranslations("RouterUi");

  return (
  <div className="w-full sm:hidden bg-gradient-to-r from-black to-[#272727] px-4 py-6">
    {/* Texto */}
    <div className="w-full max-w-[414px] flex flex-col gap-[10px] text-white">
      <p className="text-[11px] leading-[11px] tracking-[0.12em] text-[#A3A3A3] uppercase">
        {t("includes")}
      </p>

      <ul className="space-y-1 text-[13px] leading-[18px]">
        <li className="flex items-center gap-2">
          <Image src={CheckSvg} alt="✓" className="w-4 h-4" />
          <span>{t("simDataBundle")}</span>
        </li>
        <li className="flex items-center gap-2">
          <Image src={CheckSvg} alt="✓" className="w-4 h-4" />
          <span>150 USD - {t("productName")}</span>
        </li>
        <li className="flex items-center gap-2">
          <Image src={CheckSvg} alt="✓" className="w-4 h-4" />
          <span>
            {t("coverageIn")} <span className="underline text-sky-400">{t("countries200")}</span>
          </span>
        </li>
        <li className="flex items-center gap-2">
          <Image src={CheckSvg} alt="✓" className="w-4 h-4" />
          <span>130 USD - VPN</span>
        </li>
      </ul>

      <p className="mt-2 text-[13px] leading-[18px] font-bold">
        <span className="text-[#E5E5E5] mr-1">{t("total")}:</span>
        <span className="font-extrabold text-white">750 USD</span>
      </p>
    </div>

    {/* Imagen */}
    <div className="mt-4 w-full flex justify-center">
      <div className="w-[260px] h-[220px]">
        <img
          src={imageUrl}
          alt={alt || t("productName")}
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>
    </div>
  </div>
  );
};

export default RouterBundleMobile;
