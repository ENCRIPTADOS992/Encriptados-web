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
    <section className="w-full hidden sm:flex lg:hidden justify-center bg-[#F6FAFC] py-16">
      <div className="w-full max-w-[712px] mx-auto px-4">
        <h3 className="text-[30px] leading-[1.4] font-bold text-[#333333] mb-8">
          {title}
        </h3>
        <div className="grid grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center w-full rounded-xl"
            >
              {/* Imagen */}
              <div className="w-full max-w-[340px] h-[220px] rounded-xl bg-white flex justify-center items-center shadow-md p-4 mx-auto">
                <img
                  src={feature.image}
                  alt=""
                  className="w-full max-w-[174px] max-h-full object-contain"
                  draggable={false}
                  loading="lazy"
                  aria-hidden="true"
                />
              </div>

              {/* Texto */}
              <div className="flex flex-col w-full gap-3 mt-6">
                <h4 className="font-medium text-[22px] leading-[1.5] text-[#333333]">
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
