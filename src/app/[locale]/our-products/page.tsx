import type { Metadata } from "next";
import OurProductsPage from "./OurProductsPage";
import { buildSeoMetadata, buildLocalizedLanguageAlternates } from "@/shared/seo/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const PAGE_COPY: Record<string, { title: string; description: string }> = {
  es: {
    title: "Nuestros productos - Celulares encriptados, SIMs y apps seguras",
    description:
      "Explora nuestra gama completa de celulares encriptados, SIMs anonimas, eSIMs, routers y aplicaciones de comunicacion privada.",
  },
  en: {
    title: "Our Products - Encrypted phones, SIMs and secure apps",
    description:
      "Explore our full range of encrypted phones, anonymous SIMs, eSIMs, routers and private communication apps.",
  },
  fr: {
    title: "Nos produits - Telephones cryptes, SIMs et applications securisees",
    description:
      "Decouvrez notre gamme complete de telephones cryptes, SIM anonymes, eSIM, routeurs et applications de communication privee.",
  },
  it: {
    title: "I nostri prodotti - Telefoni crittografati, SIM e app sicure",
    description:
      "Scopri la nostra gamma completa di telefoni crittografati, SIM anonime, eSIM, router e app di comunicazione privata.",
  },
  pt: {
    title: "Nossos produtos - Telefones criptografados, SIMs e apps seguros",
    description:
      "Explore nossa linha completa de telefones criptografados, SIMs anonimos, eSIMs, roteadores e apps de comunicacao privada.",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const copy = PAGE_COPY[locale] ?? PAGE_COPY.es;

  return buildSeoMetadata({
    title: copy.title,
    description: copy.description,
    canonicalPath: `/${locale}/our-products`,
    locale,
    languages: buildLocalizedLanguageAlternates("/our-products"),
  });
}

export default function OurProductsRoute() {
  return <OurProductsPage />;
}
