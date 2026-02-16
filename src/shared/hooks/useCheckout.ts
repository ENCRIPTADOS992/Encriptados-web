'use client';

import { useCallback, useState } from 'react';
import { CheckoutService } from '@/services/checkout';

type Provider = 'stripe' | 'kriptomus';

export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [lastOrderId, setLastOrderId] = useState<number | null>(null);

  const payUserId = useCallback(async (args: {
    productId: number;
    email: string;
    username?: string;
    provider: Provider;
    amount: number;
    currency: string;
    qty?: number;
    variantId?: number;
    sku?: string;
    licensetime?: number | string;
    licenseType?: "new" | "renew";
    renewId?: string;
    osType?: "android" | "ios";
    silentPhoneMode?: string;
    usernames?: string[];
    couponCode?: string;
    discount?: number;
    sourceUrl?: string;
    selectedOption?: number;
    meta?: Record<string, any>;
  }) => {
    setLoading(true);
    try {
      const res = await CheckoutService.userId({
        product_id: args.productId,
        email: args.email,
        username: args.username,
        payment_provider: args.provider,
        amount: args.amount,
        currency: args.currency,
        qty: args.qty,
        variant_id: args.variantId,
        sku: args.sku,
        licensetime: args.licensetime,
        license_type: args.licenseType,
        renew_id: args.renewId,
        system: args.osType,
        silent_phone_mode: args.silentPhoneMode,
        usernames: args.usernames,
        coupon_code: args.couponCode,
        discount: args.discount,
        source_url: args.sourceUrl,
        selected_option: args.selectedOption,
        meta: args.meta,
      });
      setLastOrderId(res.order_id);
      window.location.href = res.payment_url; // redirige al checkout
      return res;
    } finally {
      setLoading(false);
    }
  }, []);

  const payRoaming = useCallback(async (args: {
    productId: number;
    qty: number;
    email: string;
    provider: Provider;
    amount: number;
    currency: string;
    variantId?: number;
    sku?: string;
    licensetime?: number | string;
    couponCode?: string;
    discount?: number;
    sourceUrl?: string;
    selectedOption?: number;
    silentPhoneMode?: string;
    usernames?: string[];
    osType?: "android" | "ios";
    meta?: Record<string, any>;
  }) => {
    setLoading(true);
    try {
      const res = await CheckoutService.roaming({
        product_id: args.productId,
        qty: args.qty,
        email: args.email,
        payment_provider: args.provider,
        amount: args.amount,
        currency: args.currency,
        variant_id: args.variantId,
        sku: args.sku,
        licensetime: args.licensetime,
        coupon_code: args.couponCode,
        discount: args.discount,
        source_url: args.sourceUrl,
        selected_option: args.selectedOption,
        silent_phone_mode: args.silentPhoneMode,
        usernames: args.usernames,
        system: args.osType,
        meta: args.meta,
      });
      setLastOrderId(res.order_id);
      window.location.href = res.payment_url;
      return res;
    } finally {
      setLoading(false);
    }
  }, []);

  const payRenewal = useCallback(async (args: {
    productId: number;
    licenseIds: string[];
    email: string;
    provider: Provider;
    amount: number;
    currency: string;
    qty?: number;
    months: number;
    couponCode?: string;
    discount?: number;
  }) => {
    setLoading(true);
    try {
      const res = await CheckoutService.renewal({
        product_id: args.productId,
        license_ids: args.licenseIds,
        email: args.email,
        qty: args.qty,
        months: args.months,
        payment_provider: args.provider,
        amount: args.amount,
        currency: args.currency,
        coupon_code: args.couponCode,
        discount: args.discount,
      });
      setLastOrderId(res.order_id);
      window.location.href = res.payment_url;
      return res;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, lastOrderId, payUserId, payRoaming, payRenewal };
}
