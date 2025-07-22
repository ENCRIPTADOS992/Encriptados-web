"use client";

import { useTranslations } from "next-intl";

const SecureVideo = () => {
  const t = useTranslations("SecureCryptPage.videoSection");

  return (
    <section className="bg-white py-10 px-4 lg:px-20">
      <div className="max-w-7xl lg:max-w-5xl mx-auto flex items-center justify-center gap-4">
        {/* Texto */}
        <div className="w-1/2 px-4">
         <h2
           className="
             text-[18px]
             sm:text-[22px]
             md:text-[26px]
             lg:!text-[44px]
             text-black font-bold
             leading-[100%]
             mb-[20px]
           "
         >
            {t("title")}
          </h2>
        </div>

        {/* Video */}
        <div className="w-1/2 h-[206px] lg:h-auto flex justify-center">
          <iframe
            className="rounded-xl w-full max-w-full h-[206px] lg:h-[346px]"
            src="https://www.youtube.com/embed/YvuaT5-uaUg"
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

export default SecureVideo;