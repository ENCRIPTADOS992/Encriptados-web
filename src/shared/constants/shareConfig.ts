/**
 * Configuración de enlaces para compartir productos
 * 
 * Cada producto tiene:
 * - metaImage: Imagen para Open Graph/Twitter Cards
 * - title: Título para metadatos
 * - description: Descripción corta con CTA
 * - shareUrl: URL de la página del producto con parámetro ?buy=1 para activar popup
 * 
 * El parámetro ?buy=1 activa automáticamente el popup de pago al cargar la página
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://encriptados.io";

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
    description: "¡Protege tus llamadas y mensajes! Compra aquí Silent Phone.",
    shareUrl: `${BASE_URL}/apps/silent-circle?buy=1`,
    category: "apps",
  },
  {
    productId: 127,
    slug: "vault-chat",
    name: "Vault Chat",
    metaImage: "/meta-image/apps/vaultchat.png",
    title: "Vault Chat - Mensajería Segura",
    description: "¡Mensajes que se autodestruyen! Compra aquí Vault Chat.",
    shareUrl: `${BASE_URL}/apps/vault-chat?buy=1`,
    category: "apps",
  },
  {
    productId: 177,
    slug: "armadillo",
    name: "Armadillo",
    metaImage: "/meta-image/apps/armadillo.png",
    title: "Armadillo - Privacidad Total",
    description: "¡Comunicación blindada! Compra aquí Armadillo.",
    shareUrl: `${BASE_URL}/apps/armadillo?buy=1`,
    category: "apps",
  },
  {
    productId: 136,
    slug: "threema",
    name: "Threema",
    metaImage: "/meta-image/apps/threema.png",
    title: "Threema - Mensajería Cifrada",
    description: "¡Sin número de teléfono! Compra aquí Threema.",
    shareUrl: `${BASE_URL}/apps/threema?buy=1`,
    category: "apps",
  },
  {
    productId: 135,
    slug: "threema-work",
    name: "Threema Work",
    metaImage: "/meta-image/apps/threemawork.png",
    title: "Threema Work - Seguridad Empresarial",
    description: "¡Para equipos y empresas! Compra aquí Threema Work.",
    shareUrl: `${BASE_URL}/apps/threema-work?buy=1`,
    category: "apps",
  },
  {
    productId: 134,
    slug: "vnc-lagoon",
    name: "VNC Lagoon",
    metaImage: "/meta-image/apps/vnclaggon.png",
    title: "VNC Lagoon - Suite de Comunicación",
    description: "¡Todo en uno encriptado! Compra aquí VNC Lagoon.",
    shareUrl: `${BASE_URL}/apps/vnc-lagoon?buy=1`,
    category: "apps",
  },
  {
    productId: 133,
    slug: "salt",
    name: "Salt",
    metaImage: "/meta-image/apps/salt.png",
    title: "Salt - Comunicación Segura",
    description: "¡Nivel militar de seguridad! Compra aquí Salt.",
    shareUrl: `${BASE_URL}/apps/salt?buy=1`,
    category: "apps",
  },
  {
    productId: 137,
    slug: "nord-vpn",
    name: "NordVPN",
    metaImage: "/meta-image/apps/nordvpn.png",
    title: "NordVPN - Navega Seguro",
    description: "¡Protege tu conexión! Compra aquí NordVPN.",
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
    description: "¡Gestiona tus dispositivos Apple! Compra aquí.",
    shareUrl: `${BASE_URL}/apps/secure-mdm-iphone?buy=1`,
    category: "sistemas",
  },
  {
    productId: 169,
    slug: "secure-mdm-android",
    name: "Secure MDM Android",
    metaImage: "/meta-image/sistemas/mdm-android.png",
    title: "Secure MDM Android - Control Empresarial",
    description: "¡Gestiona dispositivos Android! Compra aquí.",
    shareUrl: `${BASE_URL}/apps/secure-mdm-android?buy=1`,
    category: "sistemas",
  },
  {
    productId: 139,
    slug: "cryptcom",
    name: "CryptCom",
    metaImage: "/meta-image/sistemas/cryptcom.png",
    title: "CryptCom - Cifrado Avanzado",
    description: "¡Comunicación impenetrable! Compra aquí CryptCom.",
    shareUrl: `${BASE_URL}/apps/cryptcom?buy=1`,
    category: "sistemas",
  },
  {
    productId: 151,
    slug: "renati",
    name: "Renati",
    metaImage: "/meta-image/sistemas/renati.png",
    title: "Renati - Sistema Encriptado",
    description: "¡Protección integral! Compra aquí Renati.",
    shareUrl: `${BASE_URL}/apps/renati?buy=1`,
    category: "sistemas",
  },
  {
    productId: 142,
    slug: "chat-mail",
    name: "Chat Mail",
    metaImage: "/meta-image/sistemas/chatmail.png",
    title: "Chat Mail - Email Seguro",
    description: "¡Correos cifrados! Compra aquí Chat Mail.",
    shareUrl: `${BASE_URL}/apps/chat-mail?buy=1`,
    category: "sistemas",
  },
  {
    productId: 180,
    slug: "armadillo-software",
    name: "Armadillo Software",
    metaImage: "/meta-image/sistemas/armadillo.png",
    title: "Armadillo Software - Sistema Completo",
    description: "¡Seguridad total! Compra aquí Armadillo Software.",
    shareUrl: `${BASE_URL}/apps/armadillo-software?buy=1`,
    category: "sistemas",
  },
  {
    productId: 148,
    slug: "vault-chat-software",
    name: "Vault Chat Software",
    metaImage: "/meta-image/sistemas/vaultchat.png",
    title: "Vault Chat Software - Sistema Seguro",
    description: "¡Mensajería cifrada empresarial! Compra aquí.",
    shareUrl: `${BASE_URL}/apps/vault-chat-software?buy=1`,
    category: "sistemas",
  },
  {
    productId: 182,
    slug: "ultra-x",
    name: "Ultra-X",
    metaImage: "/meta-image/sistemas/ultra-x.png",
    title: "Ultra-X - Máxima Protección",
    description: "¡El más avanzado! Compra aquí Ultra-X.",
    shareUrl: `${BASE_URL}/apps/ultra-x?buy=1`,
    category: "sistemas",
  },
  {
    productId: 188,
    slug: "intact-phone",
    name: "Intact Phone",
    metaImage: "/meta-image/sistemas/intactphone.png",
    title: "Intact Phone - Teléfono Blindado",
    description: "¡Dispositivo seguro! Compra aquí Intact Phone.",
    shareUrl: `${BASE_URL}/apps/intact-phone?buy=1`,
    category: "sistemas",
  },
  {
    productId: 233,
    slug: "dec-secure",
    name: "Dec Secure",
    metaImage: "/meta-image/sistemas/dec-secure.png",
    title: "Dec Secure - Seguridad Descentralizada",
    description: "¡Sin servidores centrales! Compra aquí Dec Secure.",
    shareUrl: `${BASE_URL}/apps/dec-secure?buy=1`,
    category: "sistemas",
  },
  {
    productId: 174,
    slug: "secure-crypt",
    name: "SecureCrypt",
    metaImage: "/meta-image/sistemas/securecrypt.png",
    title: "SecureCrypt - Cifrado Extremo",
    description: "¡Nivel gubernamental! Compra aquí SecureCrypt.",
    shareUrl: `${BASE_URL}/apps/secure-crypt?buy=1`,
    category: "sistemas",
  },
];

/**
 * ════════════════════════════════════════════════════════════════
 * SIM ENCRIPTADOS (Categoría 40 - Encriptados)
 * ════════════════════════════════════════════════════════════════
 */
