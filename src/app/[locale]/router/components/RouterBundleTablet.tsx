// src/app/[locale]/our-products/components/RouterBundleTablet.tsx
"use client";

import React from "react";
import Image from "next/image";
import RouterCheck from "/public/images/router/check.png";

interface RouterBundleProps {
  imageUrl: string;
  alt?: string;
}

const RouterBundleTablet: React.FC<RouterBundleProps> = ({
  imageUrl,
  alt,
}) => (
  <div className="w-full hidden sm:flex lg:hidden justify-center bg-gradient-to-r from-black to-[#272727] mt-10">
    <div className="w-full max-w-4xl h-[304px] flex items-center justify-between px-6">
      {/* Columna de texto */}
      <div className="w-[360px] flex flex-col gap-[14px] text-white">
        <p className="text-[12px] leading-[12px] tracking-[0.12em] text-[#A3A3A3] uppercase">
          Incluye:
        </p>

        <ul className="space-y-3 text-[14px] leading-[18px]">
          <li className="flex items-center gap-2">
            <Image src={RouterCheck} alt="✓" className="w-4 h-4" />
            <span>470 USD de datos SIM Encriptada</span>
          </li>
          <li className="flex items-center gap-2">
            <Image src={RouterCheck} alt="✓" className="w-4 h-4" />
            <span>150 USD - Router Camaleón</span>
          </li>
          <li className="flex items-center gap-2">
            <Image src={RouterCheck} alt="✓" className="w-4 h-4" />
            <span>
              Cobertura en{" "}
              <span className="underline text-sky-400">200 países</span>
            </span>
          </li>
          <li className="flex items-center gap-2">
            <Image src={RouterCheck} alt="✓" className="w-4 h-4" />
            <span>130 USD - VPN</span>
          </li>
        </ul>

        <p className="mt-2 text-[20px] leading-[18px] font-bold">
          <span className="text-[#E5E5E5] mr-1">TOTAL:</span>
          <span className="font-bold text-white">750 USD</span>
        </p>
      </div>

      {/* Imagen del router (mitad) */}
      <div className="w-[320px] h-[300px] flex items-center justify-end overflow-hidden">
        <img
          src={imageUrl}
          alt={alt || "Router Camaleón"}
          draggable={false}
          className="
            h-full w-auto
            transform
            scale-[1.05]
            -translate-x-[85px]
            translate-y-10
          "
        />
      </div>
    </div>
  </div>
);

export default RouterBundleTablet;
