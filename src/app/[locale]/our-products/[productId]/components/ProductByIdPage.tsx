"use client";
import React from "react";
import CardProduct from "./CardProduct";
import CardProductBanner from "./CardProductBanner";
import Features from "./Features";
import Advantages from "./Advantages";
import BannerCoverage from "@/shared/BannerCoverage";
import { useQuery } from "@tanstack/react-query";

import Accordion from "@/shared/components/Accordion";
import { useTranslations } from "next-intl";

import { PRODUCT_BY_ID_QUERY_KEY } from "@/features/products/constants/queryProductsKeys";
import Loader from "@/shared/components/Loader";
import BannerProduct from "./BannerProduct";

import BannerConnect from "@/app/[locale]/encrypted-sim/components/BannerConnect";
import { ProductById } from "@/features/products/types/AllProductsResponse";
import CustomShapeProduct from "./CustomShapeProduct";
import SearchInput from "@/shared/components/SearchInput";
import ListOfPlans from "@/app/[locale]/encrypted-sim/components/ListOfPlans";
import { BasicFormProvider } from "@/shared/components/BasicFormProvider";
import { ListOfProductsData } from "@/app/[locale]/encrypted-sim/constants/ListOfProductsData";
import EncryptedSimBanner from "@/app/[locale]/encrypted-sim/components/EncryptedSimBanner";
import FeaturesList from "@/app/[locale]/encrypted-sim/components/FeaturesList";
import OurObjetive from "@/app/[locale]/encrypted-sim/components/OurObjetive";
import BannerSecure from "@/app/[locale]/encrypted-sim/components/BannerSecure";
import PayForUse from "@/app/[locale]/encrypted-sim/components/PayForUse";
import WhyCallSim from "@/app/[locale]/encrypted-sim/components/WhyCallSim/WhyCallSim";

const ProductByIdPage = () => {
  const e = useTranslations("EncryptedSimPage");

  const { isPending, data } = useQuery({
    queryKey: PRODUCT_BY_ID_QUERY_KEY,
  });

  const productData = data as ProductById;

  if (isPending) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
        <Loader />
      </div>
    );
  }

  const titlesOfSims = [
    "eSIM Virtual",
    "SIM Física",
    "Recarga de cambio de IMSI",
    "Recarga de Datos",
  ];

  return (
    <>
      {productData?.data?.title &&
      titlesOfSims.some((title) => title === productData.data.title) ? (
        <>
          <div className="bg-black h-[300px]">
            <CustomShapeProduct />
          </div>
          <div className="flex justify-center items-center max-w-[1100px] m-auto p-4 translate-y-[-250px] mb-[-250px] ">
            <BannerConnect />
          </div>
          <div className="flex justify-center  ">
            <div className="w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-6/12 py-9">
              <BasicFormProvider>
                <div className=" p-4 ">
                  <h1 className="bg-gradient-to-r text-3xl text-center justify-center font-bold from-[#35CDFB] to-[#000000] bg-clip-text text-transparent mb-4 ">
                    Cobertura en más de 200 países
                  </h1>
                  <div className=" flex justify-center text-center mb-4">
                    <p className="text-lg mb-4  text-[#012029]">
                      Consulta el costo del gigabyte según el país y el perfil
                      recomendado, así optimizas el consumo de tus datos al
                      mejor precio
                    </p>
                  </div>

                  <SearchInput
                    inputClassName="border-4 border-[#DCF2F8] focus:outline-none focus:border-[#DCF2F8]"
                    iconPosition="left"
                    name="searchinputcountry"
                    placeholder="Colombia"
                  />
                  <div className="mt-4 w-full">
                    <ListOfPlans data={ListOfProductsData} />
                  </div>
                </div>
              </BasicFormProvider>
            </div>
          </div>
        </>
      ) : (
        <BannerProduct />
      )}
      {/* Condicion  solo para sims, compara los titulos de las sims al renderizar los componentes */}
      {productData?.data?.title &&
      titlesOfSims.some((title) => title === productData.data.title) ? (
        <>
          <div className="flex flex-col-reverse md:flex-row justify-center w-10/12 mx-auto gap-8 md:gap-12 mt-8 md:mt-16">
            <div className="w-full md:w-5/12">
              <CardProduct />
            </div>
            <div className="w-full md:w-5/12">
              <CardProductBanner />
            </div>
          </div>

          <div className="flex justify-center items-center flex-col bg-cyan-gradient">
            <EncryptedSimBanner />
          </div>

          <div className="bg-[#F4F8FA]">
            <div className="w-full md:w-6/12 lg:w-4/12 justify-center mx-auto items-center p-4 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-[#333333] mt-8 sm:mt-12 lg:mt-16 mb-8 sm:mb-12 lg:mb-16">
                {e("improveYourSecurity.titleImproveYourSecurity")}
              </h2>
            </div>
            <div className="w-11/12 sm:w-9/12 md:w-9/12 lg:w-9/12 xl:w-9/12  items-center flex justify-center mx-auto">
              <FeaturesList />
            </div>
          </div>

          <div className="bg-[#f4f8fa] py-12 md:py-16">
            <div className="w-11/12 sm:w-9/12 md:w-9/12 lg:w-9/12 xl:w-9/12 mx-auto">
              <OurObjetive />
            </div>

            <div className="bg-[#E7F4F8] py-12 md:py-16 mt-12 md:mt-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-[#333333] max-w-[1100px] mx-auto mb-6 sm:mb-8 md:mb-12 lg:mb-16">
                {e("comunicationTitle")}
              </h2>
              <div className="w-11/12 sm:w-9/12 md:w-9/12 lg:w-9/12 xl:w-9/12 mx-auto">
                <BannerSecure />
              </div>
            </div>

            <div className="w-11/12 sm:w-9/12 md:w-9/12 lg:w-9/12 xl:w-9/12 mx-auto py-12">
              <PayForUse />
            </div>

            <div className="w-11/12 sm:w-9/12 md:w-9/12 lg:w-9/12 xl:w-9/12 mx-auto py-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-[#333333] mb-6 sm:mb-8 md:mb-12 lg:mb-16">
                {e("whyCallWithEncryptedSIM.title")}
              </h2>
              <div className="flex justify-center">
                <WhyCallSim />
              </div>
            </div>
          </div>

          <div className="">
            <BannerCoverage />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col-reverse md:flex-row justify-center w-10/12 mx-auto gap-x-12 mt-24 ">
            <div className="w-full md:w-5/12 mt-4">
              <CardProduct />
            </div>
            <div className="w-full md:w-5/12 ">
              <CardProductBanner />
            </div>
          </div>

          <div className="mt-24">
            <Features />
          </div>

          <div className="">
            <Advantages />
          </div>

          <div className="">
            <BannerCoverage />
          </div>

          <div className="px-2 2xl:px-96 xl:px-10 lg:px-0  mt-24 mb-24">
            <h1 className="sm:text-xl text-center md:text-base lg:text-lg xl:text-4xl mb-5  font-bold text-[#333333]">
              Preguntas frecuentes
            </h1>
            <Accordion items={productData?.data?.faqs} />
          </div>
        </>
      )}
    </>
  );
};

export default ProductByIdPage;
