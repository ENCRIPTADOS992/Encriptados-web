"use client";

import Image, { StaticImageData } from "next/image";
import AppStoreFooter from "@/shared/FooterEncrypted/icon/AppStoreFooter";
import PlayStoreSvg from "@/shared/svgs/PlayStoreSvg";
import DownloadApkSvg from "@/shared/svgs/DownloadApkSvg";

interface CardSimInfoProps {
  productImage: string | StaticImageData;
}

const CardSimInfo: React.FC<CardSimInfoProps> = ({ productImage }) => {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl overflow-hidden p-6">
      <div className="flex flex-col items-center bg-[#dfdfdf] rounded-xl p-8">
        <img
          src={typeof productImage === "string"
            ? productImage
            : productImage.src}
          alt="Sim Card"
          className="
            w-full
            h-auto
            object-contain
            filter saturate-150
            contrast-110
            rounded-xl
          "
        />
      </div>

      <div className="mt-4 flex justify-center items-center gap-4">
        <AppStoreFooter />
        <PlayStoreSvg />
        <DownloadApkSvg />
      </div>
    </div>
  );
};

export default CardSimInfo;
