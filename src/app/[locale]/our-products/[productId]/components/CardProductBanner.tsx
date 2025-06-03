import React from "react";
import Image from "next/image";

import { useProductById } from "../context/ProductByIdContext";

const CardProductBanner = () => {
  const { currentProduct } = useProductById();

  if (!currentProduct || !currentProduct.images?.length) {
    return (
      <div className="flex-col flex items-center justify-center h-full">
        <div className="w-full h-full flex flex-col items-center bg-[#222222] rounded-3xl" />
      </div>
    );
  }

  const imageUrl = currentProduct.images[0].src;

  return (
    <div className="flex-col flex items-center justify-center h-full">
      <div className="w-full h-full flex flex-col items-center bg-[#222222] rounded-3xl">
        <div className="w-full  rounded-3xl  flex justify-center items-center mb-4">
          <Image
            src={imageUrl}
            alt="Banner Circle"
            objectFit="cover" // Ajusta la imagen para que cubra todo el contenedor
            width={200}
            height={200}
            className="-translate-y-7"
            priority
          />
        </div>
      </div>
      {/* <div className="flex justify-center w-[500px]">
        <AppStoreFooter />
        <PlayStoreSvg />
        <DownloadApkSvg />
      </div> */}
    </div>
  );
};

export default CardProductBanner;
