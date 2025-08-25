import { createStripeCheckout } from './stripe';
import { createKriptomusInvoice } from './kriptomus';

export async function createPayment(provider: 'stripe'|'kriptomus', args: {
  amount: number;            // decimal (USD)
  currency: string;          // 'USD'
  email: string;
  metadata?: Record<string, string>;
}) {
  const mode = (process.env.PAYMENTS_MODE || 'auto').toLowerCase();

  const useStub =
    mode === 'stub' ||
    (provider === 'stripe' && !process.env.STRIPE_SECRET_KEY) ||
    (provider === 'kriptomus' && !process.env.API_CRYPTO_MUS);

  if (useStub) {
    const ref = 'stub_' + Math.random().toString(36).slice(2, 14);
    const url = `https://checkout.example/placeholder/${ref}`;
    return { providerRef: ref, paymentUrl: url, stub: true };
  }

  if (provider === 'stripe') {
    return createStripeCheckout(args);
  }
  return createKriptomusInvoice(args);
}
