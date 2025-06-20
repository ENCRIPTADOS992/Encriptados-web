"use client";

import React from "react";
import Image from "next/image";
import { useGetProducts } from "@/features/products/queries/useGetProducts";
import CardProductItem from "./CardProductItem";

const SilentCircleBanner = () => {
    const { data: allProducts } = useGetProducts(38, "all");

    const silentProduct = allProducts?.find((p) =>
        p.name.toLowerCase().includes("silent phone")
    );

    return (
    <div className="relative overflow-hidden w-full max-w-screen-2xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-14 py-8 rounded-3xl bg-[#101010] text-white">
            {/* Fondo con desvanecimiento */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/our-products/aef4b25c090984d368c3328bbcfd54545ac75eef.png"
                    alt="Fondo Silent Circle"
                    fill
                    className="object-cover opacity-30"
                    style={{
                        maskImage: "linear-gradient(to left, black 10%, transparent 70%)",
                        WebkitMaskImage: "linear-gradient(to left, black 10%, transparent 100%)",
                    }}
                />
            </div>

            {/* Contenido */}
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-center justify-between gap-6 md:gap-10 left-10">
                {/* Texto a la izquierda */}
                <div className="md:w-1/2 md:ml-14 text-center md:text-left space-y-4">
                    <div className="inline-block bg-[#CB0808] px-6 py-1 rounded-full text-sm font-semibold">
                        Silent Circle
                    </div>

                    <h2 className="text-2xl font-bold">Silent Phone</h2>

                    <p className="text-sm text-gray-300 max-w-md">
                        Desarrollada por expertos en tecnología móvil, esta app protege tus datos con máxima seguridad en todo momento.
                    </p>
                </div>


                {/* Card a la derecha */}
                {silentProduct && (
                    <div className="md:w-2/5 flex justify-center md:justify-end mt-6 md:mt-0 md:mr-40">
                        <div className="w-full max-w-sm">
                            <CardProductItem key={silentProduct.id} product={silentProduct} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SilentCircleBanner;
