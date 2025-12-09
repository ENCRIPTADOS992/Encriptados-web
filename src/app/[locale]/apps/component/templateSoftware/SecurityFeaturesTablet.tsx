import React from "react";

interface Feature {
  title: string;
  description: string;
}

interface SecurityFeaturesTabletProps {
  title: string;
  features: Feature[];
  imageUrl: string;
}

const SecurityFeaturesTablet: React.FC<SecurityFeaturesTabletProps> = ({
  title,
  features,
  imageUrl,
}) => {
  return (
    <section className="hidden sm:flex flex-col items-center py-8 bg-white lg:hidden">
      <div className="w-[711px] mx-auto bg-black rounded-[44px] px-6 py-10 flex flex-col items-center gap-8">
        <h2 className="font-inter font-bold text-[24px] leading-[100%] text-white text-center">
          {title}
        </h2>

        {/* Imagen recortada a la mitad con degradado abajo */}
        <div className="flex justify-center">
          <div className="relative w-[260px] h-[300px] overflow-hidden">
            <img
              src={imageUrl}
              alt="Secure MDM Android"
              className="w-full h-full object-cover object-top select-none pointer-events-none"
              draggable={false}
            />
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-black to-transparent" />
          </div>
        </div>

        <div className="w-[663px] mx-auto grid grid-cols-3 gap-[6px]">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-[#101010] rounded-[12px] flex flex-col items-start w-full h-[314px] pt-[24px] pr-[16px] pb-[34px] pl-[16px] gap-[14px]"
            >
              <img
                src="/images/apps/dec-secure/check_circle.png"
                alt="check icon"
                className="w-[34px] h-[34px] select-none pointer-events-none"
                draggable={false}
              />
              <h3 className="font-inter font-semibold text-[14px] leading-[18px] text-white">
                {feat.title}
              </h3>
              <p className="font-inter font-normal text-[14px] leading-[16px] text-[rgba(244,248,250,0.6)] mt-1">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityFeaturesTablet;
