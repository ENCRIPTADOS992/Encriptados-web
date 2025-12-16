import React from "react";

interface FeatureItem {
  image: string;
  title: string;
  description: string;
}

interface ProductFeaturesGridMobileProps {
  title?: string;
  features: FeatureItem[];
}

const ProductFeaturesGridMobile: React.FC<ProductFeaturesGridMobileProps> = ({
  title = "Características principales",
  features,
}) => {
  return (
    <section className="w-full bg-white py-12 px-4 sm:hidden">
      <h3 className="text-[30px] font-bold text-[#333333] text-center mb-8 leading-[1.3]">
        {title}
      </h3>
      <div className="flex flex-col gap-8 max-w-[430px] mx-auto">
        {features.map((feature, idx) => (
          <div key={idx} className="flex flex-col w-full">
            {/* Cuadro blanco solo para la imagen */}
            <div
              className="bg-white rounded-2xl p-6 flex items-center justify-center"
              style={{
                height: "289px",
              }}
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="max-h-full object-contain"
                draggable={false}
                loading="lazy"
              />
            </div>
            {/* Título y descripción fuera del cuadro */}
            <h4
              className="text-[22px] font-medium text-[#333333] mt-6 mb-2 leading-[1.5] w-full"
            >
              {feature.title}
            </h4>
            <p
              className="text-base text-[#555555] leading-relaxed w-full"
            >
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductFeaturesGridMobile;
