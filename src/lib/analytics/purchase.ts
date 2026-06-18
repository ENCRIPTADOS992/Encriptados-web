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

const GA4_ENDPOINT = "https://www.google-analytics.com/mp/collect";

export function buildPurchaseMeasurementPayload(payload: PurchaseTrackingPayload) {
  return {
    client_id: `server.${payload.transactionId}`,
    events: [
      {
        name: "purchase",
        params: {
          transaction_id: payload.transactionId,
          value: payload.value,
          currency: payload.currency,
          shipping: payload.shipping,
          coupon: payload.coupon,
          items: payload.items,
          source: payload.source,
        },
      },
    ],
  };
}

export async function sendServerPurchaseMeasurement(payload: PurchaseTrackingPayload) {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_API_SECRET;

  if (!measurementId || !apiSecret) {
    return { ok: false as const, skipped: "ga4_not_configured" as const };
  }

  const response = await fetch(
    `${GA4_ENDPOINT}?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(apiSecret)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildPurchaseMeasurementPayload(payload)),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(text || `GA4 measurement failed with HTTP ${response.status}`);
  }

  return { ok: true as const };
}