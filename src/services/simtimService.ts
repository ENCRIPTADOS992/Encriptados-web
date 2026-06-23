// src/services/simtimService.ts
import { buildSimtimUrl } from "@/shared/constants/backend";

export type Region = {
  code: string;
  name: string;
  countryCount: number;
  minFrom: null | {
    amount: number;
    currency: string;
  };
};

export type Country = {
  code: string;
  name: string;
  flag: string;
  minFrom?: null | {
    amount: number;
    currency: string;
  };
};

async function safeGet<T>(path: string): Promise<T> {
  const res = await fetch(buildSimtimUrl(path), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`SIMTIM request failed: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export async function getRegions(
  service: "esim_datos" | "recarga_datos" | "sim_fisica"
): Promise<Region[]> {
  return safeGet<Region[]>(`/regions?service=${encodeURIComponent(service)}`);
}

export async function getCountries(
  service: "esim_datos" | "recarga_datos" | "sim_fisica"
): Promise<Country[]> {
  return safeGet<Country[]>(`/countries?service=${encodeURIComponent(service)}`);
}

export async function searchRegions(q: string): Promise<Region[]> {
  return safeGet<Region[]>(
    `/search?scope=region&q=${encodeURIComponent(q)}`
  );
}

export async function searchCountries(q: string): Promise<Country[]> {
  return safeGet<Country[]>(
    `/search?scope=country&q=${encodeURIComponent(q)}`
  );
}
