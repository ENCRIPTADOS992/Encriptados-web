/**
 * Configuración de enlaces para compartir productos
 * 
 * Cada producto tiene:
 * - metaImage: Imagen para Open Graph/Twitter Cards
 * - title: Título para metadatos
 * - description: Descripción corta con CTA
 * - shareUrl: URL de la página del producto con parámetro ?buy=1 o &buy=1 para activar popup
 * 
 * El parámetro buy=1 activa automáticamente el popup de pago al cargar la página
 * 
 * ESTRUCTURA DE URLs:
 * - Apps/Sistemas: /apps/[slug]?buy=1
 * - SIMs: /sim/[slug]?productId=X&price=Y&buy=1
 * - Router: /router?buy=1
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.encriptados.net";

export interface ShareConfig {
  productId: number;
  slug: string;
  name: string;
  metaImage: string;
  title: string;
  description: string;
  shareUrl: string;
  category: "apps" | "sistemas" | "sim-encriptados" | "sim-tim" | "router";
}

/**
 * ════════════════════════════════════════════════════════════════
 * APLICACIONES (Categoría 38)
 * ════════════════════════════════════════════════════════════════
 */
export const APPS_SHARE_CONFIG: ShareConfig[] = [
  {
    productId: 122,
    slug: "silent-circle",
    name: "Silent Phone",
    metaImage: "/meta-image/apps/silent-phone.png",
    title: "Silent Phone - Comunicación 100% Encriptada",
    description: "Compra aquí Silent Phone.",
    shareUrl: `${BASE_URL}/apps/silent-circle?buy=1`,
    category: "apps",
  },
  {
    productId: 127,
    slug: "vault-chat",
    name: "Vault Chat",
    metaImage: "/meta-image/apps/vaultchat.png",
    title: "Vault Chat - Mensajería Segura",
    description: "Compra aquí Vault Chat.",
    shareUrl: `${BASE_URL}/apps/vault-chat?buy=1`,
    category: "apps",
  },
  {
    productId: 177,
    slug: "armadillo",
    name: "Armadillo",
    metaImage: "/meta-image/apps/armadillo.png",
    title: "Armadillo - Privacidad Total",
    description: "Compra aquí Armadillo.",
    shareUrl: `${BASE_URL}/apps/armadillo?buy=1`,
    category: "apps",
  },
  {
    productId: 136,
    slug: "threema",
    name: "Threema",
    metaImage: "/meta-image/apps/threema.png",
    title: "Threema - Mensajería Cifrada",
    description: "Compra aquí Threema.",
    shareUrl: `${BASE_URL}/apps/threema?buy=1`,
    category: "apps",
  },
  {
    productId: 135,
    slug: "threema-work",
    name: "Threema Work",
    metaImage: "/meta-image/apps/threemawork.png",
    title: "Threema Work - Seguridad Empresarial",
    description: "Compra aquí Threema Work.",
    shareUrl: `${BASE_URL}/apps/threema-work?buy=1`,
    category: "apps",
  },
  {
    productId: 134,
    slug: "vnc-lagoon",
    name: "VNC Lagoon",
    metaImage: "/meta-image/apps/vnclaggon.png",
    title: "VNC Lagoon - Suite de Comunicación",
    description: "Compra aquí VNC Lagoon.",
    shareUrl: `${BASE_URL}/apps/vnc-lagoon?buy=1`,
    category: "apps",
  },
  {
    productId: 133,
    slug: "salt",
    name: "Salt",
    metaImage: "/meta-image/apps/salt.png",
    title: "Salt - Comunicación Segura",
    description: "Compra aquí Salt.",
    shareUrl: `${BASE_URL}/apps/salt?buy=1`,
    category: "apps",
  },
  {
    productId: 137,
    slug: "nord-vpn",
    name: "NordVPN",
    metaImage: "/meta-image/apps/nordvpn.png",
    title: "NordVPN - Navega Seguro",
    description: "Compra aquí NordVPN.",
    shareUrl: `${BASE_URL}/apps/nord-vpn?buy=1`,
    category: "apps",
  },
];

/**
 * ════════════════════════════════════════════════════════════════
 * SISTEMAS / SOFTWARE (Categoría 35)
 * ════════════════════════════════════════════════════════════════
 */
