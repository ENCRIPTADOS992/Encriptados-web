import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "fr", "it", "pt"],
  defaultLocale: "es",
  pathnames: {
    "/": "/",

    
    "/deliveries": {
      en: "/deliveries",
      es: "/entregas",
      fr: "/livraisons", 
      it: "/consegne",
      pt: "/entregas",
    },

    "/fast-delivery": {
      en: "/fast-delivery",
      es: "/entrega-rapida",
      fr: "/livraison-rapide",
      it: "/consegna-rapida",
      pt: "/entrega-rapida",
    },

    "/encrypted-phones-distributors": {
      en: "/encrypted-phones-distributors",
      es: "/celulares-encriptados-distribuidores",
      fr: "/distributeurs-telephones-cryptees",
      it: "/distributori-telefoni-crittografati",
      pt: "/distribuidores-de-telefones-encriptados",
    },

    "/ira-sim": {
      en: "/ira-sim",
      es: "/ira-sim",
      fr: "/ira-sim",
      it: "/ira-sim",
      pt: "/ira-sim",
    },

    "/ira-sim/payment-service": {
      en: "/ira-sim/payment-service",
      es: "/ira-sim/servicio-de-pago",
      fr: "/ira-sim/service-de-paiement",
      it: "/ira-sim/servizio-di-pagamento",
      pt: "/ira-sim/servico-de-pagamento",
    },

    "/tim-sim": {
      en: "/tim-sim",
      es: "/tim-sim",
      fr: "/tim-sim",
      it: "/tim-sim",
      pt: "/tim-sim",
    },

    "/tim-sim/payment-service": {
      en: "/tim-sim/payment-service",
      es: "/tim-sim/servicio-de-pago",
      fr: "/tim-sim/service-de-paiement",
      it: "/tim-sim/servizio-di-pagamento",
      pt: "/tim-sim/servico-de-pagamento",
    },

    "/where-to-find-encrypted": {
      en: "/where-to-find-encrypted",
      es: "/donde-encontrar-encriptados",
      fr: "/ou-trouver-cryptees",
      it: "/dove-trovare-crittografati",
      pt: "/onde-encontrar-encriptados",
    },

    "/about-us": {
      en: "/about-us",
      es: "/nosotros",
      fr: "/a-propos-de-nous",
      it: "/chi-siamo",
      pt: "/sobre-nos",
    },

    "/ambassadors": {
      en: "/ambassadors",
      es: "/embajadores",
      fr: "/ambassadeurs",
      it: "/ambasciatori",
      pt: "/embaixadores",
    },

    "/where-to-find-us": {
      en: "/where-to-find-us",
      es: "/donde-encontrarnos",
      fr: "/ou-nous-trouver",
      it: "/dove-trovarci",
      pt: "/onde-nos-encontrar"
    },

    "/news": {
      en: "/news",
      es: "/noticias",
      fr: "/nouvelles",
      it: "/notizie",
      pt: "/noticias",
    },

    "/offers": {
      en: "/offers",
      es: "/ofertas",
      fr: "/offres",
      it: "/offerte",
      pt: "/ofertas",
    },

    "/become-encrypted-partner": {
      en: "/become-encrypted-partner",
      es: "/se-socio-de-encriptados",
      fr: "/devenir-partenaire-crypte",
      it: "/diventa-partner-crittografato",
      pt: "/seja-socio-de-encriptados",
    },

    "/encrypted-sim": {
      en: "/encrypted-sim",
      es: "/sim-encriptada",
      fr: "/sim-cryptee",
      it: "/sim-crittografata",
      pt: "/sim-encriptada",
    },

    "/identity-verification": {
      en: "/identity-verification",
      es: "/verificacion-de-identidad",
      fr: "/verification-didentite",
      it: "/verifica-dellidentita",
      pt: "/verificacao-de-identidade",
    },

    "/dashboard/data-usage": {
      en: "/dashboard/data-usage",
      es: "/dashboard/uso-datos",
      fr: "/dashboard/utilisation-des-donnees",
      it: "/dashboard/uso-dei-datis",
      pt: "/dashboard/uso-de-dados",
    },

    "/dashboard/my-activity": {
      en: "/dashboard/my-activity",
      es: "/dashboard/mi-actividad",
      fr: "/dashboard/mon-activite",
      it: "/dashboard/la-mia-attivita",
      pt: "/dashboard/minha-atividade",
    },

    "/dashboard/store": {
      en: "/dashboard/store",
      es: "/dashboard/tienda",
      fr: "/dashboard/boutique",
      it: "/dashboard/negozio",
      pt: "/dashboard/loja",
    },

    "/dashboard/my-purchases": {
      en: "/dashboard/my-purchases",
      es: "/dashboard/mis-compras",
      fr: "/dashboard/mes-achats",
      it: "/dashboard/i-miei-acquisti",
      pt: "/dashboard/minhas-compras",
    },
    "/dashboard/admin-account": {
      en: "/dashboard/admin-account",
      es: "/dashboard/cuenta-admin",
      fr: "/dashboard/compte-admin",
      it: "/dashboard/account-admin",
      pt: "/dashboard/conta-admin",
    },
    "/dashboard/config-account": {
      en: "/dashboard/config-account",
      es: "/dashboard/configuracion-cuenta",
      fr: "/dashboard/configuration-compte",
      it: "/dashboard/configurazione-account",
      pt: "/dashboard/configuracao-conta",
    },
    "/distributors": {
      en: "/distributors",
      es: "/distribuidores",
      fr: "/distributeurs",
      it: "/distributori",
      pt: "/distribuidores",
    },
    "/encrypted-test": {
      en: "/encrypted-test",
      es: "/prueba-encriptada",
      fr: "/test-chiffré",
      it: "/test-crittografato",
      pt: "/teste-encriptado",
    },
    "/encrypted-test/[typeOfTest]": {
      en: "/encrypted-test/[typeOfTest]",
      es: "/prueba-encriptada/[typeOfTest]",
      fr: "/test-chiffré/[typeOfTest]",
      it: "/test-crittografato/[typeOfTest]",
      pt: "/teste-encriptado/[typeOfTest]",
    },
    "secure-mdm-android": {
      en: "/secure-mdm-android",
      es: "/secure-mdm-android",
      fr: "/secure-mdm-android",
      it: "/secure-mdm-android",
      pt: "/secure-mdm-android"
    },
    "/threema": {
      en: "/threema",
      es: "/threema",
      fr: "/threema",
      it: "/threema",
      pt: "/threema"
    },
    "/elyon": {
      en: "/elyon",
      es: "/elyon",
      fr: "/elyon",
      it: "/elyon",
      pt: "/elyon"
    },
    "/apps/armadillo":{
      en: "/apps/armadillo",
      es: "/apps/armadillo",
      fr: "/apps/armadillo",
      it: "/apps/armadillo",
      pt: "/apps/armadillo"
    },
    "/apps/nord-vpn":{
      en: "/apps/nord-vpn",
      es: "/apps/nord-vpn",
      fr: "/apps/nord-vpn",
      it: "/apps/nord-vpn",
      pt: "/apps/nord-vpn"
    },
    "/apps/salt":{
      en: "/apps/salt",
      es: "/apps/salt",
      fr: "/apps/salt",
      it: "/apps/salt",
      pt: "/apps/salt"
    },
    "/apps/silent-circle":{
      en: "/apps/silent-circle",
      es: "/apps/silent-circle",
      fr: "/apps/silent-circle",
      it: "/apps/silent-circle",
      pt: "/apps/silent-circle"
    },
    "/apps/threema":{
      en: "/apps/threema",
      es: "/apps/threema",
      fr: "/apps/threema",
      it: "/apps/threema",
      pt: "/apps/threema"
    },
    "/apps/threema-work":{
      en: "/apps/threema-work",
      es: "/apps/threema-work",
      fr: "/apps/threema-work",
      it: "/apps/threema-work",
      pt: "/apps/threema-work"
    },
    "/apps/vault-chat":{
      en: "/apps/vault-chat",
      es: "/apps/vault-chat",
      fr: "/apps/vault-chat",
      it: "/apps/vault-chat",
      pt: "/apps/vault-chat"
    },
    "/apps/vnc-lagoon":{
      en: "/apps/vnc-lagoon",
      es: "/apps/vnc-lagoon",
      fr: "/apps/vnc-lagoon",
      it: "/apps/vnc-lagoon",
      pt: "/apps/vnc-lagoon"
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation(routing);
