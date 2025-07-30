import React from "react";

interface HeroVideoSectionProps {
  title: string;
  videoUrl: string;
}

const HeroVideoSectionTablet: React.FC<HeroVideoSectionProps> = ({
  title,
  videoUrl,
}) => {
  return (
    <section className="w-full hidden sm:flex lg:hidden justify-center bg-white py-8">
      <div className="w-full max-w-[713px] flex flex-row items-center justify-center gap-[28px] mx-auto">
        {/* Título a la izquierda */}
        <div className="w-[262px] h-[170px] flex items-center">
          <h1 className="font-inter font-bold text-[28px] leading-[100%] text-black text-left">
            {title}
          </h1>
        </div>
        {/* Video a la derecha */}
        <div className="w-[354px] h-[196px] rounded-[14px] overflow-hidden bg-black flex-shrink-0 flex items-center justify-center">
          <iframe
            width="354"
            height="196"
            src={videoUrl}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-[14px] border-0"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default HeroVideoSectionTablet;
