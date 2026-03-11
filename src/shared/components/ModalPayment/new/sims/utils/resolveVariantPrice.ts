/**
 * Get the effective price of a variant, considering sale pricing.
 * When onSale is true, returns sale_price if available and > 0.
 */
export function resolveVariantPrice(v: any, onSale: boolean): number {
  if (onSale) {
    const sp = v?.sale_price;
    const n =
      sp != null && sp !== ""
        ? typeof sp === "string"
          ? parseFloat(sp)
          : Number(sp)
        : NaN;
    if (!isNaN(n) && n > 0) return n;
  }
  const raw = v?.price ?? v?.cost ?? v?.regular_price ?? 0;
  return typeof raw === "string" ? parseFloat(raw) || 0 : Number(raw) || 0;
}

/** Helper to derive onSale boolean from a product object */
export function isProductOnSale(
  product: { on_sale?: boolean | string } | undefined | null,
): boolean {
  return (
    product?.on_sale === true || (product as any)?.on_sale === "true"
  );
}
