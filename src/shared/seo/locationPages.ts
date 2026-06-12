import type { SeoLocale } from "./constants";

export type LocationProductType = "app" | "sim" | "phone" | "generic";

export type LocationPageModel = {
  locale: SeoLocale;
  slugSegments: string[];
  legacyPath: string;
  legacySlug: string;
  locationSlug: string;
  locationName: string;
  productType: LocationProductType;
  productName: string;
  productDescription: string;
  productPath: string;
  productImage: string;
  canonicalPath: string;
  indexable: boolean;
};

type LocationPattern = {
  legacyPrefix: string;
  productType: LocationProductType;
  productName: string;
  productDescription: string;
  productSlug?: string;
  productPathByLocale?: Partial<Record<SeoLocale, string>>;
  productImage: string;
};

const LOCALES = new Set<SeoLocale>(["es", "en", "fr", "it", "pt"]);
const HOME_PATHS: Record<SeoLocale, string> = {
  es: "/",
  en: "/en",
  fr: "/fr",
  it: "/it",
  pt: "/pt",
};

const APP_PATTERNS: LocationPattern[] = [
  {
    legacyPrefix: "securecrypt-app",
    productType: "app",
    productName: "SecureCrypt",
    productDescription: "secure communication software for teams and private users",
    productSlug: "securecrypt",
    productImage: "/images/apps/secureCrypt/banner.png",
  },
  {
    legacyPrefix: "silent-circle-app",
    productType: "app",
    productName: "Silent Phone",
    productDescription: "private encrypted calls and secure messaging",
    productSlug: "silent-phone",
    productImage: "/images/apps/silent-circle/banner.png",
  },
  {
    legacyPrefix: "armadillo-chat-app",
    productType: "app",
    productName: "Armadillo Chat",
    productDescription: "encrypted messaging for private conversations",
    productSlug: "armadillo-chat",
    productImage: "/images/apps/armadillo/banner.png",
  },
  {
    legacyPrefix: "vaultchat-app",
    productType: "app",
    productName: "VaultChat",
    productDescription: "protected chat for confidential communication",
    productSlug: "vaultchat",
    productImage: "/images/apps/vault-chat/banner.png",
  },
  {
    legacyPrefix: "salt-app",
    productType: "app",
    productName: "Salt App",
    productDescription: "encrypted communication for organizations",
    productSlug: "salt-app",
    productImage: "/images/apps/salt/banner.png",
  },
  {
    legacyPrefix: "vnclagoon-app",
    productType: "app",
    productName: "VNC Lagoon",
    productDescription: "secure collaboration and encrypted messaging",
    productSlug: "vnc-lagoon",
    productImage: "/images/apps/vnc-lagoon/banner.png",
  },
  {
    legacyPrefix: "threema-work-app",
    productType: "app",
    productName: "Threema Work",
    productDescription: "secure business messaging for organizations",
    productSlug: "threema-work",
    productImage: "/images/apps/threema-work/banner.png",
  },
  {
    legacyPrefix: "threema-app",
    productType: "app",
    productName: "Threema",
    productDescription: "private messaging with end-to-end encryption",
    productSlug: "threema",
    productImage: "/images/apps/threema/banner.png",
  },
  {
    legacyPrefix: "nordvpn-app",
    productType: "app",
    productName: "NordVPN",
    productDescription: "VPN privacy protection for browsing and travel",
    productSlug: "nord-vpn",
    productImage: "/images/apps/nord-vpn/banner.png",
  },
];

