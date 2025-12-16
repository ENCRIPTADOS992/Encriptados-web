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
    <section className="w-full bg-[#000000] block sm:hidden py-16 px-4">
      <div className="flex flex-col items-center gap-8 w-full max-w-[430px] mx-auto">
        {/* Título */}
        <h2 className="font-bold text-[38px] leading-[1.3] text-center text-white">
          {title}
        </h2>

        {/* Grid de tarjetas centradas */}
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="flex flex-col bg-[#101010] rounded-xl w-full p-6 gap-4"
            >
              <img
                src={benefit.icon}
                alt=""
                className="w-[44px] h-[44px]"
                draggable={false}
                loading="lazy"
                aria-hidden="true"
              />
              <h4 className="font-medium text-[22px] leading-[1.5] text-white">
                {benefit.title}
              </h4>
              <p className="text-base leading-relaxed text-white/80">
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
