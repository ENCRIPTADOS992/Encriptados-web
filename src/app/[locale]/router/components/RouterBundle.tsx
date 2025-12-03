"use client";

import React from "react";
import Image from "next/image";
import RouterCheck from "/public/images/router/check.png";

interface RouterBundleProps {
  imageUrl: string;
  alt?: string;
}

const RouterBundleDesktop: React.FC<RouterBundleProps> = ({
  imageUrl,
  alt,
}) => (
  <div className="w-full hidden lg:flex justify-center bg-gradient-to-r from-black to-[#272727] mt-10">
    <div className="w-full max-w-6xl h-[347px] flex items-center justify-between px-8">
      {/* Columna de texto */}
      <div className="w-[414px] flex flex-col gap-[17px] text-white">
        <p className="text-[16px] leading-[12px] tracking-[0.12em] text-[#A3A3A3] uppercase">
          Incluye:
        </p>

        <ul className="space-y-4 text-[20px] leading-[18px]">
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
              <span className="underline text">200 países</span>
            </span>
          </li>
          <li className="flex items-center gap-2">
            <Image src={RouterCheck} alt="✓" className="w-4 h-4" />
            <span>130 USD - VPN</span>
          </li>
        </ul>

        <p className="mt-2 text-[24px] leading-[18px] font-bold">
          <span className="text-[#E5E5E5] mr-1">TOTAL:</span>
          <span className="font-bold text-white">750 USD</span>
        </p>
      </div>

      {/* Imagen del router (mitad) */}
      <div className="w-[423px] h-[340px] flex items-center justify-end overflow-hidden">
        <img
          src={imageUrl}
          alt={alt || "Router Camaleón"}
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

export default RouterBundleDesktop;
