import Button from "@/shared/components/Button";
import SimIconSvg from "@/shared/svgs/SimIconSvg";
import Image from "next/image";

interface SecureCryptCardProps {
  productName: string;
  licenseDuration: string;
  expirationDate: string;
  id: string;
  activationKey: string;
  timeRemaining: string;
  productImageUrl: string;
}

export default function ActivityCard({
  productName = "SecureCrypt",
  licenseDuration = "6 MESES",
  expirationDate = "22 OCT 2024",
  id = "CRF899",
  activationKey = "Spalroqtk",
  timeRemaining = "23:59 hs",
  productImageUrl = "/placeholder.svg",
}: SecureCryptCardProps) {
  return (
    <div className="w-full md:w-8/12 border rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-200 group cursor-pointer">
      <div className="flex flex-col md:flex-row">
        {/* Image Section - Now at top for mobile */}
        <div className="w-full md:w-1/4 bg-gray-100 p-6 flex flex-col items-center justify-center relative order-1 md:order-1">
          <div className="w-[120px] h-[120px] md:w-[120px] md:h-[120px] flex items-center justify-center">
            <Image
              src={productImageUrl}
              alt={productName}
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
          <button className="absolute bottom-4 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
            Eliminar
          </button>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-3/4 p-4 order-2 md:order-2">
          <div className="md:flex md:flex-row md:justify-between md:items-start mb-2">
            <div className="flex-1">
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-2 md:mb-0">
                <SimIconSvg color="#35CDFB" />
                <span className="font-bold text-black text-base">
                  {productName}
                </span>
              </h2>
              <p className="flex items-center text-green-600 mb-2 md:mb-0">
                <span className="w-2 h-2 md:w-3 md:h-3 bg-green-600 rounded-full mr-2"></span>
                Licencia de {licenseDuration}
              </p>
            </div>
            <div className="w-full md:w-[150px] mt-2 md:mt-0 hidden md:block">
              <Button rounded="full" intent="black">
                QR de activación
              </Button>
            </div>
          </div>

          <div className="space-y-2 mb-4 text-sm text-black">
            <p>
              Fecha de vencimiento:{" "}
              <span className="font-bold">{expirationDate}</span>
            </p>
            <p>
              ID DE ECC: <span className="font-bold">{id}</span>
            </p>
            <p>
              CLAVE DE ACTIVACIÓN:{" "}
              <span className="font-bold">{activationKey}</span>
            </p>
          </div>

          <div className="border-t border-gray-200 my-4 md:hidden"></div>

          <div className="md:hidden mb-4 w-[180px]">
            <Button rounded="full" intent="black" >
              QR de activación
            </Button>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm">
            <p className="text-black flex items-center hover:underline cursor-pointer mb-2 md:mb-0">
              ¿Cómo activar este producto?
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </p>
            <div className="flex items-center">
              <span className="text-black">
                Tienes{" "}
                <span className="text-[#23A137] font-bold">
                  {timeRemaining}
                </span>
                {" "}para activar este producto
              </span>
              <svg
                className="h-4 w-4 text-gray-400 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





