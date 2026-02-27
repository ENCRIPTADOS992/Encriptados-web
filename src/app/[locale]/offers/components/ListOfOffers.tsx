"use client";

import React, { useMemo, useState, useEffect } from "react";
import FiltersOffers from "./FiltersOffers";
import { useTranslations, useLocale } from "next-intl";
import { BadgePercent } from "lucide-react";
import { useFormContext } from "react-hook-form";
import Loader from "@/shared/components/Loader";
import CardProduct from "@/app/[locale]/our-products/components/CardProduct";

const API_BASE = "https://encriptados.es/wp-json/encriptados/v1/products/by-category-language";

const ListOfOffers = () => {
  const o = useTranslations("OffersPage");
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

        // Step 1: Deduplicate — the API returns one row per selected variant,
        // so the same product id appears multiple times. Keep only the first.
        const seen = new Set<number>();
        const unique: any[] = [];
        for (const p of rawProducts) {
          if (!seen.has(p.id)) {
            seen.add(p.id);
            unique.push(p);
          }
        }

        // Step 2: Filter — only products where on_sale === true (boolean)
        // Some products have sale_price === price which is NOT a real sale.
        // The `on_sale` boolean from WooCommerce is the source of truth.
        const onSale = unique.filter((p) => p.on_sale === true);

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
            {activeOffers.map((product) => {
              const categoryId = product.category?.id || 0;

              return (
                <CardProduct
                  key={`offer-${product.id}`}
                  id={product.id}
                  priceDiscount={String(product.sale_price)}
                  productImage={product.images?.[0]?.src ?? ""}
                  features={[]}
                  priceRange={`${product.sale_price}$`}
                  headerIcon={""}
                  headerTitle={product.name}
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
