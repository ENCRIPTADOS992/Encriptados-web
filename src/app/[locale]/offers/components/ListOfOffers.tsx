"use client";

"use client";

import React from "react";
import FiltersOffers from "./FiltersOffers";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { useGetProducts } from "@/features/products/queries/useGetProducts";
import type { Product } from "@/features/products/types/AllProductsResponse";
import CardProduct from "@/app/[locale]/our-products/components/CardProduct";

const CATEGORY_BY_OFFER: Record<string, number> = {
  sims: 40,
  apps: 38,
  system: 35,
};

const ListOfOffers = () => {
  const o = useTranslations("OffersPage");
  const { watch } = useFormContext();
  const current = watch("currentoffer") ?? "sims";
  const categoryId = CATEGORY_BY_OFFER[current] ?? 40;

  const { data, isFetching } = useGetProducts(categoryId, "encriptados");
  const products = (data ?? []) as Product[];

  const discounted = products.filter((p) => {
    const price = parseFloat(p.price ?? "0");
    const sale = parseFloat(p.sale_price ?? "0");
    return Boolean(p.on_sale) || (sale > 0 && sale < price);
  });

  return (
    <div className="flex flex-col justify-center items-center mx-auto">
      <h2 className="text-white font-bold mb-6 text-[24px] sm:text-[30px] lg:text-[38px] leading-[1.3]">{o("exclusiveOffersTitle")}</h2>
      <div className="w-full max-w-[720px] mx-auto">
        <FiltersOffers
          items={[
            { label: o("menu.sims"), value: "sims" },
            { label: o("menu.apps"), value: "apps" },
            { label: o("menu.system"), value: "system" },
          ]}
          name={"currentoffer"}
        />
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-black mt-9 min-h-[320px] sm:min-h-[420px]">
          {isFetching && (
            <div className="col-span-full text-white">Cargando ofertas…</div>
          )}
          {!isFetching && discounted.length === 0 && (
            <div className="col-span-full">
              <div className="w-full bg-[#111111] rounded-2xl px-6 py-10 text-center text-white/80 min-h-[320px] sm:min-h-[420px] flex items-center justify-center">
                <p className="text-base sm:text-lg">No hay productos en oferta en esta categoría.</p>
              </div>
            </div>
          )}
          {!isFetching && discounted.map((p, index) => {
            const filters = {
              selectedOption: String(categoryId),
              provider: "encriptados",
              os: "all",
              license: "all",
              encriptadosprovider: "all",
              timprovider: "all",
            } as any;
            return (
              <CardProduct
                key={`offer-${p.id}-${index}`}
                id={p.id}
                priceDiscount={p.sale_price}
                productImage={p.images?.[0]?.src ?? ""}
                features={[]}
                priceRange={`${p.price}$`}
                headerIcon={""}
                headerTitle={p.name}
                filters={filters}
                checks={p.checks || []}
                badges={undefined}
                provider={p.provider}
                planDataAmount={p.plan_data_amount}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListOfOffers;
