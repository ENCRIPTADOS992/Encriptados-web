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

      <div>
        <h1 className="relative z-20 text-white text-3xl lg:text-4xl text-center  ">
          {t("ourBlogTitleBanner")}
        </h1>
        <div className="flex justify-center items-center">
          <div className="w-[450px] mt-4">
            <h1 className="relative z-20 text-white  text-lg lg:text-3xl  text-center font-bold">
              {t("ourBlogDescriptionBanner")}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerBlog;
