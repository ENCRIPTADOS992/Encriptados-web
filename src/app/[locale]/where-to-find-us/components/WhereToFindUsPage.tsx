"use client";
import React from "react";
import WhereToFindUsBanner from "./WhereToFindUsBanner";
import WhereListOfCards from "./WhereListOfCards";
import FormWhereToFind from "./FormWhereToFind";
import { BasicFormProvider } from "@/shared/components/BasicFormProvider";
import HowToBuy from "./HowToBuy";
import DownloadBanner from "../../ambassadors/components/DownloadBanner";
import DownloadBannerMobile from "../../ambassadors/components/DownloadBannerMobile";

const WhereToFindUsPage = () => {
  return (
    <div className="bg-gradient-to-b from-[#041A20] via-[#041A20] to-black">
      {/* 1. Banner principal */}
      <WhereToFindUsBanner />

      {/* 2. Lista de tarjetas */}
      <WhereListOfCards />

      {/* 3. Formulario */}
      <BasicFormProvider values={{ country: "Colombia" }}>
        <FormWhereToFind />
      </BasicFormProvider>

      {/* 4. Sección “Cómo comprar” */}
      <HowToBuy />

      {/* 5. Banners de descarga (desktop / mobile) */}
      <div className="hidden lg:block z-10">
        <DownloadBanner />
      </div>
      <div className="block lg:hidden z-10">
        <DownloadBannerMobile />
      </div>
    </div>
  );
};

export default WhereToFindUsPage;
