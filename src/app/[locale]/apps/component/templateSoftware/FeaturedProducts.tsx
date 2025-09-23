import React from "react";

interface FeaturedProductsProps {
  left: {
    title: string;
    description: string;
    buttonLabel: string;
    onButtonClick: () => void;
    moreInfoLabel: string;
    onMoreInfo: () => void;
    image: string;
  };
  right: {
    title: string;
    subtitle: string;
    buttonLabel: string;
    onButtonClick: () => void;
    image: string;
  };
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ left, right }) => (
  <section className="w-full hidden lg:flex justify-center py-8 mt-[90px]"
  style={{ maxHeight: 306 }}
  >

    <div className="flex gap-4" style={{ width: 1272, minHeight: 306 }}>
      {/* LEFT CARD */}
      <div
        className="relative flex flex-col justify-between rounded-[34px] w-[628px] h-[306px] px-10 py-8"
        style={{
          background:
            "radial-gradient(120% 120% at 100% 0%, #004A60 0%, #000 100%)",
        }}
      >
        {/* Text */}
        <div className="z-10 flex flex-col gap-4 max-w-[320px] mt-6">
          <h2 className="font-bold text-[24px] text-white leading-tight">
            {left.title}
          </h2>
          <p className="text-white text-[16px] opacity-90 leading-[1.2]">
            {left.description}
          </p>
          <button
            className="bg-[#E3F8FF] text-[#101010] font-medium rounded-full px-8 py-3 w-[160px] text-[16px] mt-2 mb-2"
            onClick={left.onButtonClick}
          >
            {left.buttonLabel}
          </button>
          <button
            className="text-white text-[16px] font-medium underline w-fit"
            onClick={left.onMoreInfo}
            style={{ marginTop: "-4px" }}
          >
            {left.moreInfoLabel}
          </button>
        </div>
        {/* Card Image */}
        <img
          src={left.image}
          alt="SIM Card encriptada"
          className="absolute right-4 bottom-4 w-[320px] h-[279px] object-contain select-none pointer-events-none"
          draggable={false}
        />
      </div>

      {/* RIGHT CARD */}
      <div
        className="relative flex flex-col justify-between rounded-[34px] w-[628px] h-[306px] px-10 py-8"
        style={{
          background: "linear-gradient(90deg, #35CDFB 0%, #A8EBFF 100%)",
        }}
      >
        {/* Text */}
        <div className="z-10 flex flex-col gap-4 max-w-[320px] mt-6">
          <h2 className="font-bold text-[24px] text-[#101010] leading-tight">
            {right.title}
          </h2>
          <p className="text-[#101010] text-[15px] opacity-70">
            {right.subtitle}
          </p>
          <button
            className="bg-white text-[#101010] font-medium rounded-full px-8 py-3 w-[160px] text-[16px] mt-2"
            onClick={right.onButtonClick}
          >
            {right.buttonLabel}
          </button>
        </div>
        {/* Card Image */}
        <img
          src={right.image}
          alt="eSIM Encriptada"
          className="absolute right-4 bottom-4 w-[270px] h-[290px] object-contain select-none pointer-events-none"
          draggable={false}
        />
      </div>
    </div>
  </section>
);

export default FeaturedProducts;
