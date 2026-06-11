// src/services/regionCountryService.ts
import { buildWpV3Url } from "@/shared/constants/backend";

export interface Region {
  id: number;
  name: string;
  slug: string;
}

export interface Country {
  id: number;
  name: string;
  code: string;
  region_id: number;
}

export interface RegionResponse {
  id: string;
  name: string;
  countries: { id: string; name: string }[];
}

export async function fetchRegions(): Promise<Region[]> {
  const res = await fetch(buildWpV3Url("/regions"));
  if (!res.ok) throw new Error("Error fetching regions");
  return res.json();
}

export async function fetchCountries(regionId: number): Promise<{ id: string; name: string }[]> {
  const res = await fetch(buildWpV3Url(`/regions/${regionId}`));
  if (!res.ok) throw new Error(`Error fetching countries for region ${regionId}`);
  const data: RegionResponse = await res.json();
  return data.countries;
}