export const SISTEMAS_SHARE_CONFIG: ShareConfig[] = [
  {
    productId: 168,
    slug: "secure-mdm-iphone",
    name: "Secure MDM iPhone",
    metaImage: "/meta-image/sistemas/mdm-apple.png",
    title: "Secure MDM iPhone - Control Total",
    description: "Compra aquí Secure MDM iPhone.",
    shareUrl: `${BASE_URL}/apps/secure-mdm-iphone?buy=1`,
    category: "sistemas",
  },
  {
    productId: 169,
    slug: "secure-mdm-android",
    name: "Secure MDM Android",
    metaImage: "/meta-image/sistemas/mdm-android.png",
    title: "Secure MDM Android - Control Empresarial",
    description: "Compra aquí Secure MDM Android.",
    shareUrl: `${BASE_URL}/apps/secure-mdm-android?buy=1`,
    category: "sistemas",
  },
  {
    productId: 139,
    slug: "cryptcom",
    name: "CryptCom",
    metaImage: "/meta-image/sistemas/cryptcom.png",
    title: "CryptCom - Cifrado Avanzado",
    description: "Compra aquí CryptCom.",
    shareUrl: `${BASE_URL}/apps/cryptcom?buy=1`,
    category: "sistemas",
  },
  {
    productId: 151,
    slug: "renati",
    name: "Renati",
    metaImage: "/meta-image/sistemas/renati.png",
    title: "Renati - Sistema Encriptado",
    description: "Compra aquí Renati.",
    shareUrl: `${BASE_URL}/apps/renati?buy=1`,
    category: "sistemas",
  },
  {
    productId: 142,
    slug: "chat-mail",
    name: "Chat Mail",
    metaImage: "/meta-image/sistemas/chatmail.png",
    title: "Chat Mail - Email Seguro",
    description: "Compra aquí Chat Mail.",
    shareUrl: `${BASE_URL}/apps/chat-mail?buy=1`,
    category: "sistemas",
  },
  {
    productId: 180,
    slug: "armadillo-v2",
    name: "Armadillo Software",
    metaImage: "/meta-image/sistemas/armadillo.png",
    title: "Armadillo Software - Sistema Completo",
    description: "Compra aquí Armadillo Software.",
    shareUrl: `${BASE_URL}/apps/armadillo-v2?buy=1`,
    category: "sistemas",
  },
  {
    productId: 148,
    slug: "vault-chat-v2",
    name: "Vault Chat Software",
    metaImage: "/meta-image/sistemas/vaultchat.png",
    title: "Vault Chat Software - Sistema Seguro",
    description: "Compra aquí Vault Chat Software.",
    shareUrl: `${BASE_URL}/apps/vault-chat-v2?buy=1`,
    category: "sistemas",
  },
  {
    productId: 182,
    slug: "ultra-x",
    name: "Ultra-X",
    metaImage: "/meta-image/sistemas/ultra-x.png",
    title: "Ultra-X - Máxima Protección",
    description: "Compra aquí Ultra-X.",
    shareUrl: `${BASE_URL}/apps/ultra-x?buy=1`,
    category: "sistemas",
  },
  {
    productId: 188,
    slug: "intact-phone",
    name: "Intact Phone",
    metaImage: "/meta-image/sistemas/intactphone.png",
    title: "Intact Phone - Teléfono Blindado",
    description: "Compra aquí Intact Phone.",
    shareUrl: `${BASE_URL}/apps/intact-phone?buy=1`,
    category: "sistemas",
  },
  {
    productId: 233,
    slug: "dec-secure",
    name: "Dec Secure",
    metaImage: "/meta-image/sistemas/dec-secure.png",
    title: "Dec Secure - Seguridad Descentralizada",
    description: "Compra aquí Dec Secure.",
    shareUrl: `${BASE_URL}/apps/dec-secure?buy=1`,
    category: "sistemas",
  },
  {
    productId: 174,
    slug: "secure-crypt",
    name: "SecureCrypt",
    metaImage: "/meta-image/sistemas/securecrypt.png",
    title: "SecureCrypt - Cifrado Extremo",
    description: "Compra aquí SecureCrypt.",
    shareUrl: `${BASE_URL}/apps/secure-crypt?buy=1`,
    category: "sistemas",
  },
];

/**
 * ════════════════════════════════════════════════════════════════
 * SIM ENCRIPTADOS (Categoría 40 - Encriptados)
 * Estructura: /sim/[slug]?productId=X&price=Y&buy=1
 * ════════════════════════════════════════════════════════════════
 */
export const SIM_ENCRIPTADOS_SHARE_CONFIG: ShareConfig[] = [];

