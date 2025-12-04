"use client";

import React from "react";
import { useGetProducts } from "@/features/products/queries/useGetProducts";
import type { Product } from "@/features/products/types/AllProductsResponse";

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

  const filteredPhones: Product[] =
    products?.filter((p: Product) =>
      p.name.toLowerCase().includes("secure mdm")
    ) || [];

const secureMdmCards = filteredPhones.map((p) => {
  const lower = (p.name || "").toLowerCase();

  const img =
    lower.includes("iphone")
      ? "/images/home/iphone.png"
      : lower.includes("android")
      ? "/images/home/android.png"
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
    <section className="w-full bg-black text-white py-14 px-">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-14 flex flex-col md:flex-row gap-10 md:items-center">
        {/* Texto */}
        <div className="md:flex-[0_0_320px] w-full flex flex-col items-center md:mr-20">
          <div className="inline-block border border-[#7EE0FF] text-[#0AB4E9] px-4 py-1 rounded-full text-xs font-semibold">
            Seguridad de inicio a fin
          </div>
          <h2 className="text-3xl font-bold leading-snug">
            Sistemas encriptados <br /> con seguridad cifrada
          </h2>
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
              320: { slidesPerView: 1 },
              768: { slidesPerView: 1 },
              1024: { slidesPerView: 2 },     
            }}
            className="w-full !overflow-visible" 
          >
            {twoCards.map((card) => (
              <SwiperSlide key={card.id} className="!w-auto flex justify-center">
                <div className="w-[325px] h-[374px] rounded-2xl bg-[#161616] border border-[#222] overflow-hidden p-5 flex flex-col">
                  <div className="relative w-[285px] h-[180px] rounded-[14px] bg-[#0D0D0D]">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute top-[31px] left-1/2 -translate-x-1/2 w-[182px] h-[120px] object-contain"
                    />
                  </div>

                  <div className="mt-[24px] w-[263px] flex flex-col gap-[24px]">
                    <div className="space-y-1">
                      <h3 className="text-[16px] font-semibold leading-[1.2]">
                        {card.title}
                      </h3>
                      <p className="text-[14px] text-gray-300">
                        {card.price !== null
                          ? `Desde ${card.price} ${card.currency}`
                          : "Consulta nuestros precios"}
                      </p>
                    </div>

                    <div className="flex items-center gap-[12px]">
                      <a
                        href={card.buyUrl}
                        className="w-[124px] h-[44px] rounded-[8px] p-[10px] bg-[#10B4E7] text-black text-[14px] font-semibold hover:opacity-90 transition inline-flex items-center justify-center"
                      >
                        Comprar
                      </a>

                      <a
                        href={card.infoUrl}
                        className="w-[110px] h-[17px] inline-flex items-center text-[14px] leading-[17px] text-white/90 hover:text-white"
                      >
                        Más información
                      </a>
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
