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
    <section className="w-full hidden lg:flex justify-center bg-[#F6FAFC] py-12 md:py-16 lg:py-20">
      <div className="w-full max-w-[1272px] mx-auto px-4">
        <h3 className="text-[30px] font-bold leading-[1.4] text-[#333333] mb-8">
          {title}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-stretch h-full">
              <div className="bg-white rounded-[14.84px] flex flex-col items-center justify-center w-[306px] h-[289px]">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-[210px] h-[262px] object-contain"
                  draggable={false}
                  loading="lazy"
                  style={{ margin: "0 auto" }}
                  aria-hidden="true"
                />
              </div>
              <div className="flex flex-col flex-1 pt-4">
                <h4 className="font-medium text-[22px] text-[#333333] mb-3 leading-[1.5]">
                  {feature.title}
                </h4>
                <p className="text-base text-[#555555] leading-relaxed">
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
