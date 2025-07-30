import React from "react";

interface HeroVideoSectionMobileProps {
  title: string;
  videoUrl: string;
}

const HeroVideoSectionMobile: React.FC<HeroVideoSectionMobileProps> = ({
  title,
  videoUrl,
}) => {
  return (
    <section className="w-full bg-white py-8 px-0 block sm:hidden">
      <div className="w-full flex flex-col items-center px-3">
        {/* Título arriba */}
        <h1 className="font-inter font-bold text-[24px] text-[#101010] text-center mb-5 whitespace-pre-line">
          {title}
        </h1>
        {/* Video abajo */}
        <div className="w-full rounded-[14px] overflow-hidden bg-black" style={{ maxWidth: 374, height: 210 }}>
          <iframe
            width="374"
            height="210"
            src={videoUrl}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0 rounded-[14px]"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default HeroVideoSectionMobile;
