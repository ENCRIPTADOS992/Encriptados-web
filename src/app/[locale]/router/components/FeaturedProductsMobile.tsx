import React from "react";

interface FeaturedProductsMobileProps {
  left: {
    title: string;
    description: string;
    buttonLabel: string;       // Comprar
    onButtonClick: () => void;
    moreInfoLabel: string;     // Más información
    onMoreInfo: () => void;
    image: string;
  };
  right: {
    title: string;
    subtitle: string;
    buttonLabel: string; 
    onButtonClick: () => void;
    image: string;
  };
}

const FeaturedProductsMobile: React.FC<FeaturedProductsMobileProps> = ({
  left,
  right,
}) => (
  <section className="w-full flex flex-col gap-4 items-center py-6 px-4 block sm:hidden mt-[40px]">
    {/* LEFT CARD */}
    <div
      className="relative bg-gradient-to-br from-[#004A60] to-black rounded-[24px] w-full max-w-[374px] h-[216px] px-[18px] pt-[24px] overflow-hidden"
    >
      {/* Texto */}
      <div className="w-[201px] z-10">
        <h2 className="font-bold text-[16px] text-white leading-tight">
          {left.title}
        </h2>
        <p className="text-white text-[14px] opacity-90 leading-[1.2] mt-1">
          {left.description}
        </p>
      </div>

      {/* Botón “Comprar” (un poco arriba) */}
      <button
        className="absolute left-[18px] bottom-[56px] bg-[#E3F8FF] text-[#101010] font-medium rounded-full px-6 py-2 w-[116px] text-[14px] z-20"
        onClick={left.onButtonClick}
      >
        {left.buttonLabel}
      </button>

      {/* Enlace “Más información” (al mismo nivel de bottom que “Ver más”) */}
      <button
        className="absolute left-[24px] bottom-[16px] text-white text-[13px] font-medium underline z-20"
        onClick={left.onMoreInfo}
      >
        {left.moreInfoLabel}
      </button>

      {/* Imagen de la tarjeta */}
      <img
        src={left.image}
        alt={left.title}
        className="absolute left-[210px] top-[36px] w-[150px] h-[130px] object-contain select-none pointer-events-none z-10"
        draggable={false}
      />
    </div>

    {/* RIGHT CARD */}
    <div
      className="relative bg-gradient-to-r from-[#35CDFB] to-[#A8EBFF] rounded-[24px] w-full max-w-[374px] h-[216px] px-[18px] pt-[24px] overflow-hidden"
    >
      {/* Texto */}
      <div className="w-[201px] z-10">
        <h2 className="font-bold text-[18px] text-[#101010] leading-tight">
          {right.title}
        </h2>
        <p className="text-[#101010] text-[13px] opacity-70 mt-1">
          {right.subtitle}
        </p>
      </div>

      {/* Botón “Ver más” (mismo bottom que el enlace de la izquierda) */}
      <button
        className="absolute left-[18px] bottom-[35px] bg-white text-[#101010] font-medium rounded-full px-6 py-2 w-[116px] text-[14px] z-20"
        onClick={right.onButtonClick}
      >
        {right.buttonLabel}
      </button>

      {/* Imagen de la tarjeta */}
      <img
        src={right.image}
        alt={right.title}
        className="absolute left-[210px] top-[36px] w-[150px] h-[130px] object-contain select-none pointer-events-none z-10"
        draggable={false}
      />
    </div>
  </section>
);

export default FeaturedProductsMobile;
