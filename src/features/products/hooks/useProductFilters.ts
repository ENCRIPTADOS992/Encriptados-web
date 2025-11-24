// src/features/products/hooks/useProductFilters.ts

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ProductFilters } from "@/features/products/types/ProductFilters";


function getRegionOrCountryType(value: string | null): "region" | "country" | undefined {
  if (value === "region" || value === "country") return value;
  return undefined;
}

export const useProductFilters = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const filters = {
    selectedOption: params.get('selectedOption') || '40',
    provider: params.get('provider') || 'encriptados',
    os: params.get('os') || 'all',
    license: params.get('license') || 'all',
    encriptadosprovider: params.get('encriptadosprovider') || 'all',
    timprovider: params.get('timprovider') || 'all',
    regionOrCountryType: getRegionOrCountryType(params.get('regionOrCountryType')) || "region",
    regionOrCountry: params.get('regionOrCountry') || 'global',
    simCountry: params.get("simCountry") || undefined,
    simCountryLabel: params.get("simCountryLabel") || undefined,
    simRegion: params.get("simRegion") || undefined,
  };

const updateFilters = (newFilters: Partial<ProductFilters>) => {  
  console.log("[useProductFilters] updateFilters llamado con:", newFilters);  
  const updated = new URLSearchParams(params.toString());
  const entries = Object.entries(newFilters);

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
    console.log("[useProductFilters] URL actualizada:", updated.toString());
    router.replace(`${pathname}?${updated.toString()}`, { scroll: false });
  };

  return { filters, updateFilters };
};
