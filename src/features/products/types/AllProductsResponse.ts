export type Allproducts = Product[];

/**
 * Hero Banners - Imágenes responsivas para el banner principal
 */
export interface HeroBanners {
  desktop: string;
  tablet: string;
  mobile: string;
}

export type Product = {
  id: number;
  name: string;
  description: string;
  checks?: {
    name: string;
  }[];
  activation: string;
  type_product: string;
  provider: string;
  licensetime: string;
  shipping: string;
  brand: string;
  sku: string;
  price: string;
  on_sale: boolean;
  sale_price: string;
  stock_quantity: number | null;
  category: {
    id: number;
    name: string;
  };
  purchase_note: string;
  images: {
    src: string;
  }[];
  faqs: {
    name: string;
    description: string;
  }[];
  advantages: {
    name: string;
    description: string;
    image: string;
  }[];
  features: {
    name: string;
    description: string;
    image: string;
  }[];
  variants?: ProductVariant[];
  licenseVariants?: ProductLicenseVariant[];
  plan_data_amount?: number;

  // ══════════════════════════════════════════════════════════════
  // NUEVOS CAMPOS - Estructura completa de página de producto
  // ══════════════════════════════════════════════════════════════

  /** Imagen de alta resolución del producto */
  image_full?: string;

  /** Imagen del celular con logotipo de la marca (para sección benefits) */
  image_benefits?: string;

  /** Hero banners responsivos (desktop, tablet, mobile) */
  heroBanners?: HeroBanners;

  /** Imagen principal del producto para secciones */
  productImage?: string;

  /** Logo/icono del producto */
  iconUrl?: string;

  /** URL embed de YouTube con texto acompañante */
  videoUrl?: string;

  /** Link a App Store (opcional) */
  appStoreUrl?: string;

  /** Link a Google Play (opcional) */
  googlePlayUrl?: string;

  /** Imágenes dinámicas por variante (idioma/duración) */
  buyNowImage_variants?: BuyNowImageVariant[];
};

export interface ProductById {
  id: number;
  name: string;
  description: string;
  checks?: {
    name: string;
  }[];
  activation: string;
  type_product: string;
  provider: string;
  licensetime: string;
  shipping: string;
  brand: string;
  sku: string;
  price: string;
  on_sale: boolean;
  sale_price: string;
  stock_quantity: number | null;
  category: CategoryInfo;
  purchase_note: string;
  images: ProductImage[];
  faqs: FAQ[];
  advantages: Advantage[];
  features: Feature[];
  /** Variantes del producto (licencias) */
  variants?: ProductVariantFromAPI[];
  /** Imagen thumbnail del producto */
  image?: string;
  /** Imagen de alta resolución del producto */
  image_full?: string;

  // ══════════════════════════════════════════════════════════════
  // NUEVOS CAMPOS - Estructura completa de página de producto
  // ══════════════════════════════════════════════════════════════

  /** Imagen del celular con logotipo de la marca (para sección benefits) */
  image_benefits?: string;

  /** Título de la sección de beneficios/ventajas */
  title_benefits?: string;

  /** Texto acompañante del video */
  video_text?: string;

  /** Hero banners responsivos (desktop, tablet, mobile) */
  heroBanners?: HeroBanners;

  /** Imagen principal del producto para secciones */
  productImage?: string;

  /** Logo/icono del producto */
  iconUrl?: string;

  /** URL embed de YouTube con texto acompañante */
  videoUrl?: string;

  /** Link a App Store (opcional) */
  appStoreUrl?: string;

  /** Link a Google Play (opcional) */
  googlePlayUrl?: string;

  /** Imágenes dinámicas por variante (idioma/duración) */
  buyNowImage_variants?: BuyNowImageVariant[];
}

export interface BuyNowImageVariant {
  license_duration: string;
  lang: string;
  image: string;
}

/**
 * Variante de producto desde la API de WordPress
 */
export interface ProductVariantFromAPI {
  id: number;
  licensetime: string;
  price: number;
  sku?: string;
  image?: string;
}

export interface FAQ {
  name: string;
  description: string;
}

export interface Advantage {
  name: string;
  description: string;
  image: string;
}

export interface Feature {
  name: string;
  description: string;
  image: string;
}

export type Variant = {
  id: number;
  name: string;
  description: string;
  currency: string;
  price: string;
  regular_price: string;
  sale_price: string;
};

export interface CategoryInfo {
  id: number;
  name: string;
}

export interface ProductImage {
  src: string;
}

export interface ProductVariantScope {
  type: string;
  code: string;
}

export interface ProductVariant {
  id: number;
  name?: string;
  ussd?: string;
  gb?: string;
  cost?: number;
  price?: number;  // Algunas variantes usan price en lugar de cost
  days?: number
  minutes?: number
  minute_price?: number;
  currency?: string;
  label?: string;
  purchase_url?: string;
  scope?: ProductVariantScope;
  licensetime?: string | null;
  sku?: string;
  image?: string;
}

export interface ProductLicenseVariant {
  id: number;
  licensetime: string;
  price: number;
  sku: string;
  image: string;
}
