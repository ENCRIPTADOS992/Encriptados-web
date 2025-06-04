// src/features/products/hooks/useProductFilters.ts

import { useSearchParams, useRouter } from 'next/navigation';

export const useProductFilters = () => {
  const params = useSearchParams();
  const router = useRouter();

  const filters = {
    selectedOption: params.get('selectedOption') || '40',
    provider: params.get('provider') || 'encriptados',
    os: params.get('os') || 'all',
    license: params.get('license') || 'all',
    encriptadosprovider: params.get('encriptadosprovider') || 'all',
  };

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    const updated = new URLSearchParams(params.toString());

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        updated.set(key, value);
      } else {
        updated.delete(key);
      }
    });

    router.replace(`?${updated.toString()}`);
  };

  return { filters, updateFilters };
};
