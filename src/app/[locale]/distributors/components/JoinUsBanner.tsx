import Button from "@/shared/components/Button";
import { useTranslations } from "next-intl";
import React from "react";

import EncryptedBgIcon from "../icons/EncryptedBgIcon";

const JoinUsBanner = () => {
  const t = useTranslations("DistributorsPage.banner");

  const title = useTranslations("DistributorsPage");
  const BannerDistributorsImage = "/images/distributors/black-white-man.png";

  return (
    <div className="w-full  bg-gradient-to-r from-[#00372B] via-black to-[#022530] flex justify-center items-center py-10 md:py-16 px-4">
      <div
        className="p-6 mt-24 md:p-10 rounded-3xl w-full max-w-[1200px] h-[550px] flex-col gap-y-4 flex justify-center items-center"
        style={{
          backgroundImage: `url(${BannerDistributorsImage})`,
          backgroundSize: "cover",
          backgroundPosition: "right",
        }}
      >
        <EncryptedBgIcon />
        <h1 className="text-white text-2xl md:text-3xl w-10/12 md:w-8/12 font-bold text-center">
          {title("bannerJoinUs")}
        </h1>

        <div className="flex items-center justify-center w-full">
          <Button rounded="full" intent="primary">
            {t("sendRequest")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JoinUsBanner;
