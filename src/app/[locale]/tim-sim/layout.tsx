import { Metadata } from "next";
import { buildLocalizedLanguageAlternates, buildSeoMetadata } from "@/shared/seo/metadata";

interface Props {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const copy = {
    es: {
      title: "SIM TIM con datos internacionales",
      description: "Compra SIM TIM y recargas de datos para navegar en multiples destinos con activacion sencilla y soporte de Encriptados.",
    },
    en: {
      title: "TIM SIM with international data",
      description: "Buy TIM SIM and data top-ups to stay connected in multiple destinations with simple activation and Encriptados support.",
    },
    fr: {
      title: "SIM TIM avec donnees internationales",
      description: "Achetez une SIM TIM et des recharges de donnees pour rester connecte dans plusieurs destinations avec l'assistance Encriptados.",
    },
    it: {
      title: "SIM TIM con dati internazionali",
      description: "Acquista SIM TIM e ricariche dati per restare connesso in piu destinazioni con il supporto Encriptados.",
    },
    pt: {
      title: "SIM TIM com dados internacionais",
      description: "Compre SIM TIM e recargas de dados para navegar em varios destinos com ativacao simples e suporte da Encriptados.",
    },
  } as const;
  const safeLocale = locale in copy ? (locale as keyof typeof copy) : "es";

  return buildSeoMetadata({
    title: copy[safeLocale].title,
    description: copy[safeLocale].description,
    canonicalPath: `/${safeLocale}/tim-sim`,
    locale: safeLocale,
    languages: buildLocalizedLanguageAlternates("/tim-sim"),
    image: {
      url: "/images/seo/sim-pages/tim-sim.png",
      width: 1200,
      height: 630,
      alt: copy[safeLocale].title,
    },
    keywords: ["SIM TIM", "datos internacionales", "recarga de datos", "Encriptados"],
  });
}

export default function TimSimLayout({ children }: Props) {
  return <>{children}</>;
}
