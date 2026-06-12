import React from "react";
import type { Metadata } from "next";
import BlogPage from "./components/BlogPage";
import GlobalFloatingMenu from "@/shared/components/GlobalFloatingMenu";
import { buildLocalizedLanguageAlternates, buildSeoMetadata } from "@/shared/seo/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const copy = {
    es: {
      title: "Blog de seguridad digital",
      description: "Noticias y guias de Encriptados sobre privacidad, celulares encriptados, SIMs anonimas y comunicacion segura.",
      keywords: ["blog Encriptados", "seguridad digital", "privacidad", "celulares encriptados"],
    },
    en: {
      title: "Digital security blog",
      description: "News and guides from Encriptados about privacy, encrypted phones, anonymous SIMs and secure communication.",
      keywords: ["Encriptados blog", "digital security", "privacy", "encrypted phones"],
    },
    fr: {
      title: "Blog sur la securite numerique",
      description: "Actualites et guides d'Encriptados sur la confidentialite, les telephones chiffres, les SIM anonymes et la communication securisee.",
      keywords: ["blog Encriptados", "securite numerique", "confidentialite", "telephones chiffres"],
    },
    it: {
      title: "Blog sulla sicurezza digitale",
      description: "Notizie e guide di Encriptados su privacy, telefoni crittografati, SIM anonime e comunicazione sicura.",
      keywords: ["blog Encriptados", "sicurezza digitale", "privacy", "telefoni crittografati"],
    },
    pt: {
      title: "Blog de seguranca digital",
      description: "Noticias e guias da Encriptados sobre privacidade, telefones criptografados, SIMs anonimos e comunicacao segura.",
      keywords: ["blog Encriptados", "seguranca digital", "privacidade", "telefones criptografados"],
    },
  } as const;
  const localeKey = locale in copy ? (locale as keyof typeof copy) : "es";

  return buildSeoMetadata({
    title: copy[localeKey].title,
    description: copy[localeKey].description,
    canonicalPath: `/${locale}/blog`,
    locale,
    languages: buildLocalizedLanguageAlternates("/blog"),
    image: {
      url: "/images/seo/pages/blog.png",
      width: 1200,
      height: 630,
      alt: copy[localeKey].title,
    },
    keywords: [...copy[localeKey].keywords],
  });
}

const Page = () => {
  return (
    <>
      <GlobalFloatingMenu />
      <BlogPage />
    </>
  );
};

export default Page;
