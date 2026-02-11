"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { useGetProducts } from "@/features/products/queries/useGetProducts";
import type { Product } from "@/features/products/types/AllProductsResponse";
import { getProductLink } from "@/utils/productRouteResolver";
import Typography from "@/shared/components/Typography";
import Paragraph from "@/shared/components/Paragraph";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

/* ── helpers ─────────────────────────────────── */

const toNumber = (v?: string | number | null) => {
  if (v === null || v === undefined) return null;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : null;
};

const formatPrice = (value: number) => {
  if (Number.isInteger(value)) return `${value}`;
  return `${value.toFixed(2)}`;
};

/* ── component ───────────────────────────────── */

const BannerSecureMdmNew = () => {
  const router = useRouter();
  const locale = useLocale();
  const { openModal } = useModalPayment();
  const { data: products } = useGetProducts(35, "all"); // category 35 = Sistemas
  const t = useTranslations("OurProductsPage.secureMdm");

  /* Map ALL systems products (not just Secure MDM) */
  const systemCards = (products ?? []).map((p: Product) => {
    const img = p.images?.[0]?.src ?? "/images/home/secure-mdm-placeholder.png";

    const v0 = p.variants?.[0];
    const currency = v0?.currency ?? "USD";
    const variantCost = toNumber(v0?.cost ?? null);
    const salePrice = toNumber(p.sale_price);
    const regularPrice = toNumber(p.price);
    const isOnSale = p.on_sale === true;
    const displayPrice =
      isOnSale && salePrice != null
        ? salePrice
        : (variantCost ?? salePrice ?? regularPrice ?? null);

    const savings =
      isOnSale && regularPrice != null && displayPrice != null
        ? Math.round(regularPrice - displayPrice)
        : null;

    const baseName = p.name.split(" - ")[0].trim();
    const infoLink = getProductLink(baseName, 35);

    return {
      id: p.id,
      title: baseName,
      image: img,
      currency,
      price: displayPrice,
      onSale: isOnSale,
      savings,
      infoLink,
    };
  });

  if (systemCards.length === 0) return null;

  return (
    <section className="w-full bg-black text-white py-10 md:py-12 lg:py-16">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-center">
        {/* ── Left: text ── */}
        <div className="lg:flex-[0_0_300px] xl:flex-[0_0_340px] w-full flex flex-col items-start space-y-3 md:space-y-4 shrink-0">
          <span className="inline-block border border-[#7EE0FF] text-[#0AB4E9] px-4 py-1 rounded-full text-xs font-semibold">
            {t("badge")}
          </span>

          <Typography
            variant="h2"
            as="h2"
            className="text-xl md:text-2xl lg:text-[28px] leading-tight md:leading-snug text-left"
          >
            {t("title")}
          </Typography>

          <Paragraph
            variant="body"
            color="secondary"
            className="text-xs md:text-sm text-white/60"
          >
            {t("description")}
          </Paragraph>
        </div>

        {/* ── Right: carousel ── */}
        <div className="flex-1 min-w-0">
          <Swiper
            spaceBetween={16}
            slidesPerView={1.15}
            centeredSlides={false}
            pagination={false}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[Autoplay]}
            breakpoints={{
              480: { slidesPerView: 1.3, spaceBetween: 16 },
              640: { slidesPerView: 1.8, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 2, spaceBetween: 24 },
            }}
            className="w-full"
          >
            {systemCards.map((card) => (
              <SwiperSlide key={card.id}>
                <div className="w-full h-[370px] md:h-[390px] rounded-2xl bg-[#161616] border border-[#222] overflow-hidden p-4 md:p-5 flex flex-col">
                  {/* Image */}
                  <div className="relative w-full h-[170px] md:h-[185px] rounded-xl bg-[#0D0D0D] flex items-center justify-center overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="max-w-[80%] max-h-[85%] object-contain rounded-xl"
                    />
                  </div>

                  {/* Content */}
                  <div className="mt-4 flex flex-col flex-1 gap-3">
                    <div className="space-y-1.5">
                      <Typography
                        variant="body-lg"
                        className="text-base font-semibold leading-tight truncate"
                      >
                        {card.title}
                      </Typography>

                      <div className="flex items-center gap-2 flex-wrap">
                        <Paragraph
                          variant="caption"
                          color="secondary"
                          spacing="tight"
                          className="text-sm text-white/70"
                        >
                          {card.price !== null
                            ? `${t("fromPrice")} ${formatPrice(card.price)}$ ${card.currency}`
                            : t("consultPrice")}
                        </Paragraph>

                        {card.onSale && card.savings != null && card.savings > 0 && (
                          <span className="inline-flex items-center bg-red-600 text-white text-[11px] font-bold rounded-full px-2.5 py-0.5 whitespace-nowrap">
                            {t("save")} {card.savings} {card.currency}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 mt-2">
                      <button
                        type="button"
                        onClick={() =>
                          openModal({
                            productid: card.id.toString(),
                            languageCode: locale,
                          })
                        }
                        className="flex items-center justify-center w-[124px] h-[44px] rounded-lg bg-[#10B4E7] text-[#101010] text-sm font-semibold transition-colors hover:bg-[#7EE0FF] cursor-pointer"
                        style={{ padding: "10px", gap: "4px" }}
                      >
                        {t("buy")}
                      </button>

                      {card.infoLink && (
                        <button
                          type="button"
                          onClick={() => router.push(card.infoLink!)}
                          className="text-sm text-[#10B4E7] font-medium transition-colors hover:text-[#7EE0FF] cursor-pointer whitespace-nowrap bg-transparent border-none outline-none shadow-none"
                        >
                          {t("moreInfo")}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default BannerSecureMdmNew;
