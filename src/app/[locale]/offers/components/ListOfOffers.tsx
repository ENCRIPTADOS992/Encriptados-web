"use client";

import React, { useMemo, useState, useEffect } from "react";
import FiltersOffers from "./FiltersOffers";
import { useTranslations, useLocale } from "next-intl";
import { BadgePercent } from "lucide-react";
import { useFormContext } from "react-hook-form";
import Loader from "@/shared/components/Loader";
import CardProduct from "@/app/[locale]/our-products/components/CardProduct";

const API_BASE = (process.env.NEXT_PUBLIC_WP_API ?? "https://encriptados.es/wp-json") + "/encriptados/v3/store/products";

/** Build badges for an offer product, replicating the same logic as ListOfProducts (home). */
function buildOfferBadges(
  product: any,
  categoryId: number,
  matchedVariant: any,
  t: (key: string) => string,
): { tag?: string; country?: { label: string; code?: string } } | undefined {
  const simName = (product.name ?? "").toLowerCase().trim();
  const skuLower = (product.sku ?? "").toLowerCase().trim();
  const providerLower = (product.provider ?? "").toLowerCase().trim();
  const isTimProvider = providerLower === "tim" || providerLower.includes("tim");
  const minuteUnit = t("minuteAbbr");
  const monthsLabel = t("monthsLabel");

  // ---------- Category 40: SIMs ----------
  if (categoryId === 40) {
    const isMinutesSku = skuLower.includes("minutes") || skuLower.includes("minute");
    const isMinutosProduct =
      isMinutesSku ||
      /minut(os?|es?|i)/i.test(simName) ||
      /(recarga|recharge|ricarica)\s*minut/i.test(simName);
    const isDataProduct =
      /(datos?|data|dati|donn[ée]es|dados)/i.test(simName) ||
      /esim\s*\+\s*(recarga|recharge|ricarica)?\s*(datos?|data|dati|donn[ée]es|dados)/i.test(simName) ||
      /(recarga|recharge|ricarica)\s+(datos?|data|dati|donn[ée]es|dados)/i.test(simName);

    const sv = matchedVariant || product.variants?.[0];

    if (isMinutosProduct && sv) {
      let minutesValue = sv.minutes;
      if (!minutesValue && sv.attributes) {
        const attr = (sv.attributes as { name: string; option: string }[])?.find(
          (a: { name: string }) => /minuto/i.test(a.name),
        );
        if (attr) minutesValue = parseInt(attr.option, 10) || undefined;
      }
      if (!minutesValue) {
        const price = Number(sv.price) || Number(sv.cost) || 0;
        if (price > 0) minutesValue = Math.floor(price / 2);
      }
      if (minutesValue) return { tag: `${minutesValue} ${minuteUnit}` };
    }

    if (isDataProduct && sv) {
      const gbNum = typeof sv.gb === "number" ? sv.gb : parseInt(sv.gb, 10);
      if (gbNum > 0) return { tag: `${gbNum} GB` };
      if (sv.planTag) return { tag: sv.planTag };
      if (sv.name) {
        const gbMatch = sv.name.match(/(\d+)\s*GB/i);
        if (gbMatch) return { tag: `${gbMatch[1]} GB` };
      }
    }

    // TIM products may have GB tag
    if (isTimProvider && sv) {
      const gbNum = typeof sv.gb === "number" ? sv.gb : parseInt(sv.gb, 10);
      if (gbNum > 0) return { tag: `${gbNum} GB` };
      if (sv.planTag) return { tag: sv.planTag };
    }

    // Other SIMs (eSIM, Sim Física) — no badge
    return undefined;
  }

  // ---------- Category 38 (Apps) / 35 (Sistemas) / 36 (Router) ----------
  if (categoryId === 38 || categoryId === 35 || categoryId === 36) {
    const isUnique = (value: unknown) => {
      if (value === 0 || value === "0") return true;
      if (!value) return false;
      const n = String(value).trim().toLowerCase();
      return n === "única" || n === "unica" || n === "unique" || n === "single" || n === "one-time";
    };
    const isFree = (value: unknown) => {
      if (!value) return false;
      const n = String(value).trim().toLowerCase();
      return n === "gratis" || n === "free" || n === "prueba" || /^pre[\-\s]?activ/i.test(n);
    };

    // Try variant licensetime first, then product-level
    const time =
      matchedVariant?.licensetime ||
      product.variants?.[0]?.licensetime ||
      (product as any).licenseVariants?.[0]?.licensetime ||
      product.licensetime;

    if (time) {
      if (isUnique(time)) return { tag: t("uniqueLicense") };
      if (isFree(time)) return { tag: t("freeTrial") || "Pre-Activación" };
      return { tag: `${time} ${monthsLabel}` };
    }
  }

  return undefined;
}

