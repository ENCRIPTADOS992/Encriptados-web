import { OrdersRepo } from '../repos/ordersRepo';
import { InventoryRepo } from '../repos/inventoryRepo';
import { notFound } from '../errors';
import { sendEmail } from '../email';
import { LicensesRepo } from '../repos/licensesRepo';

export async function handlePaymentWebhook(providerRef:string, status:'paid'){
  const order = OrdersRepo.getByProviderRef(providerRef);
  if (!order) throw notFound('Order not found');
  if (status !== 'paid') return { ok:true };

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
      console.log('[notify-admin] order pending_admin (no stock) id=', order.id);
    }
  }
  return { ok:true };
}
