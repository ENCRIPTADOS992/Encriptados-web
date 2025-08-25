import type { Order } from '@/lib/orders/types';

let idCounter = 1;
const orders = new Map<number, Order>();
const refIndex = new Map<string, number>();

export const OrdersRepo = {
  create(o: Omit<Order,'id'|'createdAt'>): Order {
    const id = idCounter++;
    const createdAt = new Date().toISOString();
    const order: Order = { id, createdAt, ...o };
    orders.set(id, order);
    refIndex.set(order.providerRef, id);
    return order;
  },
  getById(id:number){ return orders.get(id) ?? null; },
  getByProviderRef(ref:string){
    const id = refIndex.get(ref); return id ? orders.get(id)! : null;
  },
  update(id:number, patch: Partial<Order>): Order | null {
    const cur = orders.get(id); if(!cur) return null;
    const next = { ...cur, ...patch };
    orders.set(id, next);
    return next;
  }
};
