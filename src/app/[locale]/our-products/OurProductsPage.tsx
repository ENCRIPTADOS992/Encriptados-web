"use client";
import React, { useEffect } from "react";
import FilterProductsBar from "./components/FilterProductsBar/FilterProductsBar";
import CardOurProducts from "./components/CardOurProducts";
import BannerActivate from "./components/BannerActivate";
import BannerCards from "./components/BannerCards";
import AnonymousBanner from "../tim-sim/components/BannerAnonymous";
import BannerCoverage from "@/shared/BannerCoverage";
import BannerSecureMdm from "./components/BannerSecureMdm";
import DownloadAppBanner from "./components/DownloadAppBanner";
import FormOurProducts from "./components/FormOurProducts";

import { BasicFormProvider } from "@/shared/components/BasicFormProvider";
import ListOfProducts from "./components/ListOfProducts";
import { useTranslations } from "next-intl";
import BannerOurProductsMobile from "./components/BannerOurProductsMobile";
import BannerOurProducts from "./components/BannerOurProducts";
import { useProductFilters } from "@/features/products/hooks/useProductFilters";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { useGetProducts } from "@/features/products/queries/useGetProducts";
import SilentCircleBanner from "./components/SilentCircleBanner";
import BannerSecureMdmNew from "./components/BannerSecureMdmNew";
import SecureCommunicationBanner from "./components/SecureCommunicationBanner";

const OurProductsPage = () => {
  const { openModal } = useModalPayment();
  const t = useTranslations("OurProductsPage");
  const { filters, updateFilters } = useProductFilters();

  const selectedOption = parseInt(filters.selectedOption, 10);
  const { data: products, isFetching, isError } = useGetProducts(selectedOption, filters.provider);

  useEffect(() => {
    console.log("[OurProductsPage] Página montada correctamente ✅");
  }, []);

  useEffect(() => {
    console.log("[OurProductsPage] Current filters:", filters);
  }, [filters]);

  return (
    <>
      <BasicFormProvider defaultValue={filters}>

        <div className="block md:hidden">
          <BannerOurProductsMobile />
        </div>

        {/* Banner para dispositivos mayores que móvil */}
        <div
          className="hidden md:block bg-black"
          style={{
            background: 'radial-gradient(circle at 75% -70%, #7EE0FF 0%,rgb(37, 191, 238) 20%, #000 60%)',
          }}
        >
          <BannerOurProducts />
        </div>
        <div className="bg-[#000]">
          <div className="w-full bg-black py-10 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-20 2xl:px-32">
            <h1 className="bg-gradient-to-r text-3xl justify-center font-bold mt-[10px] flex items-center from-[#FFFF] to-[#35CDFB] bg-clip-text text-transparent mb-7 text-center">
              {t("filterProducts.title")}
            </h1>

            <div id="#buysimappsection">
              <FilterProductsBar
                filters={filters}
                updateFilters={updateFilters}
                products={products}
              />

              <ListOfProducts filters={filters} />
            </div>
          </div>

          <div className="bg-blackrounded-xl w-full max-w-7xl mx-auto mt-16 ">
            <div className="w-full bg-black py-10 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-20 2xl:px-32">
              <CardOurProducts filters={filters} />
            </div>
          </div>
        </div>
      </BasicFormProvider>

      <div className="p-1 bg-[#000]">
        <SilentCircleBanner />
      </div>
      
      <div className="p-1 bg-[#000]">
        <BannerSecureMdmNew />
      </div>

      <div className="p-1 bg-[#000]">
        <SecureCommunicationBanner />
      </div>

      {/* <div>
        <BasicFormProvider
          submit={(data) => {
            console.log(data, "Formulario enviado con esta data");
          }}
        >
          <FormOurProducts />
        </BasicFormProvider>
      </div> */}
    </>
  );
};

export default OurProductsPage;