const SIM_PATTERNS: LocationPattern[] = [
  {
    legacyPrefix: "encrypted-sim-card",
    productType: "sim",
    productName: "Encrypted SIM Card",
    productDescription: "anonymous SIM and eSIM options for private mobile connectivity",
    productSlug: "sim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card.webp",
  },
  {
    legacyPrefix: "encrypted-esim",
    productType: "sim",
    productName: "Encrypted eSIM",
    productDescription: "digital eSIM service for private mobile connectivity",
    productSlug: "esim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card_eSIM.webp",
  },
  {
    legacyPrefix: "international-prepaid-card",
    productType: "sim",
    productName: "International Prepaid Card",
    productDescription: "international prepaid mobile connectivity for travel and private communications",
    productSlug: "sim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card.webp",
  },
  {
    legacyPrefix: "international-chip",
    productType: "sim",
    productName: "International Chip",
    productDescription: "international SIM options for private mobile connectivity",
    productSlug: "sim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card.webp",
  },
  {
    legacyPrefix: "sim-encriptada",
    productType: "sim",
    productName: "SIM Encriptada",
    productDescription: "SIM y eSIM anonimas para comunicacion movil privada",
    productSlug: "sim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card.webp",
  },
  {
    legacyPrefix: "sim-cifrada",
    productType: "sim",
    productName: "SIM Cifrada",
    productDescription: "SIM cifrada para comunicacion movil privada",
    productSlug: "sim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card.webp",
  },
  {
    legacyPrefix: "sim-internacional-encriptada",
    productType: "sim",
    productName: "SIM Internacional Encriptada",
    productDescription: "SIM internacional para viajes y comunicacion segura",
    productSlug: "sim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card.webp",
  },
  {
    legacyPrefix: "chip-internacional-encriptado",
    productType: "sim",
    productName: "Chip Internacional Encriptado",
    productDescription: "chip internacional para conectividad privada",
    productSlug: "sim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card.webp",
  },
  {
    legacyPrefix: "tarjeta-prepago-movil-encriptada",
    productType: "sim",
    productName: "Tarjeta Prepago Movil Encriptada",
    productDescription: "tarjeta prepago movil para conectividad privada",
    productSlug: "sim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card.webp",
  },
  {
    legacyPrefix: "tarjeta-prepago-movil",
    productType: "sim",
    productName: "Tarjeta Prepago Movil",
    productDescription: "tarjeta prepago movil para uso internacional",
    productSlug: "sim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card.webp",
  },
  {
    legacyPrefix: "carte-sim-internationale",
    productType: "sim",
    productName: "Carte SIM Internationale",
    productDescription: "carte SIM internationale pour connectivite mobile privee",
    productSlug: "sim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card.webp",
  },
  {
    legacyPrefix: "carte-sim-cryptee",
    productType: "sim",
    productName: "Carte SIM Cryptee",
    productDescription: "carte SIM cryptee pour communications mobiles privees",
    productSlug: "sim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card.webp",
  },
  {
    legacyPrefix: "carte-prepayee-mobile",
    productType: "sim",
    productName: "Carte Prepayee Mobile",
    productDescription: "carte prepayee mobile pour connectivite internationale",
    productSlug: "sim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card.webp",
  },
  {
    legacyPrefix: "carte-prepayee-internationale",
    productType: "sim",
    productName: "Carte Prepayee Internationale",
    productDescription: "carte prepayee internationale pour connectivite mobile",
    productSlug: "sim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card.webp",
  },
  {
    legacyPrefix: "sim-internationale",
    productType: "sim",
    productName: "SIM Internationale",
    productDescription: "SIM internationale pour connectivite mobile privee",
    productSlug: "sim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card.webp",
  },
];

