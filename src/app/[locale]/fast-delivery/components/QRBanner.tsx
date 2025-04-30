"use client";
import Image from "next/image";
import React from "react";

import { useTranslations } from "use-intl";
import AppleSvg from "@/shared/svgs/AppleSvg";
import PlayStoreSvg from "@/shared/svgs/PlayStoreSvg";

const QRBanner = ({ title }: { title: string }) => {
  const t = useTranslations("DeliveryPage");
  return (
    <div className="flex mt-16 mb-16 justify-center">
      <div className="bg-cyan-gradient w-full h-[610px] py-5 md:h-[330px] rounded-2xl flex gap-10 flex-col md:flex-row justify-center items-center overflow-hidden relative p-6">
        <div className="flex flex-col gap-y-3 items-center text-center md:items-start md:text-left">
          <h1 className="text-black font-bold text-base w-8/12  lg:text-2xl sm:text-base ">
            {title}
          </h1>
          <div className="gap-4 2xl:flex xl:flex lg:flex md:flex sm:flex">
            <AppleSvg />
            <PlayStoreSvg />
          </div>
          <h1 className="font-semibold mt-4">{t("scanQR")}</h1>
        </div>

        <Image
          width={220}
          height={220}
          quality={100}
          title="Image"
          src={"/images/fastdeliverypage/QR.png"}
          alt="Image"
          className="mt-6 md:mt-0 lg:translate-y-[65px] translate-y-[72px]"
        />
      </div>
    </div>
  );
};

export default QRBanner;
