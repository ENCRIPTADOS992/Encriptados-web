"use client";

import { useTranslations } from "next-intl";

const CryptcomVideo = () => {
  const t = useTranslations("CryptcomPage.videoSection");

  return (
    <section className="bg-white py-10 px-4 lg:px-20">
      <div className="  flex flex-col mx-5 gap-8 mb-[60px] 
  sm:flex-row sm:items-center sm:justify-center 
  sm:w-[95%] sm:ml-auto sm:text-left sm:gap-20
  md:w-[85%] md:py-24 md:pr-20 md:mb-[60px] md:leading-tight md:ml-auto md:gap-20">
        {/* Texto */}
        <div className="w-full lg:w-1/2 lg:px-5">
          <h2 className="text-center lg:text-left text-black font-bold text-[24px] lg:text-[44px] leading-[100%] mb-[20px]">
            {t("title")}
          </h2>
        </div>

        {/* Video */}
        <div className="w-full lg:h-auto h-[206px] lg:w-1/2 flex justify-center">
          <iframe
            className="rounded-xl w-full max-w-[627px] lg:h-[346px] h-[206px]"
            src="https://www.youtube.com/embed/BkT7D_akpyU"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default CryptcomVideo;