import { ReactNode } from "react";
import BannerMaya from "./components/BannerMaya";
import { BenefitsForYou } from "./components/BenefitsForYou";
import HowItWorks from "./components/HowItWorks";
import BannerCoverage from "@/shared/BannerCoverage";
import QRBanner from "../fast-delivery/components/QRBanner";
import { useTranslations } from "next-intl";
import FaqsBne from "../tim-sim/components/FaqsBne";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const t = useTranslations("DeliveryPage");
  return (
    <>
      <BannerMaya />
      {children}
      <BenefitsForYou />
      <HowItWorks />
      <BannerCoverage />
      <div className="px-2 2xl:px-96 xl:px-10 lg:px-0 ">
        <QRBanner title={t("downloadApp")} />
      </div>
      <div className="max-w-3xl mx-auto py-20 px-4 md:px-10 lg:px-20">
        <h1 className="text-center text-2xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-500 bg-clip-text text-transparent mb-10 -mt-20">
          Preguntas <span className="font-normal">frecuentes</span>
        </h1>

        <FaqsBne />
      </div>

    </>
  );
}
