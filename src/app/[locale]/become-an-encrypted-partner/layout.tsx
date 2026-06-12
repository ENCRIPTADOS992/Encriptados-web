import type { Metadata } from "next";
import { buildSeoMetadata, buildLocalizedLanguageAlternates } from "@/shared/seo/metadata";

interface Props {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}

const COPY = {
  es: {
    title: "Se socio de Encriptados",
    description: "Conviertete en socio de Encriptados y distribuye celulares encriptados, SIMs y aplicaciones de comunicacion segura.",
  },
  en: {
    title: "Become an Encrypted Partner",
    description: "Become an Encriptados partner and distribute encrypted phones, SIMs and secure communication apps.",
  },
  fr: {
    title: "Devenez partenaire Encriptados",
    description: "Devenez partenaire Encriptados et distribuez des telephones chiffres, SIM et applications de communication securisee.",
  },
  it: {
    title: "Diventa partner di Encriptados",
    description: "Diventa partner di Encriptados e distribuisci telefoni crittografati, SIM e app di comunicazione sicura.",
  },
  pt: {
    title: "Seja parceiro da Encriptados",
    description: "Seja parceiro da Encriptados e distribua celulares criptografados, SIMs e aplicativos de comunicacao segura.",
  },
} as const;

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = locale in COPY ? (locale as keyof typeof COPY) : "es";

  return buildSeoMetadata({
    title: COPY[safeLocale].title,
    description: COPY[safeLocale].description,
    canonicalPath: `/${safeLocale}/become-an-encrypted-partner`,
    locale: safeLocale,
    languages: buildLocalizedLanguageAlternates("/become-an-encrypted-partner"),
  });
}

export default function BecomePartnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
