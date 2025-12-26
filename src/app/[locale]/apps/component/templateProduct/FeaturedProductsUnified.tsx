import React from "react";

interface FeaturedProductsProps {
  left: {
    title: string;
    description: string;
    buttonLabel: string;
    onButtonClick: () => void;
    moreInfoLabel: string;
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

/**
 * FeaturedProducts - Componente unificado y responsive
 * Mobile: 1 columna (cards apiladas)
 * Tablet/Desktop: 2 columnas (cards lado a lado)
 */
const FeaturedProductsUnified: React.FC<FeaturedProductsProps> = ({ left, right }) => {
  return (
    <section className="w-full bg-slate-50 py-8 lg:py-10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
          
          {/* Left Card - Dark gradient */}
          <article 
            className="relative rounded-3xl overflow-hidden min-h-[220px] lg:min-h-[300px] p-6 lg:p-10"
            style={{
              background: "radial-gradient(120% 120% at 100% 0%, #004A60 0%, #000 100%)",
            }}
          >
            <div className="relative z-10 flex flex-col gap-3 max-w-[200px] lg:max-w-[320px]">
              <h2 className="font-bold text-lg lg:text-2xl text-white leading-tight">
                {left.title}
              </h2>
              <p className="text-white/90 text-sm lg:text-base leading-relaxed">
                {left.description}
              </p>
              
              <div className="flex flex-col gap-2 mt-2">
                <button
                  onClick={left.onButtonClick}
                  className="bg-cyan-100 text-gray-900 font-medium rounded-full px-6 py-2.5 text-sm lg:text-base w-fit hover:bg-cyan-200 transition-colors"
                >
                  {left.buttonLabel}
                </button>
                <button
                  onClick={left.onMoreInfo}
                  className="text-white text-sm lg:text-base font-medium underline w-fit hover:text-white/80 transition-colors"
                >
                  {left.moreInfoLabel}
                </button>
              </div>
            </div>

            <img
              src={left.image}
              alt={left.title}
              className="absolute right-0 bottom-0 w-36 lg:w-80 h-auto object-contain pointer-events-none"
              draggable={false}
              loading="lazy"
            />
          </article>

          {/* Right Card - Cyan gradient */}
          <article 
            className="relative rounded-3xl overflow-hidden min-h-[220px] lg:min-h-[300px] p-6 lg:p-10"
            style={{
              background: "linear-gradient(90deg, #35CDFB 0%, #A8EBFF 100%)",
            }}
          >
            <div className="relative z-10 flex flex-col gap-3 max-w-[200px] lg:max-w-[320px]">
              <h2 className="font-bold text-lg lg:text-2xl text-gray-900 leading-tight">
                {right.title}
              </h2>
              <p className="text-gray-900/70 text-sm lg:text-base">
                {right.subtitle}
              </p>
              
              <button
                onClick={right.onButtonClick}
                className="bg-white text-gray-900 font-medium rounded-full px-6 py-2.5 text-sm lg:text-base w-fit mt-2 hover:bg-white/90 transition-colors"
              >
                {right.buttonLabel}
              </button>
            </div>

            <img
              src={right.image}
              alt={right.title}
              className="absolute right-0 bottom-0 w-36 lg:w-72 h-auto object-contain pointer-events-none"
              draggable={false}
              loading="lazy"
            />
          </article>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsUnified;
