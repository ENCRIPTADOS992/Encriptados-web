import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/shared/components/SectionWrapper";

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
        priority
      />
      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
      <SectionWrapper className="relative z-20 flex justify-center items-center h-full">
        <div className="w-full md:w-[800px] mt-4">
          <h1 className="text-white text-4xl text-center font-bold">
            {t("optimizeBanner.title")}
          </h1>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default BannerPostById;
