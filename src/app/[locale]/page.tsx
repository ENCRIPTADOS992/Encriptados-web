import type { Metadata } from "next";
import OurProductsPage from "./our-products/OurProductsPage";
import { DownloadAppContainer } from "@/shared/components/DownloadApp/DownloadAppContainer";
import { buildHomeLanguageAlternates, buildSeoMetadata } from "@/shared/seo/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const HOME_COPY: Record<string, { title: string; description: string }> = {
  es: {
    title: "Celulares encriptados, SIMs anonimas y apps seguras",
    description:
      "Compra celulares encriptados, SIMs anonimas, eSIMs, routers y aplicaciones de comunicacion privada con soporte especializado de Encriptados.",
  },
  en: {
    title: "Encrypted phones, anonymous SIMs and secure apps",
    description:
      "Buy encrypted phones, anonymous SIMs, eSIMs, routers and private communication apps from Encriptados.",
  },
  fr: {
    title: "Telephones cryptes, SIM anonymes et applications securisees",
    description:
      "Achetez des telephones cryptes, SIM anonymes, eSIM, routeurs et applications de communication privee avec Encriptados.",
  },
  it: {
    title: "Telefoni crittografati, SIM anonime e app sicure",
    description:
      "Acquista telefoni crittografati, SIM anonime, eSIM, router e app di comunicazione privata con Encriptados.",
  },
  pt: {
    title: "Telefones criptografados, SIMs anonimos e apps seguros",
    description:
      "Compre telefones criptografados, SIMs anonimos, eSIMs, roteadores e apps de comunicacao privada com Encriptados.",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const copy = HOME_COPY[locale] ?? HOME_COPY.es;

  return buildSeoMetadata({
    title: copy.title,
    description: copy.description,
    canonicalPath: locale === "es" ? "/" : `/${locale}`,
    locale,
    image: {
      url: "/encriptados.png",
      width: 500,
      height: 500,
      alt: "Encriptados",
    },
    languages: buildHomeLanguageAlternates(),
  });
}

export default function HomePage() {
  return (
    <>
      <DownloadAppContainer />
      {/* Banner para dispositivos móviles */}

      <OurProductsPage />
    </>
  );
}
