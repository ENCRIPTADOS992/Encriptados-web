/**
 * Configuración estática de productos SIM y TIM-SIM
 * 
 * Este archivo contiene SOLO los datos que NO vienen de la API:
 * - Rutas de imágenes locales (banners hero, iconos)
 * - URLs de video
 * - IDs de productos relacionados
 * 
 * CATEGORÍA DEL API:
 * - 40: SIM / TIM-SIM / eSIM
 * 
 * PLANTILLA UNIFICADA para SIM
 * Ruta: /sim/[slug]
 * 
 * TIPOS DE PRODUCTOS:
 * - sim-encriptada: SIM física encriptada
 * - esim-encriptada: eSIM encriptada (digital)
 * - tim-sim: SIM TIM con datos
 * - esim-tim: eSIM TIM con datos (digital)
 */

export type SimTemplateType = "sim" | "esim" | "tim-sim" | "esim-tim";

export interface SimProductStaticConfig {
  slug: string;
  productId: number;
  categoryId: number; // 40 = SIM/eSIM/TIM-SIM
  templateType: SimTemplateType;
  heroBanners: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
  productImage: string;
  iconUrl: string;
  benefitIcon: string;
  videoUrl?: string;
  relatedProducts: {
    simEncriptadaSlug: string;
    esimEncriptadaSlug: string;
    timSimSlug: string;
    esimTimSlug: string;
  };
  /** Mostrar sección de cobertura */
  showCoverage?: boolean;
  /** Mostrar planes de datos */
  showDataPlans?: boolean;
}

/**
 * ════════════════════════════════════════════════════════════════
 * PRODUCTOS SIM UNIFICADOS
 * ════════════════════════════════════════════════════════════════
 * 
 * SIM ENCRIPTADAS:
 * - sim-encriptada (508): SIM física encriptada
 * - esim-encriptada (454): eSIM encriptada digital
 * 
 * TIM-SIM (Planes de datos):
 * - tim-sim (59835): SIM TIM con datos
 * - esim-tim (59836): eSIM TIM con datos
 */
export const simProductConfigs: Record<string, SimProductStaticConfig> = {
  // ════════════════════════════════════════════════════════════════
  // SIM ENCRIPTADAS (Categoría 40)
  // ════════════════════════════════════════════════════════════════
  
  "sim-encriptada": {
    slug: "sim-encriptada",
    productId: 508,
    categoryId: 40,
    templateType: "sim",
    heroBanners: {
      desktop: "/images/encrypted-sim/principal.png",
      tablet: "/images/encrypted-sim/principal.png",
      mobile: "/images/encrypted-sim/principal.png",
    },
    productImage: "/images/encrypted-sim/Encrypted_sim_card.png",
    iconUrl: "/images/encrypted-sim/icons/sim-icon.png",
    benefitIcon: "/images/encrypted-sim/icons/check-icon.png",
    videoUrl: "",
    relatedProducts: {
      simEncriptadaSlug: "sim-encriptada",
      esimEncriptadaSlug: "esim-encriptada",
      timSimSlug: "tim-sim",
      esimTimSlug: "esim-tim",
    },
    showCoverage: true,
    showDataPlans: true,
  },

  "esim-encriptada": {
    slug: "esim-encriptada",
    productId: 454,
    categoryId: 40,
    templateType: "esim",
    heroBanners: {
      desktop: "/images/encrypted-sim/Encrypted_sim_card_eSIM.png",
      tablet: "/images/encrypted-sim/Encrypted_sim_card_eSIM.png",
      mobile: "/images/encrypted-sim/Encrypted_sim_card_eSIM.png",
    },
    productImage: "/images/encrypted-sim/Encrypted_sim_card_eSIM.png",
    iconUrl: "/images/encrypted-sim/icons/esim-icon.png",
    benefitIcon: "/images/encrypted-sim/icons/check-icon.png",
    videoUrl: "",
    relatedProducts: {
      simEncriptadaSlug: "sim-encriptada",
      esimEncriptadaSlug: "esim-encriptada",
      timSimSlug: "tim-sim",
      esimTimSlug: "esim-tim",
    },
    showCoverage: true,
    showDataPlans: true,
  },

  // ════════════════════════════════════════════════════════════════
  // TIM-SIM (Categoría 40) - Planes de datos
  // ════════════════════════════════════════════════════════════════
  
  "tim-sim": {
    slug: "tim-sim",
    productId: 59835,
    categoryId: 40,
    templateType: "tim-sim",
    heroBanners: {
      desktop: "/images/bne-sim/anonymous-desktop.png",
      tablet: "/images/bne-sim/anonymous-tablet.png",
      mobile: "/images/bne-sim/anonymous-movil.png",
    },
    productImage: "/images/bne-sim/hombre-feliz.png",
    iconUrl: "/images/bne-sim/logo-tim.png",
    benefitIcon: "/images/bne-sim/svg/check.svg",
    videoUrl: "",
    relatedProducts: {
      simEncriptadaSlug: "sim-encriptada",
      esimEncriptadaSlug: "esim-encriptada",
      timSimSlug: "tim-sim",
      esimTimSlug: "esim-tim",
    },
    showCoverage: true,
    showDataPlans: true,
  },

  "esim-tim": {
    slug: "esim-tim",
    productId: 59836, // Ajustar al ID correcto de la API
    categoryId: 40,
    templateType: "esim-tim",
    heroBanners: {
      desktop: "/images/bne-sim/anonymous-desktop.png",
      tablet: "/images/bne-sim/anonymous-tablet.png",
      mobile: "/images/bne-sim/anonymous-movil.png",
    },
    productImage: "/images/bne-sim/hombre-feliz.png",
    iconUrl: "/images/bne-sim/logo-tim.png",
    benefitIcon: "/images/bne-sim/svg/check.svg",
    videoUrl: "",
    relatedProducts: {
      simEncriptadaSlug: "sim-encriptada",
      esimEncriptadaSlug: "esim-encriptada",
      timSimSlug: "tim-sim",
      esimTimSlug: "esim-tim",
    },
    showCoverage: true,
    showDataPlans: true,
  },
};

export function getSimProductConfig(slug: string): SimProductStaticConfig | null {
  return simProductConfigs[slug] || null;
}

export function isValidSimProductSlug(slug: string): boolean {
  return slug in simProductConfigs;
}

export function getAllSimProductSlugs(): string[] {
  return Object.keys(simProductConfigs);
}

/**
 * Obtener productos por tipo de template
 */
export function getSimProductsByTemplateType(type: SimTemplateType): SimProductStaticConfig[] {
  return Object.values(simProductConfigs).filter(p => p.templateType === type);
}
