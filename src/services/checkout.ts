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
  qty?: number;
  variant_id?: number;
  sku?: string;
  licensetime?: number | string;
  license_type?: 'new' | 'renew';
  renew_id?: string;
  system?: 'android' | 'ios';
  usernames?: string[];
  coupon_code?: string;
  discount?: number;
  source_url?: string;
  selected_option?: number;
  meta?: Record<string, any>;
}

export interface CheckoutRoamingInput {
  product_id: number;
  qty: number;
  email: string;
  payment_provider: Provider;
  amount: number;
  currency: string;
  variant_id?: number;
  sku?: string;
  licensetime?: number | string;
  coupon_code?: string;
  discount?: number;
  source_url?: string;
  selected_option?: number;
  system?: 'android' | 'ios';
  meta?: Record<string, any>;
}

export interface CheckoutRenewalInput {
  product_id: number;
  license_ids: string[];
  email: string;
  qty?: number;
  months: number;
  payment_provider: Provider;
  amount: number;
  currency: string;
  coupon_code?: string;
  discount?: number;
}

// Base público de WP (ej: https://encriptados.es/wp-json)
const WP_BASE =
  (process.env.NEXT_PUBLIC_WP_API || 'https://encriptados.es/wp-json').replace(/\/$/, '');

const BASE = `${WP_BASE}/encriptados/v1`;

const omitUndefined = (obj: Record<string, any>) => {
  const out: Record<string, any> = {};
  Object.entries(obj).forEach(([k, v]) => {
    if (v !== undefined) out[k] = v;
  });
  return out;
};

export const CheckoutService = {
  userId: async (input: CheckoutUserIdInput) => {
    const minimal = omitUndefined({
      product_id: input.product_id,
      email: input.email,
      username: input.username,
      payment_provider: input.payment_provider,
      amount: input.amount,
      currency: input.currency,
    });
    // Asegurar que months siempre se envíe (derivado de licensetime)
    const lt = input.licensetime;
    const months = lt == null ? undefined : (typeof lt === 'string' ? parseInt(lt) || undefined : lt || undefined);
    const extended = omitUndefined({ ...minimal, ...input, months });
    try {
      return await api.post<CheckoutResponse>(`${BASE}/orders/userid`, extended);
    } catch (e: any) {
      if (e?.status === 400 || e?.status === 422) {
        return await api.post<CheckoutResponse>(`${BASE}/orders/userid`, minimal);
      }
      throw e;
    }
  },

  roaming: async (input: CheckoutRoamingInput) => {
    const minimal = omitUndefined({
      product_id: input.product_id,
      qty: input.qty,
      email: input.email,
      payment_provider: input.payment_provider,
      amount: input.amount,
      currency: input.currency,
    });
    // Asegurar que months siempre se envíe (derivado de licensetime)
    const lt = input.licensetime;
    const months = lt == null ? undefined : (typeof lt === 'string' ? parseInt(lt) || undefined : lt || undefined);
    const extended = omitUndefined({ ...minimal, ...input, months });
    try {
      return await api.post<CheckoutResponse>(`${BASE}/orders/roaming`, extended);
    } catch (e: any) {
      if (e?.status === 400 || e?.status === 422) {
        return await api.post<CheckoutResponse>(`${BASE}/orders/roaming`, minimal);
      }
      throw e;
    }
  },

  renewal: async (input: CheckoutRenewalInput) => {
    const payload = omitUndefined({
      product_id: input.product_id,
      license_ids: input.license_ids,
      email: input.email,
      qty: input.qty,
      months: input.months,
      payment_provider: input.payment_provider,
      amount: input.amount,
      currency: input.currency,
      coupon_code: input.coupon_code,
      discount: input.discount,
    });
    return await api.post<CheckoutResponse>(`${BASE}/orders/renewal`, payload);
  },
};
