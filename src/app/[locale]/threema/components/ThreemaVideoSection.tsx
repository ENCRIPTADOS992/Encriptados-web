"use client";

import { useTranslations } from "next-intl";

const ThreemaVideoSection = () => {
  const t = useTranslations("ThreemaPage.videoSection");

  return (
    <section className="bg-white py-10 px-4 lg:px-20">
      <div className="max-w-7xl lg:max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-2">
        {/* Texto */}
        <div className="w-full lg:w-1/2 lg:px-5">
          <h2 className="text-center lg:text-left text-black font-bold text-[24px] lg:text-[44px] leading-[100%]">
            {t("title")}
          </h2>
        </div>

        {/* Video */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <iframe
            className="rounded-xl w-full max-w-[627px] h-[346px]"
            src="https://www.youtube.com/embed/O9MF_k5A0M0?si=JHnq_TXbcUxox_-Q"
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

export default ThreemaVideoSection;
