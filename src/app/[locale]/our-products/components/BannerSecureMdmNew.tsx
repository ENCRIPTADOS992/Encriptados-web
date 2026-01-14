"use client";

import React from "react";
import { useGetProducts } from "@/features/products/queries/useGetProducts";
import type { Product } from "@/features/products/types/AllProductsResponse";
import Typography from "@/shared/components/Typography";
import Paragraph from "@/shared/components/Paragraph";
import Button from "@/shared/components/Button";
import { useTranslations } from "next-intl";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const toNumber = (v?: string | number | null) => {
  if (v === null || v === undefined) return null;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : null;
};

const BannerSecureMdmNew = () => {
  const { data: products } = useGetProducts(35, "all");
  const t = useTranslations("OurProductsPage.secureMdm");

  const filteredPhones: Product[] =
    products?.filter((p: Product) =>
      p.name.toLowerCase().includes("secure mdm")
    ) || [];

  const secureMdmCards = filteredPhones.map((p) => {
    const lower = (p.name || "").toLowerCase();

    const img =
      lower.includes("iphone")
        ? "/images/home/iphone.webp"
        : lower.includes("android")
        ? "/images/home/android.webp"
        : p.images?.[0]?.src ?? "/images/home/secure-mdm-placeholder.png";

    const v0 = p.variants?.[0];

    const currency = v0?.currency ?? "USD";
    const variantCost = toNumber(v0?.cost ?? null);
    const salePrice = toNumber(p.sale_price);
    const regularPrice = toNumber(p.price);
    const displayPrice = variantCost ?? salePrice ?? regularPrice ?? null;

    return {
      id: p.id,
      title: p.name,
      image: img,
      currency,
      price: displayPrice,
      buyUrl: "#",
      infoUrl: "#",
    };
  });

  const twoCards = secureMdmCards.slice(0, 2);

  return (
    <section className="hidden md:block w-full bg-black text-white py-8 md:py-10 lg:py-14">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10 lg:items-center">
        {/* Texto */}
        <div className="lg:flex-[0_0_320px] w-full flex flex-col items-center md:items-start lg:mr-12 xl:mr-20 space-y-3 md:space-y-4">
          <div className="inline-block border border-[#7EE0FF] text-[#0AB4E9] px-3 sm:px-4 py-1 rounded-full text-xs font-semibold">
            {t("badge")}
          </div>
          
          <Typography 
            variant="h2" 
            as="h2" 
            className="text-2xl md:text-3xl lg:text-[38px] leading-tight md:leading-snug text-center md:text-left"
          >
            {t("title")}
          </Typography>
        </div>

        {/* Slider */}
        <div className="md:w-1/2 flex flex-col items-center md:mr-20">
          <Swiper
            spaceBetween={24}
            centeredSlides={false}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[Pagination, Autoplay]}
            breakpoints={{
              1024: { slidesPerView: 2 },
            }}
            className="w-full overflow-hidden"
          >
            {twoCards.map((card) => (
              <SwiperSlide key={card.id} className="flex justify-center">
                <div className="w-full max-w-[300px] md:max-w-[325px] h-[360px] md:h-[374px] rounded-xl md:rounded-2xl bg-[#161616] border border-[#222] overflow-hidden p-4 md:p-5 flex flex-col">
                  <div className="relative w-full max-w-[268px] md:max-w-[285px] h-[160px] md:h-[180px] rounded-xl md:rounded-[14px] bg-[#0D0D0D]">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute top-[28px] md:top-[31px] left-1/2 -translate-x-1/2 w-[170px] md:w-[182px] h-[110px] md:h-[120px] object-contain"
                    />
                  </div>

                  <div className="mt-4 md:mt-6 w-full flex flex-col gap-4 md:gap-6">
                    <div className="space-y-1">
                      <Typography 
                        variant="body-lg" 
                        className="text-base font-semibold leading-tight"
                      >
                        {card.title}
                      </Typography>
                      
                      <Paragraph 
                        variant="caption" 
                        color="secondary" 
                        spacing="tight"
                        className="text-sm"
                      >
                        {card.price !== null
                          ? `${t("fromPrice")} ${card.price} ${card.currency}`
                          : t("consultPrice")}
                      </Paragraph>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        intent="primary"
                        size="md"
                        onClick={() => window.location.href = card.buyUrl}
                        className="flex-1 max-w-[124px]"
                      >
                        {t("buy")}
                      </Button>

                      <Button
                        intent="link"
                        size="sm"
                        onClick={() => window.location.href = card.infoUrl}
                        className="text-white/90 hover:text-white text-sm"
                      >
                        {t("moreInfo")}
                      </Button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-4 h-6" />
        </div>
      </div>
    </section>
  );
};

export default BannerSecureMdmNew;
