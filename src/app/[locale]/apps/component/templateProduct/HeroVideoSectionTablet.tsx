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
    <section className="w-full hidden sm:flex lg:hidden justify-center bg-white py-16">
      <div className="w-full max-w-[713px] flex flex-row items-center justify-center gap-8 mx-auto px-4">
        <div className="flex-1 flex items-center">
          <h2 className="font-bold text-[44px] leading-[1.3] text-[#333333] text-left">
            {title}
          </h2>
        </div>

        <div className="w-[352px] aspect-video rounded-2xl overflow-hidden bg-black flex-shrink-0 flex items-center justify-center">
          <iframe
            src={videoUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
            loading="lazy"
            aria-label={`Video: ${title}`}
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default HeroVideoSectionTablet;
