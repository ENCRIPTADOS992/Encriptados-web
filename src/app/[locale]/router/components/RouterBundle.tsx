"use client";

import React from "react";
import Image from "next/image";
import RouterCheck from "/public/images/router/check.png";
import { useTranslations } from "next-intl";

interface RouterBundleProps {
  imageUrl: string;
  alt?: string;
}

const RouterBundleDesktop: React.FC<RouterBundleProps> = ({
  imageUrl,
  alt,
}) => {
  const t = useTranslations("RouterUi");

  return (
  <div className="w-full hidden lg:flex justify-center bg-gradient-to-r from-black to-[#272727] mt-10">
    <div className="w-full max-w-6xl h-[347px] flex items-center justify-between px-8">
      {/* Columna de texto */}
      <div className="w-[414px] flex flex-col gap-[17px] text-white">
        <p className="text-[16px] leading-[12px] tracking-[0.12em] text-[#A3A3A3] uppercase">
          {t("includes")}
        </p>

        <ul className="space-y-4 text-[20px] leading-[18px]">
          <li className="flex items-center gap-2">
            <Image src={RouterCheck} alt="✓" className="w-4 h-4" />
            <span>{t("simDataBundle")}</span>
          </li>
          <li className="flex items-center gap-2">
            <Image src={RouterCheck} alt="✓" className="w-4 h-4" />
            <span>150 USD - {t("productName")}</span>
          </li>
          <li className="flex items-center gap-2">
            <Image src={RouterCheck} alt="✓" className="w-4 h-4" />
            <span>
              {t("coverageIn")} <span className="underline text">{t("countries200")}</span>
            </span>
          </li>
          <li className="flex items-center gap-2">
            <Image src={RouterCheck} alt="✓" className="w-4 h-4" />
            <span>130 USD - VPN</span>
          </li>
        </ul>

        <p className="mt-2 text-[24px] leading-[18px] font-bold">
          <span className="text-[#E5E5E5] mr-1">{t("total")}:</span>
          <span className="font-bold text-white">750 USD</span>
        </p>
      </div>

      {/* Imagen del router (mitad) */}
      <div className="w-[423px] h-[340px] flex items-center justify-end overflow-hidden">
        <img
          src={imageUrl}
          alt={alt || t("productName")}
          draggable={false}
          className="
            h-full w-auto
            transform
            scale-[1.25]   
            -translate-x-10 
            translate-y-20
          "
        />
      </div>


    </div>
  </div>
  );
};

export default RouterBundleDesktop;
