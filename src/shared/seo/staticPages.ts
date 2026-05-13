import type { Metadata } from "next";
import { SEO_LOCALES, type SeoLocale } from "./constants";
import { buildSeoMetadata } from "./metadata";

type StaticPageDefinition = {
  route: string;
  localizedPath: Record<SeoLocale, string>;
  title: Record<SeoLocale, string>;
  description: Record<SeoLocale, string>;
  keywords: string[];
  image?: string;
};

export const SEO_STATIC_PAGE_DEFINITIONS: Record<string, StaticPageDefinition> = {
  "about-us": {
    route: "/about-us",
    localizedPath: {
      es: "/es/nosotros",
      en: "/en/about-us",
      fr: "/fr/a-propos-de-nous",
      it: "/it/chi-siamo",
      pt: "/pt/sobre-nos",
    },
    title: {
      es: "Nosotros",
      en: "About us",
      fr: "A propos de nous",
      it: "Chi siamo",
      pt: "Sobre nos",
    },
    description: {
      es: "Conoce Encriptados, plataforma especializada en comunicacion segura, privacidad digital, SIMs anonimas y soluciones moviles cifradas.",
      en: "Learn about Encriptados, a platform focused on secure communication, digital privacy, anonymous SIMs and encrypted mobile solutions.",
      fr: "Decouvrez Encriptados, plateforme specialisee en communication securisee, confidentialite numerique, SIM anonymes et solutions mobiles chiffrees.",
      it: "Scopri Encriptados, piattaforma specializzata in comunicazione sicura, privacy digitale, SIM anonime e soluzioni mobili crittografate.",
      pt: "Conheca a Encriptados, plataforma especializada em comunicacao segura, privacidade digital, SIMs anonimos e solucoes moveis criptografadas.",
    },
    keywords: ["Encriptados", "privacidad digital", "comunicacion segura"],
  },
  offers: {
    route: "/offers",
    localizedPath: {
      es: "/es/ofertas",
      en: "/en/offers",
      fr: "/fr/offres",
      it: "/it/offerte",
      pt: "/pt/ofertas",
    },
    title: {
      es: "Ofertas encriptadas",
      en: "Encrypted offers",
      fr: "Offres chiffrees",
      it: "Offerte crittografate",
      pt: "Ofertas criptografadas",
    },
    description: {
      es: "Encuentra ofertas en SIMs, eSIMs, apps y sistemas de comunicacion segura de Encriptados.",
      en: "Find offers on SIMs, eSIMs, apps and secure communication systems from Encriptados.",
      fr: "Trouvez des offres sur les SIM, eSIM, applications et systemes de communication securisee d'Encriptados.",
      it: "Trova offerte su SIM, eSIM, app e sistemi di comunicazione sicura di Encriptados.",
      pt: "Encontre ofertas em SIMs, eSIMs, apps e sistemas de comunicacao segura da Encriptados.",
    },
    keywords: ["ofertas Encriptados", "SIM en oferta", "apps encriptadas"],
    image: "/images/offers/sim.png",
  },
  deliveries: {
    route: "/deliveries",
    localizedPath: {
      es: "/es/entregas",
      en: "/en/deliveries",
      fr: "/fr/livraisons",
      it: "/it/consegne",
      pt: "/pt/entregas",
    },
    title: { es: "Entregas", en: "Deliveries", fr: "Livraisons", it: "Consegne", pt: "Entregas" },
    description: {
      es: "Consulta opciones de entrega para productos Encriptados, SIMs, eSIMs y dispositivos de comunicacion segura.",
      en: "Review delivery options for Encriptados products, SIMs, eSIMs and secure communication devices.",
      fr: "Consultez les options de livraison des produits Encriptados, SIM, eSIM et appareils de communication securisee.",
      it: "Consulta le opzioni di consegna per prodotti Encriptados, SIM, eSIM e dispositivi di comunicazione sicura.",
      pt: "Consulte opcoes de entrega para produtos Encriptados, SIMs, eSIMs e dispositivos de comunicacao segura.",
    },
    keywords: ["entregas Encriptados", "envios SIM", "entrega segura"],
  },
  "fast-delivery": {
    route: "/fast-delivery",
    localizedPath: {
      es: "/es/entrega-rapida",
      en: "/en/fast-delivery",
      fr: "/fr/livraison-rapide",
      it: "/it/consegna-rapida",
      pt: "/pt/entrega-rapida",
    },
    title: { es: "Entrega rapida", en: "Fast delivery", fr: "Livraison rapide", it: "Consegna rapida", pt: "Entrega rapida" },
    description: {
      es: "Opciones de entrega rapida para productos de privacidad, SIMs y dispositivos de comunicacion segura de Encriptados.",
      en: "Fast delivery options for privacy products, SIMs and secure communication devices from Encriptados.",
      fr: "Options de livraison rapide pour produits de confidentialite, SIM et appareils securises Encriptados.",
      it: "Opzioni di consegna rapida per prodotti privacy, SIM e dispositivi sicuri Encriptados.",
      pt: "Opcoes de entrega rapida para produtos de privacidade, SIMs e dispositivos seguros da Encriptados.",
    },
    keywords: ["entrega rapida", "envio Encriptados", "SIM rapida"],
  },
  distributors: {
    route: "/distributors",
    localizedPath: {
      es: "/es/distribuidores",
      en: "/en/distributors",
      fr: "/fr/distributeurs",
      it: "/it/distributori",
      pt: "/pt/distribuidores",
    },
    title: { es: "Distribuidores", en: "Distributors", fr: "Distributeurs", it: "Distributori", pt: "Distribuidores" },
    description: {
      es: "Encuentra distribuidores y canales de venta de Encriptados para productos de comunicacion segura.",
      en: "Find Encriptados distributors and sales channels for secure communication products.",
      fr: "Trouvez les distributeurs et canaux de vente Encriptados pour produits de communication securisee.",
      it: "Trova distributori e canali vendita Encriptados per prodotti di comunicazione sicura.",
      pt: "Encontre distribuidores e canais de venda Encriptados para produtos de comunicacao segura.",
    },
    keywords: ["distribuidores Encriptados", "venta Encriptados", "privacidad movil"],
  },
  "where-to-find-us": {
    route: "/where-to-find-us",
    localizedPath: {
      es: "/es/donde-encontrarnos",
      en: "/en/where-to-find-us",
      fr: "/fr/ou-nous-trouver",
      it: "/it/dove-trovarci",
      pt: "/pt/onde-nos-encontrar",
    },
    title: { es: "Donde encontrarnos", en: "Where to find us", fr: "Ou nous trouver", it: "Dove trovarci", pt: "Onde nos encontrar" },
    description: {
      es: "Encuentra puntos de atencion, compra y soporte de Encriptados para soluciones de privacidad y comunicacion segura.",
      en: "Find Encriptados support, purchase and service points for privacy and secure communication solutions.",
      fr: "Trouvez les points d'assistance, d'achat et de service Encriptados pour solutions de confidentialite.",
      it: "Trova punti assistenza, acquisto e servizio Encriptados per soluzioni privacy e comunicazione sicura.",
      pt: "Encontre pontos de atendimento, compra e suporte Encriptados para solucoes de privacidade.",
    },
    keywords: ["donde comprar Encriptados", "soporte Encriptados", "puntos Encriptados"],
  },
  "where-to-find-encrypted": {
    route: "/where-to-find-encrypted",
    localizedPath: {
      es: "/es/donde-encontrar-encriptados",
      en: "/en/where-to-find-encrypted",
      fr: "/fr/ou-trouver-cryptees",
      it: "/it/dove-trovare-crittografati",
      pt: "/pt/onde-encontrar-encriptados",
    },
    title: { es: "Donde encontrar Encriptados", en: "Where to find encrypted products", fr: "Ou trouver des produits chiffres", it: "Dove trovare prodotti crittografati", pt: "Onde encontrar Encriptados" },
    description: {
      es: "Ubica soluciones Encriptados para comunicacion privada, celulares cifrados, SIMs anonimas y apps seguras.",
      en: "Find Encriptados solutions for private communication, encrypted phones, anonymous SIMs and secure apps.",
      fr: "Trouvez des solutions Encriptados pour communication privee, telephones chiffres, SIM anonymes et apps securisees.",
      it: "Trova soluzioni Encriptados per comunicazione privata, telefoni crittografati, SIM anonime e app sicure.",
      pt: "Encontre solucoes Encriptados para comunicacao privada, telefones criptografados, SIMs anonimos e apps seguros.",
    },
    keywords: ["productos encriptados", "celulares cifrados", "SIM anonima"],
  },
  news: {
    route: "/news",
    localizedPath: { es: "/es/noticias", en: "/en/news", fr: "/fr/nouvelles", it: "/it/notizie", pt: "/pt/noticias" },
    title: { es: "Noticias", en: "News", fr: "Nouvelles", it: "Notizie", pt: "Noticias" },
    description: {
      es: "Noticias y novedades de Encriptados sobre privacidad, comunicaciones seguras y seguridad movil.",
      en: "Encriptados news and updates about privacy, secure communications and mobile security.",
      fr: "Actualites Encriptados sur la confidentialite, les communications securisees et la securite mobile.",
      it: "Notizie Encriptados su privacy, comunicazioni sicure e sicurezza mobile.",
      pt: "Noticias e novidades da Encriptados sobre privacidade, comunicacoes seguras e seguranca movel.",
    },
    keywords: ["noticias Encriptados", "seguridad movil", "privacidad digital"],
  },
  ambassadors: {
    route: "/ambassadors",
    localizedPath: {
      es: "/es/embajadores",
      en: "/en/ambassadors",
      fr: "/fr/ambassadeurs",
      it: "/it/ambasciatori",
      pt: "/pt/embaixadores",
    },
    title: { es: "Embajadores", en: "Ambassadors", fr: "Ambassadeurs", it: "Ambasciatori", pt: "Embaixadores" },
    description: {
      es: "Conoce el programa de embajadores de Encriptados y las oportunidades para promover privacidad digital.",
      en: "Explore the Encriptados ambassadors program and opportunities to promote digital privacy.",
      fr: "Decouvrez le programme ambassadeurs Encriptados et les opportunites de promouvoir la confidentialite numerique.",
      it: "Scopri il programma ambassador Encriptados e le opportunita per promuovere la privacy digitale.",
      pt: "Conheca o programa de embaixadores Encriptados e oportunidades para promover privacidade digital.",
    },
    keywords: ["embajadores Encriptados", "programa Encriptados", "privacidad digital"],
  },
  "encrypted-phones-distributors": {
    route: "/encrypted-phones-distributors",
    localizedPath: {
      es: "/es/celulares-encriptados-distribuidores",
      en: "/en/encrypted-phones-distributors",
      fr: "/fr/distributeurs-telephones-cryptees",
      it: "/it/distributori-telefoni-crittografati",
      pt: "/pt/distribuidores-de-telefones-encriptados",
    },
    title: {
      es: "Distribuidores de celulares encriptados",
      en: "Encrypted phone distributors",
      fr: "Distributeurs de telephones cryptes",
      it: "Distributori di telefoni crittografati",
      pt: "Distribuidores de telefones criptografados",
    },
    description: {
      es: "Informacion para distribuidores de celulares encriptados, SIMs y soluciones de comunicacion segura.",
      en: "Information for distributors of encrypted phones, SIMs and secure communication solutions.",
      fr: "Informations pour distributeurs de telephones cryptes, SIM et solutions de communication securisee.",
      it: "Informazioni per distributori di telefoni crittografati, SIM e soluzioni di comunicazione sicura.",
      pt: "Informacoes para distribuidores de telefones criptografados, SIMs e solucoes de comunicacao segura.",
    },
    keywords: ["distribuidores celulares encriptados", "celulares cifrados", "Encriptados"],
  },
};

