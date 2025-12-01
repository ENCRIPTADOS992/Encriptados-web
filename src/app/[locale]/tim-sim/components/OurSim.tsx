import OurSimCard from "./svgs/OurSimCard";
import AdsClickSvg from "/public/images/bne-sim/svg/ads_click.svg";
import CellTowerSvg from "/public/images/bne-sim/svg/cell_tower.png";
import Rotate_rightSvg from "/public/images/bne-sim/svg/rotate_right.svg";
import SimCardSvg from "/public/images/bne-sim/svg/sim_card.png";
import { useTranslations } from "next-intl";

const OurSim: React.FC = () => {
  const t = useTranslations("BneSimPage");
  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 max-w-[1100px] mx-auto">
      <div className="w-[545px] space-y-[33px]">
        <h2 className="text-[48px] font-bold">{t("whyChooseSim")}</h2>
        <p className="font-semibold text-[28px]">{t("anonTitle")}</p>
        <p className="text-[28px]">{t("anonDescription")}</p>
      </div>

      <div className="ls:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
       {/* 1. Oscura */}
        <OurSimCard
          bgColor="bg-[linear-gradient(180deg,#010101_0%,#010101_70%,#019EFF_100%)]"
          textColor="text-white"
          icon={CellTowerSvg}
          title={t('OurSimCard.title')}
          description={t('OurSimCard.description')}
          classCard="md:-translate-y-4"
        />


        {/* 2. Clara */}
        <OurSimCard
          bgColor="bg-[linear-gradient(180deg,#009DFF_0%,#009DFF_70%,#C0E5FC_100%)]"
          textColor="text-black"
          icon={AdsClickSvg}
          title={t("OurSimCard.title2")}
          description={t("OurSimCard.description2")}
          classCard="md:translate-y-4"
        />

        {/* 3. Clara */}
        <OurSimCard
          bgColor="bg-[linear-gradient(180deg,#009DFF_0%,#009DFF_70%,#C0E5FC_100%)]"
          textColor="text-black"
          icon={Rotate_rightSvg}
          title={t("OurSimCard.title3")}
          description={t("OurSimCard.description3")}
          classCard="md:-translate-y-4"
        />

        {/* 4. Oscura */}
        <OurSimCard
          bgColor="bg-[linear-gradient(180deg,#010101_0%,#010101_70%,#019EFF_100%)]"
          textColor="text-white"
          icon={SimCardSvg}
          title={t("OurSimCard.title4")}
          description={t("OurSimCard.description4")}
          classCard="md:translate-y-4"
        />
      </div>
    </div>
  );
};

export default OurSim;
