export type Allproducts = Product[];

export type Product = {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  date_modified: string;
  type: string;
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  download_limit: number;
  download_expiry: number;
  external_url: string;
  button_text: string;
  tax_status: string;
  tax_class: string;
  manage_stock: boolean;
  stock_quantity: number | null;
  backorders: string;
  backorders_allowed: boolean;
  backordered: boolean;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string;
  shipping_class_id: number;
  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;
  upsell_ids: number[];
  cross_sell_ids: number[];
  parent_id: number;
  purchase_note: string;
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
  tags: any[];
  images: {
    id: number;
    src: string;
    name: string;
    alt: string;
  }[];
  attributes: any[];
  default_attributes: any[];
  variations: any[];
  grouped_products: any[];
  menu_order: number;
  price_html: string;
  related_ids: number[];
  meta_data: {
    id: number;
    key: string;
    value: string;
  }[];
  stock_status: string;
  has_options: boolean;
  post_password: string;
  global_unique_id: string;
  brands: any[];
  _links: {
    self: { href: string; targetHints?: { allow: string[] } }[];
    collection: { href: string }[];
  };
};


export type ProductById = {
  data: {
    id: number;
    title: string;
    price: string;
    regular_price: string;
    sale_price: string;
    category_id: number;
    category: string;
    description: string;
    image: string;
    image_mobile: string | null;
    banner: string;
    banner_mobile: string | null;
    currency: string;
    generaltitle: string;
    generaldescription: string;
    faqs: FAQ[];
    advantages: Advantage[];
    features: Feature[];
    variants: Variant[];
  };
};

export type FAQ = {
  id: number;
  title: string;
  content: string;
};

export type Advantage = {
  id: number;
  title: string;
  content: string;
  image: string;
};

export type Feature = {
  id: number;
  title: string;
  content: string;
  image: string | null;
};

export type Variant = {
  id: number;
  name: string;
  description: string;
  currency: string;
  price: string;
  regular_price: string;
  sale_price: string;
};
