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
    <div className="w-full max-w-sm mx-auto bg-white rounded-2xl overflow-hidden p-4">
      <div className="flex flex-col items-center bg-[#dfdfdf] rounded-xl p-4">
        <Image
          src={productImage}
          width={250}
          height={250}
          alt="Sim Card"
          className="object-contain"
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
