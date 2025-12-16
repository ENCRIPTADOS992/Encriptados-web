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
    <section className="w-full bg-[#F6FAFC] py-12 px-4 block sm:hidden">
      <h3 className="text-[30px] leading-[1.4] font-bold text-[#333333] text-center mb-6">
        {title}
      </h3>
      <div className="flex flex-col gap-8">
        {features.map((feature, idx) => (
          <div key={idx} className="flex flex-col items-center w-full max-w-[430px] mx-auto">
            {/* Cuadro blanco solo para la imagen */}
            <div
              className="bg-white rounded-2xl mx-auto flex items-center justify-center shadow-md"
              style={{
                width: "100%",
                maxWidth: "374px",
                height: "289px",
              }}
            >
              <img
                src={feature.image}
                alt=""
                style={{
                  width: "176px",
                  height: "253px",
                  objectFit: "contain",
                }}
                draggable={false}
                loading="lazy"
                aria-hidden="true"
              />
            </div>
            {/* Título y descripción fuera del cuadro */}
            <h4 className="font-medium text-[22px] leading-[1.5] text-[#333333] mt-6 mb-3 w-full">
              {feature.title}
            </h4>
            <p className="text-base leading-relaxed text-[#555555] w-full">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductFeaturesGridMobile;
