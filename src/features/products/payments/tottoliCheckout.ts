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
  meta?: Record<string, any>;
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

  const url = "https://encriptados.es/wp-json/encriptados/v1/tottoli/checkout";
  const doPost = async (body: any) =>
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

  let res = await doPost(payload);

  const raw = await res.text();
  console.log("⬅️ [tottoliCheckout] status:", res.status);
  console.log("⬅️ [tottoliCheckout] raw body:", raw);

  if (!res.ok) {
    if ((res.status === 400 || res.status === 422) && payload.meta) {
      const retryPayload = { ...payload };
      delete (retryPayload as any).meta;
      res = await doPost(retryPayload);
      const retryRaw = await res.text();
      console.log("⬅️ [tottoliCheckout] retry status:", res.status);
      console.log("⬅️ [tottoliCheckout] retry raw body:", retryRaw);
      if (!res.ok) {
        console.error("❌ [tottoliCheckout] error HTTP", res.status, retryRaw);
        let msg = "Error iniciando checkout";
        try {
          const data = JSON.parse(retryRaw);
          if (data?.error) msg = data.error;
        } catch {}
        throw new Error(msg);
      }
      try {
        const data = JSON.parse(retryRaw);
        if (!data.ok) throw new Error(data.error || "Respuesta inválida del checkout");
        console.log("✅ [tottoliCheckout] respuesta OK (retry)", data);
        return data as TottoliOkResponse;
      } catch {
        throw new Error("Respuesta inválida del checkout");
      }
    }
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
