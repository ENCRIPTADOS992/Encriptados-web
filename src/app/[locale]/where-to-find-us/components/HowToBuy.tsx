import { useTranslations } from "next-intl";
import Image from "next/image";
import SectionWrapper from "@/shared/components/SectionWrapper";

export default function HowToBuy() {
  const t = useTranslations();

  return (
    <div className="bg-gradient-to-b from-[#041A20] via-[#041A20] to-black px-4 py-12 md:py-16 lg:py-20">
      <h2 className="text-[30px] md:text-[38px] leading-[1.3] font-bold text-white text-center mb-8">
        {t("WhereToFindUs.howToBuy.howToBuyTitle")}
      </h2>
      <SectionWrapper>
        <div
          className="
              max-w-6xl
              grid gap-6
              ml-4 sm:ml-8 lg:ml-16
            "
        >
          {/* Steps 1 to 4 - 2x2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Step 1 */}
            <div className="
                relative bg-gradient-to-r from-[#010101] to-[#00495F]
                rounded-3xl sm:rounded-br-none
                pl-10 pr-6 md:pl-16 md:pr-8
                py-6 md:py-8
                overflow-hidden
                flex items-center justify-between
                min-h-[220px] sm:min-h-0
              ">
              <div className="flex flex-col items-start mt-0 sm:-mt-20">
                <span className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold mb-4">
                  1
                </span>
                <h2
                  className="
                    font-bold
                    text-[30px]
                    sm:text-[38px]
                    md:text-[44px]
                    lg:text-[54px]
                    leading-[1.2]
                    text-[#EBF5FA]
                  "
                >
                  {t("WhereToFindUs.howToBuy.orderTitle")}
                </h2>
              </div>
            </div>

            {/* Step 2 */}
            <div className="
              relative bg-gradient-to-br from-[#29CEFF] to-[#A8EBFF]
              rounded-3xl sm:rounded-bl-none
              pl-10 pr-6 md:pl-16 md:pr-8
              py-6 md:py-8
              overflow-hidden
              flex items-center justify-center
              "
            >
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
            <div className="
                relative bg-gradient-to-br from-[#29CEFF] to-[#A8EBFF]
                rounded-3xl sm:rounded-tr-none
                pl-10 pr-6 md:pl-16 md:pr-8
                py-6 md:py-8
                overflow-hidden
                flex items-center justify-between
              "
            >
              <div className="flex flex-col items-start -mt-7">
                <span className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold mb-4">
                  2
                </span>
                <h2
                  className="
                    font-bold
                    text-[22px]
                    sm:text-[24px]
                    md:text-[30px]
                    leading-[1.4]
                    text-black
                  "
                >
                  {t("WhereToFindUs.howToBuy.depositATMTitle")}
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
            <div className="
                relative bg-gradient-to-br from-[#29CEFF] to-[#A8EBFF]
                rounded-3xl sm:rounded-tl-none
                pl-10 pr-6 md:pl-16 md:pr-8
                py-6 md:py-8
                overflow-hidden
                flex items-center justify-between
              "
            >
              <div className="flex flex-col items-start -mt-7">
                <span className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold mb-4">
                  3
                </span>
                <h2
                  className="
                    font-bold
                    text-[22px]
                    sm:text-[24px]
                    md:text-[30px]
                    leading-[1.4]
                    text-black
                  "
                >
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
      </SectionWrapper>
    </div>
  );
}
