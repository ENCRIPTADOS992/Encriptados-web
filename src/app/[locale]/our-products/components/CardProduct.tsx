"use client";
import Image from "next/image";
import CheckSvg from "/public/images/encrypted-sim/icons/check.svg";
import LocalMallSvgNew from "./svgs/LocalMallSvgNew";
import { useRouter } from "next/navigation";
import { ProductFilters } from "@/features/products/types/ProductFilters";
import { getProductLink } from "@/shared/utils/productRouteResolver";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { useEffect } from "react";
import { CircleFlag } from "react-circle-flags";
import { useTranslations } from "next-intl";


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
}) => {
  const router = useRouter();
  const { openModal } = useModalPayment();
  const t = useTranslations("OurProductsPage.productCard");

  console.log("🧩 [CardProduct] props =>", {
    id,
    headerTitle,
    selectedOption: filters.selectedOption,
    badges,
    provider,
    typeProduct,
    planDataAmount,
    variantId,
  });

  const handleBuy = () => {
    console.log(`🛒 [CardProduct] Comprar clicado para ID=${id}`, { numericPrice, priceRange, variantId });
    openModal({
      productid: id.toString(),
      languageCode: "es",
      selectedOption: Number(filters.selectedOption),
      initialPrice: numericPrice,
    });
  };

  useEffect(() => {
    if (badges) {
      if (!badges.country?.label)
        console.log("ℹ️ [CardProduct] sin país", id, badges);
      if (!badges.tag) console.log("ℹ️ [CardProduct] sin tag", id, badges);
    }
  }, [badges, id]);

    const displayPrice = (() => {
      const normalizedProvider = provider?.toLowerCase().trim() ?? "";

      // Soportar tanto "Sim TIM" como "tim" del backend
      const isSimTim =
        normalizedProvider === "tim" || 
        normalizedProvider.includes("sim tim") || 
        normalizedProvider.includes("tim");

      if (isSimTim && planDataAmount != null) {
        return `$ ${planDataAmount} USD`;
      }

      return priceRange;
    })();

    // Extraer el precio numérico para pasar al modal
    const numericPrice = (() => {
      if (planDataAmount != null) return planDataAmount;
      // Extraer número de priceRange (ej: "57.5$" -> 57.5)
      const match = priceRange.match(/[\d.]+/);
      return match ? parseFloat(match[0]) : undefined;
    })();

    console.log("💰 [CardProduct] price debug =>", {
    id,
    headerTitle,
    provider,
    planDataAmount,
    priceRange,
    displayPrice,
    numericPrice,
  });


  return (
    <div className="w-full shadow-lg rounded-2xl overflow-hidden flex flex-col">
      {/* Imagen de cabecera - sin contenedor extra, imagen directa */}
      <div className="relative w-full aspect-[16/10] flex-shrink-0">
        <Image
          src={productImage}
          alt="Sim Card"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover rounded-t-2xl"
        />

        {badges?.country?.label ? (
          <div className="absolute left-3 bottom-3 flex items-center bg-white/90 rounded-full px-2.5 py-1.5 shadow-md z-10">
            <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center">
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
            <span className="ml-1.5 text-[12px] font-bold text-black leading-none">
              {badges.country.label}
            </span>
          </div>
        ) : null}
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col flex-grow bg-white rounded-b-2xl">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h2
            className="
              text-[18px] leading-[1.3] tracking-[0.01em] font-bold
              line-clamp-2
            "
          >
            {headerTitle}
          </h2>


          {badges?.tag ? (
            <div
              className="
                inline-flex items-center justify-center flex-shrink-0
                rounded-full
                bg-[#1CB9EC]
                text-[11px]
                font-semibold
                h-[20px]
                px-3
                shadow-md
                whitespace-nowrap
              "
            >
              {badges.tag}
            </div>
          ) : null}

        </div>

        <ul className="space-y-1.5 mb-2">
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

        <div className="flex flex-col justify-start space-y-1.5 mb-3">
          {checks.slice(0, 3).map((adv, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-[14px] leading-[1.4]"
            >
              <Image src={CheckSvg} alt="✓" className="w-4 h-4 flex-shrink-0" />
              <span>{adv.name}</span>
            </div>
          ))}
        </div>

        <hr className="my-3 border-gray-200" />

        <div className="mt-auto flex flex-col gap-2.5">
          <div className="text-[16px] leading-[1.2] font-bold">{displayPrice}</div>
          <div className="flex flex-row justify-between items-center gap-2">
            <button
              onClick={handleBuy}
              type="button"
              className="bg-black text-white text-[14px] leading-[1.2] rounded-full px-4 py-2.5 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
            >{t("buy")}
              <LocalMallSvgNew />
            </button>
            <span
              onClick={() => {
                // Derivar URL correcta desde campos del backend (provider, typeProduct)
                const url = getProductLink(
                  headerTitle,
                  Number(filters.selectedOption),
                  id,
                  provider,
                  typeProduct
                );
                console.log("🔗 [CardProduct] Go to info:", { url, id, provider, typeProduct, numericPrice });
                if (url) router.push(`${url}?productId=${id}&price=${numericPrice ?? ''}`);
              }}
              className="cursor-pointer text-[14px] leading-[1.2] text-black hover:underline font-medium"
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
