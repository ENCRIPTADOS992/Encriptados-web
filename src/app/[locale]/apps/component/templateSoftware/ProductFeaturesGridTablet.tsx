import React from "react";

interface FeatureItem {
  image: string;
  title: string;
  description: string;
}

interface ProductFeaturesGridProps {
  title?: string;
  features: FeatureItem[];
}

const ProductFeaturesGridTablet: React.FC<ProductFeaturesGridProps> = ({
  title = "Características principales",
  features,
}) => {
  return (
    <section className="w-full hidden sm:flex lg:hidden justify-center bg-[#F6FAFC] py-10">
      <div className="w-full max-w-[712px] mx-auto">
        <h3 className="text-[16px] font-bold leading-[100%] text-[#101010] mb-8">
          {title}
        </h3>
        <div className="grid grid-cols-2 gap-x-[24px] gap-y-[24px]">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center w-[344px] rounded-[11.3px]"
            >
              {/* Imagen */}
              <div className="w-[344px] h-[220px] rounded-[11.3px] bg-white flex justify-center items-start">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-[174px] h-[179px] mt-[20px] object-contain"
                  draggable={false}
                  loading="lazy"
                />
              </div>

              {/* Texto */}
              <div className="flex flex-col items-center w-full gap-[12px] mt-4">
                <h4 className="font-inter font-semibold text-[14px] text-[#101010] leading-[22px] text-center">
                  {feature.title}
                </h4>
                <p className="font-inter font-light text-[12px] text-[#101010] opacity-70 leading-[1.2] text-center">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductFeaturesGridTablet;
