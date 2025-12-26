/**
 * Configuración estática de productos de Apps
 * 
 * Este archivo contiene SOLO los datos que NO vienen de la API:
 * - Rutas de imágenes locales (banners hero, iconos)
 * - URLs de video
 * - URLs de tiendas de apps
 * - IDs de productos relacionados (SIMs)
 */

export type TemplateType = "app" | "software";

export interface ProductStaticConfig {
  slug: string;
  productId: number;
  templateType: TemplateType;
  heroBanners: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
  productImage: string;
  iconUrl: string;
  benefitIcon: string;
  videoUrl?: string;
  videoTitle?: string;
  benefitsTitle?: string;
  appStoreUrl?: string;
  googlePlayUrl?: string;
  relatedProducts: {
    simProductId: string;
    esimProductId: string;
  };
}

/**
 * Configuraciones de todos los productos de Apps
 * 
 * Productos en BD (8): silent-circle, vault-chat, armadillo, threema,
 *                      threema-work, vnc-lagoon, salt, nord-vpn
 * 
 * Productos sin BD (11): chat-mail, cryptcom, dec-secure, elyon, intact-phone,
 *                        renati, secure-mdm-android, secure-mdm-iphone,
 *                        secureCrypt, t2-communicator, ultrax
 */
export const productConfigs: Record<string, ProductStaticConfig> = {
  // ============================================
  // PRODUCTOS CON DATOS EN BD (8 productos)
  // ============================================
  
  "silent-circle": {
    slug: "silent-circle",
    productId: 122,
    templateType: "app",
    heroBanners: {
      desktop: "/images/apps/silent-circle/hero-desktop.png",
      tablet: "/images/apps/silent-circle/hero-tablet.png",
      mobile: "/images/apps/silent-circle/hero-mobile.jpg",
    },
    productImage: "/images/apps/silent-circle/banner.png",
    iconUrl: "/images/apps/silent-circle/logo.png",
    benefitIcon: "/images/apps/silent-circle/icono.png",
    videoUrl: "https://www.youtube.com/embed/X9iE-f8briY",
    videoTitle: "Silent Phone, la aplicación cifrada que protegerá todos tus chats",
    benefitsTitle: "Te mantenemos conectado de forma segura y privada",
    appStoreUrl: "https://apps.apple.com/app/silent-phone",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.silentcircle.silentphone",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },
  
  "vault-chat": {
    slug: "vault-chat",
    productId: 127,
    templateType: "app",
    heroBanners: {
      desktop: "/images/apps/vault-chat/hero-desktop.png",
      tablet: "/images/apps/vault-chat/hero-tablet.png",
      mobile: "/images/apps/vault-chat/hero-mobile.jpg",
    },
    productImage: "/images/apps/vault-chat/banner.png",
    iconUrl: "/images/apps/vault-chat/logo.png",
    benefitIcon: "/images/apps/vault-chat/icono.png",
    videoUrl: "https://www.youtube.com/embed/vault-chat-video",
    videoTitle: "VaultChat, comunicación empresarial segura",
    benefitsTitle: "Seguridad empresarial de nivel militar",
    appStoreUrl: "https://apps.apple.com/app/vaultchat",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.vaultchat",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  "vault-chat-v2": {
    slug: "vault-chat-v2",
    productId: 127,
    templateType: "app",
    heroBanners: {
      desktop: "/images/apps/vault-chat-v2/hero-desktop.png",
      tablet: "/images/apps/vault-chat-v2/hero-tablet.png",
      mobile: "/images/apps/vault-chat-v2/hero-mobile.jpg",
    },
    productImage: "/images/apps/vault-chat-v2/banner.png",
    iconUrl: "/images/apps/vault-chat-v2/logo.png",
    benefitIcon: "/images/apps/vault-chat-v2/icono.png",
    videoUrl: "https://www.youtube.com/embed/vault-chat-video",
    videoTitle: "VaultChat V2, la evolución en comunicación segura",
    benefitsTitle: "Nueva generación de seguridad empresarial",
    appStoreUrl: "https://apps.apple.com/app/vaultchat",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.vaultchat",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },
  
  "armadillo": {
    slug: "armadillo",
    productId: 177,
    templateType: "app",
    heroBanners: {
      desktop: "/images/apps/armadillo/hero-desktop.png",
      tablet: "/images/apps/armadillo/hero-tablet.png",
      mobile: "/images/apps/armadillo/hero-mobile.jpg",
    },
    productImage: "/images/apps/armadillo/banner.png",
    iconUrl: "/images/apps/armadillo/logo.png",
    benefitIcon: "/images/apps/armadillo/icono.png",
    videoUrl: "https://www.youtube.com/embed/armadillo-video",
    videoTitle: "Armadillo Chat, privacidad total en tus comunicaciones",
    benefitsTitle: "Protección blindada para tus conversaciones",
    appStoreUrl: "https://apps.apple.com/app/armadillo-chat",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.armadillo",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  "armadillo-v2": {
    slug: "armadillo-v2",
    productId: 177,
    templateType: "app",
    heroBanners: {
      desktop: "/images/apps/armadillo-v2/hero-desktop.png",
      tablet: "/images/apps/armadillo-v2/hero-tablet.png",
      mobile: "/images/apps/armadillo-v2/hero-mobile.jpg",
    },
    productImage: "/images/apps/armadillo-v2/banner.png",
    iconUrl: "/images/apps/armadillo-v2/logo.png",
    benefitIcon: "/images/apps/armadillo-v2/icono.png",
    videoUrl: "https://www.youtube.com/embed/armadillo-video",
    videoTitle: "Armadillo V2, la nueva generación de privacidad",
    benefitsTitle: "Protección blindada evolucionada",
    appStoreUrl: "https://apps.apple.com/app/armadillo-chat",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.armadillo",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },
  
  "threema": {
    slug: "threema",
    productId: 136,
    templateType: "app",
    heroBanners: {
      desktop: "/images/apps/threema/hero-desktop.png",
      tablet: "/images/apps/threema/hero-tablet.png",
      mobile: "/images/apps/threema/hero-mobile.jpg",
    },
    productImage: "/images/apps/threema/banner.png",
    iconUrl: "/images/apps/threema/logo.png",
    benefitIcon: "/images/apps/threema/icono.png",
    videoUrl: "https://www.youtube.com/embed/threema-video",
    videoTitle: "Threema, mensajería suiza de máxima privacidad",
    benefitsTitle: "Privacidad suiza para tus mensajes",
    appStoreUrl: "https://apps.apple.com/app/threema",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=ch.threema.app",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },
  
  "threema-work": {
    slug: "threema-work",
    productId: 135,
    templateType: "app",
    heroBanners: {
      desktop: "/images/apps/threema-work/hero-desktop.png",
      tablet: "/images/apps/threema-work/hero-tablet.png",
      mobile: "/images/apps/threema-work/hero-mobile.jpg",
    },
    productImage: "/images/apps/threema-work/banner.png",
    iconUrl: "/images/apps/threema-work/logo.png",
    benefitIcon: "/images/apps/threema-work/icono.png",
    videoUrl: "https://www.youtube.com/embed/threema-work-video",
    videoTitle: "Threema Work, comunicación empresarial segura",
    benefitsTitle: "Seguridad empresarial de nivel suizo",
    appStoreUrl: "https://apps.apple.com/app/threema-work",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=ch.threema.app.work",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },
  
  "vnc-lagoon": {
    slug: "vnc-lagoon",
    productId: 134,
    templateType: "app",
    heroBanners: {
      desktop: "/images/apps/vnc-lagoon/hero-desktop.png",
      tablet: "/images/apps/vnc-lagoon/hero-tablet.png",
      mobile: "/images/apps/vnc-lagoon/hero-mobile.jpg",
    },
    productImage: "/images/apps/vnc-lagoon/banner.png",
    iconUrl: "/images/apps/vnc-lagoon/logo.png",
    benefitIcon: "/images/apps/vnc-lagoon/icono.png",
    videoUrl: "https://www.youtube.com/embed/vnc-lagoon-video",
    videoTitle: "VNC Lagoon, suite de comunicación segura",
    benefitsTitle: "Comunicación unificada y segura",
    appStoreUrl: "https://apps.apple.com/app/vnc-lagoon",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.vnc.lagoon",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },
  
  "salt": {
    slug: "salt",
    productId: 133,
    templateType: "app",
    heroBanners: {
      desktop: "/images/apps/salt/hero-desktop.png",
      tablet: "/images/apps/salt/hero-tablet.png",
      mobile: "/images/apps/salt/hero-mobile.jpg",
    },
    productImage: "/images/apps/salt/banner.png",
    iconUrl: "/images/apps/salt/logo.png",
    benefitIcon: "/images/apps/salt/icono.png",
    videoUrl: "https://www.youtube.com/embed/salt-video",
    videoTitle: "Salt, comunicación empresarial cifrada",
    benefitsTitle: "Cifrado de grado militar para empresas",
    appStoreUrl: "https://apps.apple.com/app/salt-communications",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.salt",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },
  
  "nord-vpn": {
    slug: "nord-vpn",
    productId: 137,
    templateType: "app",
    heroBanners: {
      desktop: "/images/apps/nord-vpn/hero-desktop.png",
      tablet: "/images/apps/nord-vpn/hero-tablet.png",
      mobile: "/images/apps/nord-vpn/hero-mobile.jpg",
    },
    productImage: "/images/apps/nord-vpn/banner.png",
    iconUrl: "/images/apps/nord-vpn/logo.png",
    benefitIcon: "/images/apps/nord-vpn/icono.png",
    videoUrl: "https://www.youtube.com/embed/nord-vpn-video",
    videoTitle: "NordVPN, protege tu conexión en cualquier lugar",
    benefitsTitle: "Tu privacidad en internet garantizada",
    appStoreUrl: "https://apps.apple.com/app/nordvpn",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.nordvpn.android",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  // ============================================
  // PRODUCTOS SIN DATOS EN BD (11 productos)
  // ============================================

  "chat-mail": {
    slug: "chat-mail",
    productId: 0,
    templateType: "software",
    heroBanners: {
      desktop: "/images/apps/chat-mail/hero-desktop.png",
      tablet: "/images/apps/chat-mail/hero-tablet.png",
      mobile: "/images/apps/chat-mail/hero-mobile.jpg",
    },
    productImage: "/images/apps/chat-mail/banner.png",
    iconUrl: "/images/apps/chat-mail/logo.png",
    benefitIcon: "/images/apps/chat-mail/icono.png",
    videoUrl: "https://www.youtube.com/embed/chat-mail-video",
    videoTitle: "ChatMail, email seguro y cifrado",
    benefitsTitle: "Comunicación por email 100% privada",
    appStoreUrl: "",
    googlePlayUrl: "",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  "cryptcom": {
    slug: "cryptcom",
    productId: 0,
    templateType: "software",
    heroBanners: {
      desktop: "/images/apps/cryptcom/hero-desktop.png",
      tablet: "/images/apps/cryptcom/hero-tablet.png",
      mobile: "/images/apps/cryptcom/hero-mobile.jpg",
    },
    productImage: "/images/apps/cryptcom/banner.png",
    iconUrl: "/images/apps/cryptcom/logo.png",
    benefitIcon: "/images/apps/cryptcom/icono.png",
    videoUrl: "",
    videoTitle: "CryptCom, comunicación criptográfica avanzada",
    benefitsTitle: "Criptografía de última generación",
    appStoreUrl: "",
    googlePlayUrl: "",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  "dec-secure": {
    slug: "dec-secure",
    productId: 0,
    templateType: "software",
    heroBanners: {
      desktop: "/images/apps/dec-secure/hero-desktop.png",
      tablet: "/images/apps/dec-secure/hero-tablet.png",
      mobile: "/images/apps/dec-secure/hero-mobile.jpg",
    },
    productImage: "/images/apps/dec-secure/banner.png",
    iconUrl: "/images/apps/dec-secure/logo.png",
    benefitIcon: "/images/apps/dec-secure/icono.png",
    videoUrl: "",
    videoTitle: "DEC Secure, seguridad descentralizada",
    benefitsTitle: "Protección descentralizada total",
    appStoreUrl: "",
    googlePlayUrl: "",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  "elyon": {
    slug: "elyon",
    productId: 0,
    templateType: "software",
    heroBanners: {
      desktop: "/images/apps/elyon/hero-desktop.png",
      tablet: "/images/apps/elyon/hero-tablet.png",
      mobile: "/images/apps/elyon/hero-mobile.jpg",
    },
    productImage: "/images/apps/elyon/banner.png",
    iconUrl: "/images/apps/elyon/logo.png",
    benefitIcon: "/images/apps/elyon/icono.png",
    videoUrl: "",
    videoTitle: "Elyon, comunicación segura empresarial",
    benefitsTitle: "Seguridad empresarial de élite",
    appStoreUrl: "",
    googlePlayUrl: "",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  "intact-phone": {
    slug: "intact-phone",
    productId: 0,
    templateType: "software",
    heroBanners: {
      desktop: "/images/apps/intact-phone/hero-desktop.png",
      tablet: "/images/apps/intact-phone/hero-tablet.png",
      mobile: "/images/apps/intact-phone/hero-mobile.jpg",
    },
    productImage: "/images/apps/intact-phone/banner.png",
    iconUrl: "/images/apps/intact-phone/logo.png",
    benefitIcon: "/images/apps/intact-phone/icono.png",
    videoUrl: "",
    videoTitle: "Intact Phone, llamadas 100% seguras",
    benefitsTitle: "Comunicación de voz inviolable",
    appStoreUrl: "",
    googlePlayUrl: "",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  "renati": {
    slug: "renati",
    productId: 0,
    templateType: "software",
    heroBanners: {
      desktop: "/images/apps/renati/hero-desktop.png",
      tablet: "/images/apps/renati/hero-tablet.png",
      mobile: "/images/apps/renati/hero-mobile.jpg",
    },
    productImage: "/images/apps/renati/banner.png",
    iconUrl: "/images/apps/renati/logo.png",
    benefitIcon: "/images/apps/renati/icono.png",
    videoUrl: "",
    videoTitle: "Renati, privacidad renovada",
    benefitsTitle: "Nueva era de privacidad digital",
    appStoreUrl: "",
    googlePlayUrl: "",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  "secure-mdm-android": {
    slug: "secure-mdm-android",
    productId: 0,
    templateType: "software",
    heroBanners: {
      desktop: "/images/apps/secure-mdm-android/hero-desktop.png",
      tablet: "/images/apps/secure-mdm-android/hero-tablet.png",
      mobile: "/images/apps/secure-mdm-android/hero-mobile.jpg",
    },
    productImage: "/images/apps/secure-mdm-android/banner.png",
    iconUrl: "/images/apps/secure-mdm-android/logo.png",
    benefitIcon: "/images/apps/secure-mdm-android/icono.png",
    videoUrl: "",
    videoTitle: "Secure MDM Android, gestión móvil segura",
    benefitsTitle: "Control total de dispositivos Android",
    appStoreUrl: "",
    googlePlayUrl: "",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  "secure-mdm-iphone": {
    slug: "secure-mdm-iphone",
    productId: 0,
    templateType: "software",
    heroBanners: {
      desktop: "/images/apps/secure-mdm-iphone/hero-desktop.png",
      tablet: "/images/apps/secure-mdm-iphone/hero-tablet.png",
      mobile: "/images/apps/secure-mdm-iphone/hero-mobile.jpg",
    },
    productImage: "/images/apps/secure-mdm-iphone/banner.png",
    iconUrl: "/images/apps/secure-mdm-iphone/logo.png",
    benefitIcon: "/images/apps/secure-mdm-iphone/icono.png",
    videoUrl: "",
    videoTitle: "Secure MDM iPhone, gestión iOS segura",
    benefitsTitle: "Control total de dispositivos iOS",
    appStoreUrl: "",
    googlePlayUrl: "",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  "secureCrypt": {
    slug: "secureCrypt",
    productId: 0,
    templateType: "software",
    heroBanners: {
      desktop: "/images/apps/secureCrypt/hero-desktop.png",
      tablet: "/images/apps/secureCrypt/hero-tablet.png",
      mobile: "/images/apps/secureCrypt/hero-mobile.jpg",
    },
    productImage: "/images/apps/secureCrypt/banner.png",
    iconUrl: "/images/apps/secureCrypt/logo.png",
    benefitIcon: "/images/apps/secureCrypt/icono.png",
    videoUrl: "",
    videoTitle: "SecureCrypt, criptografía avanzada",
    benefitsTitle: "Cifrado de nivel gubernamental",
    appStoreUrl: "",
    googlePlayUrl: "",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  "t2-communicator": {
    slug: "t2-communicator",
    productId: 0,
    templateType: "software",
    heroBanners: {
      desktop: "/images/apps/t2-communicator/hero-desktop.png",
      tablet: "/images/apps/t2-communicator/hero-tablet.png",
      mobile: "/images/apps/t2-communicator/hero-mobile.jpg",
    },
    productImage: "/images/apps/t2-communicator/banner.png",
    iconUrl: "/images/apps/t2-communicator/logo.png",
    benefitIcon: "/images/apps/t2-communicator/icono.png",
    videoUrl: "",
    videoTitle: "T2 Communicator, comunicación táctica",
    benefitsTitle: "Comunicación de grado táctico",
    appStoreUrl: "",
    googlePlayUrl: "",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  "ultrax": {
    slug: "ultrax",
    productId: 0,
    templateType: "software",
    heroBanners: {
      desktop: "/images/apps/ultrax/hero-desktop.png",
      tablet: "/images/apps/ultrax/hero-tablet.png",
      mobile: "/images/apps/ultrax/hero-mobile.jpg",
    },
    productImage: "/images/apps/ultrax/banner.png",
    iconUrl: "/images/apps/ultrax/logo.png",
    benefitIcon: "/images/apps/ultrax/icono.png",
    videoUrl: "",
    videoTitle: "UltraX, seguridad ultra avanzada",
    benefitsTitle: "El nivel más alto de protección",
    appStoreUrl: "",
    googlePlayUrl: "",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },
};

export function getProductConfig(slug: string): ProductStaticConfig | null {
  return productConfigs[slug] || null;
}

export function isValidProductSlug(slug: string): boolean {
  return slug in productConfigs;
}

export function getAllProductSlugs(): string[] {
  return Object.keys(productConfigs);
}
