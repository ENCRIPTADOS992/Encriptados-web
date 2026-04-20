// ../../encrypted-sim/components/SimBenefits.tsx
"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

type BenefitKey =
  | "privacy"
  | "encrypted"
  | "substituteNumber"
  | "imsiChanges"
  | "voiceFilters"
  | "lifetimePlans";

const benefitKeys: { key: BenefitKey; icon: string }[] = [
  { key: "privacy", icon: "/images/encrypted-sim/icons/visibility_lock.png" },
  { key: "encrypted", icon: "/images/encrypted-sim/icons/key_visualizer.png" },
  { key: "substituteNumber", icon: "/images/encrypted-sim/icons/published_with_changes.png" },
  { key: "imsiChanges", icon: "/images/encrypted-sim/icons/frame_person_off.png" },
  { key: "voiceFilters", icon: "/images/encrypted-sim/icons/record_voice_over.png" },
  { key: "lifetimePlans", icon: "/images/encrypted-sim/icons/cell_wifi.png" },
];

type BenefitTitleKey = `items.${BenefitKey}.title`;
type BenefitDescriptionKey = `items.${BenefitKey}.description`;

const getBenefitTitleKey = (key: BenefitKey): BenefitTitleKey => `items.${key}.title`;
const getBenefitDescriptionKey = (key: BenefitKey): BenefitDescriptionKey => `items.${key}.description`;

const SimBenefits = () => {
  const t = useTranslations("EncryptedSimPage.SimBenefits");
  return (
    <section
      className="
        mx-auto
        w-[1276px] max-w-full
        rounded-[34px]
        bg-[#F4F8FA] sm:bg-white
        px-6 md:px-10
        py-8 md:py-12
      "
    >
      <h2 className="text-center text-[22px] md:text-[26px] font-semibold mb-10">
        {t("title")}
      </h2>

      <div
        className="
          grid
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          gap-8 md:gap-10
        "
      >
        {benefitKeys.map((b) => (
          <div
            key={b.key}
            className="
              flex flex-col items-center text-center
              bg-white 
              w-[250px]rounded-[34px]
              sm:w-[322px] sm:h-[344px] rounded-[34px]
              mx-auto
              pb-4 sm:pb-0
              md:w-auto md:h-auto md:rounded-[24px]
              px-4 py-6 sm:px-6 sm:py-8
            "
          >
            <div className="relative w-[64px] h-[64px] mb-4">
              <Image
                src={b.icon}
                alt={t(getBenefitTitleKey(b.key))}
                fill
                className="object-contain"
              />
            </div>

            <div
              className="
                mb-2
                sm:min-h-[64px]
                flex items-center justify-center
              "
            >
              <h3 className="text-[18px] sm:text-[20px] font-semibold">
                {t(getBenefitTitleKey(b.key))}
              </h3>
            </div>

            <p className="text-[14px] sm:text-[14px] leading-relaxed text-black">
              {t(getBenefitDescriptionKey(b.key))}
            </p>

          </div>
        ))}
      </div>
    </section>
  );
};

export default SimBenefits;
