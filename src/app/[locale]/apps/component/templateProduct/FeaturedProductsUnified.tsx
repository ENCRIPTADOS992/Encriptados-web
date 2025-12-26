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
 * Mobile: 1 columna (cards apiladas), cada card con 2 columnas internas (60% texto, 40% imagen)
 * Tablet (sm+): 2 columnas (cards lado a lado)
 */
const FeaturedProductsUnified: React.FC<FeaturedProductsProps> = ({ left, right }) => {
  return (
    <section className="w-full bg-slate-50 py-8 lg:py-10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
          
          {/* Left Card - Dark gradient */}
          <article 
            className="rounded-3xl overflow-hidden p-5 sm:p-6 lg:p-8 min-h-[180px] sm:min-h-0"
            style={{
              background: "radial-gradient(120% 120% at 100% 0%, #004A60 0%, #000 100%)",
            }}
          >
            <div className="grid grid-cols-[1fr_auto] gap-3 sm:gap-4 items-center h-full">
              {/* Contenido texto */}
              <div className="flex flex-col gap-2 sm:gap-3">
                <h2 className="font-bold text-base sm:text-lg lg:text-2xl text-white leading-tight">
                  {left.title}
                </h2>
                <p className="text-white/90 text-xs sm:text-sm lg:text-base leading-relaxed line-clamp-3">
                  {left.description}
                </p>
                
                <div className="flex flex-col gap-1.5 sm:gap-2 mt-1 sm:mt-2">
                  <button
                    onClick={left.onButtonClick}
                    className="bg-cyan-100 text-gray-900 font-medium rounded-full px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm lg:text-base w-fit hover:bg-cyan-200 transition-colors"
                  >
                    {left.buttonLabel}
                  </button>
                  <button
                    onClick={left.onMoreInfo}
                    className="text-white text-xs sm:text-sm lg:text-base font-medium underline w-fit hover:text-white/80 transition-colors"
                  >
                    {left.moreInfoLabel}
                  </button>
                </div>
              </div>

              {/* Imagen */}
              <div className="flex items-center justify-center w-32 sm:w-40 lg:w-56 xl:w-64">
                <img
                  src={left.image}
                  alt={left.title}
                  className="w-full h-auto object-contain"
                  draggable={false}
                  loading="lazy"
                />
              </div>
            </div>
          </article>

          {/* Right Card - Cyan gradient */}
          <article 
            className="rounded-3xl overflow-hidden p-5 sm:p-6 lg:p-8 min-h-[180px] sm:min-h-0"
            style={{
              background: "linear-gradient(90deg, #35CDFB 0%, #A8EBFF 100%)",
            }}
          >
            <div className="grid grid-cols-[1fr_auto] gap-3 sm:gap-4 items-center h-full">
              {/* Contenido texto */}
              <div className="flex flex-col gap-2 sm:gap-3">
                <h2 className="font-bold text-base sm:text-lg lg:text-2xl text-gray-900 leading-tight">
                  {right.title}
                </h2>
                <p className="text-gray-900/70 text-xs sm:text-sm lg:text-base">
                  {right.subtitle}
                </p>
                
                <button
                  onClick={right.onButtonClick}
                  className="bg-white text-gray-900 font-medium rounded-full px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm lg:text-base w-fit mt-1 sm:mt-2 hover:bg-white/90 transition-colors"
                >
                  {right.buttonLabel}
                </button>
              </div>

              {/* Imagen */}
              <div className="flex items-center justify-center w-32 sm:w-40 lg:w-56 xl:w-64">
                <img
                  src={right.image}
                  alt={right.title}
                  className="w-full h-auto object-contain"
                  draggable={false}
                  loading="lazy"
                />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsUnified;
