import { useTranslations } from "next-intl";
import React from "react";
import SlickCarouselProducts from "./SlickCarouselProducts";
import SlickLogos from "./SlickLogos";

const FindOurProducts = () => {
  const t = useTranslations("DeliveryPage");
  return (
    <>
      <h1 className="sm:text-xl md:text-base lg:text-lg xl:text-4xl font-bold text-[#333333] mt-10 mb-10 text-center">
        {t("encriptedProductsTitle")}
      </h1>

      <SlickCarouselProducts />

      <div className="mt-10 mb-10">
        <SlickLogos />
      </div>
    </>
  );
};

export default FindOurProducts;
