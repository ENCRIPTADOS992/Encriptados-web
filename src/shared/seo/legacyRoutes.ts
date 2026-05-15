import type { SeoLocale } from "./constants";

export type LegacyRouteResolution =
  | {
      type: "redirect";
      destination: string;
      permanent: boolean;
    }
  | {
      type: "wp-page";
      locale: SeoLocale;
      slug: string;
      legacyPath: string;
    }
  | {
      type: "none";
    };

const LOCALES = new Set<SeoLocale>(["es", "en", "fr", "it", "pt"]);
const RESERVED_TOP_LEVEL = new Set([
  "api",
  "blogs",
  "location",
  "legacy-seo",
  "manifest.webmanifest",
  "robots.txt",
  "sitemap.xml",
  "sitemaps",
]);

const CURRENT_SITE_TOP_LEVEL_ROUTES = new Set([
  "about-us",
  "activar-apps",
  "ambassadors",
  "ambassadeurs",
  "ambasciatori",
  "a-propos-de-nous",
  "become-an-encrypted-partner",
  "become-encrypted-partner",
  "blog",
  "chi-siamo",
  "consegna-rapida",
  "consegne",
  "dashboard",
  "devenir-partenaire-crypte",
  "deliveries",
  "diventa-partner-crittografato",
  "distributors",
  "distributeurs",
  "distributeurs-telephones-cryptees",
  "distributori",
  "distributori-telefoni-crittografati",
  "distribuidores",
  "distribuidores-de-telefones-encriptados",
  "donde-encontrar-encriptados",
  "donde-encontrarnos",
  "dove-trovarci",
  "dove-trovare-crittografati",
  "encrypted-phones-distributors",
  "encrypted-sim",
  "encrypted-test",
  "entrega-rapida",
  "entregas",
  "embajadores",
  "embaixadores",
  "fast-delivery",
  "identity-verification",
  "ira-sim",
  "livraison-rapide",
  "livraisons",
  "login",
  "news",
  "noticias",
  "notizie",
  "nosotros",
  "nouvelles",
  "offers",
  "offerte",
  "offres",
  "ofertas",
  "onde-encontrar-encriptados",
  "onde-nos-encontrar",
  "ou-nous-trouver",
  "ou-trouver-cryptees",
  "our-products",
  "pages",
  "products-test",
  "router",
  "security-test",
  "seja-socio-de-encriptados",
  "se-socio-de-encriptados",
  "sim",
  "sim-crittografata",
  "sim-cryptee",
  "sim-encriptada",
  "sobre-nos",
  "terms-app",
  "test",
  "test-chiffré",
  "test-design-system",
  "test-payment-modal",
  "tim-sim",
  "verifica-dellidentita",
  "verificacion-de-identidad",
  "verificacao-de-identidade",
  "verification-didentite",
  "where-to-find-encrypted",
  "where-to-find-us",
]);

const CURRENT_SITE_ROUTES: Record<string, string> = {
  "entrega-rapida": "/fast-delivery",
  "donde-encontrar-encriptados": "/where-to-find-encrypted",
  "compra-con-atm-de-criptomonedas": "/where-to-find-us",
  "test-de-seguridad": "/encrypted-test",
  "redes-sociales": "/about-us",
  "se-socio-de-encriptados": "/become-an-encrypted-partner",
  ofertas: "/offers",
  nosotros: "/about-us",
  "verificacion-de-identidad-id": "/identity-verification",
  "id-encriptados-verification-didentite": "/identity-verification",
  "celulares-encriptados-distribuidores": "/encrypted-phones-distributors",
  "encrypted-phones-distributors": "/encrypted-phones-distributors",
  "politica-de-tratamiendo-de-datos": "/pages/politica-de-tratamiento-de-datos",
  "politica-de-tratamiento-de-datos": "/pages/politica-de-tratamiento-de-datos",
  "terminos-y-condiciones": "/pages/terminos-y-condiciones",
  "termes-et-conditions": "/pages/terminos-y-condiciones",
  "pagina-iniziale": "",
  "pagina-inicial": "",
};

