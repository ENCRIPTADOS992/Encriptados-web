type Primitive = string | number | boolean | null | undefined;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

type DataLayerPayload = Record<string, unknown>;

export type PurchaseTrackingPayload = {
  transactionId: string;
  value: number;
  currency: string;
  shipping?: number;
  discount?: number;
  coupon?: string;
  source?: string;
  items: Array<{
    item_id: string;
    item_name?: string;
    item_brand?: string;
    item_category?: string;
    item_variant?: string;
    price?: number;
    quantity?: number;
  }>;
};

export type CheckoutStartPayload = {
  productId?: string;
  variantId?: number;
  mode?: string;
  categoryId?: number | string;
  categoryName?: string;
  provider?: string;
  brand?: string;
  selectedOption?: number;
  initialPrice?: number;
  sourceUrl?: string;
};

const cleanObject = (value: Record<string, Primitive>) =>
  Object.fromEntries(Object.entries(value).filter(([, entry]) => entry != null && entry !== ""));

export function pushDataLayer(payload: DataLayerPayload) {
  if (typeof window === "undefined") return;

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
  } catch {
    // Tracking must never interfere with checkout behavior.
  }
}

export function trackCheckoutStart(payload: CheckoutStartPayload) {
  const item = cleanObject({
    item_id: payload.productId,
    item_variant: payload.variantId != null ? String(payload.variantId) : undefined,
    item_category: payload.categoryName,
    item_brand: payload.provider || payload.brand,
    price: payload.initialPrice,
  });

  pushDataLayer({
    event: "begin_checkout",
    ecommerce: {
      currency: "USD",
      value: payload.initialPrice,
      items: Object.keys(item).length > 0 ? [item] : [],
    },
    checkout_context: cleanObject({
      mode: payload.mode,
      category_id: payload.categoryId != null ? String(payload.categoryId) : undefined,
      category_name: payload.categoryName,
      provider: payload.provider,
      brand: payload.brand,
      selected_option: payload.selectedOption,
      source_url: payload.sourceUrl,
    }),
  });
}

export function trackAddPaymentInfo(payload: {
  productId: number;
  paymentMethod: "card" | "crypto";
  amountUsd: number;
  quantity: number;
  orderType: string;
  variantId?: number;
  couponCode?: string;
  selectedOption?: number;
}) {
  const item = cleanObject({
    item_id: String(payload.productId),
    item_variant: payload.variantId != null ? String(payload.variantId) : undefined,
    quantity: payload.quantity,
    price: payload.amountUsd,
  });

  pushDataLayer({
    event: "add_payment_info",
    ecommerce: {
      currency: "USD",
      value: payload.amountUsd,
      payment_type: payload.paymentMethod,
      coupon: payload.couponCode,
      items: [item],
    },
    checkout_context: cleanObject({
      order_type: payload.orderType,
      selected_option: payload.selectedOption,
    }),
  });
}

export function trackPurchase(payload: PurchaseTrackingPayload) {
  pushDataLayer({
    event: "purchase",
    ecommerce: {
      transaction_id: payload.transactionId,
      value: payload.value,
      currency: payload.currency,
      shipping: payload.shipping,
      coupon: payload.coupon,
      items: payload.items,
    },
    checkout_context: cleanObject({
      source: payload.source,
    }),
  });
}

export function sendPurchaseToServer(payload: PurchaseTrackingPayload) {
  if (typeof window === "undefined") return;

  void fetch("/api/analytics/purchase", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    // Tracking must never interfere with checkout behavior.
  });
}