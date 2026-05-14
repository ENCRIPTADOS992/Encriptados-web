import type { Metadata } from "next";
import Link from "next/link";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import FooterEncrypted from "@/shared/FooterEncrypted/FooterEncrypted";
import CurrentHeader from "@/shared/CurrentHeader";
import AppMobileLayout from "@/shared/components/AppMobileLayout";
import { StripeProvider } from "@/shared/components/StripeProvider";
import { AppMobileProvider } from "@/shared/context/AppMobileContext";
import ModalPaymentController from "@/shared/components/ModalPayment/ModalPaymentController";
import MoraWarningModal from "@/shared/components/MoraWarningModal";
import { loadMessages } from "@/i18n/messages";
import { ModalPaymentProvider } from "@/providers/ModalPaymentProvider";
import { MoraWarningProvider } from "@/providers/MoraWarningProvider";
import {
  buildLocationDescription,
  buildLocationProductDescription,
  buildLocationTitle,
  parseLocationPage,
  type LocationPageModel,
  type LocationProductType,
} from "@/shared/seo/locationPages";
import { buildSeoMetadata } from "@/shared/seo/metadata";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

const SECURITY_POINTS = [
  "Encrypted communication products",
  "Specialized support from Encriptados",
  "Solutions for apps, SIMs and secure devices",
];

type LocationTemplateCopy = {
  breadcrumbLocation: string;
  productReference: string;
  locationLabel: string;
  typeLabel: string;
  whatThisPageIsFor: string;
  recommendedNextStep: string;
  backToEncriptados: string;
  goToEncriptados: string;
  continue: string;
  viewProduct: (productName: string) => string;
  intro: (productName: string, locationName: string) => string;
  ecosystem: (productName: string) => string;
  details: string;
  nextWithProduct: (productName: string) => string;
  nextToHome: string;
  securityPoints: string[];
  productTypes: Record<LocationProductType, string>;
};

