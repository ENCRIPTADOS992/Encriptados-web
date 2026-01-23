import React from "react";

interface FeaturedProductsTabletProps {
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

const FeaturedProductsTablet: React.FC<FeaturedProductsTabletProps> = ({
  left,
  right,
}) => (
  <section className="w-full hidden sm:flex lg:hidden justify-center py-8 mt-[30px]">
    <div className="flex flex-row gap-[20px] w-full max-w-[718px] px-6">
      {" "}
      {/* 349*2 + gap */}
      {/* LEFT CARD */}
      <div
        className="relative flex flex-col justify-between rounded-[16px] flex-1 h-[218px] px-4 py-4"
        style={{
          background:
            "radial-gradient(120% 120% at 100% 0%, #004A60 0%, #000 100%)",
        }}
      >
        <div className="z-10 flex flex-col gap-2 max-w-[200px] mt-2">
          <h2 className="font-bold text-[15px] text-white leading-tight">
            {left.title}
          </h2>
          <p className="text-white text-[12px] opacity-90 leading-[1.2]">
            {left.description}
          </p>
          <button
            className="bg-[#E3F8FF] text-[#101010] font-medium rounded-full px-6 py-2 min-w-[140px] text-[14px] mt-1 mb-1 transition-all hover:bg-[#cbf2ff]"
            onClick={left.onButtonClick}
            style={{ textAlign: 'center', display: 'block' }}
          >
            {left.buttonLabel}
          </button>
          <button
            className="text-white text-[13px] font-medium underline w-fit hover:text-gray-200 transition-colors"
            onClick={left.onMoreInfo}
            style={{ marginTop: "-4px" }}
          >
            {left.moreInfoLabel}
          </button>
        </div>
        <img
          src={left.image}
          alt="SIM Card encriptada"
          className="absolute right-2 top-6 w-[180px] h-[175px] object-contain select-none pointer-events-none"
          draggable={false}
        />
      </div>
      {/* RIGHT CARD */}
      <div
        className="relative flex flex-col justify-between rounded-[16px] flex-1 h-[218px] px-4 py-4"
        style={{
          background: "linear-gradient(90deg, #35CDFB 0%, #A8EBFF 100%)",
        }}
      >
        <div className="z-10 flex flex-col gap-2 max-w-[200px] mt-2">
          <h2 className="font-bold text-[15px] text-[#101010] leading-tight">
            {right.title}
          </h2>
          <p className="text-[#101010] text-[12px] opacity-70">
            {right.subtitle}
          </p>
          <button
            className="bg-white text-[#101010] font-medium rounded-full px-6 py-2 min-w-[140px] text-[13px] mt-4 transition-all hover:bg-gray-50"
            onClick={right.onButtonClick}
            style={{ textAlign: 'center', display: 'block' }}
          >
            {right.buttonLabel}
          </button>
        </div>
        <img
          src={right.image}
          alt="eSIM Encriptada"
          className="absolute right-2 top-6 w-[180px] h-[175px] object-contain select-none pointer-events-none"
          draggable={false}
        />
      </div>
    </div>
  </section>
);

export default FeaturedProductsTablet;
