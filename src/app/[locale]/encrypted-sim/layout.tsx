import type { Metadata } from "next";
import { buildAbsoluteUrl } from "@/shared/seo/url";
import { buildSeoMetadata } from "@/shared/seo/metadata";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

const LOCALIZED_PATHS = {
  es: "/es/sim-encriptada",
  en: "/en/encrypted-sim",
  fr: "/fr/sim-cryptee",
  it: "/it/sim-crittografata",
  pt: "/pt/sim-encriptada",
} as const;

const COPY = {
  es: {
    title: "SIM Encriptada anonima para comunicacion privada",
    description: "Compra SIM Encriptada con datos, llamadas y funciones de privacidad para comunicarte de forma segura con soporte de Encriptados.",
  },
  en: {
    title: "Anonymous encrypted SIM for private communication",
    description: "Buy an Encrypted SIM with data, calls and privacy features for safer communication with Encriptados support.",
  },
  fr: {
    title: "SIM cryptee anonyme pour communication privee",
    description: "Achetez une SIM cryptee avec donnees, appels et fonctions de confidentialite pour communiquer plus surement avec Encriptados.",
  },
  it: {
    title: "SIM crittografata anonima per comunicazioni private",
    description: "Acquista una SIM crittografata con dati, chiamate e funzioni privacy per comunicare in modo piu sicuro con Encriptados.",
  },
  pt: {
    title: "SIM Encriptada anonima para comunicacao privada",
    description: "Compre SIM Encriptada com dados, chamadas e recursos de privacidade para se comunicar com mais seguranca com a Encriptados.",
  },
} as const;

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = locale in COPY ? (locale as keyof typeof COPY) : "es";

  return buildSeoMetadata({
    title: COPY[safeLocale].title,
    description: COPY[safeLocale].description,
    canonicalPath: LOCALIZED_PATHS[safeLocale],
    locale: safeLocale,
    languages: Object.fromEntries(
      Object.entries(LOCALIZED_PATHS).map(([key, path]) => [key, buildAbsoluteUrl(path)]),
    ),
    image: {
      url: "/images/seo/sim-pages/sim-encriptada.png",
      width: 1200,
      height: 630,
      alt: COPY[safeLocale].title,
    },
    keywords: ["SIM Encriptada", "SIM anonima", "privacidad movil", "Encriptados"],
  });
}

export default function EncryptedSimLayout({ children }: Props) {
  return <>{children}</>;
}