// src/payments/orderApi.ts
const WP_API = process.env.NEXT_PUBLIC_WP_API ?? "https://encriptados.es/wp-json";
export const API_BASE_URL = `${WP_API}/encriptados/v1`;

const USE_CREDENTIALS = false;

export type OrderType = "roaming" | "userid";

export async function createOrderAndIntent(params: {
  orderType: OrderType;
  productId: number;
  email: string;
  quantity: number;
  amountUsd: number;
}) {
  const { orderType, productId, email, quantity, amountUsd } = params;
  const url = `${API_BASE_URL}/orders/${orderType}`;
  const safeAmount = Math.max(Number(amountUsd || 0), 0.5);

  const form = new URLSearchParams();
  form.set("product_id", String(productId));
  form.set("email", email.trim());
  form.set("payment_provider", "stripe");
  form.set("order_type", orderType);
  form.set("quantity", String(quantity));
  form.set("qty", String(quantity));
  form.set("amount", String(safeAmount));
  form.set("amount_cents", String(Math.round(safeAmount * 100)));
  form.set("currency", "USD");
  form.set("provider", "stripe");
  form.set("method", "stripe");

  let respText = ""; let status = 0;
  try {
    const r = await fetch(url, { method: "POST", credentials: USE_CREDENTIALS ? "include" : "omit", body: form });
    status = r.status; respText = await r.text();
    const data = respText ? JSON.parse(respText) : {};
    if (!r.ok) throw new Error(data?.message || data?.error || "Error creando la orden");
    if (!data?.order_id || !data?.client_secret) throw new Error("Falta order_id o client_secret");
    return { order_id: data.order_id as number, client_secret: data.client_secret as string };
  } catch (e: any) {
    throw new Error(
      e?.message?.includes("Failed to fetch")
        ? "Fallo de red/CORS (revisa CORS o desactiva credenciales)."
        : e?.message || `HTTP ${status} creando la orden`
    );
  }
}

export async function fetchPublicStatus(orderId: number) {
  const r = await fetch(`${API_BASE_URL}/orders/${orderId}/public-status`);
  if (!r.ok) throw new Error("No se pudo consultar el estado");
  return (await r.json()) as { status: string };
}

// =====================
// MANUAL
// =====================

export async function createManualOrderAndIntent({
  productId,
  email,
  quantity,
  amountUsd,
  currency = "USD",
  successUrl,
}: {
  productId: number;
  email: string;
  quantity: number;
  amountUsd: number;
  currency?: "USD";
  successUrl?: string;
}): Promise<{ order_id: number; client_secret: string }> {
  const url = `${API_BASE_URL}/orders/manual`;

  const payload = {
    product_id: productId,
    qty: quantity,
    email,
    payment_provider: "stripe",
    amount: Number(amountUsd.toFixed(2)),
    currency,
    ...(successUrl ? { success_url: successUrl } : {}),
  };

  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await r.text();
  const data = text ? JSON.parse(text) : {};
  if (!r.ok) {
    throw new Error(data?.message || data?.error || `HTTP ${r.status} creando orden manual`);
  }
  if (!data?.order_id || !data?.client_secret) {
    throw new Error("Respuesta inválida: falta order_id o client_secret");
  }
  return { order_id: data.order_id, client_secret: data.client_secret };
}