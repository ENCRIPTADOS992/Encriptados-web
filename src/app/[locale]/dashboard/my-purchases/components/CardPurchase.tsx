import SpiralSvg from "@/app/[locale]/ira-sim/svgs/SpiralSvg";
import Button from "@/shared/components/Button";

import SimIconSvg from "@/shared/svgs/SimIconSvg";
import Image from "next/image";
import TravelSvg from "/public/images/encrypted-sim/icons/travel_explore.svg";

interface SecureCryptCardProps {
  productName: string;
  buyDate: string;
  id: string;
  productImageUrl: string;
  price: string | number;
  discount: string | number;
}

export default function CardPurchase({
  productName = "SecureCrypt",
  buyDate = "22 OCT 2024",
  id = "CRF899",
  price = "10",
  productImageUrl = "/placeholder.svg",
  discount = "0",
}: SecureCryptCardProps) {
  return (
    <div className="w-full lg:w-8/12 border rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-200 group cursor-pointer">
      <div className="flex flex-col lg:flex-row">
        {/* Imagen del producto */}
        <div className="w-full lg:w-1/4 bg-gray-100 flex flex-col items-center justify-between relative">
          <div className="w-full h-48 lg:h-full flex items-center justify-center bg-[#5D5D5D]">
            <Image
              src={productImageUrl}
              alt={productName}
              width={300}
              height={300}
              className="object-contain w-full h-full max-w-[250px]"
            />
          </div>
          {/* Botón de Eliminar visible solo cuando se hace hover en la tarjeta */}
          <button className="absolute bottom-2 right-2 lg:bottom-4 lg:right-auto bg-red-500 text-white px-2 py-1 rounded text-xs lg:text-sm hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Eliminar
          </button>
        </div>

        {/* Información del producto */}
        <div className="w-full lg:w-3/4 p-4 flex flex-col justify-between">
          <div>
            {/* Encabezado del producto */}
            <div className="flex flex-col lg:flex-row justify-between items-start mb-2 gap-4">
              <div className="flex-1">
                <h2 className="text-xl lg:text-2xl font-bold flex items-center gap-2">
                  <SimIconSvg color="black" />
                  <span className="font-bold text-black text-base lg:text-lg">
                    {productName}
                  </span>
                </h2>
              </div>

              {/* Botones con íconos */}
              <div className="flex flex-wrap gap-2">
                <Button
                  size="small"
                  rounded="full"
                  icon={
                    <Image
                      src={TravelSvg}
                      alt="Icon"
                      className="w-4 h-4 lg:w-5 lg:h-5"
                    />
                  }
                  iconPosition="left"
                  intent="elegant"
                >
                  +200 países disponibles
                </Button>

                <Button
                  size="small"
                  icon={<SpiralSvg color="#00516B" />}
                  iconPosition="right"
                  rounded="full"
                  intent="secondary"
                >
                  5G LTE
                </Button>
              </div>
            </div>

            {/* Detalles del producto */}
            <div className="space-y-1 mb-4 text-sm lg:text-base text-black">
              <p>
                Fecha de compra: <span className="font-bold">{buyDate}</span>
              </p>
              <p>
                ID Compra: <span className="font-bold">{id}</span>
              </p>
              <p className="flex gap-2">
                <span className="font-bold text-base">{price}</span>
                <span className="text-red-500 line-through">{discount}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
