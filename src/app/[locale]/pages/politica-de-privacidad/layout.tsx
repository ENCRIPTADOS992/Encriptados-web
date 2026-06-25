import type { Metadata } from "next";
import { buildSeoMetadata, buildLocalizedLanguageAlternates } from "@/shared/seo/metadata";

interface Props {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}

const COPY = {
  es: {
    title: "Politica de Privacidad",
    description: "Politica de privacidad de Encriptados. Conoce como protegemos tu informacion personal y datos de navegacion.",
  },
  en: {
    title: "Privacy Policy",
    description: "Encriptados privacy policy. Learn how we protect your personal information and browsing data.",
  },
  fr: {
    title: "Politique de confidentialite",
    description: "Politique de confidentialite d'Encriptados. Decouvrez comment nous protegeons vos informations personnelles.",
  },
  it: {
    title: "Informativa sulla privacy",
    description: "Informativa sulla privacy di Encriptados. Scopri come proteggiamo le tue informazioni personali.",
  },
  pt: {
    title: "Politica de Privacidade",
    description: "Politica de privacidade da Encriptados. Saiba como protegemos suas informacoes pessoais e dados de navegacao.",
  },
} as const;

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = locale in COPY ? (locale as keyof typeof COPY) : "es";

  return buildSeoMetadata({
    title: COPY[safeLocale].title,
    description: COPY[safeLocale].description,
    canonicalPath: `/${safeLocale}/pages/politica-de-privacidad`,
    locale: safeLocale,
    languages: buildLocalizedLanguageAlternates("/pages/politica-de-privacidad"),
    images: [{ url: "/images/terminos-condiciones/termino-condiciones.webp", width: 1200, height: 630, alt: COPY[safeLocale].title }],
  });
}

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
