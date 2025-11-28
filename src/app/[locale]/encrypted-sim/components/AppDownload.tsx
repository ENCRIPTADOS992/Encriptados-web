// ../../encrypted-sim/components/AppDownload.tsx
"use client";

import React from "react";
import Image from "next/image";
import AppStoreFooter from "@/shared/FooterEncrypted/icon/AppStoreFooter";
import PlayStoreSvg from "@/shared/svgs/PlayStoreSvg";

const AppDownload = () => {
  return (
    <section className="w-full py-10 md:py-6">
      <div className="mx-auto w-[1276px] max-w-full px-4 md:px-8">
        <div
          className="
            mx-auto
            w-full
            max-w-[1058px]        
            rounded-[34px]
            bg-[linear-gradient(90deg,#E7F7FD_0%,#FFFFFF_100%)]
            px-6 md:px-12
            py-8 md:py-12
            flex flex-col lg:flex-row
            items-center
            gap-8 md:gap-12
          "
        >
          {/* Columna izquierda */}
          <div className="
            w-full
            max-w-[431px]          
            lg:w-[431px]           
            flex flex-col
            gap-[24px]             
          ">
            <h2 className="text-[22px] md:text-[28px] font-semibold leading-snug">
              Descarga la App <br />
              para iOS &amp; Android
            </h2>
            <div className="flex items-center gap-4">
              <AppStoreFooter />
              <PlayStoreSvg />
            </div>

            <p className="text-[13px] md:text-[14px] text-[#4B5563]">
              O Escanea el código QR con tu cámara
            </p>
          </div>

          {/* Columna derecha: teléfono */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div
              className="
                relative
                w-[220px] md:w-[280px] lg:w-[368px]     
                aspect-[368/405]                        
              "
            >
              <Image
                src="/images/encrypted-sim/iphone_app_download.png"
                alt="Vista de la app para descarga"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
