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
  <section className="w-full flex flex-col gap-4 items-center py-6 px-4 sm:hidden">
    {/* LEFT CARD */}
    <div className="relative bg-gradient-to-br from-[#004A60] to-black rounded-[24px] w-full max-w-[430px] min-h-[216px] p-6 overflow-hidden">
      {/* Contenedor flex para layout responsive */}
      <div className="flex flex-col h-full relative z-10">
        {/* Texto */}
        <div className="flex-1 max-w-[55%] pr-2">
          <h2 className="font-bold text-[16px] text-white leading-tight">
            {left.title}
          </h2>
          <p className="text-white text-[14px] opacity-90 leading-[1.2] mt-2">
            {left.description}
          </p>
        </div>

        {/* Botones */}
        <div className="flex flex-col gap-2 mt-4">
          <button
            className="bg-[#E3F8FF] text-[#101010] font-medium rounded-full px-6 py-2 w-[116px] text-[14px]"
            onClick={left.onButtonClick}
          >
            {left.buttonLabel}
          </button>
          <button
            className="text-white text-[13px] font-medium underline w-fit"
            onClick={left.onMoreInfo}
          >
            {left.moreInfoLabel}
          </button>
        </div>
      </div>

      {/* Imagen de la tarjeta */}
      <img
        src={left.image}
        alt={left.title}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[45%] max-w-[180px] h-auto object-contain select-none pointer-events-none z-0"
        draggable={false}
      />
    </div>

    {/* RIGHT CARD */}
    <div className="relative bg-gradient-to-r from-[#35CDFB] to-[#A8EBFF] rounded-[24px] w-full max-w-[430px] min-h-[216px] p-6 overflow-hidden">
      {/* Contenedor flex para layout responsive */}
      <div className="flex flex-col h-full relative z-10">
        {/* Texto */}
        <div className="flex-1 max-w-[55%] pr-2">
          <h2 className="font-bold text-[18px] text-[#101010] leading-tight">
            {right.title}
          </h2>
          <p className="text-[#101010] text-[13px] opacity-70 mt-2">
            {right.subtitle}
          </p>
        </div>

        {/* Botón */}
        <div className="mt-4">
          <button
            className="bg-white text-[#101010] font-medium rounded-full px-6 py-2 w-[116px] text-[14px]"
            onClick={right.onButtonClick}
          >
            {right.buttonLabel}
          </button>
        </div>
      </div>

      {/* Imagen de la tarjeta */}
      <img
        src={right.image}
        alt={right.title}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[45%] max-w-[180px] h-auto object-contain select-none pointer-events-none z-0"
        draggable={false}
      />
    </div>
  </section>
);

export default FeaturedProductsMobile;
