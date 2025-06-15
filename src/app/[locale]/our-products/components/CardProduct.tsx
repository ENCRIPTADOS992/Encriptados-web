import Image from "next/image";

import CheckSvg from "/public/images/encrypted-sim/icons/check.svg";
import StarSvg from "/public/images/encrypted-sim/icons/star_half2.svg";

import LocalMallSvgNew from "./svgs/LocalMallSvgNew";
import { useRouter } from "next/navigation";
import { ProductFilters } from "@/features/products/types/ProductFilters";
import { getProductLink } from "@/shared/utils/productRouteResolver";
import { useModalPayment } from "@/providers/ModalPaymentProvider";

interface CardSimProps {
  productImage: string;
  features: string[];
  priceRange: string;
  headerIcon: string;
  headerTitle: string;
  priceDiscount: string;
  id: number;
  filters: ProductFilters;
  checks: {
    name: string;
  }[];
}

const CardProduct: React.FC<CardSimProps> = ({
  productImage,
  features,
  priceRange,
  id,
  headerTitle,
  filters,
  checks,
}) => {
  const router = useRouter();
  const { openModal } = useModalPayment();

  console.log(
    `📝 [CardProduct] render para producto “${headerTitle}” (ID=${id})`
  );

  const handleBuy = () => {
    console.log(`🛒 [CardProduct] Comprar clicado para ID=${id}`);
    openModal({ productid: id.toString(), languageCode: "es" });
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-2xl overflow-hidden">
      <div className="relative w-full h-32">
        <div className="relative w-full h-32 flex items-center justify-center ">
            <Image
              src={productImage}
              alt="Sim Card"
              fill
              className="object-cover w-full h-full"
            />
        </div>
        <div className="">
          <div className="flex justify-end gap-2 mb-1 text-sm text-gray-600"></div>
        </div>
      </div>

      <div className="p-6">
        <div className="text-black rounded-full text-xs font-semibold flex gap-1">
          <h2 className="text-base font-bold mb-2 truncate">{headerTitle}</h2>
        </div>

        <ul className="space-y-0">
          {features.map((item, index) => (
            <li
              key={index}
              className="flex items-center text-sm gap-1 truncate"
            >
              <Image src={CheckSvg} alt="Icon" className="w-4 h-4" />
              {item}
            </li>
          ))}
        </ul>
        <hr className="my-4" />
        <div className="p-0">
          <div className="w-full">
            <div className="mt-4 mb-12 space-y-2 h-[72px] flex flex-col justify-start">
              {checks
                ?.slice(0, 3)
                .map((adv: { name: string }, index: number) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Image src={CheckSvg} alt="✓" className="w-4 h-4" />
                    <span>{adv.name}</span>
                  </div>
                ))}
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex gap-x-5 items-center justify-center">
                <div className="flex items-center justify-center gap-x-1 text-sm">
                  <span>Desde</span>
                  <span className="text-lg font-bold">{priceRange}</span>
                </div>
              </div>

              <div className="flex items-center bg-[#EDF4F6] px-2 rounded-full">
                <Image
                  src={StarSvg}
                  alt="Icon"
                  className="w-6 h-6 fill-ct text-yellow-400 font-bold"
                />
                <span className="ml-1 text-sm text-gray-600 font-semibold">
                  5/5
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-x-2 ">
              <button
                onClick={handleBuy}
                type="button"
                className="bg-black rounded-full text-white px-3 py-2"
              >
                <div className="flex items-center justify-center gap-x-2 px-2">
                  Comprar
                  <LocalMallSvgNew />
                </div>
              </button>

              <h1
                onClick={() => {
                  const url = getProductLink(headerTitle, Number(filters.selectedOption));
                  if (url) {
                    router.push(`${url}?productId=${id}`);
                  } else {
                    console.warn("Ruta no encontrada para:", headerTitle);
                  }
                }}
                className="cursor-pointer text-[14px]"
              >
                Más información
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
