"use client";

import SimMinutosDatos from "../../../../../public/images/our-products/sim-minutos-datos.png";
import EsimMinutosDatos from "../../../../../public/images/our-products/esim-minutos-datos.png";
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
    <div className=" mt-5 mb-12 flex flex-col md:flex-row gap-x-4 gap-0 justify-center gap-y-4">
      <CardSimEsim
        title="SIM Card encriptada"
        description="Protegete de los ciberdelincuentes y mantén tu información personal segura"
        imageSrc={SimMinutosDatos.src}
        altText="Sim Card"
        background="bg-custom-gradient-our-products-black" // Fondo personalizado
        titleColor="text-white"
        descriptionColor="text-white"
        showMoreInfo={true}
        buyText="Comprar"
        moreInfoText="Descubre más"
        onBuyClick={() => {
          console.log("🛒 onBuyClick: abriendo modal");
          openModal({ productid: "503", languageCode: "es" });
        }}
        moreInfoUrl={`/mas-informacion?selectedOption=${filters.selectedOption}`}
        onMoreInfoClick={() => console.log("Más información")}
      />

      <CardSimEsim
        title="e-SIM Encriptada Planes datos o minutos"
        description="Subtitle element copy"
        imageSrc={EsimMinutosDatos.src}
        altText="eSim"
        background="bg-custom-gradient-our-sim-blue" // Fondo personalizado
        titleColor="text-black"
        descriptionColor="text-black"
        showMoreInfo={false}
        buyText="Ver Más"
        moreInfoText="Descubre más"
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
