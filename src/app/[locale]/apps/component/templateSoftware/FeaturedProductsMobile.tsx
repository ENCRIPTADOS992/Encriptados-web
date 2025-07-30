import React from "react";

interface FeaturedProductsMobileProps {
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

const FeaturedProductsMobile: React.FC<FeaturedProductsMobileProps> = ({
  left,
  right,
}) => (
 <section className="w-full flex flex-col gap-4 items-center bg-[#F6FAFC] py-6 px-4 block sm:hidden">
  {/* LEFT CARD */}
  <div
    className="relative bg-gradient-to-br from-[#004A60] to-black rounded-[24px] w-full max-w-[374px] h-[216px] px-[18px] pt-[24px] pb-[16px] flex"
    style={{ overflow: "hidden" }}
  >
    {/* Text */}
    <div className="flex flex-col gap-[18px] w-[201px] z-10 justify-between h-full">
  <div>
    <h2 className="font-bold text-[16px] text-white leading-tight">
      {left.title}
    </h2>
    <p className="text-white text-[14px] opacity-90 leading-[1.2] mt-1">
      {left.description}
    </p>
  </div>
  {/* Bloque de botón y enlace con tamaño exacto */}
  <div
    className="flex flex-col items-center"
    style={{
      width: "140px",
      height: "66px",
      gap: "13px",
    }}
  >
    <button
      className="bg-[#E3F8FF] text-[#101010] font-medium rounded-full px-6 py-2 w-[116px] text-[14px]"
      onClick={left.onButtonClick}
    >
      {left.buttonLabel}
    </button>
    <button
      className="text-white text-[13px] font-medium underline w-fit"
      onClick={left.onMoreInfo}
      style={{ marginTop: "0px" }}
    >
      {left.moreInfoLabel}
    </button>
  </div>
</div>

    {/* Card Image */}
    <img
      src={left.image}
      alt={left.title}
      className="absolute left-[210px] top-[36px] w-[150px] h-[130px] object-contain select-none pointer-events-none"
      draggable={false}
    />
  </div>

  {/* RIGHT CARD */}
  <div
    className="relative bg-gradient-to-r from-[#35CDFB] to-[#A8EBFF] rounded-[24px] w-full max-w-[374px] h-[216px] px-[18px] pt-[24px] pb-[24px] flex"
    style={{ overflow: "hidden" }}
  >
    {/* Text */}
    <div className="flex flex-col gap-[12px] w-[201px] z-10 justify-between h-full">
      <div>
        <h2 className="font-bold text-[18px] text-[#101010] leading-tight">
          {right.title}
        </h2>
        <p className="text-[#101010] text-[13px] opacity-70 mt-1">
          {right.subtitle}
        </p>
      </div>
      <div className="flex flex-col items-center gap-1 mt-3">
        <button
          className="bg-white text-[#101010] font-medium rounded-full px-6 py-2 w-[116px] text-[14px]"
          onClick={right.onButtonClick}
        >
          {right.buttonLabel}
        </button>
      </div>
    </div>
    {/* Card Image */}
    <img
      src={right.image}
      alt={right.title}
      className="absolute left-[210px] top-[36px] w-[150px] h-[130px] object-contain select-none pointer-events-none"
      draggable={false}
    />
  </div>
</section>


);

export default FeaturedProductsMobile;
