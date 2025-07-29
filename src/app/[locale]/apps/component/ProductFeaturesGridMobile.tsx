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
    <section className="w-full bg-[#F6FAFC] py-6 px-0 block sm:hidden">
  <h3 className="text-[20px] font-bold text-[#101010] text-center mb-4 px-2">{title}</h3>
      <div className="flex flex-col gap-6">
        {features.map((feature, idx) => (
          <div key={idx} className="flex flex-col items-center w-full">
            {/* Cuadro blanco solo para la imagen */}
            <div
              className="bg-white rounded-[20px] mx-auto flex items-center justify-center"
              style={{
                width: "374px",
                height: "289px",
                boxShadow: "0px 2px 16px 0px rgba(40, 74, 107, 0.08)"
              }}
            >
              <img
                src={feature.image}
                alt={feature.title}
                style={{
                  width: "176px",
                  height: "253px",
                  objectFit: "contain"
                }}
                draggable={false}
                loading="lazy"
              />
            </div>
            {/* Título y descripción fuera del cuadro */}
                    <h4 className="font-inter font-semibold text-[18px] text-[#101010] mt-6 mb-2 leading-[22px] px-2 w-full" style={{maxWidth: 374}}>

              {feature.title}
            </h4>
            <p
              className="font-inter font-light text-[14px] text-[#101010] mt-5 opacity-70 leading-[1.2] text-justify w-full px-2"
              style={{maxWidth: 374}}
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
