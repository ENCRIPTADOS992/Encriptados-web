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

// ════════════════════════════════════════════════════════════════════════════
// FUNCIONES DE DERIVACIÓN
// Derivan valores normalizados desde campos del backend (provider, type_product)
// ════════════════════════════════════════════════════════════════════════════

/** Tipos derivados */
export type ProductFamily = "encrypted" | "tim";
export type ProductFormat = "physical" | "digital";
export type SimSlug = "sim-encriptada" | "esim-encriptada" | "tim-sim" | "esim-tim";

/**
 * Deriva `family` desde el campo `provider` del backend
 * @example deriveProductFamily("Sim Encriptados") → "encrypted"
 * @example deriveProductFamily("encrypted") → "encrypted"
 * @example deriveProductFamily("Sim TIM") → "tim"
 * @example deriveProductFamily("tim") → "tim"
 */
export function deriveProductFamily(provider: string | undefined): ProductFamily {
  const prov = (provider || "").toLowerCase();
  // Nuevos valores del backend: "encrypted", "tim"
  if (prov === "encrypted" || prov.includes("encript")) return "encrypted";
  if (prov === "tim" || prov.includes("tim")) return "tim";
  return "encrypted"; // fallback
}

/**
 * Deriva `format` desde el campo `type_product` del backend
 * @example deriveProductFormat("Fisico") → "physical"
 * @example deriveProductFormat("Digital") → "digital"
 */
export function deriveProductFormat(typeProduct: string | undefined): ProductFormat {
  const tp = (typeProduct || "").toLowerCase();
  if (tp === "digital") return "digital";
  return "physical"; // "Fisico" o cualquier otro valor → physical
}

/**
 * Deriva el `slug` de la URL combinando family + format
 * 
 * | family    | format   | → slug             |
 * |-----------|----------|--------------------|
 * | encrypted | physical | sim-encriptada     |
 * | encrypted | digital  | esim-encriptada    |
 * | tim       | physical | tim-sim            |
 * | tim       | digital  | esim-tim           |
 */
export function deriveProductSlug(
  family: ProductFamily,
  format: ProductFormat
): SimSlug {
  const slugMap: Record<ProductFamily, Record<ProductFormat, SimSlug>> = {
    encrypted: {
      physical: "sim-encriptada",
      digital: "esim-encriptada",
    },
    tim: {
      physical: "tim-sim",
      digital: "esim-tim",
    },
  };
  return slugMap[family][format];
}

/**
 * Genera el canonical path para SEO
 * @example hydrateCanonicalPath("sim-encriptada") → "/sim/sim-encriptada"
 */
export function hydrateCanonicalPath(slug: SimSlug): string {
  return `/sim/${slug}`;
}

/**
 * Función completa: campos backend → canonical path
 * @example deriveCanonicalPath("Sim Encriptados", "Fisico") → "/sim/sim-encriptada"
 */
export function deriveCanonicalPath(
  provider: string | undefined,
  typeProduct: string | undefined
): string {
  const family = deriveProductFamily(provider);
  const format = deriveProductFormat(typeProduct);
  const slug = deriveProductSlug(family, format);
  return hydrateCanonicalPath(slug);
}

/**
 * Obtiene el slug correcto a partir de campos del backend
 * @example getSlugFromBackendFields("Sim TIM", "Digital") → "esim-tim"
 */
export function getSlugFromBackendFields(
  provider: string | undefined,
  typeProduct: string | undefined
): SimSlug {
  const family = deriveProductFamily(provider);
  const format = deriveProductFormat(typeProduct);
  return deriveProductSlug(family, format);
}

// ════════════════════════════════════════════════════════════════════════════
// HELPERS PARA UI (renderizado condicional de secciones)
// ════════════════════════════════════════════════════════════════════════════

/** Mostrar secciones de productos Encrypted (FeaturesList, OurObjective, etc.) */
export function shouldShowEncryptedSections(family: ProductFamily): boolean {
  return family === "encrypted";
}

/** Mostrar secciones de productos TIM (DataPlans, etc.) */
export function shouldShowTimSections(family: ProductFamily): boolean {
  return family === "tim";
}

/** Mostrar información de eSIM (QR, activación instantánea) */
export function shouldShowEsimInfo(format: ProductFormat): boolean {
  return format === "digital";
}

/** Mostrar información de envío físico */
export function shouldShowShippingInfo(format: ProductFormat): boolean {
  return format === "physical";
}

// ══════════════════════════════════════════════════════════════════════════════
// VALIDACIÓN: El backend es la fuente de verdad
// Si el producto no corresponde a la URL, debe redirigirse
// ══════════════════════════════════════════════════════════════════════════════

export interface ProductValidationResult {
  isValid: boolean;
  expectedSlug: SimSlug;
  currentSlug: string;
  redirectUrl: string | null;
}

/**
 * Valida que un producto del backend corresponda al slug de la URL actual.
 * El backend (provider + type_product) es la fuente de verdad.
 * 
 * @param product - Producto cargado del backend
 * @param currentSlug - Slug actual de la URL
 * @param locale - Idioma actual para construir redirect URL
 * @returns Resultado de validación con URL de redirección si no coincide
 * 
 * @example
 * // Producto 59835 tiene provider="Sim Encriptados", type_product="Digital"
 * // Si la URL es /sim/tim-sim, debe redirigir a /sim/esim-encriptada
 * const result = validateProductMatchesSlug(product, "tim-sim", "es");
 * // result.isValid = false
 * // result.expectedSlug = "esim-encriptada"
 * // result.redirectUrl = "/es/sim/esim-encriptada"
 */
export function validateProductMatchesSlug(
  product: { provider?: string; type_product?: string } | null,
  currentSlug: string,
  locale: string
): ProductValidationResult {
  // Si no hay producto, no podemos validar
  if (!product) {
    return {
      isValid: true, // Permitir mientras carga
      expectedSlug: currentSlug as SimSlug,
      currentSlug,
      redirectUrl: null,
    };
  }

  // Derivar el slug correcto desde los campos del backend
  const expectedSlug = getSlugFromBackendFields(product.provider, product.type_product);
  const isValid = expectedSlug === currentSlug;

  return {
    isValid,
    expectedSlug,
    currentSlug,
    redirectUrl: isValid ? null : `/${locale}/sim/${expectedSlug}`,
  };
}

/**
 * Obtiene la configuración visual para un producto basado en su slug derivado.
 * El slug se deriva del backend (provider + type_product), no de la URL.
 */
export function getConfigForProduct(
  product: { provider?: string; type_product?: string } | null
): SimProductStaticConfig | null {
  if (!product) return null;
  const slug = getSlugFromBackendFields(product.provider, product.type_product);
  return simProductConfigs[slug] || null;
}
