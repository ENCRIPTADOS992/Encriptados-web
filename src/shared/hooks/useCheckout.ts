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
      });
      setLastOrderId(res.order_id);
      window.location.href = res.payment_url;
      return res;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, lastOrderId, payUserId, payRoaming };
}
