import { OrdersRepo } from '../repos/ordersRepo';
import { InventoryRepo } from '../repos/inventoryRepo';
import { notFound } from '../errors';
import { sendEmail } from '../email';
import { LicensesRepo } from '../repos/licensesRepo';
import { sendServerPurchaseMeasurement } from '../analytics/purchase';

export async function handlePaymentWebhook(providerRef:string, status:'paid'){
  const order = OrdersRepo.getByProviderRef(providerRef);
  if (!order) throw notFound('Order not found');
  if (status !== 'paid') return { ok:true };

  const basePurchasePayload = {
    transactionId: String(order.id),
    value: order.amount,
    currency: order.currency.toUpperCase(),
    coupon: order.meta?.couponCode ?? order.meta?.coupon_code,
    shipping: typeof order.meta?.shipping === 'number' ? order.meta.shipping : undefined,
    source: 'payment_webhook',
    items: [
      {
        item_id: String(order.productId),
        item_name: typeof order.meta?.productName === 'string' ? order.meta.productName : undefined,
        item_brand: typeof order.meta?.brand === 'string' ? order.meta.brand : undefined,
        item_category: typeof order.meta?.selectedOption === 'number' ? String(order.meta.selectedOption) : undefined,
        item_variant: order.meta?.variantId != null ? String(order.meta.variantId) : undefined,
        price: order.qty > 0 ? order.amount / order.qty : order.amount,
        quantity: order.qty,
      },
    ],
  };

  if (order.kind === 'roaming') {
    InventoryRepo.assign(order.productId, order.qty);
    OrdersRepo.update(order.id, { status: 'fulfilled' });
    await sendEmail('roaming_ready', order.email, { orderId: order.id, qty: order.qty });
  } else {
    const licenseKey = LicensesRepo.take(order.productId);
    if (licenseKey) {
      OrdersRepo.update(order.id, {
        status: 'fulfilled',
        meta: { ...(order.meta ?? {}), licenseKey }
      });
      await sendEmail('userid_ready', order.email, { orderId: order.id, licenseKey });
    } else {
      OrdersRepo.update(order.id, {
        status: 'pending_admin',
        meta: { ...(order.meta ?? {}), noStock: true }
      });
      await sendEmail('userid_out_of_stock', order.email, { orderId: order.id });
    }
  }

  try {
    await sendServerPurchaseMeasurement(basePurchasePayload);
  } catch (error) {
    console.error('[handlePaymentWebhook] purchase tracking failed', error);
  }

  return { ok:true };
}
