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
    openModal({ 
      productid: id.toString(), 
      languageCode: "es",
      selectedOption: Number(filters.selectedOption),
    });
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-2xl overflow-hidden">
      {/* Imagen de cabecera */}
      <div className="w-full aspect-[16/9] bg-white flex items-center justify-center">

        <Image
          src={productImage}
          alt="Sim Card"
          layout="intrinsic"
          width={300}
          height={200}
          className="object-contain"
        />
      </div>

      {/* Contenido */}
      <div className="p-2 sm:p-4 flex flex-col">
        {/* Título */}
        <h2 className="text-lg md:text-xl font-bold mb-1 truncate">
          {headerTitle}
        </h2>

        {/* Lista de features */}
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

        {/* Checks adicionales (si hay) */}
        <div className="min-h-[72px] flex flex-col justify-start space-y-2">
          {checks.slice(0, 3).map((adv, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs md:text-sm">
              <Image src={CheckSvg} alt="✓" className="w-4 h-4" />
              <span>{adv.name}</span>
            </div>
          ))}
        </div>

        <hr className="my-2 border-gray-200" />

        {/* Precio y acciones */}
        <div className="mt-auto flex flex-col gap-2">
          {/* Precio */}
          <div className="text-lg font-bold">{priceRange}</div>

          {/* Botones + “Más información” */}
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
