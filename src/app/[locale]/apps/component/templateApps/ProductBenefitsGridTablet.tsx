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
    <section className="w-full hidden sm:flex lg:hidden justify-center py-20">
      <div className="bg-[#000000] w-full max-w-[718px] rounded-[44px] p-12">
        <div className="w-full mx-auto flex flex-col items-center gap-6">
          <h2 className="font-bold text-[38px] leading-[1.3] text-center text-white">
            {title}
          </h2>

          <div className="grid grid-cols-3 gap-4 mt-6">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex flex-col items-start bg-[#101010] rounded-xl p-6 gap-4"
              >
                <img
                  src={benefit.icon}
                  alt=""
                  className="w-[34px] h-[34px]"
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
      </div>
    </section>
  );
};

export default ProductBenefitsGridTablet;