/**
 * ════════════════════════════════════════════════════════════════
 * SIM TIM (Categoría 40 - TIM)
 * Estructura: /sim/[slug]?productId=X&price=Y&buy=1
 * ════════════════════════════════════════════════════════════════
 */
export const SIM_TIM_SHARE_CONFIG: ShareConfig[] = [];

/**
 * ════════════════════════════════════════════════════════════════
 * ROUTER (Categoría 36)
 * Estructura: /router?buy=1
 * ════════════════════════════════════════════════════════════════
 */
export const ROUTER_SHARE_CONFIG: ShareConfig[] = [
  {
    productId: 59747,
    slug: "router-camaleon",
    name: "Router Camaleón",
    metaImage: "/meta-image/router/router-camaleon.png",
    title: "Router Camaleón - WiFi Encriptado",
    description: "Compra aquí Router Camaleón.",
    shareUrl: `${BASE_URL}/apps/router-camaleon?productId=59747&categoryId=36&buy=1`,
    category: "router",
  },
];

/**
 * Todos los productos combinados
 */
export const ALL_SHARE_CONFIGS: ShareConfig[] = [
  ...APPS_SHARE_CONFIG,
  ...SISTEMAS_SHARE_CONFIG,
  ...SIM_ENCRIPTADOS_SHARE_CONFIG,
  ...SIM_TIM_SHARE_CONFIG,
  ...ROUTER_SHARE_CONFIG,
];

/**
 * Buscar configuración de compartir por productId
 */
export function getShareConfigByProductId(productId: number): ShareConfig | undefined {
  return ALL_SHARE_CONFIGS.find((config) => config.productId === productId);
}

/**
 * Buscar configuración de compartir por slug
 */
export function getShareConfigBySlug(slug: string): ShareConfig | undefined {
  return ALL_SHARE_CONFIGS.find((config) => config.slug === slug);
}

/**
 * Generar URL de compartir con locale dinámico
 * Transforma URLs como https://example.com/apps/slug?buy=1
 * en URLs como https://example.com/es/apps/slug?buy=1
 * @param shareUrl - La URL base de compartir
 * @param locale - El idioma actual (es, en, fr, etc.)
 */
export function getShareUrlWithLocale(shareUrl: string, locale: string = 'es'): string {
  try {
    const url = new URL(shareUrl);
    // Insertar el locale después del dominio
    // Por ejemplo: /apps/slug?buy=1 -> /es/apps/slug?buy=1
    const pathParts = url.pathname.split('/').filter(Boolean);
    // Solo agregar locale si no está ya presente
    const supportedLocales = ['es', 'en', 'fr', 'it', 'pt'];
    if (!supportedLocales.includes(pathParts[0])) {
      url.pathname = `/${locale}${url.pathname}`;
    }
    return url.toString();
  } catch {
    // Si no es una URL válida, retornar como está
    return shareUrl;
  }
}

/**
 * Generar URL de compartir con parámetro buy=1
 * Si el producto está en la config, usa esa URL
 * Si no, genera una URL basada en el producto
 * @param locale - El idioma actual para incluir en la URL
 */
export function getShareUrl(productId: number, price?: number, locale: string = 'es'): string {
  const config = getShareConfigByProductId(productId);
  if (config?.shareUrl) {
    return getShareUrlWithLocale(config.shareUrl, locale);
  }

  // Fallback: generar URL basada en el productId y price
  // Para SIMs usamos la estructura /sim/esim-encriptada?productId=X&price=Y&buy=1
  const priceParam = price ? `&price=${price}` : '';
  return `${BASE_URL}/${locale}/sim/esim-encriptada?productId=${productId}${priceParam}&buy=1`;
}

/**
 * Generar URL de compartir dinámicamente para productos SIM
 * Útil cuando el producto no está pre-configurado en shareConfig
 * @param locale - El idioma actual (es, en, fr, etc.) para incluir en la URL
 */
export function generateSimShareUrl(
  productId: number,
  price: number,
  simType: 'sim-encriptada' | 'esim-encriptada' | 'tim-sim' | 'esim-tim' = 'esim-encriptada',
  locale: string = 'es'
): string {
  return `${BASE_URL}/${locale}/sim/${simType}?productId=${productId}&price=${price}&buy=1`;
}

/**
 * Obtener imagen de metadatos para Open Graph
 */
export function getMetaImage(productId: number): string {
  const config = getShareConfigByProductId(productId);
  return config?.metaImage || "/meta-image/default.png";
}
