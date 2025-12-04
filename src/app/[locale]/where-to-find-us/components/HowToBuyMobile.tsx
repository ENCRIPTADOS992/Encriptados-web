import { useTranslations } from "next-intl";
import Image from "next/image";
import SectionWrapper from "@/shared/components/SectionWrapper";

export default function HowToBuyMobile() {
    const t = useTranslations();

    return (
        <div className="bg-gradient-to-b from-[#041A20] via-[#041A20] to-black px-4 py-8 md:hidden">
            <h1 className="text-white font-bold text-3xl text-center py-8">
                {t("WhereToFindUs.howToBuy.howToBuyTitle")}
            </h1>

            <SectionWrapper>
                <div className="max-w-sm mx-auto flex flex-col gap-4">
                    {/* CARD 1 - Realiza tu pedido */}
                    <div
                        className="
                            relative bg-gradient-to-br from-[#29CEFF] to-[#A8EBFF]
                            rounded-3xl
                            pl-8 pr-6 pt-6 pb-8
                            overflow-hidden
                            flex flex-col
                        "
                    >
                        <span className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
                            1
                        </span>

                        <h2
                            className="
                            mt-5
                            font-bold
                            text-[26px]
                            leading-[110%]
                            text-black
                            "
                        >
                            {t("WhereToFindUs.howToBuy.orderTitle")}
                        </h2>

                        <div className="mt-4">
                            <Image
                                src="/images/where-to-find-us/buy1.png"
                                alt="Realiza tu pedido"
                                width={350}
                                height={350}
                                className="rounded-2xl mx-auto object-cover"
                            />
                        </div>
                    </div>

                    {/* CARD 2 - Deposita via ATM */}
                    <div
                        className="
                            relative bg-gradient-to-br from-[#29CEFF] to-[#A8EBFF]
                            rounded-3xl
                            pl-8 pr-6 py-6
                            overflow-hidden
                            flex flex-row items-start gap-4
                        "
                    >
                        {/* Columna izquierda: número + texto */}
                        <div className="flex flex-col flex-1">
                            <span className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
                                2
                            </span>

                            <h2
                                className="
                                    mt-4
                                    font-bold
                                    text-[24px]
                                    leading-[110%]
                                    text-black
                                "
                            >
                                {t("WhereToFindUs.howToBuy.depositATMTitle")}
                            </h2>
                        </div>

                        {/* Columna derecha: imagen */}
                        <div className="w-[40%]">
                            <Image
                                src="/images/where-to-find-us/buy2.png"
                                alt="Deposita via ATM"
                                width={350}
                                height={350}
                                className="rounded-2xl w-full h-auto object-cover"
                            />
                        </div>
                    </div>

                    {/* CARD 3 - Recibe tu compra */}
                    <div
                        className="
                            relative bg-gradient-to-br from-[#29CEFF] to-[#A8EBFF]
                            rounded-3xl
                            pl-8 pr-6 py-6
                            overflow-hidden
                            flex flex-row items-start gap-4
                        "
                    >
                        {/* Columna izquierda: número + texto */}
                        <div className="flex flex-col flex-1">
                            <span className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
                                3
                            </span>

                            <h2
                                className="
                                    mt-4
                                    font-bold
                                    text-[24px]
                                    leading-[110%]
                                    text-black
                                "
                            >
                                {t("WhereToFindUs.howToBuy.reciveYourPurchase")}
                            </h2>
                        </div>

                        {/* Columna derecha: imagen */}
                        <div className="w-[40%]">
                            <Image
                                src="/images/where-to-find-us/buy3.png"
                                alt="Recibe tu compra"
                                width={350}
                                height={350}
                                className="rounded-2xl w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}