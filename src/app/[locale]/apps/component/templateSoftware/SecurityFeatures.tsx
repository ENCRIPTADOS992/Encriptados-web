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
    <section className="hidden lg:flex w-full justify-center py-16 md:py-20 lg:py-24" aria-labelledby="security-features-title">
      <div className="bg-[#000000] w-full max-w-[1272px] rounded-[44px] py-16 px-16 mx-auto">
        <div className="flex flex-col items-center gap-12 h-full">
          <h2
            id="security-features-title"
            className="max-w-[891px] text-center text-white font-bold text-[38px] leading-[1.3] mb-4"
          >
            {title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-[927px]">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="flex flex-col bg-[#101010] rounded-xl w-full max-w-[303px] p-6 gap-3 shadow-lg items-start"
              >
                <img
                  src="/images/apps/dec-secure/check_circle.png"
                  alt={feat.title}
                  className="w-10 h-10 mb-2"
                  draggable={false}
                  loading="lazy"
                  aria-hidden="true"
                />
                <h4 className="font-medium text-[22px] text-white leading-[1.5] mb-2">
                  {feat.title}
                </h4>
                <p className="text-base text-white/80 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default SecurityFeatures;
