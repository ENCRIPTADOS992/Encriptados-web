import Stripe from 'stripe';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;
const stripe = STRIPE_SECRET_KEY
  ? new Stripe(STRIPE_SECRET_KEY)
  : null;

export async function createStripeCheckout(args: {
  amount: number;                // ej. 99.00
  currency: string;              // 'USD'
  email: string;                 // customer email
  metadata?: Record<string, string>;
}) {
  if (!stripe) {
    const ref = 'stub_' + Math.random().toString(36).slice(2, 14);
    return { providerRef: ref, paymentUrl: `https://checkout.example/placeholder/${ref}`, stub: true };
  }

  const unit_amount = Math.round(args.amount * 100); // en centavos
  const success_url = process.env.CHECKOUT_SUCCESS_URL || 'https://encriptados.io/checkout/success';
  const cancel_url  = process.env.CHECKOUT_CANCEL_URL  || 'https://encriptados.io/checkout/cancel';

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: args.email,
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: args.currency.toLowerCase(),
          product_data: { name: 'Encriptados - Compra' },
          unit_amount,
        },
        quantity: 1,
      },
    ],
    metadata: args.metadata,
    success_url: success_url + '?session_id={CHECKOUT_SESSION_ID}',
    cancel_url,
  });

  if (!session.url || !session.id) {
    throw new Error('No se pudo crear la sesión de checkout de Stripe');
  }

  return { providerRef: session.id, paymentUrl: session.url, stub: false };
}
