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
    <section className="hidden lg:flex w-full justify-center">
      {/* Fondo negro con medidas exactas */}
      <div className="bg-[#000000] w-[1272px] h-[840px] rounded-[44px] py-[64px] px-[64px] mx-auto">
        {/* Contenido interno con separación de Figma */}
        <div className="flex flex-col items-center gap-[44px] h-full">
          {/* Título */}
          <h2 className="w-[891px] text-center text-white font-inter font-bold text-[30px] leading-[100%] mt-[32px]">
            {title}
          </h2>

          {/* Grid */}
          <div
            className="
              grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
              gap-[12px] w-[927px]
            "
          >
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="
                  flex flex-col bg-[#101010] rounded-[12px]
                  w-[303px] h-[264px]
                  p-[24px] pb-[34px] gap-[12px]
                  shadow-lg items-start
                "
              >
                <img
                  src={benefit.icon}
                  alt={benefit.title}
                  className="w-[34px] h-[34px]"
                  draggable={false}
                  loading="lazy"
                />
                <h4 className="font-inter font-semibold text-[18px] text-white">
                  {benefit.title}
                </h4>
                <p className="font-inter text-[14px] text-white/60">
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
