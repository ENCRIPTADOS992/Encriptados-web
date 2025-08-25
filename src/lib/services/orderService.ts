import { OrdersRepo } from '../repos/ordersRepo';
import { InventoryRepo } from '../repos/inventoryRepo';
import { conflict } from '../errors';
import type { Provider, Order } from '../orders/types';
import { createPayment } from '../payments';

export async function checkoutRoaming(input: {
  productId:number, qty:number, email:string, paymentProvider:Provider,
  amount:number, currency:string
}): Promise<{ order:Order, paymentUrl:string }> {
  if (!InventoryRepo.hasStock(input.productId, input.qty)) {
    throw conflict('out_of_stock', { code:'out_of_stock', message:'Stock insuficiente' });
  }
  const ok = InventoryRepo.reserve(input.productId, input.qty);
  if (!ok) {
    throw conflict('out_of_stock', { code:'out_of_stock', message:'Stock insuficiente' });
  }

  // 1) Crear referencia de pago en el proveedor (url real si hay claves)
  const pay = await createPayment(input.paymentProvider, {
    amount: input.amount,
    currency: input.currency,
    email: input.email,
    metadata: { kind: 'roaming', productId: String(input.productId), qty: String(input.qty) },
  });

  // 2) Crear orden
  const order = OrdersRepo.create({
    kind: 'roaming',
    productId: input.productId,
    qty: input.qty,
    email: input.email,
    paymentProvider: input.paymentProvider,
    amount: input.amount,
    currency: input.currency,
    providerRef: pay.providerRef,
    status: 'pending',
    meta: {}
  });

  return { order, paymentUrl: pay.paymentUrl };
}

export async function checkoutUserId(input: {
  productId:number, email:string, suggestedUsername?:string,
  paymentProvider:Provider, amount:number, currency:string
}): Promise<{ order:Order, paymentUrl:string }> {
  const pay = await createPayment(input.paymentProvider, {
    amount: input.amount,
    currency: input.currency,
    email: input.email,
    metadata: { kind: 'userid', productId: String(input.productId), suggestedUsername: input.suggestedUsername ?? '' },
  });

  const order = OrdersRepo.create({
    kind: 'userid',
    productId: input.productId,
    qty: 1,
    email: input.email,
    suggestedUsername: input.suggestedUsername,
    paymentProvider: input.paymentProvider,
    amount: input.amount,
    currency: input.currency,
    providerRef: pay.providerRef,
    status: 'pending',
    meta: {}
  });

  return { order, paymentUrl: pay.paymentUrl };
}
