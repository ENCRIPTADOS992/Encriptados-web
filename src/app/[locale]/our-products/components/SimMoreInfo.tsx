"use client";
import { useTranslations } from "next-intl";

import SectionWrapper from "@/shared/components/SectionWrapper";
import CardInfo from "../../encrypted-sim/components/CardInfo";
import SimBenefits from "../../encrypted-sim/components/SimBenefits";
import SimSteps from "../../encrypted-sim/components/SimSteps";
import AppDownload from "../../encrypted-sim/components/AppDownload";
import FaqSims from "../../encrypted-sim/components/FaqSims";

const SimMoreInfo = () => {
  const t = useTranslations("EncryptedSimPage");

  return (
    <>
      <div className="relative overflow-hidden">
        <div
          className="
            hidden lg:block
            pointer-events-none select-none
            absolute
            -left-[260px]
            top-[220px]
            w-[875px] h-[875px]
            rounded-full
            bg-[#01FFC2]
            opacity-40
            blur-[500px]
            -z-10
          "
        />

        <div
          className="
            hidden lg:block
            pointer-events-none select-none
            absolute
            -right-[260px]
            top-[520px]
            w-[875px] h-[875px]
            rounded-full
            bg-[#C5E4FF]
            opacity-200
            blur-[200px]
            -z-10
          "
        />

        <div
          className="
            relative               
            pt-6 pb-4
            lg:pt-16 lg:pb-6
            overflow-hidden        
          "
        >
          <img
            src="/images/encrypted-sim/icons/vector27.png"
            alt="curve background"
            className="
              hidden lg:block
              absolute
              -top-[20px]          
              left-1/2              
              -translate-x-1/2
              w-screen              
              h-auto               
              object-cover
              rotate-360
              pointer-events-none
              select-none
              z-0
            "
          />

          <SectionWrapper>
            <div className="relative z-10">
              <CardInfo />
            </div>
          </SectionWrapper>
        </div>
          <div className="bg-[#F4F8FA] sm:bg-transparent py-8 sm:py-8">
            <SectionWrapper>
              <SimBenefits />
            </SectionWrapper>
          </div>

      </div>
      <div className="bg-[#F4F8FA] py-10 md:py-8">
        <SectionWrapper>
          <SimSteps />
        </SectionWrapper>
      </div>
      <div className="bg-[#F4F8FA]">
        <SectionWrapper>
          <AppDownload />
        </SectionWrapper>
      </div>
      <div className="bg-[#F4F8FA]">
        <SectionWrapper>
          <FaqSims />
        </SectionWrapper>
      </div>
    </>
  );
};

export default SimMoreInfo;
