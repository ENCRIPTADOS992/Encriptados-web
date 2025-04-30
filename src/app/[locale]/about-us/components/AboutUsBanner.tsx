import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const AboutUsBanner = () => {
  const t = useTranslations();
  const Banner = "/images/about-us/phone-hand.png";

  return (
    <div className="flex items-center justify-center py-8">
      {" "}
      {/* Reducir py-14 a py-8 */}
      <div className="bg-[#051A22] flex flex-col items-center w-full lg:w-10/12 z-20 mx-4 rounded-3xl justify-center space-y-4 p-5 overflow-y-hidden">
        <div className="text-[#7EE1FE] text-center border-2 rounded-full border-[#7EE1FE] py-1 px-4 mt-10 mb-10">
          {" "}
          {/* Reducir mt-4 a mt-2 */}
          {t("AboutUsPage.banner.title")}
        </div>

        <div className="flex justify-center items-center">
          <h1 className="text-white text-center text-3xl w-9/12 font-bold">
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
    </div>
  );
};

export default AboutUsBanner;
