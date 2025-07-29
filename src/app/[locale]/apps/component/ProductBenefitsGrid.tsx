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
    <section className="w-full hidden sm:flex justify-center bg-black py-16">
      <div className="w-full max-w-[1150px] mx-auto">
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            gap-x-4 gap-y-4
            justify-center
            mx-auto
          "
        >
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="
      flex flex-col
      bg-[#181818]
      rounded-[12px]
      py-6 px-5
      min-h-[320px]
      w-full
      shadow-lg
      items-start
      gap-5 
    "
            >
              <img
                src={benefit.icon}
                alt={benefit.title}
                className="w-[44px] h-[44px]"
                draggable={false}
                loading="lazy"
              />
              <h4 className="font-inter font-semibold text-[18px] text-white">
                {benefit.title}
              </h4>
              <p className="font-inter text-[14px] text-white opacity-60 text-justify">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductBenefitsGrid;
