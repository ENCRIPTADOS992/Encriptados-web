import React from "react";

interface HeroVideoSectionProps {
  title: string;
  videoUrl: string;
}

const HeroVideoSection: React.FC<HeroVideoSectionProps> = ({
  title,
  videoUrl,
}) => {
  return (
    <section
      className="w-full hidden lg:flex justify-center bg-white py-10 mt-[60px]"
      style={{ maxHeight: 350 }}
    >
      <div className="w-full max-w-[1272px] flex items-center mx-auto gap-6">

        {/* Título grande a la izquierda */}
        <div className="w-[540px]">
          <h1 className="font-inter font-bold text-[44px] leading-[100%] text-[#101010]">
            {title}
          </h1>
        </div>
        {/* Video o imagen a la derecha */}
        <div className="flex-shrink-0 ml-auto">
          <div className="rounded-[14px] overflow-hidden w-[627px] h-[346px] bg-black">
            <iframe
              width="627"
              height="346"
              src={videoUrl}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-[14px] border-0"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroVideoSection;
