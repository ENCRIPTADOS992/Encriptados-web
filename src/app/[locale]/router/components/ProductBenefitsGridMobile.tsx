import React from "react";

interface BenefitItem {
  icon: string;
  title: string;
  description: string;
}

interface ProductBenefitsGridMobileProps {
  title?: string;
  benefits: BenefitItem[];
}

const ProductBenefitsGridMobile: React.FC<ProductBenefitsGridMobileProps> = ({
  title = "Te mantenemos conectado de forma segura y privada",
  benefits,
}) => {
  return (
    <section className="w-full bg-[#000000] block sm:hidden py-[64px] px-[20px] mt-[70px]">
      <div className="flex flex-col items-center gap-[24px] w-full max-w-[414px] mx-auto">
        {/* Título */}
        <h2 className="w-[292px] h-[48px] font-inter font-bold text-[20px] leading-[100%] text-center text-white">
          {title}
        </h2>

        {/* Grid de tarjetas centradas */}
        <div className="flex flex-col items-center justify-center gap-[4px] w-full">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="
                flex flex-col bg-[#101010] rounded-[12px]
                w-full max-w-[374px] h-[260px]
                pt-[24px] pr-[24px] pb-[34px] pl-[24px]
                gap-[14px] mx-auto
              "
            >
              <img
                src={benefit.icon}
                alt={benefit.title}
                className="w-[44px] h-[44px]"
                draggable={false}
                loading="lazy"
              />
              <h4 className="font-inter font-semibold text-[18px] text-white leading-[22px]">
                {benefit.title}
              </h4>
              <p className="font-inter text-[14px] text-white/70 leading-[20px] text-justify">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductBenefitsGridMobile;
