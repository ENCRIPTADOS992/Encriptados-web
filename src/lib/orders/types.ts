export type Provider = 'stripe' | 'kriptomus';
export type OrderKind = 'roaming' | 'userid';
export type OrderStatus = 'pending' | 'fulfilled' | 'pending_admin';

export interface Order {
  id: number;
  kind: OrderKind;
  productId: number;
  qty: number;
  email: string;
  suggestedUsername?: string | null;
  paymentProvider: Provider;
  amount: number;
  currency: string;
  providerRef: string;
  status: OrderStatus;
  createdAt: string;
  meta?: Record<string, any>;
}
