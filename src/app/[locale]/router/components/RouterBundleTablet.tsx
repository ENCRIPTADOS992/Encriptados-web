// src/app/[locale]/our-products/components/RouterBundleTablet.tsx
"use client";

import React from "react";
import Image from "next/image";
import CheckSvg from "/public/images/encrypted-sim/icons/check.svg";

interface RouterBundleProps {
  imageUrl: string;
  alt?: string;
}

const RouterBundleTablet: React.FC<RouterBundleProps> = ({
  imageUrl,
  alt,
}) => (
  <div className="w-full hidden sm:flex lg:hidden justify-center bg-gradient-to-r from-black to-[#272727]">
    <div className="w-full max-w-4xl h-[304px] flex items-center justify-between px-6">
      {/* Texto */}
      <div className="w-[360px] flex flex-col gap-[12px] text-white">
        <p className="text-[12px] leading-[12px] tracking-[0.12em] text-[#A3A3A3] uppercase">
          Incluye:
        </p>

        <ul className="space-y-1 text-[13px] leading-[18px]">
          <li className="flex items-center gap-2">
            <Image src={CheckSvg} alt="✓" className="w-4 h-4" />
            <span>470 USD de datos SIM Encriptada</span>
          </li>
          <li className="flex items-center gap-2">
            <Image src={CheckSvg} alt="✓" className="w-4 h-4" />
            <span>150 USD - Router Camaleón</span>
          </li>
          <li className="flex items-center gap-2">
            <Image src={CheckSvg} alt="✓" className="w-4 h-4" />
            <span>
              Cobertura en{" "}
              <span className="underline text-sky-400">200 países</span>
            </span>
          </li>
          <li className="flex items-center gap-2">
            <Image src={CheckSvg} alt="✓" className="w-4 h-4" />
            <span>130 USD - VPN</span>
          </li>
        </ul>

        <p className="mt-2 text-[13px] leading-[18px] font-bold">
          <span className="text-[#E5E5E5] mr-1">TOTAL:</span>
          <span className="font-extrabold text-white">750 USD</span>
        </p>
      </div>

      {/* Imagen */}
      <div className="w-[320px] h-[260px] flex items-center justify-center">
        <img
          src={imageUrl}
          alt={alt || "Router Camaleón"}
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>
    </div>
  </div>
);

export default RouterBundleTablet;