const PHONE_PATTERNS: LocationPattern[] = [
  {
    legacyPrefix: "cryptcom",
    productType: "phone",
    productName: "Cryptcom",
    productDescription: "encrypted phone and secure communication solution",
    productSlug: "cryptcom",
    productImage: "/images/apps/cryptcom/banner.png",
  },
  {
    legacyPrefix: "securecrypt",
    productType: "phone",
    productName: "SecureCrypt",
    productDescription: "secure communication software and encrypted phone solution",
    productSlug: "securecrypt",
    productImage: "/images/apps/secureCrypt/banner.png",
  },
  {
    legacyPrefix: "chatmail",
    productType: "phone",
    productName: "ChatMail",
    productDescription: "secure messaging and encrypted communication solution",
    productSlug: "chatmail",
    productImage: "/images/apps/chat-mail/banner.png",
  },
  {
    legacyPrefix: "vaultchat",
    productType: "phone",
    productName: "VaultChat",
    productDescription: "protected chat for confidential communication",
    productSlug: "vaultchat",
    productImage: "/images/apps/vault-chat/banner.png",
  },
  {
    legacyPrefix: "armadillo-phone",
    productType: "phone",
    productName: "Armadillo Phone",
    productDescription: "encrypted phone solution for private mobile communication",
    productSlug: "armadillo",
    productImage: "/images/apps/armadillo/banner.png",
  },
  {
    legacyPrefix: "intact-phone",
    productType: "phone",
    productName: "Intact Phone",
    productDescription: "secure phone solution for private communication",
    productSlug: "intact-phone",
    productImage: "/images/apps/intact-phone/banner.png",
  },
  {
    legacyPrefix: "dec-secure",
    productType: "phone",
    productName: "DEC Secure",
    productDescription: "secure phone and encrypted communication solution",
    productSlug: "dec-secure",
    productImage: "/images/apps/dec-secure/banner.png",
  },
  {
    legacyPrefix: "t2-communicator",
    productType: "phone",
    productName: "T2 Communicator",
    productDescription: "secure communicator for encrypted mobile workflows",
    productPathByLocale: HOME_PATHS,
    productImage: "/images/our-products/two-cellphones.png",
  },
  {
    legacyPrefix: "totalsec",
    productType: "phone",
    productName: "TotalSec",
    productDescription: "encrypted phone solution for secure mobile communication",
    productPathByLocale: HOME_PATHS,
    productImage: "/images/our-products/two-cellphones.png",
  },
  {
    legacyPrefix: "ultrax",
    productType: "phone",
    productName: "Ultra X",
    productDescription: "secure mobile communication product",
    productSlug: "ultra-x",
    productImage: "/images/apps/ultrax/banner.png",
  },
  {
    legacyPrefix: "ghost-chat",
    productType: "phone",
    productName: "Ghost Chat",
    productDescription: "secure messaging product for private communication",
    productPathByLocale: HOME_PATHS,
    productImage: "/images/our-products/two-cellphones.png",
  },
  {
    legacyPrefix: "tribu-phone",
    productType: "phone",
    productName: "Tribu Phone",
    productDescription: "encrypted phone product for private mobile communication",
    productPathByLocale: HOME_PATHS,
    productImage: "/images/our-products/two-cellphones.png",
  },
  {
    legacyPrefix: "encrypted-phone",
    productType: "phone",
    productName: "Encrypted Phones",
    productDescription: "secure mobile devices prepared for private communication",
    productPathByLocale: {
      es: "/es/encrypted-phones-distributors",
      en: "/en/encrypted-phones-distributors",
      fr: "/fr/encrypted-phones-distributors",
      it: "/it/encrypted-phones-distributors",
      pt: "/pt/encrypted-phones-distributors",
    },
    productImage: "/images/our-products/two-cellphones.png",
  },
  {
    legacyPrefix: "encrypted-cell-phone",
    productType: "phone",
    productName: "Encrypted Phones",
    productDescription: "secure mobile devices prepared for private communication",
    productPathByLocale: {
      es: "/es/encrypted-phones-distributors",
      en: "/en/encrypted-phones-distributors",
      fr: "/fr/encrypted-phones-distributors",
      it: "/it/encrypted-phones-distributors",
      pt: "/pt/encrypted-phones-distributors",
    },
    productImage: "/images/our-products/two-cellphones.png",
  },
];

export { APP_PATTERNS, SIM_PATTERNS, PHONE_PATTERNS };

const LOCATION_PATTERNS = [...APP_PATTERNS, ...SIM_PATTERNS, ...PHONE_PATTERNS].sort(
  (first, second) => second.legacyPrefix.length - first.legacyPrefix.length,
);