const ListOfOffers = () => {
  const o = useTranslations("OffersPage");
  const t = useTranslations("BneSimPage.simSelection");
  const locale = useLocale();

  const { watch } = useFormContext();
  const currentOfferType = watch("currentoffer") || "sims";

  const [simsOffers, setSimsOffers] = useState<any[]>([]);
  const [appsOffers, setAppsOffers] = useState<any[]>([]);
  const [systemsOffers, setSystemsOffers] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    let mounted = true;
    setIsFetching(true);

    const fetchAndFilter = async (categoryId: number): Promise<any[]> => {
      try {
        const url = `${API_BASE}?category_id=${categoryId}&lang=${locale}`;
        const response = await fetch(url);
        const data = await response.json();
        const rawProducts: any[] = data?.products || [];

        // The API returns one row per expanded variant, each with its own
        // on_sale flag and sale_price. Show every on-sale variant as its own card.
        const onSale = rawProducts.filter((p) => p.on_sale === true);

        return onSale;
      } catch (err) {
        console.error(`Error fetching cat ${categoryId}:`, err);
        return [];
      }
    };

    const fetchAll = async () => {
      const [sims, apps, systems] = await Promise.all([
        fetchAndFilter(40),
        fetchAndFilter(38),
        fetchAndFilter(35),
      ]);

      if (mounted) {
        setSimsOffers(sims);
        setAppsOffers(apps);
        setSystemsOffers(systems);
        setIsFetching(false);
      }
    };

    fetchAll();
    return () => { mounted = false; };
  }, [locale]);

  // Map tab value to the correct offers list
  const activeOffers = useMemo(() => {
    if (currentOfferType === "sims") return simsOffers;
    if (currentOfferType === "aplicaciones") return appsOffers;
    if (currentOfferType === "sistemas") return systemsOffers;
    return [];
  }, [currentOfferType, simsOffers, appsOffers, systemsOffers]);

  return (
    <div className="flex flex-col justify-center items-center mx-auto">
      <h2 className="text-white font-bold mb-6 text-[24px] sm:text-[30px] lg:text-[38px] leading-[1.3]">{o("exclusiveOffersTitle")}</h2>
      <div className="w-full max-w-[720px] mx-auto">
        <FiltersOffers
          items={[
            { label: o("menu.sims"), value: "sims" },
            { label: o("menu.apps"), value: "aplicaciones" },
            { label: o("menu.system"), value: "sistemas" },
          ]}
          name={"currentoffer"}
        />
      </div>

      {isFetching ? (
        <div className="flex justify-center items-center w-full mt-12 mb-12 min-h-[400px]">
          <Loader />
        </div>
      ) : activeOffers.length === 0 ? (
        <div className="flex items-center justify-center w-full mt-9">
          <div className="w-full max-w-[1036px] bg-[#0A0A0A] rounded-[30px] p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 min-h-[400px]">
            <div className="flex flex-col items-center md:items-start gap-4 max-w-[320px]">
              <BadgePercent className="w-12 h-12 text-[#FFFFFF]" />
              <p
                className="text-[#FFFFFF] text-[24px] md:text-[34px] leading-[100%] tracking-normal text-center md:text-left"
                style={{ fontWeight: 300, fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                {o("noOffers")}
              </p>
            </div>
            <div className="w-full md:w-auto flex justify-center">
              <img
                src="/images/offers/Web search-pana.webp"
                alt="No offers available"
                className="w-full max-w-[280px] md:max-w-[340px] lg:max-w-[420px]"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full mt-9 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full">
            {activeOffers.map((product, idx) => {
              const categoryId = product.category?.id || 0;
              const variantId = product.selected_variant_id || null;
              const matchedVariant = variantId && product.variants?.length
                ? product.variants.find((v: any) => v.id === variantId)
                : null;

              // Use the same badge logic as the home product grid
              const badges = buildOfferBadges(product, categoryId, matchedVariant, t);

              return (
                <CardProduct
                  key={`offer-${product.id}-${variantId || idx}`}
                  id={product.id}
                  priceDiscount={String(product.sale_price)}
                  productImage={product.images?.[0]?.src ?? ""}
                  features={[]}
                  priceRange={`${product.sale_price}$`}
                  headerIcon={""}
                  headerTitle={product.name}
                  badges={badges}
                  filters={{
                    selectedOption: String(categoryId),
                    provider: product.provider || "all",
                    os: "all",
                    license: "all",
                    encriptadosprovider: "all",
                    timprovider: "all",
                    regionOrCountry: "all",
                    regionOrCountryType: "region",
                    simRegion: "all",
                    simCountry: "all",
                    simCountryLabel: "",
                    searchQuery: "",
                  }}
                  checks={product.checks || []}
                  provider={product.provider}
                  typeProduct={product.type_product}
                  variants={product.variants?.length > 0 ? product.variants : undefined}
                  variantId={variantId}
                  onSale={true}
                  regularPrice={Number(product.price)}
                  iconUrl={product.iconUrl}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListOfOffers;
