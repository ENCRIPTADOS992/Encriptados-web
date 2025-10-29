import React from "react";

interface Feature {
  title: string;
  description: string;
}

interface SecurityFeaturesMobileProps {
  title: string;
  features: Feature[];
  imageUrl: string;
}

const SecurityFeaturesMobile: React.FC<SecurityFeaturesMobileProps> = ({
  title,
  features,
  imageUrl,
}) => (
  <section className="flex flex-col items-center py-6 bg-black sm:hidden">
    <h2
      className="
        mt-[32px]
          font-inter font-bold text-[24px] leading-[100%]
          tracking-[0px] text-white text-center
          w-[329px] h-[58px] mx-auto mb-8
        "
    >
      {title}
    </h2>
    {/* Grid de cards: 1 columna */}
    <div className="grid grid-cols-1 gap-[14px] px-6 py-8">
      {features.map((feat, idx) => (
        <div
          key={idx}
          className="
        bg-[#101010]
        w-full
        h-[240px]
        rounded-[12px]
        px-[24px]
        pt-[24px]
        pb-[34px]
        flex
        flex-col
        gap-[14px]
      "
        >
          {/* Icono check */}
          <img
            src="/images/apps/dec-secure/check_circle.png"
            alt="check icon"
            className="w-[34px] h-[34px] flex-shrink-0 select-none pointer-events-none"
            draggable={false}
          />

          <div className="flex-1">
            {/* Título */}
            <h3 className="font-inter font-semibold text-[16px] leading-[20px] text-white">
              {feat.title}
            </h3>

            {/* Descripción */}
            <p className="font-inter text-[14px] leading-[18px] text-[rgba(244,248,250,0.6)] mt-1">
              {feat.description}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* Imagen recortada desde la mitad hacia abajo */}
    {/* <div className="relative w-[324px] h-[393px] mt-6 overflow-hidden">
      <img
        src={imageUrl}
        alt="DEC Secure Phone"
        className="w-full h-full object-cover object-top select-none pointer-events-none"
        draggable={false}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-[30%]
                   bg-gradient-to-t from-black to-transparent
                   pointer-events-none"
      />
    </div> */}
  </section>
);

export default SecurityFeaturesMobile;
