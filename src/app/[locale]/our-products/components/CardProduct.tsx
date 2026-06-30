"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CheckSvg from "/public/images/encrypted-sim/icons/check.svg";
import LocalMallSvgNew from "./svgs/LocalMallSvgNew";
import { ProductFilters } from "@/features/products/types/ProductFilters";
import {
  PRODUCT_CATEGORY_IDS,
  isRouterCategoryId,
} from "@/shared/constants/productCategories";
import {
  getProductLink,
  isActivarAppsProduct,
} from "@/shared/utils/productRouteResolver";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
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
  purchaseType?: string;  // Telegram buy option
  telegramLink?: string;  // Specific link to Telegram product/chat
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
  purchaseType,
  telegramLink,
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
    
    if (purchaseType === "telegram" || telegramLink) {
      const finalUrl = telegramLink || "https://t.me/encriptados";
      window.open(finalUrl, "_blank");
      return;
    }

    const selectedOption = Number(filters.selectedOption);
    const isActivarApps = isActivarAppsProduct(headerTitle, selectedOption, id);
    const modalSelectedOption = isActivarApps ? 371 : selectedOption;
    openModal({
      productid: id.toString(),
      languageCode: "es",
      selectedOption: modalSelectedOption,
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
      initialActivationDetail: isActivarApps ? badges?.tag : undefined,
      mode: (modalSelectedOption === 40 || modalSelectedOption === 451) ? "sim" : undefined,
    });
  };

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
    const selectedCategoryId = Number(filters.selectedOption);
    const url = getProductLink(
      headerTitle,
      selectedCategoryId,
      id,
      provider,
      typeProduct
    );
    if (!url) return "#";

    // Build query string with all relevant params - SECURE LOGIC
    const params = new URLSearchParams();
    const isRouter = isRouterCategoryId(selectedCategoryId) || (headerTitle || "").toLowerCase().includes("router");
    const isActivarApps = isActivarAppsProduct(headerTitle, selectedCategoryId, id);
    const productIdForMoreInfo = id;
    params.set("productId", String(productIdForMoreInfo));

    // Determinar categoría correcta
    const categoryIdForMoreInfo = isActivarApps
      ? PRODUCT_CATEGORY_IDS.ACTIVATE_APPS
      : isRouter
        ? PRODUCT_CATEGORY_IDS.ROUTERS
        : selectedCategoryId;
    params.set("categoryId", String(categoryIdForMoreInfo));

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
      className="w-full shadow-lg rounded-xl sm:rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-transform hover:scale-[1.01] relative"
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
      <div className="p-2 sm:p-3.5 lg:p-3 flex flex-col flex-grow bg-white rounded-b-xl sm:rounded-b-2xl">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-1 sm:gap-2 mb-1 sm:mb-1.5 lg:mb-1">
          <h2
            className="
              flex-1 min-w-0
              order-2 lg:order-none
              text-[14px] sm:text-[17px] leading-[1.2] tracking-[0.005em] font-bold text-black
              lg:truncate lg:whitespace-nowrap
            "
            title={headerTitle}
            style={{ fontFamily: "var(--font-geist-sans), var(--font-inter), sans-serif" }}
          >
            {headerTitle}
          </h2>

          {badges?.tag ? (
            <div
              className={`
                inline-flex items-center justify-center flex-shrink-0
                self-end lg:self-auto
                order-1 lg:order-none
                rounded-full
                text-[9px] sm:text-[11px]
                font-semibold
                h-[16px] sm:h-[20px]
                px-2 sm:px-3
                shadow-md
                whitespace-nowrap
                ${
                // SIM y SIM TIM (categoría 40/451) usan azul, Apps/Sistemas/Router usan gris
                filters.selectedOption === "40" || filters.selectedOption === "451"
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

        <div className="flex flex-col justify-start space-y-1.5 sm:space-y-2 lg:space-y-1.5 mb-2 sm:mb-2.5 lg:mb-2">
          {checks.slice(0, 3).map((adv, idx) => (
            <div
              key={idx}
              className="flex items-start gap-1.5 sm:gap-2 text-[10px] sm:text-[13px] leading-[1.25] sm:leading-[1.35]"
            >
              <Image src={CheckSvg} alt="✓" className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
              <span className="flex-1 min-w-0 truncate whitespace-nowrap">{adv.name}</span>
            </div>
          ))}
        </div>

        <hr className="my-1.5 sm:my-2.5 lg:my-2 border-gray-200" />

        <div className="mt-auto flex flex-col gap-1.5 sm:gap-2 lg:gap-1.5">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="text-[16px] sm:text-[20px] lg:text-[26px] leading-[1.1] tracking-tight font-bold text-black" style={{ fontFamily: "var(--font-geist-sans), var(--font-inter), sans-serif" }}>{displayPrice}</span>
            {onSale && regularPrice != null && (
              <span className="inline-flex items-center gap-1 bg-[#EDEDED] rounded-full px-1.5 sm:px-2 lg:px-2.5 py-0 sm:py-0.5">
                <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 text-black" />
                <span className="text-[10px] sm:text-[12px] lg:text-[13px] text-black font-semibold">
                  <span className="line-through">${regularPrice} USD</span>
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
              className={`${
                purchaseType === "telegram" || telegramLink
                  ? "bg-[#229ED9] hover:bg-[#1cb0f6]"
                  : "bg-black hover:bg-gray-800"
              } text-white text-[12px] xl:text-[14px] leading-[1.2] rounded-full px-3 xl:px-4 py-2 xl:py-2.5 flex items-center justify-center gap-1.5 xl:gap-2 transition-colors z-10`}
            >
              {purchaseType === "telegram" || telegramLink ? "Telegram" : t("buy")}
              {purchaseType === "telegram" || telegramLink ? (
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="w-4 h-4 flex-shrink-0"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.35-.49.97-.74 3.79-1.65 6.32-2.73 7.59-3.25 3.61-1.48 4.36-1.74 4.85-1.75.11 0 .35.03.5.16.13.12.17.29.18.42 0 .03 0 .08-.01.12z" />
                </svg>
              ) : (
                <LocalMallSvgNew />
              )}
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
