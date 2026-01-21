"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import CardSimEsim from "../../our-products/components/svgs/CardSimEsim";
import SimMinutosDatos from "../../../../../public/images/our-products/1b097c330ad6a7135bc1084b2ca6886438cde653.png";
import EsimMinutosDatos from "../../../../../public/images/our-products/timpersona.png";

const RouterSims = () => {
  const t = useTranslations("OurProductsPage.simCards");
  const router = useRouter();
  const pathname = usePathname();

  const buildSimMoreInfoUrl = (productId: string) => {
    const basePath = `/our-products/sim-more-info?productId=${productId}`;
    const match = pathname.match(/^\/([a-zA-Z-]+)(\/|$)/);
    if (!match) return basePath;

    const locale = match[1];
    if (basePath.startsWith(`/${locale}/`)) return basePath;

    return `/${locale}${basePath}`;
  };

  const handleMoreInfo = (productId: string) => {
    const href = buildSimMoreInfoUrl(productId);
    router.push(href);
  };

  return (
    <section className="bg-[#F7FAFC] py-10 px-4 lg:px-20 lg:min-h-[500px] flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="relative w-screen left-1/2 -translate-x-1/2 sm:static sm:w-auto sm:left-0 sm:translate-x-0 grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-2 mt-0 sm:mt-1 mb-0 sm:mb-1">
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
            buyText="Info"
            onBuyClick={() => handleMoreInfo("508")}
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
            buyText="Info"
            onBuyClick={() => handleMoreInfo("454")}
          />
        </div>
      </div>
    </section>
  );
};

export default RouterSims;