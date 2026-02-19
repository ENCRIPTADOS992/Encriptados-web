"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CheckSvg from "/public/images/encrypted-sim/icons/check.svg";
import LocalMallSvgNew from "./svgs/LocalMallSvgNew";
import { ProductFilters } from "@/features/products/types/ProductFilters";
import { getProductLink } from "@/shared/utils/productRouteResolver";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { useEffect } from "react";
import { CircleFlag } from "react-circle-flags";
import { useLocale, useTranslations } from "next-intl";
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

interface CardSimProps {
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
  typeProduct?: string;  // Campo type_product del backend
  planDataAmount?: number;
  variantId?: number;  // ID de la variante seleccionada (para TIM)
  variants?: any[];
  onSale?: boolean;       // true si el producto está en oferta
  regularPrice?: number;  // precio original (price) cuando está en oferta
  iconUrl?: string;       // URL del icono del producto para el modal de éxito
}

const CardProduct: React.FC<CardSimProps> = ({
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
  iconUrl,
}) => {
  const { openModal } = useModalPayment();
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("OurProductsPage.productCard");

  // Extraer el precio numérico para pasar al modal (MOVIDO ANTES de moreInfoUrl)
  const numericPrice = (() => {
    if (planDataAmount != null) return planDataAmount;
    // Extraer número de priceRange (ej: "57.5$" -> 57.5)
    const match = priceRange.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : undefined;
  })();

  const handleBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`🛒 [CardProduct] Comprar clicado para ID=${id}`, { numericPrice, priceRange, variantId, provider, typeProduct });
    openModal({
      productid: id.toString(),
      languageCode: "es",
      selectedOption: Number(filters.selectedOption),
      initialPrice: numericPrice,
      variantId: variantId,
      variants,
      // Pasar provider y typeProduct para que el modal use los mismos valores que "Más información"
      provider: provider,
      typeProduct: typeProduct,
      initialGb: badges?.tag,
      initialRegion: badges?.country?.label,
      initialRegionCode: badges?.country?.code,
      flagUrl: badges?.country?.flagUrl,
      iconUrl: iconUrl,
    });
  };

  useEffect(() => {
    if (badges) {
      if (!badges.country?.label)
        console.log("ℹ️ [CardProduct] sin país", id, badges);
      if (!badges.tag) console.log("ℹ️ [CardProduct] sin tag", id, badges);
    }
  }, [badges, id]);

  const normalizedProvider = provider?.toLowerCase().trim() ?? "";
  const isSimTim =
    normalizedProvider === "tim" ||
    normalizedProvider.includes("sim tim") ||
    normalizedProvider.includes("tim");

  const displayPrice = (() => {
    if (isSimTim && planDataAmount != null) {
      return `$ ${planDataAmount} USD`;
    }

    return priceRange;
  })();

  // Pre-calcular URL de "Más información" para usar en un Link nativo
  // Esto mejora SEO, accesibilidad y velocidad (prefetching de Next.js)
  const moreInfoUrl = (() => {
    const url = getProductLink(
      headerTitle,
      Number(filters.selectedOption),
      id,
      provider,
      typeProduct
    );
    if (!url) return "#";

    // Build query string with all relevant params - SECURE LOGIC
    const params = new URLSearchParams();
    params.set("productId", String(id));

    // Determinar categoría correcta
    const isRouter = (headerTitle || "").toLowerCase().includes("router");
    params.set("categoryId", isRouter ? "36" : "40"); // 36=Router, 40=SIMs

    // Usar variantId si está disponible (prioridad para seguridad)
    if (variantId) params.set("variantId", String(variantId));

    // Contexto adicional (para selección visual, no para precios)
    if (badges?.tag) params.set("gb", badges.tag);

    // Mapear badges de país a sim_region o regionCode
    if (badges?.country?.label) params.set("region", badges.country.label);
    if (badges?.country?.code) {
      params.set("regionCode", badges.country.code);
      // Para compatibilidad con lógica de SimTimBanner
      if (isSimTim) params.set("sim_region", badges.country.code);
    }
    if (badges?.country?.flagUrl) params.set("flagUrl", badges.country.flagUrl);

    // NOTA: Se ha eliminado explícitamente el parámetro 'price' por seguridad.
    // El precio debe resolverse en destino usando productId + variantId.

    return `${url}?${params.toString()}`;
  })();

  const handleCardClick = () => {
    const finalUrl = moreInfoUrl.startsWith("/") ? `/${locale}${moreInfoUrl}` : moreInfoUrl;
    if (finalUrl && finalUrl !== "#") {
      router.push(finalUrl);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-full shadow-lg rounded-xl sm:rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-transform hover:scale-[1.01] block relative"
    >
      {/* Imagen de cabecera - imagen completa sin recorte */}
      <div className="relative w-full aspect-[16/10] flex-shrink-0 bg-[#1a1a1a]">
        <Image
          src={productImage}
          alt="Sim Card"
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover rounded-t-xl sm:rounded-t-2xl"
        />

        {/* Logic: Hide region badge ONLY if product is 'Sim Física' */}
        {badges?.country?.label && !(headerTitle || "").toLowerCase().includes("sim física") && !(headerTitle || "").toLowerCase().includes("sim fisica") ? (
          <div className="absolute left-2 sm:left-3 bottom-2 sm:bottom-3 flex items-center bg-white/90 rounded-full px-1.5 sm:px-2.5 py-1 sm:py-1.5 shadow-md z-10">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full overflow-hidden flex items-center justify-center">
              {filters.regionOrCountryType === "country" ? (
                badges.country.flagUrl ? (
                  <Image
                    src={badges.country.flagUrl}
                    alt={badges.country.label}
                    width={20}
                    height={20}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : badges.country.code ? (
                  <CircleFlag
                    countryCode={badges.country.code.toLowerCase()}
                    className="w-full h-full"
                  />
                ) : (
                  <RegionIcon size={20} />
                )
              ) : (
                <RegionIcon size={20} />
              )}
            </div>
            <span className="ml-1 sm:ml-1.5 text-[10px] sm:text-[12px] font-bold text-black leading-none">
              {(() => {
                if (!badges.country.label) return "";
                let text = badges.country.label;
                // Reemplazar guiones y guiones bajos por espacios
                text = text.replace(/[-_]/g, ' ');
                // Separar CamelCase (ej: NorteAmerica -> Norte America)
                text = text.replace(/([a-z])([A-Z])/g, '$1 $2');
                // Formatear a Title Case
                return text
                  .toLowerCase()
                  .trim()
                  .split(/\s+/)
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ');
              })()}
            </span>
          </div>
        ) : null}
      </div>

      {/* Contenido */}
      <div className="p-2.5 sm:p-4 flex flex-col flex-grow bg-white rounded-b-xl sm:rounded-b-2xl">
        <div className="flex items-start justify-between gap-1 sm:gap-2 mb-1.5 sm:mb-2">
          <h2
            className="
              text-[13px] sm:text-[18px] leading-[1.2] sm:leading-[1.3] tracking-[0.01em] font-bold
              line-clamp-2 min-h-[32px] sm:min-h-[47px]
            "
          >
            {headerTitle}
          </h2>


          {badges?.tag ? (
            <div
              className={`
                inline-flex items-center justify-center flex-shrink-0
                rounded-full
                text-[9px] sm:text-[11px]
                font-semibold
                h-[16px] sm:h-[20px]
                px-2 sm:px-3
                shadow-md
                whitespace-nowrap
                ${
                // SIM y SIM TIM (categoría 40) usan azul, Apps/Sistemas/Router usan gris
                filters.selectedOption === "40"
                  ? "bg-[#1CB9EC] text-[#010101]"
                  : "bg-[#DEDEDE] text-[#010101]"
                }
              `}
            >
              {badges.tag}
            </div>
          ) : null}

        </div>

        <ul className="hidden sm:block space-y-1.5 mb-2">
          {features.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center text-[14px] leading-[1.4] gap-2"
            >
              <Image src={CheckSvg} alt="✓" className="w-4 h-4 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col justify-start space-y-1 sm:space-y-1.5 mb-2 sm:mb-3">
          {checks.slice(0, 3).map((adv, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-[14px] leading-[1.3] sm:leading-[1.4]"
            >
              <Image src={CheckSvg} alt="✓" className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="line-clamp-1">{adv.name}</span>
            </div>
          ))}
        </div>

        <hr className="my-2 sm:my-3 border-gray-200" />

        <div className="mt-auto flex flex-col gap-1.5 sm:gap-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[14px] sm:text-[16px] leading-[1.2] font-bold">{displayPrice}</span>
            {onSale && regularPrice != null && (
              <span className="inline-flex items-center gap-1 bg-[#EDEDED] rounded-full px-2 py-0.5">
                <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-black" />
                <span className="text-[11px] sm:text-[13px] text-black">
                  Antes <span className="line-through">${regularPrice} USD</span>
                </span>
              </span>
            )}
          </div>
          <div className="flex flex-col xl:flex-row justify-between items-stretch xl:items-center gap-1.5 xl:gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleBuy(e);
              }}
              type="button"
              className="bg-black text-white text-[12px] xl:text-[14px] leading-[1.2] rounded-full px-3 xl:px-4 py-2 xl:py-2.5 flex items-center justify-center gap-1.5 xl:gap-2 hover:bg-gray-800 transition-colors z-10"
            >{t("buy")}
              <LocalMallSvgNew />
            </button>
            <span
              className="cursor-pointer text-[11px] xl:text-[14px] leading-[1.2] text-black hover:underline font-medium text-center z-10"
            >
              {t("moreInfo")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
