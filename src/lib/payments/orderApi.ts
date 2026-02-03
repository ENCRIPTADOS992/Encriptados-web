// src/payments/orderApi.ts
const WP_API = process.env.NEXT_PUBLIC_WP_API ?? "https://encriptados.es/wp-json";
const API_BASE_URL = `${WP_API}/encriptados/v1`;

export type OrderType = "roaming" | "userid";

const omitUndefined = (obj: Record<string, any>) => {
  const out: Record<string, any> = {};
  Object.entries(obj).forEach(([k, v]) => {
    if (v !== undefined) out[k] = v;
  });
  return out;
};

async function postJsonWithFallback<T>(url: string, extended: any, minimal: any): Promise<T> {
  const attempt = async (payload: any) => {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const text = await r.text();
    const data = text ? JSON.parse(text) : {};
    return { ok: r.ok, status: r.status, data } as const;
  };

  const r1 = await attempt(extended);
  if (r1.ok) return r1.data as T;

  if (r1.status === 400 || r1.status === 422) {
    const r2 = await attempt(minimal);
    if (r2.ok) return r2.data as T;
    throw new Error(r2.data?.message || r2.data?.error || `HTTP ${r2.status}`);
  }

  throw new Error(r1.data?.message || r1.data?.error || `HTTP ${r1.status}`);
}

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
  variantId,
  sku,
  licensetime,
  couponCode,
  discount,
  sourceUrl,
  selectedOption,
  silentPhoneMode,
  usernames,
  osType,
  meta,
}: {
  orderType: "roaming";
  productId: number;
  email: string;
  quantity: number;
  amountUsd: number;
  currency?: "USD";
  variantId?: number;
  sku?: string;
  licensetime?: number | string | null;
  couponCode?: string;
  discount?: number;
  sourceUrl?: string;
  selectedOption?: number;
  silentPhoneMode?: string;
  usernames?: string[];
  osType?: "android" | "ios";
  meta?: Record<string, any>;
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

  const minimal = omitUndefined({
    product_id: productId,
    qty: quantity,
    email,
    payment_provider: "stripe",
    amount: Number(amountUsd.toFixed(2)),
    currency,
  });
  const extended = omitUndefined({
    ...minimal,
    variant_id: variantId,
    sku,
    months: licensetime === null ? undefined : (typeof licensetime === 'string' ? parseInt(licensetime) || 12 : licensetime || 12),
    product_id: productId,
    coupon_code: couponCode,
    discount,
    source_url: sourceUrl,
    selected_option: selectedOption,
    silent_phone_mode: silentPhoneMode,
    usernames,
    system: osType,
    meta,
  });

  const data: any = await postJsonWithFallback(url, extended, minimal);
  if (!data?.order_id || !data?.client_secret) throw new Error("Respuesta inválida: falta order_id o client_secret");
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
  qty,
  variantId,
  sku,
  licensetime,
  licenseType,
  renewId,
  osType,
  silentPhoneMode,
  usernames,
  couponCode,
  discount,
  sourceUrl,
  selectedOption,
  meta,
}: {
  productId: number;
  email: string;
  username?: string;
  amountUsd: number;
  currency?: "USD";
  qty?: number;
  variantId?: number;
  sku?: string;
  licensetime?: number | string | null;
  licenseType?: "new" | "renew";
  renewId?: string;
  osType?: "android" | "ios";
  silentPhoneMode?: string;
  usernames?: string[];
  couponCode?: string;
  discount?: number;
  sourceUrl?: string;
  selectedOption?: number;
  meta?: Record<string, any>;
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

  const minimal = omitUndefined({
    product_id: productId,
    email,
    username: username || undefined,
    payment_provider: "stripe",
    amount: Number(amountUsd.toFixed(2)),
    currency,
  });
  const extended = omitUndefined({
    ...minimal,
    qty,
    variant_id: variantId,
    sku,
    licensetime,
    license_type: licenseType,
    renew_id: renewId,
    system: osType,
    silent_phone_mode: silentPhoneMode,
    usernames,
    coupon_code: couponCode,
    discount,
    source_url: sourceUrl,
    selected_option: selectedOption,
    meta,
  });

  const data: any = await postJsonWithFallback(url, extended, minimal);
  if (!data?.order_id || !data?.client_secret) throw new Error("Respuesta inválida: falta order_id o client_secret");
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

// =====================
// RENEWAL (Renovación de licencia)
// =====================
export async function createRenewalOrder({
  productId,
  licenseId,
  email,
  quantity = 1,
  months,
  amountUsd,
  currency = "USD",
}: {
  productId: number;
  licenseId: string;
  email: string;
  quantity?: number;
  months: number;
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
  const url = `${API_BASE_URL}/orders/renewal`;

  const payload = omitUndefined({
    product_id: productId,
    license_id: licenseId,
    email,
    qty: quantity,
    months,
    payment_provider: "stripe",
    amount: Number(amountUsd.toFixed(2)),
    currency,
  });

  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await r.text();
  const data = text ? JSON.parse(text) : {};

  if (!r.ok) {
    throw new Error(data?.message || data?.error || `HTTP ${r.status}`);
  }

  if (!data?.order_id || !data?.client_secret) {
    throw new Error("Respuesta inválida: falta order_id o client_secret");
  }

  return data;
}

// =====================
// COUPONS
// =====================
export async function validateCoupon(code: string, productName?: string, productId?: number | string): Promise<{
  ok: boolean;
  discount_type?: "fixed" | "percent";
  discount_amount?: number;
  message?: string;
}> {
  const normalizedCode = code.trim().toLowerCase();

  // MOCK: Cupones de prueba solicitados
  if (normalizedCode === "pruebac") {
    return {
      ok: true,
      discount_type: "fixed",
      discount_amount: 5, // Asumimos 5 USD por defecto para pruebas
      message: "Cupón de prueba aplicado (General)"
    };
  }

  if (normalizedCode === "pruebacsilent") {
    const isSilent = productName && /silent/i.test(productName);
    if (isSilent) {
      return {
        ok: true,
        discount_type: "fixed",
        discount_amount: 5,
        message: "Cupón de prueba aplicado (Silent Circle)"
      };
    } else {
      return {
        ok: false,
        message: "Este cupón es exclusivo para productos Silent Circle"
      };
    }
  }

  // Use local API proxy to avoid exposing credentials and handle CORS
  let url = `/api/coupons/validate?code=${encodeURIComponent(code)}`;
  if (productId) {
    url += `&product_id=${encodeURIComponent(productId)}`;
  }

  try {
    const r = await fetch(url);
    if (!r.ok) {
      // Fallback or just return invalid
      return { ok: false, message: "Cupón inválido" };
    }
    const data = await r.json();

    // Si la API devuelve error explícito
    if (data.error) {
      return { ok: false, message: data.message || "Cupón inválido" };
    }

    return {
      ok: true,
      discount_type: data.discount_type,
      discount_amount: Number(data.discount_amount),
      message: data.message || "Cupón aplicado",
    };
  } catch (e) {
    return { ok: false, message: "Error validando cupón" };
  }
}
