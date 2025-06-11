// src/app/[locale]/encrypted-sim/components/CardSim.tsx
"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import AppStoreFooter from "@/shared/FooterEncrypted/icon/AppStoreFooter";
import PlayStoreSvg from "@/shared/svgs/PlayStoreSvg";
import DownloadApkSvg from "@/shared/svgs/DownloadApkSvg";

type ImageType = StaticImageData;

interface CardSimProps {
  productImage: string | StaticImageData;
  features: string[]; 
  priceRange: string; 
  headerIcon: any;
  headerTitle: string;
}


const CardSim: React.FC<CardSimProps> = ({
  productImage,
}) => {
  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-2xl overflow-hidden p-4">
      <div className="flex flex-col items-center bg-[#dfdfdf] rounded-xl p-4">
        {/* Imagen de la tarjeta */}
        <Image
          src={productImage}
          width={250}
          height={250}
          alt="Sim Card"
          className="object-contain"
        />
        {/* <div className="p-2">
          <div className="flex justify-end gap-2 mb-1 text-sm text-gray-600">
            <div className="bg-[#FFFFFF] text-black px-2 py-1 rounded-full text-xs font-semibold flex gap-1">
              <Image src={TravelSvg} alt="Icon" className="w-4 h-4" />
              <span>+200 países disponibles</span>
            </div>

            <div className="bg-[#81E2FF] text-black px-2 py-1 rounded-full text-xs font-semibold flex gap-1">
              <span>5G LTE</span>
              <Image src={WifiSvg} alt="Icon" className="w-4 h-4" />
            </div>
          </div>
        </div> 
      </div>*/}
      </div>
      {/* Botones de descarga */}
        <div className="mt-4 flex justify-center items-center gap-4">
          <AppStoreFooter />
          <PlayStoreSvg />
          <DownloadApkSvg />
        </div>
    </div>
  );
};

export default CardSim;
