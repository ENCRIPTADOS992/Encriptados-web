"use client";
import Link from "next/link";
import Image from "next/image";
import CheckSvg from "/public/images/encrypted-sim/icons/check.svg";
import LocalMallSvgNew from "./svgs/LocalMallSvgNew";
import { ProductFilters } from "@/features/products/types/ProductFilters";
import { getProductLink } from "@/shared/utils/productRouteResolver";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { useEffect } from "react";
import { CircleFlag } from "react-circle-flags";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Tag } from "lucide-react";

const RegionIcon: React.FC<{ size?: number }> = ({ size = 24 }) => {
    return (
        <span
            className="
        rounded-full flex items-center justify-center bg-white
      "
            style={{
                width: size,
                height: size,
            }}
        >
            <svg
                viewBox="0 0 24 24"
                width={size * 0.6}
                height={size * 0.6}
                fill="none"
            >
                <circle cx="12" cy="12" r="10.5" stroke="#3393F7" strokeWidth="1.5" />
                <path
                    d="M6.5 10.5l1.2-.6 1 .5v1l1 1 .4 1.4-.3 1.2 1.4.6.5 1 .9.4h1l.4-1v-1l1-1 .5-1 .5-.5 1 .5h1l1-1v-1l-.5-1-.5-.5H17l-.5-1 .4-.9v-1l-1-.5-1 .5-.5 1-1 .5h-1l-1-.5-.5-1-1-.5-1 .5-.5 1-.5.5-.5 1z"
                    fill="#3393F7"
                />
            </svg>
        </span>
    );
};

interface CardTimProductProps {
    productImage: string;
    features: string[];
    priceRange: string;
    headerIcon: string;
    headerTitle: string;
    priceDiscount: string;
    id: number;
    filters: ProductFilters;
    checks: { name: string }[];
    badges?: {
        country?: { label: string; code?: string; flagUrl?: string };
        tag?: string;
    };
    provider?: string;
    typeProduct?: string;
    planDataAmount?: number;
    variantId?: number;
    variants?: any[];
    onSale?: boolean;       // true si el producto está en oferta
    regularPrice?: number;  // precio original (price) cuando está en oferta
}

