export interface ProductFilters {
  selectedOption: string;
  provider: string;
  os: string;
  license: string;
  encriptadosprovider: string;
  timprovider: string;
  regionOrCountry?: string;
  regionOrCountryType?: "region" | "country";
  timService?: "esim_datos" | "recarga_datos" | "sim_fisica";
  simCountry?: string;
  simCountryLabel?: string;
  simRegion?: string;
}
