/**
 * Get the effective price of a variant, considering sale pricing.
 * Checks variant-level sale_price directly (> 0 and < regular price).
 * The onSale flag is kept for backward compatibility but not required.
 */
export function resolveVariantPrice(v: any, onSale: boolean): number {
  const raw = v?.price ?? v?.cost ?? v?.regular_price ?? 0;
  const regularPrice = typeof raw === "string" ? parseFloat(raw) || 0 : Number(raw) || 0;

  // Check variant-level sale_price directly (no dependency on product-level flag)
  const sp = v?.sale_price;
  const salePrice =
    sp != null && sp !== ""
      ? typeof sp === "string"
        ? parseFloat(sp)
        : Number(sp)
      : NaN;
  if (!isNaN(salePrice) && salePrice > 0 && salePrice < regularPrice) {
    return salePrice;
  }

  return regularPrice;
}

/**
 * Check if a variant has a valid sale price (sale_price > 0 and < regular price)
 */
export function isVariantOnSale(v: any): boolean {
  const raw = v?.price ?? v?.cost ?? v?.regular_price ?? 0;
  const regularPrice = typeof raw === "string" ? parseFloat(raw) || 0 : Number(raw) || 0;
  const sp = v?.sale_price;
  const salePrice =
    sp != null && sp !== ""
      ? typeof sp === "string" ? parseFloat(sp) : Number(sp)
      : NaN;
  return !isNaN(salePrice) && salePrice > 0 && salePrice < regularPrice;
}

/** Helper to derive onSale boolean from a product object */
export function isProductOnSale(
  product: { on_sale?: boolean | string } | undefined | null,
): boolean {
  return (
    product?.on_sale === true || (product as any)?.on_sale === "true"
  );
}
