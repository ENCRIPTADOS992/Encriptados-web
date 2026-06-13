import type { Metadata } from "next";
import { ReactNode } from "react";
import BannerMaya from "./components/BannerMaya";
import { BenefitsForYou } from "./components/BenefitsForYou";
import HowItWorks from "./components/HowItWorks";
import BannerCoverage from "@/shared/BannerCoverage";
import QRBanner from "../fast-delivery/components/QRBanner";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import FaqsBne from "../tim-sim/components/FaqsBne";
import { buildSeoMetadata, buildLocalizedLanguageAlternates } from "@/shared/seo/metadata";
import JsonLd from "@/shared/components/JsonLd/JsonLd";
import { buildFaqJsonLd } from "@/shared/components/JsonLd/faqJsonLd";

interface Props {
  params: Promise<{ locale: string }>;
  children: ReactNode;
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = locale || "es";

  const copy = {
    es: {
      title: "IRA SIM para comunicaciones seguras",
      description: "Descubre la IRA SIM de Encriptados para comunicaciones seguras y privadas con cobertura internacional.",
    },
    en: {
      title: "IRA SIM for secure communications",
      description: "Discover Encriptados IRA SIM for secure and private communications with international coverage.",
    },
    fr: {
      title: "IRA SIM pour communications securisees",
      description: "Decouvrez la IRA SIM d'Encriptados pour des communications securisees et privees avec couverture internationale.",
    },
    it: {
      title: "IRA SIM per comunicazioni sicure",
      description: "Scopri la IRA SIM di Encriptados per comunicazioni sicure e private con copertura internazionale.",
    },
    pt: {
      title: "IRA SIM para comunicacoes seguras",
      description: "Descubra o IRA SIM da Encriptados para comunicacoes seguras e privadas com cobertura internacional.",
    },
  } as const;
  const localeKey = safeLocale in copy ? (safeLocale as keyof typeof copy) : "es";

  return buildSeoMetadata({
    title: copy[localeKey].title,
    description: copy[localeKey].description,
    canonicalPath: `/${safeLocale}/ira-sim`,
    locale: safeLocale,
    languages: buildLocalizedLanguageAlternates("/ira-sim"),
    image: {
      url: "/images/seo/sim-pages/ira-sim.png",
      width: 1200,
      height: 630,
      alt: copy[localeKey].title,
    },
    keywords: ["IRA SIM", "SIM segura", "comunicaciones privadas", "Encriptados"],
  });
}

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = useTranslations("DeliveryPage");
  const tFaq = await getTranslations({ locale, namespace: "BneSimPage.faqs" });
  const faqJsonLd = buildFaqJsonLd(
    ["q1", "q2", "q3", "q4", "q5", "q6"].map((key) => ({
      question: tFaq(`${key}.question`),
      answer: tFaq(`${key}.answer`),
    }))
  );

  return (
    <>
      {faqJsonLd && <JsonLd data={faqJsonLd} />}
      <BannerMaya />
      {children}
      <BenefitsForYou />
      <HowItWorks />
      <BannerCoverage />
      <div className="px-2 2xl:px-96 xl:px-10 lg:px-0 ">
        <QRBanner title={t("downloadApp")} />
      </div>
      <div className="max-w-3xl mx-auto py-20 px-4 md:px-10 lg:px-20">
        <h2 className="text-center text-2xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-500 bg-clip-text text-transparent mb-10 -mt-20">
          Preguntas <span className="font-normal">frecuentes</span>
        </h2>

        <FaqsBne />
      </div>

    </>
  );
}
