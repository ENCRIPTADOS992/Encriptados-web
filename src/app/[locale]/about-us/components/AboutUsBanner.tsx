import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/shared/components/SectionWrapper";

const AboutUsBanner = () => {
  const t = useTranslations();
  const Banner = "/images/about-us/phone-hand.png";

  return (
    <SectionWrapper className="relative z-10 py-8">
      <div className="
          bg-gradient-to-b from-[#001D25] to-[#151515]
          flex flex-col items-center
          z-20
          rounded-3xl
          justify-center
          space-y-4
          p-5
          overflow-y-hidden
        ">
        <div className="
            text-[#7EE1FE]
            text-center
            border-2 rounded-full border-[#7EE1FE]
            py-1 px-4
            mt-10 mb-10
          ">
          {t("AboutUsPage.banner.title")}
        </div>

        <div className="flex justify-center items-center">
          <h1 className="
              text-white text-center text-3xl w-9/12 font-bold
            ">
            {t("AboutUsPage.banner.description")}
          </h1>
        </div>

        <Image
          src={Banner}
          alt="Phone in Hand"
          width={400}
          height={400}
          className="object-contain translate-y-5"
          priority
        />
      </div>
    </SectionWrapper>
  );
};

export default AboutUsBanner;