export const SIM_ENCRIPTADOS_SHARE_CONFIG: ShareConfig[] = [
  {
    productId: 508,
    slug: "sim-fisica",
    name: "SIM Física Encriptados",
    metaImage: "/meta-image/sim-encriptados/encriptados-sim-fisica.png",
    title: "SIM Física Encriptados - Cobertura Global",
    description: "¡Conecta en cualquier país! Compra tu SIM aquí.",
    shareUrl: `${BASE_URL}/our-products/508?buy=1`,
    category: "sim-encriptados",
  },
  {
    productId: 454,
    slug: "esim",
    name: "eSIM Encriptados",
    metaImage: "/meta-image/sim-encriptados/encriptados-esim.png",
    title: "eSIM Encriptados - Activa al Instante",
    description: "¡Sin chip físico! Compra tu eSIM aquí.",
    shareUrl: `${BASE_URL}/our-products/454?buy=1`,
    category: "sim-encriptados",
  },
  {
    productId: 12345, // TODO: Verificar ID real
    slug: "minutos",
    name: "Minutos Encriptados",
    metaImage: "/meta-image/sim-encriptados/encriptados-minuto.png",
    title: "Minutos Encriptados - Llamadas Seguras",
    description: "¡Recarga minutos cifrados! Compra aquí.",
    shareUrl: `${BASE_URL}/encrypted-sim?buy=1`,
    category: "sim-encriptados",
  },
  {
    productId: 12346, // TODO: Verificar ID real
    slug: "recarga-datos",
    name: "Recarga Datos Encriptados",
    metaImage: "/meta-image/sim-encriptados/encriptados-recarga-datos.png",
    title: "Recarga Datos - Internet Seguro",
    description: "¡Más GB para tu SIM! Recarga aquí.",
    shareUrl: `${BASE_URL}/encrypted-sim?buy=1`,
    category: "sim-encriptados",
  },
];

