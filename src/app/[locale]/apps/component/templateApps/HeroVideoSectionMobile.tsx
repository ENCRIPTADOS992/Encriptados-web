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
    <section className="w-full bg-white py-12 px-4 block sm:hidden">
      <div className="w-full max-w-[430px] mx-auto flex flex-col items-center gap-6">
        {/* Título arriba */}
        <h2 className="font-bold text-[30px] leading-[1.4] text-center text-[#333333]">
          {title}
        </h2>

        {/* Video abajo */}
        <div className="w-full rounded-2xl overflow-hidden bg-black aspect-video">
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

export default HeroVideoSectionMobile;
