// src/services/simtimService.ts
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
};

const BASE_URL =
  process.env.NEXT_PUBLIC_SIMTIM_BASEURL ??
  "https://encriptados.es/wp-json/encriptados/v1/simtim";

async function safeGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
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

export async function getCountries(): Promise<Country[]> {
  return safeGet<Country[]>(`/countries`);
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
