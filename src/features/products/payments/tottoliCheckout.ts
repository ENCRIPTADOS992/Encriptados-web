// src/features/products/payments/tottoliCheckout.ts
export type TottoliProductType = "esim" | "data" | "minutes" | "sim_physical";
export type TottoliMethod = "card" | "cryptomus";

export interface TottoliCheckoutPayload {
  email: string;
  product: TottoliProductType;
  method: TottoliMethod;
  amount: number;
  currency?: string;
  qty?: number;
  sim_number?: string;
  iccid?: string;
  esim_type?: string;
  esim_group?: number;
  shipping_payload?: any;
}

export type TottoliProvider = "stripe" | "cryptomus";

export interface TottoliOkResponse {
  ok: true;
  order_id: number;
  status: string;
  provider: TottoliProvider;
  provider_ref?: string;
  client_secret?: string;
  payment_url?: string | null;
}



export async function tottoliCheckout(
  payload: TottoliCheckoutPayload
): Promise<TottoliOkResponse> {
  console.log("➡️ [tottoliCheckout] payload enviado:", payload);

  const res = await fetch(
    "https://encriptados.es/wp-json/encriptados/v1/tottoli/checkout",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  const raw = await res.text();
  console.log("⬅️ [tottoliCheckout] status:", res.status);
  console.log("⬅️ [tottoliCheckout] raw body:", raw);

  if (!res.ok) {
    console.error("❌ [tottoliCheckout] error HTTP", res.status, raw);

    let msg = "Error iniciando checkout";
    try {
      const data = JSON.parse(raw);
      if (data?.error) msg = data.error;
    } catch {
    }
    throw new Error(msg);
  }

  let data: any;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    console.error("❌ [tottoliCheckout] no se pudo parsear JSON de éxito", raw);
    throw new Error("Respuesta inválida del checkout");
  }

  if (!data.ok) {
    console.error("❌ [tottoliCheckout] respuesta ok=false", data);
    throw new Error(data.error || "Respuesta inválida del checkout");
  }

  console.log("✅ [tottoliCheckout] respuesta OK", data);
  return data as TottoliOkResponse;
}
