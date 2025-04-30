import Accordion from "@/shared/components/Accordion";
import { useTranslations } from "next-intl";

const FaqsBne = () => {   
  const t = useTranslations("BneSimPage");
  const items = [
    {
      title: t("FaqsBne.faqs.whatIsBne.title"),  
      content: t("FaqsBne.faqs.whatIsBne.content"),  
    },
    {
      title: t("FaqsBne.faqs.howToActivate.title"),
      content: t("FaqsBne.faqs.howToActivate.content"),
    },
    {
      title: t("FaqsBne.faqs.howToBuy.title"),
      content: t("FaqsBne.faqs.howToBuy.content"),
    },
  ];  

  return (   
    <div>
      <Accordion items={items} />
    </div>
  );
}

export default FaqsBne;
