"use client";

import React from "react";
import { useGetProducts } from "@/features/products/queries/useGetProducts";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const BannerSecureMdmNew = () => {
    const { data: products } = useGetProducts(35, "all");

    const filteredPhones = products?.filter((p) =>
        p.name.toLowerCase().includes("secure mdm")
    ) || [];

    return (
        <section className="w-full bg-black text-white py-14 px-0">
           <div className="max-w-screen-2xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-14 flex flex-col md:flex-row gap-10 md:items-center">
                {/* Texto a la izquierda */}
                <div className="md:w-1/2 space-y-4 md:ml-20">
                    <div className="inline-block border border-[#7EE0FF] text-[#0AB4E9] px-4 py-1 rounded-full text-xs font-semibold">
                        Seguridad en inicio a fin
                    </div>
                    <h2 className="text-3xl font-bold leading-snug">
                        Sistemas encriptados <br /> con seguridad cifrada
                    </h2>
                </div>

                {/* Slider a la derecha */}
                <div className="md:w-1/2 flex flex-col items-center md:mr-20">
                    <Swiper
                        spaceBetween={20}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
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
                        className="w-full swiper-custom"
                    >
                    </Swiper>

                    <div className="mt-4 h-6"></div>
                </div>
            </div>
        </section>
    );
};

export default BannerSecureMdmNew;