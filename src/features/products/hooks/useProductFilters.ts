// src/features/products/hooks/useProductFilters.ts

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ProductFilters } from "@/features/products/types/ProductFilters";

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
  };

const updateFilters = (newFilters: Partial<ProductFilters>) => {    
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

    router.replace(`${pathname}?${updated.toString()}`, { scroll: false });
  };

  return { filters, updateFilters };
};
