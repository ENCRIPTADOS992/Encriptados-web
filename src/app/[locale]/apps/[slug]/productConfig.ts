/**
 * Configuración estática de productos
 * 
 * Este archivo contiene SOLO los datos que NO vienen de la API:
 * - Rutas de imágenes locales (banners hero, iconos)
 * - URLs de video
 * - URLs de tiendas de apps
 * - IDs de productos relacionados (SIMs)
 * 
 * CATEGORÍAS DEL API:
 * - 38: Aplicaciones (apps)
 * - 35: Software/Sistemas
 * - 36: Router
 * 
 * PLANTILLA UNIFICADA para Apps, Software y Router
 * Ruta: /apps/[slug]
 */

export type TemplateType = "app" | "software" | "router";

export interface ProductStaticConfig {
  slug: string;
  productId: number;
  categoryId: number; // 38=apps, 35=software, 36=router
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
  appStoreUrl?: string;
  googlePlayUrl?: string;
  apkUrl?: string;
  storeButtons?: {
    appStore?: boolean;
    googlePlay?: boolean;
    apk?: boolean;
  };
  relatedProducts: {
    simProductId: string;
    esimProductId: string;
  };
}

/**
 * ════════════════════════════════════════════════════════════════
 * PRODUCTOS UNIFICADOS
 * ════════════════════════════════════════════════════════════════
 * 
 * APLICACIONES (8): silent-circle, vault-chat, armadillo, threema,
 *                   threema-work, vnc-lagoon, salt, nord-vpn
 * 
 * SISTEMAS (11): secure-mdm-iphone, secure-mdm-android, cryptcom,
 *                renati, chat-mail, armadillo-v2, vault-chat-v2,
 *                ultrax, intact-phone, dec-secure, secureCrypt
 * 
 * ROUTER (1): router-camaleon (usa /router, no /apps/[slug])
 */