const CardTimProduct: React.FC<CardTimProductProps> = ({
    productImage,
    features,
    priceRange,
    id,
    headerTitle,
    filters,
    checks,
    badges,
    provider,
    typeProduct,
    planDataAmount,
    variantId,
    variants,
    onSale,
    regularPrice,
}) => {
    const { openModal } = useModalPayment();
    const locale = useLocale();
    const t = useTranslations("OurProductsPage.productCard");

    // Formateador de texto: "Esto-Es-Texto" -> "Esto es texto"
    const formatTitle = (text: string) => {
        if (!text) return "";
        const withSpaces = text.replace(/-/g, " ");
        return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1).toLowerCase();
    };

    const formattedTitle = formatTitle(headerTitle);

    const numericPrice = (() => {
        if (planDataAmount != null) return planDataAmount;
        const match = priceRange.match(/[\d.]+/);
        return match ? parseFloat(match[0]) : undefined;
    })();

    const handleBuy = () => {
        openModal({
            productid: id.toString(),
            languageCode: "es",
            selectedOption: Number(filters.selectedOption),
            initialPrice: numericPrice,
            variantId: variantId,
            variants,
            provider: provider,
            typeProduct: typeProduct,
            mode: "sim",
        });
    };

    const displayPrice = (() => {
        if (planDataAmount != null) {
            return `$ ${planDataAmount} USD`;
        }
        return priceRange;
    })();

    const moreInfoUrl = (() => {
        const url = getProductLink(
            headerTitle,
            Number(filters.selectedOption),
            id,
            provider,
            typeProduct
        );
        if (!url) return "#";
        const params = new URLSearchParams();
        params.set("productId", String(id));
        if (numericPrice != null) params.set("price", String(numericPrice));
        if (badges?.tag) params.set("gb", badges.tag);
        if (badges?.country?.label) params.set("region", badges.country.label);
        return `${url}?${params.toString()}`;
    })();

    return (
        <div className="w-full flex flex-col h-full bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">

            {/* Parte Superior: Gradient Azul con Imagen y Badges (estilo TIM) */}
            <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-[#03212A] to-[#090909] p-4 flex flex-col justify-between">

                {/* Logo TIM (Top Left) */}
                <div className="absolute top-4 left-4 z-10">
                    {/* Usamos el logo de TIM o texto blanco si no hay logo disponible a mano aqui */}
                    <Image
                        src="/images/bne-sim/logo-sim-tim.svg"
                        alt="TIM"
                        width={60}
                        height={20}
                        className="w-auto h-6 object-contain brightness-0 invert"
                    />
                    {/* Fallback si la imagen no carga bien, el brightness invert lo hace blanco */}
                </div>

                {/* Icono Señal/Datos (Bottom Right - Circular Azul) */}
                <div className="absolute bottom-4 right-4 z-10 w-10 h-10 rounded-full bg-[#009DFF] bg-opacity-20 border border-[#009DFF] flex items-center justify-center backdrop-blur-sm">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#009DFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20v-6M6 20V10M18 20V4" />
                    </svg>
                </div>

                {/* Imagen del Producto (Centrada) */}
                <div className="relative w-full h-full flex items-center justify-center pb-6 pt-6">
                    {/* Efecto de 'resplandor' detrás de la SIM o imagen */}
                    <div className="absolute w-32 h-32 bg-[#009DFF] rounded-full filter blur-[40px] opacity-20"></div>
                    <Image
                        src={productImage}
                        alt={formattedTitle}
                        fill
                        className="object-contain p-2"
                    />
                </div>

                {/* Badge País (Bottom Left) - Ocultar en Sim Física */}
                {badges?.country?.label && !(headerTitle || "").toLowerCase().includes("sim física") && !(headerTitle || "").toLowerCase().includes("sim fisica") && (
                    <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full pl-1 pr-3 py-1">
                        <div className="w-5 h-5 rounded-full overflow-hidden relative border border-white/20">
                            {filters.regionOrCountryType === "country" && badges?.country?.flagUrl ? (
                                <Image
                                    src={badges.country.flagUrl}
                                    alt={badges.country.label}
                                    fill
                                    className="object-cover"
                                />
                            ) : badges?.country?.code ? (
                                <CircleFlag
                                    countryCode={badges.country.code.toLowerCase()}
                                    className="w-full h-full"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200"></div>
                            )}
                        </div>
                        <span className="text-xs font-semibold text-white">{badges.country.label}</span>
                    </div>
                )}
            </div>

            {/* Parte Inferior: Contenido Blanco */}
            <div className="flex flex-col flex-grow p-3 sm:p-4 lg:p-3.5 space-y-1.5 sm:space-y-2.5 lg:space-y-2">

                {/* Título y GB Tag */}
                <div className="flex justify-between items-start gap-2">
                    <h3 className="flex-1 min-w-0 font-[950] text-[14px] sm:text-[17px] text-black leading-tight truncate whitespace-nowrap" title={formattedTitle}>
                        {formattedTitle}
                    </h3>
                    {badges?.tag && (
                        <span className="flex-shrink-0 bg-[#009DFF] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                            {badges.tag}
                        </span>
                    )}
                </div>

                {/* Lista de Checks */}
                {checks.length > 0 && (
                    <div className="space-y-1.5 sm:space-y-2 lg:space-y-1.5">
                        {checks.slice(0, 3).map((check, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-[12px] sm:text-[13px] text-gray-600">
                                {/* Check icon */}
                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="leading-tight flex-1 min-w-0 truncate whitespace-nowrap">{check.name}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex-grow"></div>

                {/* Precio */}
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <span className="text-[22px] sm:text-xl lg:text-[26px] font-[950] text-black leading-[1.1] tracking-tight">
                        {displayPrice}
                    </span>
                    {onSale && regularPrice != null && (
                        <span className="inline-flex items-center gap-1 bg-[#EDEDED] rounded-full px-1.5 sm:px-2 lg:px-2.5 py-0 sm:py-0.5">
                            <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-black" />
                            <span className="text-[11px] sm:text-sm lg:text-[15px] text-black font-semibold">
                                <span className="line-through">${regularPrice} USD</span>
                            </span>
                        </span>
                    )}
                </div>

                {/* Botones */}
                <div className="flex items-center gap-3 mt-2">
                    <button
                        onClick={handleBuy}
                        className="flex-1 bg-black hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                    >
                        {t("buy")}
                        <LocalMallSvgNew />
                    </button>
                    <Link
                        href={moreInfoUrl.startsWith("/") ? `/${locale}${moreInfoUrl}` : moreInfoUrl}
                        className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors whitespace-nowrap px-2"
                    >
                        {t("moreInfo")}
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default CardTimProduct;
