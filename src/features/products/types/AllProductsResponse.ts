export type Allproducts = Product[];

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
  image?: string;
  image_full?: string;
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
  name: string;
  ussd?:string;        
  gb?: string;         
  cost: number;
  days?:number      
  minutes?:number 
  minute_price?:number;
  currency: string;    
  label: string;       
  purchase_url: string;
  scope?: ProductVariantScope; 
}

export interface ProductLicenseVariant {
  id: number;
  licensetime: string;
  price: number;
  sku: string;
  image: string;
}
