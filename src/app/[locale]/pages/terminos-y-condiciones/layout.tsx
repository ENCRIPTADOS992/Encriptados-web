import type { Metadata } from "next";
import { buildSeoMetadata, buildLocalizedLanguageAlternates } from "@/shared/seo/metadata";

interface Props {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}

const COPY = {
  es: {
    title: "Terminos y Condiciones",
    description: "Terminos y condiciones de uso de Encriptados. Lee nuestras condiciones antes de utilizar nuestros servicios.",
  },
  en: {
    title: "Terms and Conditions",
    description: "Encriptados terms and conditions of use. Read our conditions before using our services.",
  },
  fr: {
    title: "Termes et conditions",
    description: "Termes et conditions d'utilisation d'Encriptados. Lisez nos conditions avant d'utiliser nos services.",
  },
  it: {
    title: "Termini e condizioni",
    description: "Termini e condizioni d'uso di Encriptados. Leggi le nostre condizioni prima di utilizzare i nostri servizi.",
  },
  pt: {
    title: "Termos e Condicoes",
    description: "Termos e condicoes de uso da Encriptados. Leia nossas condicoes antes de utilizar nossos servicos.",
  },
} as const;

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = locale in COPY ? (locale as keyof typeof COPY) : "es";

  return buildSeoMetadata({
    title: COPY[safeLocale].title,
    description: COPY[safeLocale].description,
    canonicalPath: `/${safeLocale}/pages/terminos-y-condiciones`,
    locale: safeLocale,
    languages: buildLocalizedLanguageAlternates("/pages/terminos-y-condiciones"),
  });
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
