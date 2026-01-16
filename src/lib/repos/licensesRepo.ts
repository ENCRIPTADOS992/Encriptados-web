type LicenseKey = string;

const keysByProduct = new Map<number, LicenseKey[]>();

export const LicensesRepo = {
  add(productId: number, keys: LicenseKey[]) {
    const cur = keysByProduct.get(productId) ?? [];
    keysByProduct.set(productId, [...cur, ...keys.filter(Boolean)]);
    return { ok: true, productId, added: keys.length, total: (keysByProduct.get(productId) ?? []).length };
  },
  take(productId: number): LicenseKey | null {
    const cur = keysByProduct.get(productId) ?? [];
    if (cur.length === 0) return null;
    const [first, ...rest] = cur;
    keysByProduct.set(productId, rest);
    return first ?? null;
  },
  count(productId: number): number {
    return (keysByProduct.get(productId) ?? []).length;
  },
};

