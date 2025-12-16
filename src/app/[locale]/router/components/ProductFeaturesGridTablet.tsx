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
    <section className="w-full hidden sm:flex lg:hidden justify-center bg-white py-16">
      <div className="w-full max-w-[712px] mx-auto px-4">
        <h3 className="text-[38px] font-bold leading-[1.3] text-[#333333] mb-12">
          {title}
        </h3>
        <div className="grid grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-stretch h-full"
            >
              {/* Imagen */}
              <div className="bg-white rounded-2xl p-6 flex items-center justify-center h-[289px]">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="max-h-full object-contain"
                  draggable={false}
                  loading="lazy"
                />
              </div>

              {/* Texto */}
              <div className="flex flex-col flex-1 pt-4">
                <h4 className="text-[22px] font-medium leading-[1.5] text-[#333333] mb-2">
                  {feature.title}
                </h4>
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

export default ProductFeaturesGridTablet;