export const productConfigs: Record<string, ProductStaticConfig> = {
  // ════════════════════════════════════════════════════════════════
  // APLICACIONES (Categoría 38)
  // ════════════════════════════════════════════════════════════════
  
  "silent-phone": {
    slug: "silent-phone",
    productId: 122,
    categoryId: 38,
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
    appStoreUrl: "https://apps.apple.com/app/silent-phone",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.silentcircle.silentphone",
    apkUrl: "https://encriptados.io/descargas/silent-phone.apk",
    storeButtons: { apk: false },
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  "silent-circle": { // Mantener alias legacy por si acaso
    slug: "silent-phone",
    productId: 122,
    categoryId: 38,
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
    appStoreUrl: "https://apps.apple.com/app/silent-phone",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.silentcircle.silentphone",
    apkUrl: "https://encriptados.io/descargas/silent-phone.apk",
    storeButtons: { apk: false },
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },
  
  "vault-chat": {
    slug: "vault-chat",
    productId: 127,
    categoryId: 38,
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
    appStoreUrl: "https://apps.apple.com/app/vaultchat",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.vaultchat",
    apkUrl: "https://encriptados.io/vaultchat_official.apk",
    storeButtons: { appStore: false, googlePlay: false },
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },
  
  "armadillo-chat": {
    slug: "armadillo-chat",
    productId: 177,
    categoryId: 38,
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
    appStoreUrl: "https://apps.apple.com/app/armadillo-chat",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.armadillo",
    apkUrl: "https://encriptados.io/armadillo_chat_base.apk",
    storeButtons: { appStore: false },
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  "armadillo": { // Alias legacy
    slug: "armadillo-chat",
    productId: 177,
    categoryId: 38,
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
    appStoreUrl: "https://apps.apple.com/app/armadillo-chat",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.armadillo",
    apkUrl: "https://encriptados.io/armadillo_chat_base.apk",
    storeButtons: { appStore: false },
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },
  
  "threema": {
    slug: "threema",
    productId: 136,
    categoryId: 38,
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
    appStoreUrl: "https://apps.apple.com/app/threema",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=ch.threema.app",
    apkUrl: "https://encriptados.io/Threema-4.63.apk",
    storeButtons: { appStore: false, googlePlay: false },
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },
  
  "threema-work": {
    slug: "threema-work",
    productId: 135,
    categoryId: 38,
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
    appStoreUrl: "https://apps.apple.com/app/threema-work",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=ch.threema.app.work",
    apkUrl: "https://encriptados.io/threema_work_base.apk",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },
  
  "vnc-lagoon": {
    slug: "vnc-lagoon",
    productId: 134,
    categoryId: 38,
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
    appStoreUrl: "https://apps.apple.com/app/vnc-lagoon",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.vnc.lagoon",
    apkUrl: "https://encriptados.io/VNCtalk.apk",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },
  
  "salt-app": {
    slug: "salt-app",
    productId: 133,
    categoryId: 38,
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
    appStoreUrl: "https://apps.apple.com/app/salt-communications",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.salt",
    apkUrl: "https://encriptados.io/saltIm_base.apk",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  "salt": { // Alias legacy
    slug: "salt-app",
    productId: 133,
    categoryId: 38,
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
    appStoreUrl: "https://apps.apple.com/app/salt-communications",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.salt",
    apkUrl: "https://encriptados.io/saltIm_base.apk",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },
  
  "nord-vpn": {
    slug: "nord-vpn",
    productId: 137,
    categoryId: 38,
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
    appStoreUrl: "https://apps.apple.com/app/nordvpn",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.nordvpn.android",
    apkUrl: "https://encriptados.io/NordVPN_Layer_base.apk",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  // ════════════════════════════════════════════════════════════════
  // SISTEMAS / SOFTWARE (Categoría 35)
  // ════════════════════════════════════════════════════════════════

  "secure-mdm-iphone": {
    slug: "secure-mdm-iphone",
    productId: 168,
    categoryId: 35,
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
    appStoreUrl: "",
    googlePlayUrl: "",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  "secure-mdm-android": {
    slug: "secure-mdm-android",
    productId: 169,
    categoryId: 35,
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
    appStoreUrl: "",
    googlePlayUrl: "",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  "cryptcom": {
    slug: "cryptcom",
    productId: 139,
    categoryId: 35,
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
    appStoreUrl: "",
    googlePlayUrl: "",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  "renati": {
    slug: "renati",
    productId: 151,
    categoryId: 35,
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
    appStoreUrl: "",
    googlePlayUrl: "",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  "chat-mail": {
    slug: "chat-mail",
    productId: 142,
    categoryId: 35,
    templateType: "software",
    heroBanners: {
      desktop: "/images/apps/chat-mail/hero-desktop.png",
      tablet: "/images/apps/chat-mail/hero-tablet.png",
      mobile: "/images/apps/chat-mail/hero-mobile.jpg",
    },
    productImage: "/images/apps/chat-mail/banner.png",
    iconUrl: "/images/apps/chat-mail/logo.png",
    benefitIcon: "/images/apps/chat-mail/icono.png",
    videoUrl: "",
    appStoreUrl: "",
    googlePlayUrl: "",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  // Armadillo como Sistema (diferente del app)
  // Slug canónico: armadillo-v2 (para distinguir del app armadillo)
  "armadillo-v2": {
    slug: "armadillo-v2",
    productId: 180,
    categoryId: 35,
    templateType: "software",
    heroBanners: {
      desktop: "/images/apps/armadillo/hero-desktop.png",
      tablet: "/images/apps/armadillo/hero-tablet.png",
      mobile: "/images/apps/armadillo/hero-mobile.jpg",
    },
    productImage: "/images/apps/armadillo/banner.png",
    iconUrl: "/images/apps/armadillo/logo.png",
    benefitIcon: "/images/apps/armadillo/icono.png",
    videoUrl: "",
    appStoreUrl: "",
    googlePlayUrl: "",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  // VaultChat como Sistema (diferente del app)
  // Slug canónico: vault-chat-v2 (para distinguir del app vault-chat)
  "vault-chat-v2": {
    slug: "vault-chat-v2",
    productId: 148,
    categoryId: 35,
    templateType: "software",
    heroBanners: {
      desktop: "/images/apps/vault-chat/hero-desktop.png",
      tablet: "/images/apps/vault-chat/hero-tablet.png",
      mobile: "/images/apps/vault-chat/hero-mobile.jpg",
    },
    productImage: "/images/apps/vault-chat/banner.png",
    iconUrl: "/images/apps/vault-chat/logo.png",
    benefitIcon: "/images/apps/vault-chat/icono.png",
    videoUrl: "",
    appStoreUrl: "",
    googlePlayUrl: "",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  // Ultra X - Slugs: ultrax, ultra-x (alias)
  "ultrax": {
    slug: "ultrax",
    productId: 182,
    categoryId: 35,
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
    appStoreUrl: "",
    googlePlayUrl: "",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  // Alias: ultra-x -> ultrax
  "ultra-x": {
    slug: "ultra-x",
    productId: 182,
    categoryId: 35,
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
    appStoreUrl: "",
    googlePlayUrl: "",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  "intact-phone": {
    slug: "intact-phone",
    productId: 188,
    categoryId: 35,
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
    appStoreUrl: "",
    googlePlayUrl: "",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  "dec-secure": {
    slug: "dec-secure",
    productId: 233,
    categoryId: 35,
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
    appStoreUrl: "",
    googlePlayUrl: "",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  "secure-crypt": {
    slug: "secure-crypt",
    productId: 174,
    categoryId: 35,
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
    appStoreUrl: "",
    googlePlayUrl: "",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  // Alias para compatibilidad con URLs en camelCase
  "secureCrypt": {
    slug: "secureCrypt",
    productId: 174,
    categoryId: 35,
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
    appStoreUrl: "",
    googlePlayUrl: "",
    relatedProducts: { simProductId: "508", esimProductId: "454" },
  },

  // ════════════════════════════════════════════════════════════════
  // ROUTER (Categoría 36) - Usa /router pero comparte config
  // ════════════════════════════════════════════════════════════════

  "router-camaleon": {
    slug: "router-camaleon",
    productId: 59747,
    categoryId: 36,
    templateType: "router",
    heroBanners: {
      desktop: "/images/router/hero-desktop.png",
      tablet: "/images/router/hero-tablet.png",
      mobile: "/images/router/hero-mobile.png",
    },
    productImage: "/images/router/card_fondo.png",
    iconUrl: "/images/router/logo.png",
    benefitIcon: "/images/router/icono.png",
    videoUrl: "https://www.youtube.com/embed/router-video",
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

/**
 * Obtener productos por tipo de template
 */
export function getProductsByTemplateType(type: TemplateType): ProductStaticConfig[] {
  return Object.values(productConfigs).filter(p => p.templateType === type);
}

/**
 * Obtener productos por categoría
 */
export function getProductsByCategoryId(categoryId: number): ProductStaticConfig[] {
  return Object.values(productConfigs).filter(p => p.categoryId === categoryId);
}
