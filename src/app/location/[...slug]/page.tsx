import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound, redirect } from "next/navigation";
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
  bannerAccent: string;
  bannerLine1Rest: string;
  bannerLine2: string;
  bannerSubtitle: string;
  buyNow: string;
  sidebarFeatures: Record<LocationProductType, string[]>;
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
    securityPoints: [
      "Encrypted communication products",
      "Specialized support from Encriptados",
      "Solutions for apps, SIMs and secure devices",
    ],
    productTypes: {
      app: "App",
      sim: "SIM",
      phone: "Phone",
      generic: "Catalog",
    },
    bannerAccent: "Encrypted",
    bannerLine1Rest: "security",
    bannerLine2: "in your communications",
    bannerSubtitle: "Connect with security and confidence now",
    buyNow: "Buy now",
    sidebarFeatures: {
      app: ["End-to-end encryption", "Secure messaging", "Private calls"],
      sim: ["No phone number", "Untraceable eSIM", "Encrypted communication"],
      phone: ["Encrypted hardware", "Secure operating system", "Protected calls"],
      generic: ["Encrypted communication", "Specialized support", "Secure solutions"],
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
    bannerAccent: "Seguridad",
    bannerLine1Rest: "encriptada",
    bannerLine2: "en tus comunicaciones",
    bannerSubtitle: "Conecta con seguridad y confianza ahora",
    buyNow: "Comprar ahora",
    sidebarFeatures: {
      app: ["Cifrado de extremo a extremo", "Mensajeria segura", "Llamadas privadas"],
      sim: ["Sin numero telefonico", "eSIM irrastreable", "Comunicacion encriptada"],
      phone: ["Hardware encriptado", "Sistema operativo seguro", "Llamadas protegidas"],
      generic: ["Comunicacion encriptada", "Soporte especializado", "Soluciones seguras"],
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
    bannerAccent: "Securite",
    bannerLine1Rest: "chiffree",
    bannerLine2: "dans vos communications",
    bannerSubtitle: "Connectez-vous en toute securite et confiance",
    buyNow: "Acheter maintenant",
    sidebarFeatures: {
      app: ["Chiffrement de bout en bout", "Messagerie securisee", "Appels prives"],
      sim: ["Sans numero de telephone", "eSIM intracable", "Communication chiffree"],
      phone: ["Materiel chiffre", "Systeme d'exploitation securise", "Appels proteges"],
      generic: ["Communication chiffree", "Support specialise", "Solutions securisees"],
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
    bannerAccent: "Sicurezza",
    bannerLine1Rest: "crittografata",
    bannerLine2: "nelle tue comunicazioni",
    bannerSubtitle: "Connettiti con sicurezza e fiducia ora",
    buyNow: "Acquista ora",
    sidebarFeatures: {
      app: ["Crittografia end-to-end", "Messaggistica sicura", "Chiamate private"],
      sim: ["Senza numero di telefono", "eSIM non tracciabile", "Comunicazione crittografata"],
      phone: ["Hardware crittografato", "Sistema operativo sicuro", "Chiamate protette"],
      generic: ["Comunicazione crittografata", "Supporto specializzato", "Soluzioni sicure"],
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
    bannerAccent: "Seguranca",
    bannerLine1Rest: "encriptada",
    bannerLine2: "em suas comunicacoes",
    bannerSubtitle: "Conecte-se com seguranca e confianca agora",
    buyNow: "Comprar agora",
    sidebarFeatures: {
      app: ["Criptografia ponta a ponta", "Mensagens seguras", "Chamadas privadas"],
      sim: ["Sem numero de telefone", "eSIM irrastreavel", "Comunicacao encriptada"],
      phone: ["Hardware encriptado", "Sistema operacional seguro", "Chamadas protegidas"],
      generic: ["Comunicacao encriptada", "Suporte especializado", "Solucoes seguras"],
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

const SIDEBAR_PRODUCT_IMAGES: Record<LocationProductType, string> = {
  sim: "/images/encrypted-sim/sim-encriptada.webp",
  app: "/images/encrypted-sim/sim-encriptada.webp",
  phone: "/images/our-products/two-cellphones.png",
  generic: "/images/encrypted-sim/sim-encriptada.webp",
};

/** Locale fallback order: try the current locale, then en, then es. */
const LOCALE_FALLBACK_CHAIN: LocationPageModel["locale"][] = ["en", "es"];

function buildFallbackPath(slug: string[], targetLocale: LocationPageModel["locale"]): string {
  // Strip the current locale prefix (if any) and rebuild with the target locale.
  const cleanSegments = slug.map((s) => decodeURIComponent(s).trim().toLowerCase()).filter(Boolean);
  const firstIsLocale = ["en", "es", "fr", "it", "pt"].includes(cleanSegments[0]);
  const pathSegments = firstIsLocale ? cleanSegments.slice(1) : cleanSegments;

  if (targetLocale === "en") {
    return `/location/${pathSegments.join("/")}`;
  }
  return `/location/${targetLocale}/${pathSegments.join("/")}`;
}

export default async function LocationLegacyPage({ params }: PageProps) {
  const { slug } = await params;
  const model = parseLocationPage(slug);

  if (!model) {
    // Try redirecting to English version before returning 404.
    const fallbackPath = buildFallbackPath(slug, "en");
    const fallbackModel = parseLocationPage(fallbackPath.replace("/location/", "").split("/"));
    if (fallbackModel) {
      redirect(fallbackPath);
    }
    notFound();
  }

  const copy = LOCATION_COPY[model.locale] ?? LOCATION_COPY.en;
  setRequestLocale(model.locale);

  let messages: Record<string, any>;
  try {
    messages = await loadMessages(model.locale);
    // If messages loaded but are essentially empty, treat as failure.
    if (!messages || Object.keys(messages).length === 0) {
      throw new Error(`Empty messages for locale "${model.locale}"`);
    }
  } catch {
    // Redirect to a known locale that has complete translations.
    for (const fallbackLocale of LOCALE_FALLBACK_CHAIN) {
      if (fallbackLocale === model.locale) continue;
      const fallbackPath = buildFallbackPath(slug, fallbackLocale);
      redirect(fallbackPath);
    }
    notFound();
  }

  const title = buildLocationTitle(model);
  const homeHref = getLocalizedHome(model.locale);
  const hasCurrentProductPage = model.productPath !== homeHref;
  const productDescription = buildLocationProductDescription(model);

  return (
    <NextIntlClientProvider locale={model.locale} messages={messages}>
      <AppMobileProvider>
        <ModalPaymentProvider>
          <StripeProvider>
            <AppMobileLayout header={<CurrentHeader />} footer={<FooterEncrypted />}>
              <main className="min-h-screen bg-[#161616] text-white">
                <article className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-10 md:grid-cols-[minmax(0,1fr)_360px] md:px-8 md:py-14 lg:gap-12">
                  {/* ── Content card ── */}
                  <div
                    className="min-w-0 rounded-2xl px-5 py-8 md:px-10 md:py-10"
                    style={{ background: "linear-gradient(180deg, #1D1D1D 0%, #242424 100%)" }}
                  >
                    {/* Breadcrumbs */}
                    <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#888]" aria-label="Breadcrumb">
                      <Link href={homeHref} className="transition hover:text-[#35CDFB]">Encriptados</Link>
                      <span>/</span>
                      <span>{copy.breadcrumbLocation}</span>
                      <span>/</span>
                      <span className="text-white/90">{model.locationName}</span>
                    </nav>

                    {/* Location badge */}
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#35CDFB]/30 bg-[#35CDFB]/10 px-4 py-2 text-sm font-medium text-[#35CDFB]">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      {model.locationName}
                    </div>

                    {/* Hero banner */}
                    <div className="relative mb-8 overflow-hidden rounded-2xl min-h-[200px] sm:min-h-[240px] md:min-h-[280px]">
                      {/* Solid dark background (left side) */}
                      <div className="absolute inset-0 bg-[#010101]" />

                      {/* Image on right side with gradient overlay */}
                      <div className="absolute top-0 right-0 bottom-0 left-0 sm:left-[35%] md:left-[40%] overflow-hidden">
                        <Image
                          src="/images/encrypted-sim/men-cel.webp"
                          alt=""
                          fill
                          className="object-cover object-[70%_top] sm:object-top"
                          sizes="(max-width: 768px) 100vw, 500px"
                          priority
                        />
                        {/* Gradient transition from black to image */}
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background:
                              "linear-gradient(90deg, #010101 0%, rgba(1,1,1,0.85) 20%, rgba(1,1,1,0.4) 50%, transparent 70%)",
                          }}
                        />
                      </div>

                      {/* Text content */}
                      <div className="relative z-10 flex min-h-[200px] sm:min-h-[240px] md:min-h-[280px] w-full items-center justify-center px-6 py-8 text-center">
                        <div className="space-y-2 sm:space-y-3">
                          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[28px] font-bold leading-[1.25] text-white">
                            <span className="text-[#35CDFB] italic">{copy.bannerAccent}</span>{" "}
                            {copy.bannerLine1Rest}
                            <br />
                            {copy.bannerLine2}
                          </h2>
                          <p className="text-[11px] sm:text-xs md:text-sm text-white/70">
                            {copy.bannerSubtitle}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h1 className="max-w-4xl text-xl font-semibold leading-tight text-white md:text-2xl">{title}</h1>

                    {/* Body text */}
                    <div className="mt-6 space-y-4 text-sm leading-6 text-[#AAAAAA]">
                      <p>{copy.intro(model.productName, model.locationName)}</p>
                      <p>{copy.ecosystem(model.productName)}</p>
                      <p>{copy.details}</p>
                    </div>

                    {/* What this page is for */}
                    <section className="mt-8 border-t border-[#3E3E3E] pt-6">
                      <h2 className="text-base font-bold text-white">{copy.whatThisPageIsFor}</h2>
                      <ul className="mt-4 grid gap-3">
                        {copy.securityPoints.map((point) => (
                          <li key={point} className="flex gap-2.5 text-sm text-[#AAAAAA]">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#35CDFB]" aria-hidden="true" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    {/* Recommended next step */}
                    <section className="mt-8 border-t border-[#3E3E3E] pt-6">
                      <h2 className="text-base font-bold text-white">{copy.recommendedNextStep}</h2>
                      <p className="mt-3 text-sm italic leading-6 text-[#AAAAAA]">
                        {hasCurrentProductPage
                          ? copy.nextWithProduct(model.productName)
                          : copy.nextToHome}
                      </p>
                      <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                        <Link
                          href={model.productPath}
                          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-[#3E3E3E] bg-[#1A1A1A] px-5 py-2 text-sm font-semibold text-white transition hover:border-[#35CDFB] hover:bg-[#252525]"
                        >
                          {hasCurrentProductPage ? copy.viewProduct(model.productName) : copy.goToEncriptados}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <Link
                          href={homeHref}
                          className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#3E3E3E] px-5 py-2 text-sm font-semibold text-white transition hover:border-[#35CDFB] hover:text-[#35CDFB]"
                        >
                          {copy.backToEncriptados}
                        </Link>
                      </div>
                    </section>
                  </div>

                  {/* ── Sidebar ── */}
                  <aside
                    className="relative h-fit overflow-hidden rounded-2xl p-6 md:sticky md:top-24"
                    style={{ background: "linear-gradient(180deg, #1D1D1D 0%, #242424 100%)" }}
                  >
                    {/* Decorative background image */}
                    <Image
                      src="/images/encrypted-sim/fondo-card-lateral-derecha.webp"
                      alt=""
                      fill
                      className="pointer-events-none object-cover opacity-60"
                      sizes="360px"
                    />
                    {/* Dark-blue gradient overlay */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(0deg, rgba(0,0,0,0) 49.04%, #051222 100%)",
                      }}
                    />

                    <div className="relative z-10">
                      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#35CDFB]">
                        <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                        {copy.productReference}
                      </p>
                      <h2 className="mt-3 text-xl font-bold text-white">{model.productName}</h2>
                      <p className="mt-2 text-xs leading-5 text-[#999]">{productDescription}.</p>

                      {/* Feature points — dynamic per product type */}
                      <ul className="mt-5 space-y-3">
                        {(copy.sidebarFeatures[model.productType] ?? copy.sidebarFeatures.generic).map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-white">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-[#35CDFB]" aria-hidden="true" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* Product image — dynamic per product type */}
                      <div className="relative mt-6 overflow-hidden rounded-xl">
                        <Image
                          src={SIDEBAR_PRODUCT_IMAGES[model.productType]}
                          alt={model.productName}
                          width={360}
                          height={220}
                          className="h-auto w-full object-contain"
                          sizes="320px"
                        />
                      </div>

                      <Link
                        href={model.productPath}
                        className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#35CDFB] px-5 py-2.5 text-sm font-semibold text-[#061014] transition hover:bg-[#7EE0FF]"
                      >
                        {copy.buyNow}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
