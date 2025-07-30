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

const ProductBenefitsGridTablet: React.FC<ProductBenefitsGridProps> = ({
  benefits,
}) => {
  return (
    <section className="w-full hidden sm:flex lg:hidden justify-center bg-black py-12">
      <div className="w-full max-w-[628px] mx-auto">
        <div
          className="
            grid
            grid-cols-2
            gap-x-[10px] gap-y-[14px]
            justify-center
          "
        >
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="
                flex flex-col items-start
                bg-[#181818]
                rounded-[12px]
                w-[306px] h-[274px]
                pt-[24px] pr-[24px] pb-[34px] pl-[24px]
                shadow-lg
                gap-[14px]
              "
            >
              <img
                src={benefit.icon}
                alt={benefit.title}
                className="w-[34px] h-[34px]"
                draggable={false}
                loading="lazy"
              />
              <h4 className="font-inter font-semibold text-[14px] text-white">
                {benefit.title}
              </h4>
              <p className="font-inter text-[12px] text-white opacity-60 text-left">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductBenefitsGridTablet;
