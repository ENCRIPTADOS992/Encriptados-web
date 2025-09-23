// src/app/[locale]/apps/component/templateSoftware/SecurityFeatures.tsx
import React from "react";

interface Feature {
  title: string;
  description: string;
}

interface SecurityFeaturesProps {
  title: string;
  features: Feature[];
  imageUrl: string;
}

const SecurityFeatures: React.FC<SecurityFeaturesProps> = ({
  title,
  features,
  imageUrl,
}) => {
  const COLS = 3;
  const ITEMS = features.slice(0, 9);
  const rows = Math.ceil(ITEMS.length / COLS);
  const CARD_H = 264;
  const GAP_Y = 9;
  const gridHeight = rows * CARD_H + (rows - 1) * GAP_Y;

  const containerHeight = rows <= 2 ? 1140 : 1460;

  return (
    <section className="hidden lg:flex justify-center py-8 bg-white mt-[64px]">
      <div
        className="bg-black rounded-[44px] w-[1273px] mx-auto px-[60px]"
        style={{ height: containerHeight }}
      >
        <div className="w-full">
          <div className="pt-[85px] mx-auto text-center" style={{ width: 891 }}>
            <h2
              className="
      font-inter font-bold
      text-[30px] leading-[30px] tracking-[0]
      text-white
      break-words 
    "
            >
              {title}
            </h2>
          </div>

          <div className="flex justify-center mt-10">
            <div
              className="relative overflow-hidden" 
              style={{ width: 283, height: 315.39 }} 
            >
              <img
                src={imageUrl}
                alt="DEC Secure Phone"
                className="block mx-auto select-none pointer-events-none"
                style={{
                  width: "273.91px",
                  height: "auto",
                  objectFit: "contain",
                  objectPosition: "top center",
                  clipPath: "inset(0 0 50% 0)", 
                }}
                draggable={false}
              />

              <div
                className="pointer-events-none"
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  width: 283,
                  height: 110,
                  background:
                    "linear-gradient(180deg, rgba(2,6,7,0) 0%, #020607 100%)",
                }}
              />
            </div>
          </div>
          <div className="relative w-full">
            <div className="mx-auto" style={{ width: 927 }}>
              <div
                className="relative z-10 grid"
                style={{
                  width: 927,
                  height: 810,
                  gridTemplateColumns: "repeat(3, 303px)",
                  gridAutoRows: "264px",
                  columnGap: 9,
                  rowGap: 9,
                }}
              >
                {features.slice(0, 9).map((feat, idx) => (
                  <div
                    key={idx}
                    className="bg-[#101010] rounded-[12px] flex flex-col items-start"
                    style={{
                      width: 303,
                      height: 264,
                      padding: "24px 16px 34px 16px",
                      gap: 14,
                    }}
                  >
                    <img
                      src="/images/apps/dec-secure/check_circle.png"
                      alt="check icon"
                      className="w-[34px] h-[34px] select-none pointer-events-none"
                      draggable={false}
                    />
                    <div>
                      <h3 className="font-inter font-semibold text-[14px] leading-[18px] text-white w-[271px] h-[34px]">
                        {feat.title}
                      </h3>
                      <p className="font-inter font-normal text-[14px] leading-[16px] text-[rgba(244,248,250,0.6)] w-[271px] h-[85px] mt-2">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SecurityFeatures;
