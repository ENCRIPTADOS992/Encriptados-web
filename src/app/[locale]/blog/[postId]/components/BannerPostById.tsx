import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const BannerPostById = () => {
  const Banner = "/images/blog/blogidbanner.png";

  const t = useTranslations("BlogPage");

  return (
    <div className="relative w-full h-96 flex items-center justify-center overflow-hidden">
      <Image
        src={Banner}
        alt="Banner Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

      <div>
        <div className="flex justify-center items-center">
          <div className="w-[800px] mt-4">
            <h1 className="relative z-20 text-white text-4xl text-center font-bold">
              {t("optimizeBanner.title")}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerPostById;