export function getLocalizedStaticPath(pageKey: string, locale: string): string {
  const definition = SEO_STATIC_PAGE_DEFINITIONS[pageKey];
  const safeLocale = SEO_LOCALES.includes(locale as SeoLocale) ? (locale as SeoLocale) : "es";
  return definition?.localizedPath[safeLocale] ?? `/${safeLocale}/${pageKey}`;
}

export function getStaticPageLanguageAlternates(pageKey: string): Record<string, string> {
  const definition = SEO_STATIC_PAGE_DEFINITIONS[pageKey];
  if (!definition) return {};

  return SEO_LOCALES.reduce<Record<string, string>>((acc, locale) => {
    acc[locale] = definition.localizedPath[locale];
    return acc;
  }, { "x-default": definition.localizedPath.es });
}

export function buildStaticPageMetadata(pageKey: string, locale: string): Metadata {
  const definition = SEO_STATIC_PAGE_DEFINITIONS[pageKey];
  const safeLocale = SEO_LOCALES.includes(locale as SeoLocale) ? (locale as SeoLocale) : "es";

  if (!definition) {
    return buildSeoMetadata({
      title: "Encriptados",
      canonicalPath: `/${safeLocale}/${pageKey}`,
      locale: safeLocale,
    });
  }

  return buildSeoMetadata({
    title: definition.title[safeLocale],
    description: definition.description[safeLocale],
    canonicalPath: definition.localizedPath[safeLocale],
    locale: safeLocale,
    languages: getStaticPageLanguageAlternates(pageKey),
    keywords: definition.keywords,
    image: definition.image ? { url: definition.image, alt: definition.title[safeLocale] } : undefined,
  });
}

export function getStaticPageSitemapPaths(): string[] {
  return Object.values(SEO_STATIC_PAGE_DEFINITIONS).flatMap((definition) =>
    SEO_LOCALES.map((locale) => definition.localizedPath[locale]),
  );
}