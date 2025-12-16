import OurBneCard from "./svgs/OurBneCard";
import EligeUnPlan from "/public/images/bne-sim/elige-un-plan.png";
import Comprala from "../../../../../public/images/bne-sim/compralo.png";
import Disfrutalo from "../../../../../public/images/bne-sim/disfrutalo.png";
import { useTranslations } from "next-intl";


const OurBne: React.FC = () => {
  const t = useTranslations("BneSimPage");
  return (    
      <div className="w-full max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        <OurBneCard
          title={t("OurBneCard.title")}
          description={t("OurBneCard.description")}
          imageSrc={EligeUnPlan}
          imageAlt="Our BNE 1"          
        />
        <OurBneCard
          title={t("OurBneCard.title2")}
          description={t("OurBneCard.description2")}
          imageSrc={Comprala}
          imageAlt="Our BNE 2"          
        />
        <OurBneCard
          title={t("OurBneCard.title3")}
          description={t("OurBneCard.description3")}
          imageSrc={Disfrutalo}	
          imageAlt="Our BNE 3"          
        />
      </div>
    
  );
};

export default OurBne;

