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
  benefits,
}) => {
  return (
    <section className="w-full bg-black py-8 px-0 block sm:hidden">
      <div className="flex flex-col gap-[14px] items-center">
        {benefits.map((benefit, idx) => (
          <div
  key={idx}
  className="bg-[#181818] rounded-[12px] w-full flex flex-col "
  style={{
    maxWidth: "374px",
    minWidth: "374px",
    height: "274px",
    padding: "24px 24px 34px 24px",
    boxShadow: "0px 2px 16px 0px rgba(40, 74, 107, 0.12)",
    justifyContent: "flex-start",
    gap: "18px" // Un poco menos de espacio entre elementos
  }}
>
  <img
    src={benefit.icon}
    alt={benefit.title}
    className="w-[44px] h-[44px] mb-2"
    draggable={false}
    loading="lazy"
  />
  <h4 className="font-inter font-semibold text-[18px] text-white leading-[22px] ">
    {benefit.title}
  </h4>
  <p className="font-inter text-[14px] text-white opacity-70 text-justify leading-[20px] text-center">
    {benefit.description}
  </p>
</div>

        ))}
      </div>
    </section>
  );
};

export default ProductBenefitsGridMobile;