// Default cities for location sitemap generation.
// Edit this list to add/remove cities. Each city generates URLs like:
// /location/{prefix}-{city} and /location/{locale}/{prefix}-{city}
export const LOCATION_CITIES = [
  "miami", "new-york", "los-angeles", "london", "paris", "berlin", "madrid", "barcelona",
  "rome", "milan", "lisbon", "sao-paulo", "buenos-aires", "mexico-city", "bogota",
  "lima", "santiago", "caracas", "panama-city", "san-jose", "guatemala-city",
  "dubai", "singapore", "hong-kong", "tokyo", "sydney", "toronto", "vancouver",
  "chicago", "houston", "dallas", "san-francisco", "las-vegas", "boston", "seattle",
  "atlanta", "denver", "phoenix", "philadelphia", "detroit", "minneapolis",
  "amsterdam", "brussels", "vienna", "zurich", "prague", "warsaw", "budapest",
  "stockholm", "oslo", "copenhagen", "helsinki", "dublin", "edinburgh",
  "istanbul", "moscow", "cairo", "johannesburg", "nairobi", "lagos",
  "mumbai", "delhi", "bangalore", "chennai", "kolkata", "hyderabad",
  "bangkok", "jakarta", "kuala-lumpur", "manila", "ho-chi-minh-city",
  "seoul", "taipei", "shanghai", "beijing", "guangzhou", "shenzhen",
  "melbourne", "brisbane", "perth", "auckland", "wellington",
  "montreal", "calgary", "ottawa", "edmonton", "winnipeg",
  "tijuana", "monterrey", "guadalajara", "puebla", "leon",
  "medellin", "cali", "barranquilla", "cartagena", "cucuta",
  "guayaquil", "quito", "cuenca", "la-paz", "santa-cruz",
  "asuncion", "montevideo", "rosario", "cordoba", "mendoza",
];

export const INDEXABLE_LOCATION_PATHS = new Set<string>([
  // Add Search Console validated URLs here when a location page deserves indexing.
]);

export function getIndexableLocationPaths(): string[] {
  return Array.from(INDEXABLE_LOCATION_PATHS);
}

function titleCaseFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function normalizeSegments(segments: string[]): string[] {
  return segments.map((segment) => decodeURIComponent(segment).trim().toLowerCase()).filter(Boolean);
}

function getLocaleAndSlug(segments: string[]): { locale: SeoLocale; legacySlug: string } | null {
  const cleanSegments = normalizeSegments(segments);
  if (!cleanSegments.length) return null;

  const firstSegment = cleanSegments[0];
  if (LOCALES.has(firstSegment as SeoLocale)) {
    const legacySlug = cleanSegments.slice(1).join("/");
    return legacySlug ? { locale: firstSegment as SeoLocale, legacySlug } : null;
  }

  return { locale: "en", legacySlug: cleanSegments.join("/") };
}

function resolveProductPath(pattern: LocationPattern, locale: SeoLocale): string {
  if (pattern.productPathByLocale?.[locale]) return pattern.productPathByLocale[locale] as string;
  if (pattern.productType === "sim") return `/${locale}/sim/${pattern.productSlug}`;
  if (pattern.productSlug) return `/${locale}/apps/${pattern.productSlug}`;
  return locale === "es" ? "/" : `/${locale}`;
}

function buildHomePath(locale: SeoLocale): string {
  return HOME_PATHS[locale];
}

export function parseLocationPage(segments: string[]): LocationPageModel | null {
  const parsed = getLocaleAndSlug(segments);
  if (!parsed) return null;

  const match = LOCATION_PATTERNS.find((pattern) =>
    parsed.legacySlug === pattern.legacyPrefix || parsed.legacySlug.startsWith(`${pattern.legacyPrefix}-`),
  );

  const fallbackSlugSegments = parsed.locale === "en" ? [parsed.legacySlug] : [parsed.locale, parsed.legacySlug];
  const fallbackLegacyPath = `/location/${fallbackSlugSegments.join("/")}`;

  if (!match) {
    const fallbackPath = buildHomePath(parsed.locale);

    return {
      locale: parsed.locale,
      slugSegments: fallbackSlugSegments,
      legacyPath: fallbackLegacyPath,
      legacySlug: parsed.legacySlug,
      locationSlug: parsed.legacySlug,
      locationName: titleCaseFromSlug(parsed.legacySlug),
      productType: "generic",
      productName: "Secure Communication Products",
      productDescription: "encrypted apps, SIMs and secure mobile solutions from Encriptados",
      productPath: fallbackPath,
      productImage: "/images/our-products/two-cellphones.png",
      canonicalPath: fallbackPath,
      indexable: false,
    };
  }

  const locationSlug = parsed.legacySlug === match.legacyPrefix
    ? "global"
    : parsed.legacySlug.slice(match.legacyPrefix.length + 1);
  const slugSegments = parsed.locale === "en" ? [parsed.legacySlug] : [parsed.locale, parsed.legacySlug];
  const legacyPath = `/location/${slugSegments.join("/")}`;
  const indexable = true;
  const productPath = resolveProductPath(match, parsed.locale);

  return {
    locale: parsed.locale,
    slugSegments,
    legacyPath,
    legacySlug: parsed.legacySlug,
    locationSlug,
    locationName: titleCaseFromSlug(locationSlug),
    productType: match.productType,
    productName: match.productName,
    productDescription: match.productDescription,
    productPath,
    productImage: match.productImage,
    canonicalPath: indexable ? legacyPath : productPath,
    indexable,
  };
}

