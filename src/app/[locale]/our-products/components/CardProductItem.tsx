"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import type { Product } from "@/features/products/types/AllProductsResponse";
import { FC, useState, MouseEvent, useMemo } from "react";
import { useTranslations } from "next-intl";
import { getProductLink } from "@/shared/utils/productRouteResolver";

interface CardProductItemProps {
  product: Product;
  showPeriodSelector?: boolean;
  periodOptions?: string[];
}

/** Returns the cheapest numeric price across all variant sources, or falls back to product.price */
function getMinPrice(product: Product): string {
  const candidates: number[] = [];

  const base = parseFloat(product.price);
  if (!isNaN(base) && base > 0) candidates.push(base);

  product.licenseVariants?.forEach((v) => {
    const p = typeof v.price === "number" ? v.price : parseFloat(String(v.price));
    if (!isNaN(p) && p > 0) candidates.push(p);
    if (v.sale_price != null) {
      const sp = typeof v.sale_price === "number" ? v.sale_price : parseFloat(String(v.sale_price));
      if (!isNaN(sp) && sp > 0) candidates.push(sp);
    }
  });

  product.variants?.forEach((v) => {
    const p = v.price ?? v.cost;
    if (p != null) {
      const n = typeof p === "number" ? p : parseFloat(String(p));
      if (!isNaN(n) && n > 0) candidates.push(n);
    }
    if (v.sale_price != null) {
      const sp = typeof v.sale_price === "number" ? v.sale_price : parseFloat(String(v.sale_price));
      if (!isNaN(sp) && sp > 0) candidates.push(sp);
    }
  });

  if (candidates.length === 0) return product.price;
  const min = Math.min(...candidates);
  return Number.isInteger(min) ? String(min) : min.toFixed(2);
}

/**
 * Returns the WooCommerce variant id of the cheapest variant,
 * considering sale_price when lower than price.
 * Returns null if the product has no variants.
 */
function getCheapestVariantId(product: Product): number | null {
  type Entry = { id: number; effectivePrice: number };
  const entries: Entry[] = [];

  product.licenseVariants?.forEach((v) => {
    const p = Number(v.price);
    const sp = v.sale_price != null ? Number(v.sale_price) : null;
    const effective = sp != null && sp > 0 && sp < p ? sp : p;
    if (!isNaN(effective) && effective > 0) entries.push({ id: v.id, effectivePrice: effective });
  });

  product.variants?.forEach((v) => {
    const raw = v.price ?? v.cost;
    if (raw == null) return;
    const p = Number(raw);
    const sp = v.sale_price != null ? Number(v.sale_price) : null;
    const effective = sp != null && sp > 0 && sp < p ? sp : p;
    if (!isNaN(effective) && effective > 0) entries.push({ id: v.id, effectivePrice: effective });
  });

  if (entries.length === 0) return null;
  return entries.reduce((min, e) => (e.effectivePrice < min.effectivePrice ? e : min)).id;
}

const CardProductItem: FC<CardProductItemProps> = ({
  product,
  showPeriodSelector = false,
  periodOptions = [],
}) => {
  const [period, setPeriod] = useState(periodOptions[0] || "");
  const { openModal } = useModalPayment();
  const router = useRouter();
  const t = useTranslations("OurProductsPage.productCard");

  const minPrice = useMemo(() => getMinPrice(product), [product]);

  const handleMoreInfo = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const route = getProductLink(
      product.name,
      product.category?.id ?? 0,
      product.id,
      product.provider,
      product.type_product,
    );

    if (!route) return;

    const params = new URLSearchParams();
    if (product.id) params.set("productId", String(product.id));
    const cheapestId = getCheapestVariantId(product);
    if (cheapestId != null) params.set("variantId", String(cheapestId));
    const qs = params.toString();
    const url = qs ? `${route}?${qs}` : route;
    router.push(url);
  };

  return (
    <div className="bg-[#181818] dark:bg-[#131313] text-black dark:text-white rounded-2xl overflow-hidden w-full max-w-[305px] shadow-lg">
      {/* Image with padding so it breathes from card edges */}
      <div className="px-3 pt-3">
        <div className="relative w-full h-36 rounded-xl overflow-hidden">
          <Image
            src={product.images[0]?.src || "/images/fallback.png"}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="px-6 pt-4 pb-6">
      <h3 className="text-xl text-white font-bold text-center mb-2">
        {product.name}
      </h3>

      <p className="text-center text-xs text-white dark:text-gray-400 mb-4">
        Desde ${minPrice} USD
      </p>

      {showPeriodSelector && (
        <div className="flex justify-center gap-3 mb-4">
          {periodOptions.map((option) => {
            const selected = period === option;
            return (
              <button
                key={option}
                onClick={() => setPeriod(option)}
                className={`px-4 py-1 rounded-full border text-sm font-medium transition-all duration-200 ${selected
                    ? "bg-[#10B4E7] text-white border-[#10B4E7]"
                    : "border-gray-400 text-gray-600"
                  }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}

      <div className="flex flex-col gap-3">
        <button
          onClick={() =>
            openModal({
              productid: product.id.toString(),
              languageCode: "es",
              iconUrl: product.iconUrl,
            })
          }
          type="button"
          className="w-full bg-[#10B4E7] hover:bg-[#7EE0FF] text-black font-bold py-2 rounded-lg transition-colors border-none outline-none ring-0"
        >{t("buy")}
        </button>

        <button
          onClick={handleMoreInfo}
          className="text-sm font-semibold text-[#10B4E7] underline hover:text-[#7EE0FF] transition-colors border-none outline-none ring-0 bg-transparent"
        >
          {t("moreInfo")}
        </button>
      </div>
      </div>
    </div>
  );
};

export default CardProductItem;