const PRODUCT_ROUTES: Record<string, string> = {
  "secure-mdm-android": "/apps/secure-mdm-android",
  "secure-mdm-iphone": "/apps/secure-mdm-iphone",
  "securecrypt-app": "/apps/securecrypt",
  securecrypt: "/apps/securecrypt",
  cryptcom: "/apps/cryptcom",
  renati: "/apps/renati",
  chatmail: "/apps/chatmail",
  "chat-mail": "/apps/chatmail",
  ultrax: "/apps/ultrax",
  "ultra-x": "/apps/ultrax",
  "intact-phone": "/apps/intact-phone",
  "dec-secure": "/apps/dec-secure",
  "armadillo-phone": "/apps/armadillo",
  "armadillo-chat": "/apps/armadillo-chat",
  armadillo: "/apps/armadillo",
  "vaultchat-app": "/apps/vaultchat",
  vaultchat: "/apps/vault-chat-v2",
  "vault-chat": "/apps/vaultchat",
  "silent-circle": "/apps/silent-phone",
  "silent-circle-app": "/apps/silent-phone",
  "silent-phone": "/apps/silent-phone",
  threema: "/apps/threema",
  "threema-app": "/apps/threema",
  "threema-work": "/apps/threema-work",
  "salt-app": "/apps/salt-app",
  salt: "/apps/salt-app",
  "vnc-lagoon": "/apps/vnc-lagoon",
  vnclagoon: "/apps/vnc-lagoon",
  nordvpn: "/apps/nord-vpn",
  "nord-vpn": "/apps/nord-vpn",
  "sim-encriptada": "/sim/sim-encriptada",
  "sim-cifrada": "/sim/sim-encriptada",
  "encrypted-sim-card": "/sim/sim-encriptada",
  "encrypted-esim": "/sim/esim-encriptada",
  "esim-encriptada": "/sim/esim-encriptada",
  "tarjeta-prepago-movil": "/sim/sim-encriptada",
  "tarjeta-prepago-movil-encriptada": "/sim/sim-encriptada",
  "international-prepaid-card": "/sim/sim-encriptada",
  "international-chip": "/sim/sim-encriptada",
  "sim-internacional-encriptada": "/sim/sim-encriptada",
  "chip-internacional-encriptado": "/sim/sim-encriptada",
  "carte-sim-internationale": "/sim/sim-encriptada",
  "carte-sim-cryptee": "/sim/sim-encriptada",
  "carte-prepayee-mobile": "/sim/sim-encriptada",
  "carte-prepayee-internationale": "/sim/sim-encriptada",
  "sim-internationale": "/sim/sim-encriptada",
};

const RETIRED_PRODUCT_SLUGS = new Set([
  "elyon",
  "parrot",
  "totalsec",
  "total-sec",
  "t2-communicator",
  "ghost-chat",
  "tribu-phone",
]);

function getHome(locale: SeoLocale): string {
  return locale === "es" ? "/" : `/${locale}`;
}

function localizePath(locale: SeoLocale, path: string): string {
  if (!path) return getHome(locale);
  return `/${locale}${path}`;
}

function normalizePath(pathname: string): string {
  const withoutQuery = pathname.split("?")[0] || "/";
  const cleanPath = withoutQuery.replace(/\/+$/, "") || "/";
  return decodeURIComponent(cleanPath).toLowerCase();
}

function getLocaleAndParts(pathname: string): { locale: SeoLocale; parts: string[] } {
  const parts = normalizePath(pathname).split("/").filter(Boolean);
  const first = parts[0];

  if (LOCALES.has(first as SeoLocale)) {
    return { locale: first as SeoLocale, parts: parts.slice(1) };
  }

  return { locale: "es", parts };
}

function getLegacyContentSlug(parts: string[]): string | null {
  if (!parts.length) return null;
  if (parts.length > 1) return null;
  if (RESERVED_TOP_LEVEL.has(parts[0])) return null;
  return parts[0];
}

function getLegacyProductSlug(parts: string[]): string | null {
  if (!parts.length) return null;
  if (parts[0] === "pages" && parts[1]) return parts[1];
  if (parts.length === 1) return parts[0];
  return null;
}

function isCurrentSiteRoute(parts: string[]): boolean {
  return CURRENT_SITE_TOP_LEVEL_ROUTES.has(parts[0]);
}

export function resolveLegacyRoute(pathname: string): LegacyRouteResolution {
  const normalizedPath = normalizePath(pathname);
  const { locale, parts } = getLocaleAndParts(normalizedPath);

  if (!parts.length || RESERVED_TOP_LEVEL.has(parts[0])) return { type: "none" };
  if (isCurrentSiteRoute(parts)) return { type: "none" };

  const productSlug = getLegacyProductSlug(parts);
  if (productSlug) {
    const siteRoute = CURRENT_SITE_ROUTES[productSlug];
    if (siteRoute !== undefined) {
      return {
        type: "redirect",
        destination: localizePath(locale, siteRoute),
        permanent: true,
      };
    }

    const productRoute = PRODUCT_ROUTES[productSlug];
    if (productRoute) {
      return {
        type: "redirect",
        destination: localizePath(locale, productRoute),
        permanent: true,
      };
    }

    if (RETIRED_PRODUCT_SLUGS.has(productSlug)) {
      return {
        type: "redirect",
        destination: getHome(locale),
        permanent: true,
      };
    }
  }

  const contentSlug = getLegacyContentSlug(parts);
  if (!contentSlug) return { type: "none" };

  return {
    type: "wp-page",
    locale,
    slug: contentSlug,
    legacyPath: normalizedPath.endsWith("/") ? normalizedPath : `${normalizedPath}/`,
  };
}