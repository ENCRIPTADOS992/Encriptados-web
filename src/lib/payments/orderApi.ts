// src/payments/orderApi.ts
const WP_API = process.env.NEXT_PUBLIC_WP_API ?? "https://encriptados.es/wp-json";
const API_BASE_URL = `${WP_API}/encriptados/v1`;

export type OrderType = "roaming" | "userid";

// =====================
// ROAMING
// =====================
export async function createOrderAndIntent({
  orderType, // <-- "roaming"
  productId,
  email,
  quantity,
  amountUsd,
  currency = "USD",
}: {
  orderType: "roaming";
  productId: number;
  email: string;
  quantity: number;
  amountUsd: number;
  currency?: "USD";
}): Promise<{
  ok: boolean;
  order_id: number;
  status: string;
  provider: string;
  provider_ref?: string | null;
  client_secret: string;
  payment_url?: string | null;
}> {
  const url = `${API_BASE_URL}/orders/roaming`;

  const payload = {
    product_id: productId,
    qty: quantity,
    email,
    payment_provider: "stripe",
    amount: Number(amountUsd.toFixed(2)),
    currency,
  };

  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" }, // según tu doc para /roaming
    body: JSON.stringify(payload),
  });

  const text = await r.text();
  const data = text ? JSON.parse(text) : {};
  if (!r.ok) {
    throw new Error(data?.message || data?.error || `HTTP ${r.status} creando orden roaming`);
  }
  if (!data?.order_id || !data?.client_secret) {
    throw new Error("Respuesta inválida: falta order_id o client_secret");
  }
  return data;
}

// =====================
// USERID
// =====================
export async function createUserIdOrderAndIntent({
  productId,
  email,
  username,
  amountUsd,
  currency = "USD",
}: {
  productId: number;
  email: string;
  username?: string;
  amountUsd: number;
  currency?: "USD";
}): Promise<{
  ok: boolean;
  order_id: number;
  status: string;
  provider: string;
  provider_ref?: string | null;
  client_secret: string;
  payment_url?: string | null;
}> {
  const url = `${API_BASE_URL}/orders/userid`;

  const payload = {
    product_id: productId,
    email,
    username: username || undefined,
    payment_provider: "stripe",
    amount: Number(amountUsd.toFixed(2)),
    currency,
  };

  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" }, // según tu doc para /userid
    body: JSON.stringify(payload),
  });

  const text = await r.text();
  const data = text ? JSON.parse(text) : {};
  if (!r.ok) {
    throw new Error(data?.message || data?.error || `HTTP ${r.status} creando orden userid`);
  }
  if (!data?.order_id || !data?.client_secret) {
    throw new Error("Respuesta inválida: falta order_id o client_secret");
  }
  return data;
}

// =====================
// POLLING
// =====================
export async function fetchPublicStatus(orderId: number): Promise<{
  ok: boolean;
  order_id: number;
  type: OrderType;
  status: "pending" | "paid" | "fulfilled" | "pending_admin" | "cancelled";
  provider: string;
}> {
  const r = await fetch(`${API_BASE_URL}/orders/${orderId}/public-status`);
  if (!r.ok) throw new Error(`HTTP ${r.status} consultando estado público`);
  return r.json();
}
