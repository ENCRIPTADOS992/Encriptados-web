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
      className="w-full hidden lg:flex justify-center bg-white py-16 md:py-20 lg:py-24"
    >
      <div className="w-full max-w-[1272px] flex items-center mx-auto gap-8 px-4">

        {/* Título grande a la izquierda */}
        <div className="w-[540px]">
          <h2 className="font-bold text-[44px] leading-[1.3] text-[#333333]">
            {title}
          </h2>
        </div>
        {/* Video o imagen a la derecha */}
        <div className="flex-shrink-0 ml-auto">
          <div className="rounded-2xl overflow-hidden w-[627px] h-[346px] bg-black">
            <iframe
              width="627"
              height="346"
              src={videoUrl}
              title="Vídeo de YouTube"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-2xl border-0"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroVideoSection;