const LOCATION_COPY: Record<LocationPageModel["locale"], LocationTemplateCopy> = {
  en: {
    breadcrumbLocation: "Location",
    productReference: "Product reference",
    locationLabel: "Location",
    typeLabel: "Type",
    whatThisPageIsFor: "What this page is for",
    recommendedNextStep: "Recommended next step",
    backToEncriptados: "Back to Encriptados",
    goToEncriptados: "Go to Encriptados",
    continue: "Continue",
    viewProduct: (productName) => `View ${productName}`,
    intro: (productName, locationName) =>
      `Explore ${productName} for ${locationName} with Encriptados. Our catalog brings together secure communication products for people and teams that need privacy, mobility, and specialized support.`,
    ecosystem: (productName) =>
      `${productName} is part of the Encriptados secure communication ecosystem. Depending on the product, users can continue to encrypted apps, anonymous SIM options, eSIM services, routers, or secure mobile solutions.`,
    details: "For the most accurate product information, prices, compatibility, and purchase options, continue to the current product page maintained by Encriptados.",
    nextWithProduct: (productName) =>
      `Review the current ${productName} product page to see active details, availability, compatibility information, and purchase options from Encriptados.`,
    nextToHome: "Continue to the Encriptados catalog to review available secure communication products, SIM options, apps, and current purchase paths.",
    securityPoints: SECURITY_POINTS,
    productTypes: {
      app: "App",
      sim: "SIM",
      phone: "Phone",
      generic: "Catalog",
    },
  },
  es: {
    breadcrumbLocation: "Ubicacion",
    productReference: "Referencia del producto",
    locationLabel: "Ubicacion",
    typeLabel: "Tipo",
    whatThisPageIsFor: "Sobre esta pagina",
    recommendedNextStep: "Siguiente paso recomendado",
    backToEncriptados: "Volver a Encriptados",
    goToEncriptados: "Ir a Encriptados",
    continue: "Continuar",
    viewProduct: (productName) => `Ver ${productName}`,
    intro: (productName, locationName) =>
      `Explora ${productName} para ${locationName} con Encriptados. Nuestro catalogo reune productos de comunicacion segura para personas y equipos que necesitan privacidad, movilidad y soporte especializado.`,
    ecosystem: (productName) =>
      `${productName} forma parte del ecosistema de comunicacion segura de Encriptados. Segun el producto, puedes continuar hacia aplicaciones encriptadas, SIM anonimas, eSIM, routers o soluciones moviles seguras.`,
    details: "Para consultar informacion actualizada, precios, compatibilidad y opciones de compra, continua hacia la pagina vigente del producto en Encriptados.",
    nextWithProduct: (productName) =>
      `Revisa la pagina actual de ${productName} para ver detalles activos, disponibilidad, compatibilidad y opciones de compra en Encriptados.`,
    nextToHome: "Continua al catalogo de Encriptados para revisar productos de comunicacion segura disponibles, opciones SIM, aplicaciones y rutas de compra vigentes.",
    securityPoints: [
      "Productos de comunicacion encriptada",
      "Soporte especializado de Encriptados",
      "Soluciones para apps, SIMs y dispositivos seguros",
    ],
    productTypes: {
      app: "Aplicacion",
      sim: "SIM",
      phone: "Telefono",
      generic: "Catalogo",
    },
  },
  fr: {
    breadcrumbLocation: "Emplacement",
    productReference: "Reference du produit",
    locationLabel: "Emplacement",
    typeLabel: "Type",
    whatThisPageIsFor: "A propos de cette page",
    recommendedNextStep: "Prochaine etape recommandee",
    backToEncriptados: "Retour a Encriptados",
    goToEncriptados: "Aller a Encriptados",
    continue: "Continuer",
    viewProduct: (productName) => `Voir ${productName}`,
    intro: (productName, locationName) =>
      `Explorez ${productName} pour ${locationName} avec Encriptados. Notre catalogue rassemble des produits de communication securisee pour les personnes et les equipes qui recherchent confidentialite, mobilite et support specialise.`,
    ecosystem: (productName) =>
      `${productName} fait partie de l'ecosysteme de communication securisee d'Encriptados. Selon le produit, vous pouvez continuer vers des applications chiffrees, des SIM anonymes, des eSIM, des routeurs ou des solutions mobiles securisees.`,
    details: "Pour consulter les informations a jour, les prix, la compatibilite et les options d'achat, continuez vers la page actuelle du produit sur Encriptados.",
    nextWithProduct: (productName) =>
      `Consultez la page actuelle de ${productName} pour voir les details actifs, la disponibilite, la compatibilite et les options d'achat sur Encriptados.`,
    nextToHome: "Continuez vers le catalogue Encriptados pour consulter les produits de communication securisee disponibles, les options SIM, les applications et les parcours d'achat actuels.",
    securityPoints: [
      "Produits de communication chiffree",
      "Support specialise d'Encriptados",
      "Solutions pour applications, SIM et appareils securises",
    ],
    productTypes: {
      app: "Application",
      sim: "SIM",
      phone: "Telephone",
      generic: "Catalogue",
    },
  },
  it: {
    breadcrumbLocation: "Localita",
    productReference: "Riferimento prodotto",
    locationLabel: "Localita",
    typeLabel: "Tipo",
    whatThisPageIsFor: "Informazioni su questa pagina",
    recommendedNextStep: "Prossimo passo consigliato",
    backToEncriptados: "Torna a Encriptados",
    goToEncriptados: "Vai a Encriptados",
    continue: "Continua",
    viewProduct: (productName) => `Vedi ${productName}`,
    intro: (productName, locationName) =>
      `Esplora ${productName} per ${locationName} con Encriptados. Il nostro catalogo riunisce prodotti di comunicazione sicura per persone e team che richiedono privacy, mobilita e supporto specializzato.`,
    ecosystem: (productName) =>
      `${productName} fa parte dell'ecosistema di comunicazione sicura di Encriptados. A seconda del prodotto, puoi continuare verso app crittografate, SIM anonime, eSIM, router o soluzioni mobili sicure.`,
    details: "Per consultare informazioni aggiornate, prezzi, compatibilita e opzioni di acquisto, continua alla pagina prodotto attuale su Encriptados.",
    nextWithProduct: (productName) =>
      `Consulta la pagina attuale di ${productName} per vedere dettagli attivi, disponibilita, compatibilita e opzioni di acquisto su Encriptados.`,
    nextToHome: "Continua al catalogo Encriptados per consultare prodotti di comunicazione sicura disponibili, opzioni SIM, app e percorsi di acquisto attuali.",
    securityPoints: [
      "Prodotti di comunicazione crittografata",
      "Supporto specializzato di Encriptados",
      "Soluzioni per app, SIM e dispositivi sicuri",
    ],
    productTypes: {
      app: "Applicazione",
      sim: "SIM",
      phone: "Telefono",
      generic: "Catalogo",
    },
  },
  pt: {
    breadcrumbLocation: "Localizacao",
    productReference: "Referencia do produto",
    locationLabel: "Localizacao",
    typeLabel: "Tipo",
    whatThisPageIsFor: "Sobre esta pagina",
    recommendedNextStep: "Proximo passo recomendado",
    backToEncriptados: "Voltar para Encriptados",
    goToEncriptados: "Ir para Encriptados",
    continue: "Continuar",
    viewProduct: (productName) => `Ver ${productName}`,
    intro: (productName, locationName) =>
      `Explore ${productName} para ${locationName} com a Encriptados. Nosso catalogo reune produtos de comunicacao segura para pessoas e equipes que precisam de privacidade, mobilidade e suporte especializado.`,
    ecosystem: (productName) =>
      `${productName} faz parte do ecossistema de comunicacao segura da Encriptados. Dependendo do produto, voce pode continuar para aplicativos criptografados, SIMs anonimos, eSIMs, roteadores ou solucoes moveis seguras.`,
    details: "Para consultar informacoes atualizadas, precos, compatibilidade e opcoes de compra, continue para a pagina atual do produto na Encriptados.",
    nextWithProduct: (productName) =>
      `Veja a pagina atual de ${productName} para conferir detalhes ativos, disponibilidade, compatibilidade e opcoes de compra na Encriptados.`,
    nextToHome: "Continue para o catalogo da Encriptados para revisar produtos de comunicacao segura disponiveis, opcoes SIM, aplicativos e caminhos de compra atuais.",
    securityPoints: [
      "Produtos de comunicacao criptografada",
      "Suporte especializado da Encriptados",
      "Solucoes para apps, SIMs e dispositivos seguros",
    ],
    productTypes: {
      app: "Aplicativo",
      sim: "SIM",
      phone: "Telefone",
      generic: "Catalogo",
    },
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const model = parseLocationPage(slug);

  if (!model) {
    return buildSeoMetadata({
      title: "Secure communication products",
      description: "Explore Encriptados products for private communication.",
      canonicalPath: "/",
      locale: "en",
      robots: {
        index: false,
        follow: true,
        googleBot: {
          index: false,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      },
    });
  }

  const title = buildLocationTitle(model);
  const description = buildLocationDescription(model);
  setRequestLocale(model.locale);

  return buildSeoMetadata({
    title,
    description,
    canonicalPath: model.canonicalPath,
    locale: model.locale,
    image: {
      url: model.productImage,
      alt: title,
      width: 1200,
      height: 630,
    },
    keywords: [model.productName, model.locationName, "encrypted communication", "secure apps", "Encriptados"],
    robots: {
      index: model.indexable,
      follow: true,
      googleBot: {
        index: model.indexable,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  });
}

function getLocalizedHome(locale: LocationPageModel["locale"]): string {
  return locale === "es" ? "/" : `/${locale}`;
}

export default async function LocationLegacyPage({ params }: PageProps) {
  const { slug } = await params;
  const model = parseLocationPage(slug);

  if (!model) notFound();

  const title = buildLocationTitle(model);
  const homeHref = getLocalizedHome(model.locale);
  const hasCurrentProductPage = model.productPath !== homeHref;
  const copy = LOCATION_COPY[model.locale] ?? LOCATION_COPY.en;
  const productDescription = buildLocationProductDescription(model);
  setRequestLocale(model.locale);
  const messages = await loadMessages(model.locale);

  return (
    <NextIntlClientProvider locale={model.locale} messages={messages}>
      <AppMobileProvider>
        <ModalPaymentProvider>
          <StripeProvider>
            <AppMobileLayout header={<CurrentHeader />} footer={<FooterEncrypted />}>
              <main className="min-h-screen bg-[#F5F8FA] text-[#111827]">
                <article className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-10 md:grid-cols-[minmax(0,1fr)_360px] md:px-8 md:py-14 lg:gap-12">
                  <div className="min-w-0 rounded-lg bg-white px-5 py-8 shadow-sm ring-1 ring-black/5 md:px-10 md:py-10">
                    <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#64748B]" aria-label="Breadcrumb">
                      <Link href={homeHref} className="hover:text-[#057C8D]">Encriptados</Link>
                      <span>/</span>
                      <span>{copy.breadcrumbLocation}</span>
                      <span>/</span>
                      <span className="text-[#111827]">{model.locationName}</span>
                    </nav>

                    <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#E6F8FC] px-4 py-2 text-sm font-medium text-[#057C8D]">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      {model.locationName}
                    </div>

                    <h1 className="max-w-4xl text-3xl font-semibold leading-tight text-[#111827] md:text-5xl">{title}</h1>

                    <div className="mt-8 space-y-6 text-base leading-8 text-[#334155]">
                      <p>
                        {copy.intro(model.productName, model.locationName)}
                      </p>
                      <p>
                        {copy.ecosystem(model.productName)}
                      </p>
                      <p>
                        {copy.details}
                      </p>
                    </div>

                    <section className="mt-10 border-t border-[#E2E8F0] pt-8">
                      <h2 className="text-2xl font-semibold text-[#111827]">{copy.whatThisPageIsFor}</h2>
                      <ul className="mt-5 grid gap-4">
                        {copy.securityPoints.map((point) => (
                          <li key={point} className="flex gap-3 text-[#334155]">
                            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#00A884]" aria-hidden="true" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section className="mt-10 border-t border-[#E2E8F0] pt-8">
                      <h2 className="text-2xl font-semibold text-[#111827]">{copy.recommendedNextStep}</h2>
                      <p className="mt-4 leading-8 text-[#334155]">
                        {hasCurrentProductPage
                          ? copy.nextWithProduct(model.productName)
                          : copy.nextToHome}
                      </p>
                      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <Link
                          href={model.productPath}
                          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-black px-6 py-3 font-semibold text-white transition hover:bg-[#15262A]"
                        >
                          {hasCurrentProductPage ? copy.viewProduct(model.productName) : copy.goToEncriptados}
                          <ArrowRight className="h-5 w-5" aria-hidden="true" />
                        </Link>
                        <Link
                          href={homeHref}
                          className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CBD5E1] px-6 py-3 font-semibold text-[#111827] transition hover:border-[#057C8D] hover:text-[#057C8D]"
                        >
                          {copy.backToEncriptados}
                        </Link>
                      </div>
                    </section>
                  </div>

                  <aside className="h-fit rounded-lg bg-white p-6 shadow-sm ring-1 ring-black/5 md:sticky md:top-24">
                    <div>
                      <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#057C8D]">
                        <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                        {copy.productReference}
                      </p>
                      <h2 className="mt-3 text-2xl font-semibold text-[#111827]">{model.productName}</h2>
                      <p className="mt-3 text-sm leading-6 text-[#475569]">{productDescription}.</p>
                      <dl className="mt-5 space-y-3 border-t border-[#E2E8F0] pt-5 text-sm">
                        <div className="flex justify-between gap-4">
                          <dt className="text-[#64748B]">{copy.locationLabel}</dt>
                          <dd className="text-right font-medium text-[#111827]">{model.locationName}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt className="text-[#64748B]">{copy.typeLabel}</dt>
                          <dd className="text-right font-medium text-[#111827]">{copy.productTypes[model.productType]}</dd>
                        </div>
                      </dl>
                      <Link
                        href={model.productPath}
                        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#35CDFB] px-5 py-3 font-semibold text-[#061014] transition hover:bg-[#7EE0FF]"
                      >
                        {hasCurrentProductPage ? copy.continue : copy.goToEncriptados}
                        <ArrowRight className="h-5 w-5" aria-hidden="true" />
                      </Link>
                    </div>
                  </aside>
                </article>
              </main>
            </AppMobileLayout>
          </StripeProvider>
          <ModalPaymentController />
        </ModalPaymentProvider>
        <MoraWarningProvider>
          <MoraWarningModal />
        </MoraWarningProvider>
      </AppMobileProvider>
    </NextIntlClientProvider>
  );
}