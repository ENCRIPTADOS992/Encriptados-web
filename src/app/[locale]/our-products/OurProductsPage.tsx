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

const OurProductsPage = () => {
  const { openModal } = useModalPayment();
  const t = useTranslations("OurProductsPage");
  const { filters, updateFilters } = useProductFilters();

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
        <div className="hidden md:block">
          <BannerOurProducts />
        </div>
        <div className="p-8 bg-[#F4F8FA]">
          <h1 className="bg-gradient-to-r text-3xl justify-center font-bold mt-[75px]  flex items-center from-[#000000] to-[#35CDFB] bg-clip-text text-transparent mb-7 text-center">
            {t("filterProducts.title")}
          </h1>

          <div id="#buysimappsection">
            <FilterProductsBar filters={filters} updateFilters={updateFilters} />

            <ListOfProducts filters={filters} />
          </div>

          <div className="rounded-xl w-full max-w-7xl mx-auto mt-16 ">
            <div className="flex flex-col  justify-between">
            <CardOurProducts filters={filters} />
            </div>
          </div>
        </div>
      </BasicFormProvider>

      <div className="w-full m-0 p-0">
        <BannerActivate />
      </div>
      <div className=" rounded-xl w-full mx-auto py-11">
        <BannerCards />
      </div>
      <div className=" bg-[#EBF5FA] py-11">
        <AnonymousBanner />
      </div>
      <div className="">
        <BannerCoverage />
      </div>
      <div className="">
        <BannerSecureMdm />
      </div>

      <div className="">
        <DownloadAppBanner />
      </div>

      <div>
        <BasicFormProvider
          submit={(data) => {
            console.log(data, "Formulario enviado con esta data");
          }}
        >
          <FormOurProducts />
        </BasicFormProvider>
      </div>
    </>
  );
};

export default OurProductsPage;
