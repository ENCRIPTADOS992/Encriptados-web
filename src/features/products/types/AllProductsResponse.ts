export type Allproducts = {
  success: boolean;
  data: Product[];
};

export type Product = {
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
