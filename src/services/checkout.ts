import { api } from './api';

export type Provider = 'stripe' | 'kriptomus';

export interface CheckoutResponse {
  ok: boolean;
  order_id: number;
  status: 'pending' | 'fulfilled' | 'pending_admin';
  provider: Provider;
  provider_ref: string;
  payment_url: string;
}

export interface CheckoutUserIdInput {
  product_id: number;
  email: string;
  username?: string;
  payment_provider: Provider;
  amount: number;
  currency: string;
}

export interface CheckoutRoamingInput {
  product_id: number;
  qty: number;
  email: string;
  payment_provider: Provider;
  amount: number;
  currency: string;
}

// Base público de WP (ej: https://encriptados.es/wp-json)
const WP_BASE =
  (process.env.NEXT_PUBLIC_WP_API || 'https://encriptados.es/wp-json').replace(/\/$/, '');

const BASE = `${WP_BASE}/encriptados/v1`;

export const CheckoutService = {
  userId: (input: CheckoutUserIdInput) =>
    api.post<CheckoutResponse>(`${BASE}/orders/userid`, input),

  roaming: (input: CheckoutRoamingInput) =>
    api.post<CheckoutResponse>(`${BASE}/orders/roaming`, input),
};