export function buildLocationTitle(model: LocationPageModel): string {
  const titleByLocale: Record<SeoLocale, string> = {
    en: model.productType === "generic"
      ? `Secure communication products for ${model.locationName}`
      : `${model.productName}${model.productType === "app" ? " App" : ""} in ${model.locationName}`,
    es: model.productType === "generic"
      ? `Productos de comunicacion segura para ${model.locationName}`
      : `${model.productName}${model.productType === "app" ? " App" : ""} en ${model.locationName}`,
    fr: model.productType === "generic"
      ? `Produits de communication securisee pour ${model.locationName}`
      : `${model.productName}${model.productType === "app" ? " App" : ""} a ${model.locationName}`,
    it: model.productType === "generic"
      ? `Prodotti di comunicazione sicura per ${model.locationName}`
      : `${model.productName}${model.productType === "app" ? " App" : ""} a ${model.locationName}`,
    pt: model.productType === "generic"
      ? `Produtos de comunicacao segura para ${model.locationName}`
      : `${model.productName}${model.productType === "app" ? " App" : ""} em ${model.locationName}`,
  };

  return titleByLocale[model.locale] ?? titleByLocale.en;
}

export function buildLocationDescription(model: LocationPageModel): string {
  const descriptionByLocale: Record<SeoLocale, string> = {
    en: `Explore ${model.productName} for ${model.locationName}: ${model.productDescription}. Find secure communication products from Encriptados.`,
    es: `Explora ${model.productName} para ${model.locationName}. Encuentra productos de comunicacion segura, privacidad movil y soporte especializado de Encriptados.`,
    fr: `Explorez ${model.productName} pour ${model.locationName}. Retrouvez des produits de communication securisee, de confidentialite mobile et le support specialise d'Encriptados.`,
    it: `Esplora ${model.productName} per ${model.locationName}. Trova prodotti di comunicazione sicura, privacy mobile e supporto specializzato di Encriptados.`,
    pt: `Explore ${model.productName} para ${model.locationName}. Encontre produtos de comunicacao segura, privacidade movel e suporte especializado da Encriptados.`,
  };

  return descriptionByLocale[model.locale] ?? descriptionByLocale.en;
}

export function buildLocationProductDescription(model: LocationPageModel): string {
  const descriptionByLocale: Record<SeoLocale, string> = {
    en: model.productDescription,
    es: model.productType === "generic"
      ? "catalogo de aplicaciones encriptadas, SIMs y soluciones moviles seguras de Encriptados"
      : "solucion de comunicacion segura para privacidad, movilidad y soporte especializado",
    fr: model.productType === "generic"
      ? "catalogue d'applications chiffrees, de SIM et de solutions mobiles securisees d'Encriptados"
      : "solution de communication securisee pour confidentialite, mobilite et support specialise",
    it: model.productType === "generic"
      ? "catalogo di app crittografate, SIM e soluzioni mobili sicure di Encriptados"
      : "soluzione di comunicazione sicura per privacy, mobilita e supporto specializzato",
    pt: model.productType === "generic"
      ? "catalogo de aplicativos criptografados, SIMs e solucoes moveis seguras da Encriptados"
      : "solucao de comunicacao segura para privacidade, mobilidade e suporte especializado",
  };

  return descriptionByLocale[model.locale] ?? descriptionByLocale.en;
}