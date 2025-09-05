import React from "react";

interface Feature {
  title: string;
  description: string;
}

interface SecurityFeaturesTabletProps {
  title: string;
  features: Feature[];
  imageUrl: string;
}

const SecurityFeaturesTablet: React.FC<SecurityFeaturesTabletProps> = ({
  title,
  features,
  imageUrl,
}) => (
  <section className="hidden sm:flex flex-col items-center py-8 bg-white lg:hidden">
    <div className="bg-black w-full max-w-[744px] mx-auto overflow-hidden pt-[60px]">
      <h2
        className="
          font-inter font-bold text-[24px] leading-[100%]
          tracking-[0px] text-white text-center
          w-[329px] h-[58px] mx-auto mb-6
        "
      >
        {title}
      </h2>

      {/* Imagen recortada a la mitad */}
      <div className="relative w-[280px] h-[324px] mt-[24px] mx-auto overflow-hidden">
        <img
          src={imageUrl}
          alt="DEC Secure Phone"
          className="w-full h-full object-cover object-top select-none pointer-events-none"
          draggable={false}
        />
        {/* Degradado negro abajo */}
        <div
          className="absolute bottom-0 left-0 w-full h-[30%]
               bg-gradient-to-t from-black to-transparent
               pointer-events-none"
        />
      </div>

      {/* Grid de 3 cards por fila */}
      <div className="px-6 py-8 grid grid-cols-3 gap-[15px]">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="bg-[#101010] rounded-[14px] p-[24px] flex flex-col items-start gap-[14px]"
          >
            {/* Icono check */}
            <img
              src="/images/apps/dec-secure/check_circle.png"
              alt="check icon"
              className="w-[34px] h-[34px] select-none pointer-events-none"
              draggable={false}
            />

            {/* Título */}
            <h3 className="font-inter font-semibold text-[14px] leading-[18px] tracking-[0px] text-white">
              {feat.title}
            </h3>

            {/* Descripción */}
            <p className="font-inter font-normal text-[14px] leading-[16px] tracking-[0px] text-[rgba(244,248,250,0.6)] mt-1">
              {feat.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SecurityFeaturesTablet;
