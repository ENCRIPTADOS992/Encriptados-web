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
}) => {
  const router = useRouter();
  const { openModal } = useModalPayment();

  console.log("🧩 [CardProduct] props =>", {
    id,
    headerTitle,
    selectedOption: filters.selectedOption,
    badges,
  });

  const handleBuy = () => {
    console.log(`🛒 [CardProduct] Comprar clicado para ID=${id}`);
    openModal({
      productid: id.toString(),
      languageCode: "es",
      selectedOption: Number(filters.selectedOption),
    });
  };

  useEffect(() => {
    if (badges) {
      if (!badges.country?.label)
        console.log("ℹ️ [CardProduct] sin país", id, badges);
      if (!badges.tag) console.log("ℹ️ [CardProduct] sin tag", id, badges);
    }
  }, [badges, id]);

  return (
    <div className="w-full bg-white shadow-lg rounded-2xl overflow-hidden">
      {/* Imagen de cabecera */}
      <div className="relative w-full aspect-[16/9] bg-white flex items-center justify-center">
        <Image
          src={productImage}
          alt="Sim Card"
          width={300}
          height={200}
          className="object-contain"
        />

        {badges?.country?.label ? (
          <div className="absolute left-2 bottom-2 flex items-center bg-white/90 rounded-full px-2 py-1 shadow-md">
            <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center">
              {filters.regionOrCountryType === "country" ? (
                badges.country.flagUrl ? (
                  <Image
                    src={badges.country.flagUrl}
                    alt={badges.country.label}
                    width={24}
                    height={24}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : badges.country.code ? (
                  <CircleFlag
                    countryCode={badges.country.code.toLowerCase()}
                    className="w-full h-full"
                  />
                ) : (
                  <RegionIcon size={24} />
                )
              ) : (
                <RegionIcon size={24} />
              )}
            </div>

              <span className="ml-2 text-[13px] font-bold text-black leading-none">
                {badges.country.label}
              </span>
            </div>
        ) : null}

      </div>

      {/* Contenido */}
      <div className="p-2 sm:p-4 flex flex-col">
        <div className="flex items-start justify-between mb-1">
          <h2 className="text-lg md:text-xl font-bold truncate">
            {headerTitle}
          </h2>

          {badges?.tag ? (
            <div className="ml-2 rounded-full bg-sky-600 text-black text-[12px] md:text-xs font-bold px-2 py-1 leading-none h-fit self-start shadow-md">
              {badges.tag}
            </div>
          ) : null}
        </div>

        <ul className="space-y-1">
          {features.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center text-sm md:text-base gap-2"
            >
              <Image src={CheckSvg} alt="✓" className="w-4 h-4" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="min-h-[72px] flex flex-col justify-start space-y-2">
          {checks.slice(0, 3).map((adv, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-xs md:text-sm"
            >
              <Image src={CheckSvg} alt="✓" className="w-4 h-4" />
              <span>{adv.name}</span>
            </div>
          ))}
        </div>

        <hr className="my-2 border-gray-200" />

        <div className="mt-auto flex flex-col gap-2">
          <div className="text-lg font-bold">{priceRange}</div>
          <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-2">
            <button
              onClick={handleBuy}
              type="button"
              className="w-full sm:w-auto bg-black text-white text-xs rounded-full px-4 py-2 flex items-center justify-center gap-2"
            >
              Comprar
              <LocalMallSvgNew />
            </button>
            <span
              onClick={() => {
                const url = getProductLink(
                  headerTitle,
                  Number(filters.selectedOption),
                  id
                );
                console.log("🔗 [CardProduct] Go to info:", { url, id });
                if (url) router.push(`${url}?productId=${id}`);
              }}
              className="cursor-pointer text-xs text-black hover:underline mt-1 sm:mt-0"
            >
              Más información
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
