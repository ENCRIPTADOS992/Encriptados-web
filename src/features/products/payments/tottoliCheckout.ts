// src/features/products/payments/tottoliCheckout.ts
export type TottoliProductType = "esim" | "data" | "minutes" | "sim_physical";
export type TottoliMethod = "card" | "crypto";

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

interface TottoliStripeOk {
  ok: true;
  order_id: number;
  payment: {
    method: "card";
    stripe: { checkoutUrl: string };
  };
}

interface TottoliCryptoOk {
  ok: true;
  order_id: number;
  payment: {
    method: "crypto";
    cryptomus: { url: string };
  };
}

type TottoliOkResponse = TottoliStripeOk | TottoliCryptoOk;

export async function tottoliCheckout(
  payload: TottoliCheckoutPayload
): Promise<TottoliOkResponse> {
  console.log("➡️ Tottoli checkout payload", payload);
  const res = await fetch(
    "https://encriptados.es/wp-json/encriptados/v1/tottoli/checkout",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const raw = await res.text();
    console.error("❌ Tottoli checkout error", res.status, raw);

    let msg = "Error iniciando checkout";
    try {
      const data = await res.json();
      if (data?.error) msg = data.error;
    } catch {
      
    }
    throw new Error(msg);
  }

  const data = await res.json();
  if (!data.ok) {
    console.error("❌ Tottoli respuesta no OK", data);
    throw new Error(data.error || "Respuesta inválida del checkout");
  }
  return data as TottoliOkResponse;
}
