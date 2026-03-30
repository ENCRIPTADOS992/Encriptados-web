"use client";

import { useQuery } from "@tanstack/react-query";
import { Product } from "@/features/products/types/AllProductsResponse";

const WP_API = process.env.NEXT_PUBLIC_WP_API ?? "https://encriptados.es/wp-json";

const MINUTES_PACKS_URL =
  `${WP_API}/encriptados/v3/tottoli/packs?perPage=50&page=1`;

const DATA_PACKS_URL =
  `${WP_API}/encriptados/v3/tottoli/data-packs?perPage=50&page=1`;

type MinutePackApi = {
  id: number;
  name?: string;
  price?: number | string;
  minutes?: number;
  pricePerMinute?: number | string;
  [key: string]: any;
};

type DataPackApi = {
  id: number;
  name?: string;
  price?: number | string;
  dataAmount?: number | string; 
  pricePerDataUnit?: number | string;
  [key: string]: any;
};

const buildChecksFromMinutes = (pack: MinutePackApi): { name: string }[] => {
  const raw = [
    pack.minutes ? { name: `${pack.minutes} minutos` } : null,
    pack.pricePerMinute
      ? { name: `≈ ${pack.pricePerMinute} por minuto` }
      : null,
  ];

  return raw.filter(
    (item): item is { name: string } => item !== null
  );
};

const buildChecksFromData = (pack: DataPackApi): { name: string }[] => {
  const raw = [
    pack.dataAmount ? { name: `Datos: ${pack.dataAmount}` } : null,
    pack.pricePerDataUnit
      ? { name: `≈ ${pack.pricePerDataUnit} por unidad` }
      : null,
  ];

  return raw.filter(
    (item): item is { name: string } => item !== null
  );
};

const mapMinutePackToProduct = (pack: MinutePackApi): Product => ({
  id: pack.id,
  name: pack.name ?? "Minutos",
  description: "",
  activation: "",
  type_product: "minutes-pack",
  provider: "Sim Encriptados",
  licensetime: "",
  shipping: "",
  brand: "Sim Encriptados",
  sku: "",
  price: String(pack.price ?? ""),
  on_sale: false,
  sale_price: "",                   
  stock_quantity: null,
  category: {
    id: 0,
    name: "Packs Encriptados",
  },
  purchase_note: "",
  images: [
    {
      src: "/images/encrypted-sim/minutes-pack.png",
    },
  ],
  faqs: [],
  advantages: [],
  features: [],
  checks: buildChecksFromMinutes(pack),
  variants: [],
});

const mapDataPackToProduct = (pack: DataPackApi): Product => ({
  id: pack.id,
  name: pack.name ?? "Recarga",
  description: "",
  activation: "",
  type_product: "data-pack",
  provider: "Sim Encriptados",
  licensetime: "",
  shipping: "",
  brand: "Sim Encriptados",
  sku: "",
  price: String(pack.price ?? ""),
  on_sale: false,
  sale_price: "",
  stock_quantity: null,
  category: {
    id: 0,
    name: "Packs Encriptados",
  },
  purchase_note: "",
  images: [
    {
      src: "/images/encrypted-sim/data-pack.png",
    },
  ],
  faqs: [],
  advantages: [],
  features: [],
  checks: buildChecksFromData(pack),
  variants: [],
});

export const useGetEncryptedPacks = (enabled: boolean) =>
  useQuery<Product[]>({
    queryKey: ["encrypted-packs"],
    enabled,
    queryFn: async () => {
      const [minutesRes, dataRes] = await Promise.all([
        fetch(MINUTES_PACKS_URL),
        fetch(DATA_PACKS_URL),
      ]);

      if (!minutesRes.ok || !dataRes.ok) {
        throw new Error("Error al cargar packs de Encriptados");
      }

      const minutesJson = await minutesRes.json();
      const dataJson = await dataRes.json();

      const minutes: MinutePackApi[] = Array.isArray(minutesJson)
        ? minutesJson
        : minutesJson.data ?? [];

      const data: DataPackApi[] = Array.isArray(dataJson)
        ? dataJson
        : dataJson.data ?? [];

      const minutesProducts = minutes.map(mapMinutePackToProduct);
      const dataProducts = data.map(mapDataPackToProduct);

      return [...minutesProducts, ...dataProducts];
    },
  });