/**
 * ════════════════════════════════════════════════════════════════
 * SIM TIM (Categoría 40 - TIM)
 * ════════════════════════════════════════════════════════════════
 */
export const SIM_TIM_SHARE_CONFIG: ShareConfig[] = [
  {
    productId: 59123, // TODO: Verificar ID real
    slug: "tim-fisica",
    name: "TIM SIM Física",
    metaImage: "/meta-image/sim-tim/tim-fisica.png",
    title: "TIM SIM Física - Datos Globales",
    description: "¡Internet en 200+ países! Compra tu SIM TIM aquí.",
    shareUrl: `${BASE_URL}/tim-sim?buy=1`,
    category: "sim-tim",
  },
  {
    productId: 59124, // TODO: Verificar ID real
    slug: "tim-esim",
    name: "TIM eSIM",
    metaImage: "/meta-image/sim-tim/tim-esim-datos.png",
    title: "TIM eSIM - Activa Inmediata",
    description: "¡eSIM para datos! Compra aquí.",
    shareUrl: `${BASE_URL}/tim-sim?buy=1`,
    category: "sim-tim",
  },
  {
    productId: 59125, // TODO: Verificar ID real
    slug: "tim-recarga",
    name: "Recarga TIM",
    metaImage: "/meta-image/sim-tim/tim-recarga-datos.png",
    title: "Recarga TIM - Más Datos",
    description: "¡Recarga tu SIM TIM! Compra aquí.",
    shareUrl: `${BASE_URL}/tim-sim?buy=1`,
    category: "sim-tim",
  },
];

/**
 * ════════════════════════════════════════════════════════════════
 * ROUTER (Categoría 36)
 * ════════════════════════════════════════════════════════════════
 */
export const ROUTER_SHARE_CONFIG: ShareConfig[] = [
  {
    productId: 59747,
    slug: "router-camaleon",
    name: "Router Camaleón",
    metaImage: "/meta-image/router/router-camaleon.png",
    title: "Router Camaleón - WiFi Encriptado",
    description: "¡Internet seguro en cualquier lugar! Compra aquí.",
    shareUrl: `${BASE_URL}/router?buy=1`,
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
 * Generar URL de compartir con parámetro buy=1
 */
export function getShareUrl(productId: number): string {
  const config = getShareConfigByProductId(productId);
  return config?.shareUrl || `${BASE_URL}?buy=1`;
}

/**
 * Obtener imagen de metadatos para Open Graph
 */
export function getMetaImage(productId: number): string {
  const config = getShareConfigByProductId(productId);
  return config?.metaImage || "/meta-image/default.png";
}
