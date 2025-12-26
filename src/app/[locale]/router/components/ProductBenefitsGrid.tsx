import React from "react";

interface BenefitItem {
  icon: string;
  title: string;
  description: string;
}

interface ProductBenefitsGridProps {
  title?: string;
  benefits: BenefitItem[];
}

const ProductBenefitsGrid: React.FC<ProductBenefitsGridProps> = ({
  title = "Beneficios de Armadillo",
  benefits,
}) => {
  return (
    <section className="hidden lg:flex w-full justify-center py-16 md:py-20 lg:py-24">
      {/* Fondo negro con medidas exactas */}
      <div className="bg-[#000000] w-full max-w-[1272px] rounded-[44px] py-16 px-16 mx-auto">
        {/* Contenido interno con separación de Figma */}
        <div className="flex flex-col items-center gap-12 h-full">
          {/* Título */}
          <h2 className="max-w-[891px] text-center text-white font-bold text-[38px] leading-[1.3] mb-4">
            {title}
          </h2>

          {/* Grid */}
          <div
            className="
              grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
              gap-4 w-full max-w-[927px]
            "
          >
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="
                  flex flex-col bg-[#101010] rounded-xl
                  w-full max-w-[303px]
                  p-6 gap-3
                  shadow-lg items-start
                "
              >
                <div className="bg-[#323232] rounded-[8.38px] p-2 w-fit">
                  <img
                    src={benefit.icon}
                    alt={benefit.title}
                    className="w-8 h-8"
                    draggable={false}
                    loading="lazy"
                    aria-hidden="true"
                  />
                </div>
                <h4 className="font-medium text-[22px] text-white leading-[1.5] mb-2">
                  {benefit.title}
                </h4>
                <p className="text-base text-white/80 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductBenefitsGrid;
