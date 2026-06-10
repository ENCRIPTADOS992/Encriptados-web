import React from "react";
import type { Metadata } from "next";
import EncryptedTestPage from "./components/EncryptedTestPage";
import { buildAbsoluteUrl } from "@/shared/seo/url";
import { buildSeoMetadata } from "@/shared/seo/metadata";
import OurProductsPage from "../our-products/OurProductsPage";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const LOCALIZED_PATHS = {
  es: "/es/prueba-encriptada",
  en: "/en/encrypted-test",
  fr: "/fr/test-chiffré",
  it: "/it/test-crittografato",
  pt: "/pt/teste-encriptado",
} as const;

const COPY = {
  es: {
    title: "Prueba encriptada de seguridad digital",
    description: "Descubre tu nivel de seguridad con herramientas para evaluar la proteccion de tu celular, contrasena y comunicaciones privadas.",
  },
  en: {
    title: "Encrypted digital security test",
    description: "Discover your security level with tools to evaluate your phone protection, password strength and private communications.",
  },
  fr: {
    title: "Test chiffre de securite numerique",
    description: "Decouvrez votre niveau de securite avec des outils pour evaluer la protection de votre telephone, mot de passe et communications privees.",
  },
  it: {
    title: "Test crittografato di sicurezza digitale",
    description: "Scopri il tuo livello di sicurezza con strumenti per valutare telefono, password e comunicazioni private.",
  },
  pt: {
    title: "Teste encriptado de seguranca digital",
    description: "Descubra seu nivel de seguranca com ferramentas para avaliar seu celular, senha e comunicacoes privadas.",
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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
      url: "/images/seo/pages/encrypted-test.png",
      width: 1200,
      height: 630,
      alt: COPY[safeLocale].title,
    },
    keywords: ["prueba encriptada", "test de seguridad", "seguridad digital", "Encriptados"],
  });
}

const page = () => {
  return (
    <div className="bg-black">
      <EncryptedTestPage />
      {/* Menú de productos con categorías (SIMs, Apps, Sistemas, Routers) — igual que en el Home */}
      <OurProductsPage />
    </div>
  );
};

export default page;
