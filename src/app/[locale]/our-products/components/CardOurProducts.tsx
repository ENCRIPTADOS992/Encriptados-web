"use client";

import SimMinutosDatos from "../../../../../public/images/our-products/1b097c330ad6a7135bc1084b2ca6886438cde653.png";
import EsimMinutosDatos from "../../../../../public/images/our-products/timpersona.png";
import CardSimEsim from "./svgs/CardSimEsim";
import { ProductFilters } from "@/features/products/types/ProductFilters";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

interface CardOurProductsProps {
  filters: ProductFilters;
}

const CardOurProducts: React.FC<CardOurProductsProps> = ({ filters }) => {
  const { openModal } = useModalPayment();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("OurProductsPage.simCards");

  const buildSimUrl = (slug: string) => {
    const match = pathname.match(/^\/([a-zA-Z-]+)(\/|$)/);
    if (!match) return `/${slug}`;
    const locale = match[1];
    return `/${locale}/${slug}`;
  };

  const handleMoreInfo = (slug: string) => {
    const href = buildSimUrl(slug);
    console.log("[CardOurProducts] 👉 Navegando a más info:", { slug, href });
    router.push(href);
  };

  const handleBuy = (productId: string) => {
    console.log(
      "🛒 [CardOurProducts] onBuyClick — openModal",
      { productid: productId, languageCode: "es" }
    );
    openModal({ productid: productId, languageCode: "es" });
  };

  // Determinar el gap basado en la ruta actual
  // Home (/) usa gap-4, /our-products usa gap-6
  const isOurProductsPage = pathname.includes("/our-products");
  const gapClass = isOurProductsPage ? "gap-6" : "gap-4";

  return (
    <div className={`relative w-screen left-1/2 -translate-x-1/2 sm:static sm:w-auto sm:left-0 sm:translate-x-0 grid grid-cols-1 xl:grid-cols-2 ${gapClass} xl:gap-2 mt-0 sm:mt-1 mb-0 sm:mb-1`}>
      {/* SIM Encriptada → productId = 508 */}
      <CardSimEsim
        title={t("encrypted.title")}
        description={t("encrypted.description")}
        imageSrc={SimMinutosDatos.src}
        altText="Sim Card"
        background="bg-custom-gradient-our-products-black"
        titleColor="text-white"
        descriptionColor="text-white"
        showMoreInfo={false}
        buyText={t("moreInfo")}
        onBuyClick={() => handleMoreInfo("sim-encriptada")}
      />

      {/* SIM TIM → productId = 454 */}
      <CardSimEsim
        title={t("tim.title")}
        description={t("tim.description")}
        imageSrc={EsimMinutosDatos.src}
        altText="eSim"
        background="bg-custom-gradient-our-sim-blue2"
        titleColor="text-black"
        descriptionColor="text-black"
        showMoreInfo={false}
        buyText={t("moreInfo")}
        onBuyClick={() => handleMoreInfo("tim-sim")}
      />
    </div>
  );
};

export default CardOurProducts;
