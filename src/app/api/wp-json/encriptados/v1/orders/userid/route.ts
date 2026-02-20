import { NextRequest, NextResponse } from 'next/server';
import { userIdCheckoutSchema } from '@/lib/validation';
import { checkoutUserId } from '@/lib/services/orderService';

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = userIdCheckoutSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ message:'faltan campos', issues: parsed.error.flatten() }, { status: 400 });
    }
    const {
      product_id,
      email,
      username,
      payment_provider,
      amount,
      currency,
      qty,
      variant_id,
      sku,
      licensetime,
      license_type,
      renew_id,
      os_type,
      usernames,
      coupon_code,
      discount,
      source_url,
      selected_option,
      meta,
    } = parsed.data;
    const { order, paymentUrl } = await checkoutUserId({
      productId: product_id, email, suggestedUsername: username,
      paymentProvider: payment_provider, amount, currency
    });
    if (
      qty != null ||
      variant_id != null ||
      sku != null ||
      licensetime != null ||
      license_type != null ||
      renew_id != null ||
      os_type != null ||
      usernames != null ||
      coupon_code != null ||
      discount != null ||
      source_url != null ||
      selected_option != null ||
      meta != null
    ) {
      const cur = (order.meta ?? {}) as Record<string, any>;
      order.meta = {
        ...cur,
        qty,
        variant_id,
        sku,
        licensetime,
        license_type,
        renew_id,
        os_type,
        usernames,
        coupon_code,
        discount,
        source_url,
        selected_option,
        meta,
      };
    }
    return NextResponse.json({
      ok: true,
      order_id: order.id,
      status: order.status,
      provider: order.paymentProvider,
      provider_ref: order.providerRef,
      payment_url: paymentUrl
    });
  } catch (e:any) {
    if (e.status) return NextResponse.json(e.body ?? { message: e.message }, { status: e.status });
    return NextResponse.json({ message: e?.message ?? 'Server error' }, { status: 500 });
  }
}
