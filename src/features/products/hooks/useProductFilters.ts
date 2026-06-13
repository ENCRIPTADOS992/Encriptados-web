// src/features/products/hooks/useProductFilters.ts

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ProductFilters } from "@/features/products/types/ProductFilters";
import { PRODUCT_CATEGORY_IDS } from "@/shared/constants/productCategories";

// Mapa de IDs legados (backend viejo) → IDs nuevos (backend admin.encriptados.io)
const LEGACY_CATEGORY_ID_MAP: Record<number, number> = {
  40:  PRODUCT_CATEGORY_IDS.SIMS,           // SIMs viejo → 451
  38:  PRODUCT_CATEGORY_IDS.APPS,            // Aplicaciones viejo → 431
  35:  PRODUCT_CATEGORY_IDS.SOFTWARE,        // Sistemas viejo → 439
  36:  PRODUCT_CATEGORY_IDS.ROUTERS,         // Routers viejo → 457
  371: PRODUCT_CATEGORY_IDS.ACTIVATE_APPS,   // Activar Apps viejo → 465
};

// IDs válidos del backend actual
const VALID_CATEGORY_IDS = new Set(Object.values(PRODUCT_CATEGORY_IDS));

function resolveSelectedOption(raw: string | null): string {
  const defaultId = String(PRODUCT_CATEGORY_IDS.SIMS);
  if (!raw) return defaultId;

  const num = parseInt(raw, 10);
  if (isNaN(num)) return defaultId;

  // Si es un ID legado, migrarlo automáticamente al nuevo
  if (LEGACY_CATEGORY_ID_MAP[num] !== undefined) {
    return String(LEGACY_CATEGORY_ID_MAP[num]);
  }

  // Si ya es un ID válido del backend nuevo, usarlo tal cual
  if (VALID_CATEGORY_IDS.has(num as any)) {
    return String(num);
  }

  // ID desconocido → default SIMs
  return defaultId;
}

function getRegionOrCountryType(value: string | null): "region" | "country" | undefined {
  if (value === "region" || value === "country") return value;
  return undefined;
}

export const useProductFilters = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const timprovider = params.get('timprovider') || 'all';
  const rawTimService = params.get('timService');
  let timService: "esim_datos" | "recarga_datos" | "sim_fisica" = "esim_datos";

  if (rawTimService === "esim_datos" || rawTimService === "recarga_datos" || rawTimService === "sim_fisica") {
    timService = rawTimService;
  } else {
    // Derivar automáticamente de timprovider para mantener consistencia
    if (timprovider === "datarechargetim") {
      timService = "recarga_datos";
    } else if (timprovider === "physicsimtim") {
      timService = "sim_fisica";
    }
  }

  const filters = {
    selectedOption: resolveSelectedOption(params.get('selectedOption')),
    provider: params.get('provider') || 'encriptados',
    os: params.get('os') || 'all',
    license: params.get('license') || 'all',
    encriptadosprovider: params.get('encriptadosprovider') || 'all',
    timprovider,
    timService,
    regionOrCountryType: getRegionOrCountryType(params.get('regionOrCountryType')) || "region",
    regionOrCountry: params.get('regionOrCountry') || 'global',
    simCountry: params.get("simCountry") || undefined,
    simCountryLabel: params.get("simCountryLabel") || undefined,
    simRegion: params.get("simRegion") || undefined,
  };

  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    const updated = new URLSearchParams(params.toString());

    // Sincronizar automáticamente timprovider y timService antes de actualizar URL
    const syncFilters = { ...newFilters };
    if ("timprovider" in syncFilters && !("timService" in syncFilters)) {
      const tp = syncFilters.timprovider;
      if (tp === "datarechargetim") {
        syncFilters.timService = "recarga_datos";
      } else if (tp === "physicsimtim") {
        syncFilters.timService = "sim_fisica";
      } else {
        syncFilters.timService = "esim_datos";
      }
    } else if ("timService" in syncFilters && !("timprovider" in syncFilters)) {
      const ts = syncFilters.timService;
      if (ts === "recarga_datos") {
        syncFilters.timprovider = "datarechargetim";
      } else if (ts === "sim_fisica") {
        syncFilters.timprovider = "physicsimtim";
      } else {
        syncFilters.timprovider = "esimplusdatatim";
      }
    }

    const entries = Object.entries(syncFilters);

    entries.forEach(([key, value]) => {
      if (value) {
        updated.set(key, value);
      } else {
        updated.delete(key);
      }
    });

    if ("selectedOption" in newFilters) {
      updated.delete("provider");
      updated.delete("os");
      updated.delete("license");
      updated.delete("encriptadosprovider");
      updated.delete("iraprovider");
      updated.delete("iracountry");
      updated.delete("timprovider");
      updated.delete("timcountry");
    }

    router.replace(`${pathname}?${updated.toString()}`, { scroll: false });
  };

  return { filters, updateFilters };
};
