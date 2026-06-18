/**
 * Get the effective price of a variant, considering sale pricing.
 * Checks variant-level sale_price directly (> 0 and < regular price).
 * The onSale flag is kept for backward compatibility but not required.
 */
export function resolveVariantRegularPrice(v: any): number {
  const raw = v?.regular_price ?? v?.price ?? v?.cost ?? 0;
  return typeof raw === "string" ? parseFloat(raw) || 0 : Number(raw) || 0;
}

export function resolveVariantPrice(v: any, onSale: boolean): number {
  const regularPrice = resolveVariantRegularPrice(v);

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

export function resolveProductRegularPrice(product: any): number {
  const raw = product?.regular_price ?? product?.price ?? product?.cost ?? 0;
  return typeof raw === "string" ? parseFloat(raw) || 0 : Number(raw) || 0;
}

export function resolveCouponBaseUnitPrice(product: any, variant?: any | null): number {
  if (variant) {
    return resolveVariantRegularPrice(variant);
  }

  return resolveProductRegularPrice(product);
}

/**
 * Check if a variant has a valid sale price (sale_price > 0 and < regular price)
 */
export function isVariantOnSale(v: any): boolean {
  const regularPrice = resolveVariantRegularPrice(v);
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
