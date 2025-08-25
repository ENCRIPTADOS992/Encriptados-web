export async function createKriptomusInvoice(args: {
  amount: number;
  currency: string;
  email: string;
  metadata?: Record<string, string>;
}) {
  const apiUrl = process.env.API_CRYPTO_MUS;
  if (!apiUrl) {
    const ref = 'stub_' + Math.random().toString(36).slice(2, 14);
    return { providerRef: ref, paymentUrl: `https://checkout.example/placeholder/${ref}`, stub: true };
  }

  // Payload genérico; adapta los campos esperados por tu proxy si hace falta
  const body = {
    amount: args.amount,
    currency: args.currency,
    email: args.email,
    metadata: args.metadata ?? {},
  };

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, // tu proxy acepta JSON; si fuera raw, cámbialo
    body: JSON.stringify(body),
  });

  const data: any = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message = data?.message || 'Error creando invoice en Kriptomus';
    throw new Error(message);
  }

  const paymentUrl =
    data?.payment_url || data?.url || data?.result?.url || data?.link;
  const providerRef =
    data?.provider_ref || data?.invoice_id || data?.result?.invoice_id || data?.uuid;

  if (!paymentUrl || !providerRef) {
    const ref = 'stub_' + Math.random().toString(36).slice(2, 14);
    return { providerRef: ref, paymentUrl: `https://checkout.example/placeholder/${ref}`, stub: true };
  }

  return { providerRef, paymentUrl, stub: false };
}
