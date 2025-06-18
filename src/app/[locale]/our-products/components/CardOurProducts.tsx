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
    <div className="max-w-[1100px] mx-auto mt-5 mb-12 flex flex-col md:flex-row gap-x-4 gap-0 justify-center gap-y-4">
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
