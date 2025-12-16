import Button from "@/shared/components/Button";
import { useTranslations } from "next-intl";
import React from "react";
import EncryptedBgIcon from "../icons/EncryptedBgIcon";
import TelegramButton from "@/shared/components/TelegramButton";
import SectionWrapper from "@/shared/components/SectionWrapper";

const JoinUsBanner = () => {
  const t = useTranslations("DistributorsPage.banner");
  const title = useTranslations("DistributorsPage");
  const BannerDistributorsImage = "/images/distributors/black-white-man.png";

  return (
    <div className="w-full bg-black relative overflow-hidden py-12 md:py-16 lg:py-20 px-2 md:px-4">
      <SectionWrapper className="relative z-10">
        <div
          className="
            p-6 mt-24 md:p-10 rounded-3xl
            w-full max-w-full
            h-[430px] md:h-[550px]
            flex flex-col gap-y-4 justify-center items-center
          "
          style={{
            backgroundImage: `url(${BannerDistributorsImage})`,
            backgroundSize: "cover",
            backgroundPosition: "right",
          }}
        >
          <EncryptedBgIcon />
          <h2 className="text-[30px] md:text-[38px] leading-[1.3] font-bold text-white text-center w-11/12 md:w-8/12">
            {title("bannerJoinUs")}
          </h2>
          <div className="flex items-center justify-center w-full mt-6">
            <TelegramButton />
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default JoinUsBanner;
