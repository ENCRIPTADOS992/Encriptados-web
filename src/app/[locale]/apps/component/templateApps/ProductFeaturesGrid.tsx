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

const ProductFeaturesGrid: React.FC<ProductFeaturesGridProps> = ({
  title = "Características principales",
  features,
}) => {
  return (
    <section className="w-full hidden lg:flex justify-center bg-[#F6FAFC] py-10 ">
      <div className="w-full max-w-[1272px] mx-auto">
        <h3 className="text-[24px] font-bold leading-[100%] text-[#101010] mb-8">
          {title}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-6">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-stretch h-full">
              <div className="bg-[#101010] rounded-[14.84px] flex flex-col items-center justify-center w-[306px] h-[289px]">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-[210px] h-[262px] object-contain"
                  draggable={false}
                  loading="lazy"
                  style={{ margin: "0 auto" }}
                />
              </div>
              <div className="flex flex-col flex-1 pt-4">
                <h4 className="font-inter font-semibold text-[18px] text-[#101010] mb-2 min-h-[44px] leading-[22px]">
                  {feature.title}
                </h4>
                <p className="font-inter font-light text-[14px] text-[#101010] opacity-70 leading-[1.2] text-justify">
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

export default ProductFeaturesGrid;
