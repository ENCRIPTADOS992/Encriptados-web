export const SEO_SITE_NAME = "Encriptados";
export const SEO_DEFAULT_LOCALE = "es";
export const SEO_LOCALES = ["es", "en", "fr", "it", "pt"] as const;
export type SeoLocale = (typeof SEO_LOCALES)[number];

export const SEO_DEFAULT_TITLE = "Encriptados | Celulares, SIMs y apps encriptadas";
export const SEO_TITLE_TEMPLATE = "%s | Encriptados";
export const SEO_DEFAULT_DESCRIPTION =
  "Compra celulares encriptados, SIMs anonimas, eSIMs, routers y aplicaciones de comunicacion segura en Encriptados.";
export const SEO_DEFAULT_KEYWORDS = [
  "celulares encriptados",
  "SIM anonima",
  "eSIM encriptada",
  "apps encriptadas",
  "comunicacion segura",
  "privacidad digital",
];

export const SEO_DEFAULT_IMAGE = {
  url: "/images/our-products/two-cellphones.png",
  width: 1200,
  height: 630,
  alt: "Productos de comunicacion segura de Encriptados",
};

export const SEO_ORGANIZATION = {
  name: SEO_SITE_NAME,
  legalName: "SAFESOLF INTERNACIONAL S.A.S.",
  email: "contacto@encriptados.io",
  sameAs: [
    "https://www.youtube.com/@encriptados_io",
    "https://www.instagram.com/encriptados.io/",
    "https://www.facebook.com/encriptados.io/",
    "https://www.linkedin.com/company/encriptados/",
  ],
};

export const SEO_PUBLIC_STATIC_PATHS = [
  "/",
  "/en",
  "/fr",
  "/it",
  "/pt",
  "/es/apps/securecrypt",
  "/es/apps/silent-phone",
  "/es/apps/threema",
  "/es/apps/armadillo-chat",
  "/es/sim/sim-encriptada",
  "/es/sim/esim-encriptada",
  "/es/sim/tim-sim",
  "/es/router",
  "/es/offers",
  "/es/about-us",
  "/es/blog",
] as const;