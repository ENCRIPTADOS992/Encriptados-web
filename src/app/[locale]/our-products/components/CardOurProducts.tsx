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
    <div className="w-full flex flex-col md:flex-row items-stretch gap-6 mt-5">
      <div className="flex-1 h-full">
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
      </div>
      <div className="flex-1 h-full">
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
    </div>
  );
};

export default CardOurProducts;
