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
    <section className="w-full hidden sm:flex lg:hidden justify-center bg-[#F6FAFC] py-10 mt-[50px]">
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
              <div className="flex flex-col w-[344px] gap-[12px] mt-[30px]">
                <h4 className="font-inter font-semibold text-[14px] leading-[17px] text-[#101010]">
                  {feature.title}
                </h4>
                <p className="font-inter font-light text-[12px] leading-[15px] text-[#101010]/70 text-justify">
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
