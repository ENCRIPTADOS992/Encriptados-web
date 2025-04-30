import { useTranslations } from "next-intl";
import Image from "next/image";

export default function HowToBuy() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#041A20] via-[#041A20] to-black p-4 md:p-8">
      <h1 className="text-white font-bold text-2xl md:text-4xl text-center py-8 md:py-12">
        {t("WhereToFindUs.howToBuy.howToBuyTitle")}
      </h1>

      <div className="max-w-6xl mx-auto grid gap-6">
        {/* Steps 1 to 4 - 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Step 1 */}
          <div className="relative bg-gradient-to-r from-[#010101] to-[#00495F] rounded-2xl p-6 md:p-8 overflow-hidden flex items-center justify-between">
            <div className="flex flex-col items-start">
              <span className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold mb-4">
                1
              </span>
              <h2 className="text-white text-xl md:text-2xl font-bold">
                {t("WhereToFindUs.howToBuy.orderTitle")}
              </h2>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative  bg-gradient-to-br from-[#29CEFF] to-[#A8EBFF] rounded-2xl p-6 overflow-hidden flex items-center justify-center">
            <div className="">
              <Image
                src="/images/where-to-find-us/buy1.png"
                alt="Deposit via ATM"
                width={350}
                height={350}
                className="rounded-lg mx-auto object-cover"
              />
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative bg-gradient-to-br from-[#29CEFF] to-[#A8EBFF] rounded-2xl p-6 overflow-hidden flex items-center justify-between">
            <div className="flex flex-col items-start">
              <span className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold mb-4">
                2
              </span>
              <h2 className="text-black text-xl md:text-2xl font-bold mb-4">
                {t("WhereToFindUs.howToBuy.orderTitle")}
              </h2>
            </div>
            <div className="w-1/2">
              <Image
                src="/images/where-to-find-us/buy2.png"
                alt="Receive your purchase"
                width={150}
                height={150}
                className="rounded-lg mx-auto object-cover"
              />
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative bg-gradient-to-br from-[#29CEFF] to-[#A8EBFF] rounded-2xl p-6 overflow-hidden flex items-center justify-between">
            <div className="flex flex-col items-start">
              <span className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold mb-4">
                3
              </span>
              <h2 className="text-black text-xl md:text-2xl font-bold mb-4">
                {t("WhereToFindUs.howToBuy.reciveYourPurchase")}
              </h2>
            </div>
            <div className="w-1/2">
              <Image
                src="/images/where-to-find-us/buy3.png"
                alt="Confirm your purchase"
                width={150}
                height={150}
                className="rounded-lg mx-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
