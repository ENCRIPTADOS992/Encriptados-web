import { NextRequest, NextResponse } from 'next/server';
import { webhookSchema } from '@/lib/validation';
import { handlePaymentWebhook } from '@/lib/services/paymentService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = webhookSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ message:'faltan campos' }, { status: 400 });
    const { provider_ref, status } = parsed.data;
    const out = await handlePaymentWebhook(provider_ref, status);
    return NextResponse.json(out);
  } catch (e:any) {
    if (e.status) return NextResponse.json(e.body ?? { message: e.message }, { status: e.status });
    return NextResponse.json({ message: e?.message ?? 'Server error' }, { status: 500 });
  }
}
