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
  title = "Beneficios de Armadillo",
  benefits,
}) => {
  return (
    <section className="w-full hidden sm:flex lg:hidden justify-center mt-[90px]">
      <div className="bg-[#000000] w-[718px] h-[800px] rounded-[44px] pt-[62px] pr-[24px] pb-[62px] pl-[24px]">
        <div className="w-[670px] mx-auto flex flex-col items-center gap-[6px]">
          <h2
            className="
    font-inter font-bold text-[24px] leading-[100%]
    text-center text-white w-[414px] h-[58px]
  "
          >
            {title}
          </h2>

          <div className="grid grid-cols-3 gap-[6px] mt-[30px]">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="
                  flex flex-col items-start
                  bg-[#101010] rounded-[12px]
                  w-[220.67px] h-[284px]
                  pt-[24px] pr-[24px] pb-[34px] pl-[24px]
                  gap-[12px]
                "
              >
                <img
                  src={benefit.icon}
                  alt={benefit.title}
                  className="w-[34px] h-[34px]"
                  draggable={false}
                  loading="lazy"
                />
                <h4 className="font-inter font-semibold text-[14px] text-white leading-[17px]">
                  {benefit.title}
                </h4>
                <p className="font-inter font-light text-[12px] leading-[15px] text-white/60 text-left">
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

export default ProductBenefitsGridTablet;
