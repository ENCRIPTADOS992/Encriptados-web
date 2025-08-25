import { OrdersRepo } from '../repos/ordersRepo';
import { notFound, conflict } from '../errors';
import { sendEmail } from '../email';

export async function completeUserIdOrder(orderId:number, finalUsername:string, finalPassword:string){
  const order = OrdersRepo.getById(orderId);
  if (!order) throw notFound('Order not found');
  if (order.kind !== 'userid' || order.status !== 'pending_admin') {
    throw conflict('Order not eligible', { message:'La orden no está en pending_admin o no es userid' });
  }
  OrdersRepo.update(orderId, { status: 'fulfilled', meta: { ...order.meta, finalUsername } });
  await sendEmail('userid_ready', order.email, { finalUsername, finalPassword, orderId });
  return { ok:true };
}
