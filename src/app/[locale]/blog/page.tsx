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

  return buildSeoMetadata({
    title: locale === "es" ? "Blog de seguridad digital" : "Digital security blog",
    description:
      locale === "es"
        ? "Noticias y guias de Encriptados sobre privacidad, celulares encriptados, SIMs anonimas y comunicacion segura."
        : "News and guides from Encriptados about privacy, encrypted phones, anonymous SIMs and secure communication.",
    canonicalPath: `/${locale}/blog`,
    locale,
    languages: buildLocalizedLanguageAlternates("/blog"),
    keywords: ["blog Encriptados", "seguridad digital", "privacidad", "celulares encriptados"],
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
