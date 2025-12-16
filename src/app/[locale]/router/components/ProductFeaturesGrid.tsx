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
    <section className="w-full hidden lg:flex justify-center bg-[#F6FAFC] py-16 md:py-20 lg:py-24">
      <div className="w-full max-w-[1272px] mx-auto px-4">
        <h2 className="text-[38px] font-bold leading-[1.3] text-[#333333] mb-12">
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col h-full">
              <div className="bg-white rounded-2xl flex items-center justify-center h-[200px] p-6">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="max-h-[150px] max-w-full object-contain"
                  draggable={false}
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col flex-1 pt-6">
                <h3 className="font-medium text-[22px] leading-[1.5] text-[#333333] mb-3">
                  {feature.title}
                </h3>
                <p className="text-base leading-relaxed text-[#555555]">
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
