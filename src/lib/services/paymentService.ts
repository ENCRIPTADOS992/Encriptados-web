import { OrdersRepo } from '../repos/ordersRepo';
import { InventoryRepo } from '../repos/inventoryRepo';
import { notFound } from '../errors';
import { sendEmail } from '../email';

export async function handlePaymentWebhook(providerRef:string, status:'paid'){
  const order = OrdersRepo.getByProviderRef(providerRef);
  if (!order) throw notFound('Order not found');
  if (status !== 'paid') return { ok:true };

  if (order.kind === 'roaming') {
    InventoryRepo.assign(order.productId, order.qty);
    OrdersRepo.update(order.id, { status: 'fulfilled' });
    await sendEmail('roaming_ready', order.email, { orderId: order.id, qty: order.qty });
  } else {
    OrdersRepo.update(order.id, { status: 'pending_admin' });
    await sendEmail('userid_pending', order.email, { orderId: order.id });
    console.log('[notify-admin] order pending_admin id=', order.id);
  }
  return { ok:true };
}
