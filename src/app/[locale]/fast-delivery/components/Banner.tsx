import Button from "@/shared/components/Button";
import { useTranslations } from "next-intl";
import CircleTitle from "@/shared/components/CircleTitle";
import Image from "next/image";
import Man from "../../../../../public/images/fastdeliverypage/man.png";
import Women from "../../../../../public/images/fastdeliverypage/women.png";

const Banner = () => {
  const t = useTranslations("DeliveryPage");
  return (
    <div className="w-full bg-cyan-gradient flex flex-col md:flex-row justify-around items-center px-4 md:px-7">
      <div className="flex flex-col items-center justify-center h-full mb-6 md:mb-0">
        <Image quality={100} width={365} height={365} alt="woman" src={Women} />
      </div>
      <div className="flex flex-col justify-center gap-y-4 text-center items-center w-full md:w-6/12 py-2 ">
        <CircleTitle size="large" rounded="full" intent="ghost">
          {t("unnecessaryWaits")}
        </CircleTitle>
        <h1 className="sm:text-xl md:text-base lg:text-lg xl:text-4xl  font-bold text-[#333333]">
          {t("fastDeliveryBannerTitle")}
        </h1>
        <p className="text-black  sm:text-xl md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
          {t("fastDeliveryBannerSubtitle")}
        </p>

        <Button rounded="full" intent="secondary" size="large">
          {t("fastDeliveryLocation")}
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center h-full mb-6 md:mb-0">
        <Image quality={100} width={365} height={365} alt="man" src={Man} />
      </div>
    </div>
  );
};

export default Banner;
