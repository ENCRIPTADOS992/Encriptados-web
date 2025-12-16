import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const BannerBlog = () => {
  const Banner = "/images/blog/blogbanner.jpeg";

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
      <div className="absolute inset-0 bg-black opacity-80 z-10"></div>

      <div className="max-w-3xl mx-auto px-4">
        <p className="relative z-20 text-lg leading-relaxed text-white text-center mb-4">
          {t("ourBlogTitleBanner")}
        </p>
        <div className="flex justify-center items-center">
          <div className="w-full max-w-[550px]">
            <h1 className="relative z-20 text-[30px] md:text-[38px] lg:text-[44px] leading-[1.3] font-bold text-white text-center">
              {t("ourBlogDescriptionBanner")}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerBlog;
