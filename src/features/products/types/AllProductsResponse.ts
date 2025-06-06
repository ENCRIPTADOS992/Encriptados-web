export type Allproducts = Product[];

export type Product = {
  id: number;
  name: string;
  description: string;
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
