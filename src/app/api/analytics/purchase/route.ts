import { NextRequest, NextResponse } from "next/server";
import { sendServerPurchaseMeasurement, type PurchaseTrackingPayload } from "@/lib/analytics/purchase";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as PurchaseTrackingPayload;

    if (!body?.transactionId || !Array.isArray(body?.items) || !body?.currency) {
      return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
    }

    const result = await sendServerPurchaseMeasurement(body);
    return NextResponse.json({ ok: true, result });
  } catch (error: any) {
    console.error("[analytics/purchase]", error);
    return NextResponse.json({ ok: false, error: error?.message || "server_error" }, { status: 500 });
  }
}