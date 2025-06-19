"use client";

import SimMinutosDatos from "../../../../../public/images/our-products/1b097c330ad6a7135bc1084b2ca6886438cde653.png";
import EsimMinutosDatos from "../../../../../public/images/our-products/timpersona.png";
import CardSimEsim from "./svgs/CardSimEsim";
import { ProductFilters } from "@/features/products/types/ProductFilters";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
interface CardOurProductsProps {
  filters: ProductFilters;
}

const CardOurProducts: React.FC<CardOurProductsProps> = ({ filters }) => {
  const { openModal } = useModalPayment();

  const handleBuyClick = () => {
    console.log("🛒 [CardOurProducts] onBuyClick disparado — llamando openModal({ productid: '503', languageCode: 'es' })");
    openModal({ productid: "503", languageCode: "es" });
  };
  
  return (
     <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-14 mt-5 mb-12 flex flex-col md:flex-row gap-x-6 justify-between gap-y-4 items-stretch min-w-0">
      <CardSimEsim
        title="SIM Card encriptada"
        description="Protegete de los ciberdelincuentes y mantén tu información personal segura"
        imageSrc={SimMinutosDatos.src}
        altText="Sim Card"
        background="bg-custom-gradient-our-products-black"
        titleColor="text-white"
        descriptionColor="text-white"
        showMoreInfo={true}
        buyText="Comprar aquí"
        moreInfoText="Más información"
        moreInfoColor="text-[#10B4E7]"
        onBuyClick={() => {
          console.log("🛒 onBuyClick: abriendo modal");
          openModal({ productid: "503", languageCode: "es" });
        }}
        moreInfoUrl={`/mas-informacion?selectedOption=${filters.selectedOption}`}
        onMoreInfoClick={() => console.log("Más información")}
      />

      <CardSimEsim
        title="SIM TIM Conéctate con total anonimato"
        description="Tus datos no expiran sin importar el tiempo que tardes en consumirlos"
        imageSrc={EsimMinutosDatos.src}
        altText="eSim"
        background="bg-custom-gradient-our-sim-blue2"
        titleColor="text-black"
        descriptionColor="text-black"
        buyText="Comprar aquí"
        moreInfoText="Más información"
        moreInfoColor="text-black"
        onBuyClick={() => {
          console.log("🛒 onBuyClick: abriendo modal");
          openModal({ productid: "503", languageCode: "es" });
        }}
        moreInfoUrl={`/mas-informacion?selectedOption=${filters.selectedOption}`}
        onMoreInfoClick={() => console.log()}
      />
    </div>
  );
};

export default CardOurProducts;
