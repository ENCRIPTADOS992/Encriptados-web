"use client";
import { useEffect, useState, useRef } from "react";

import RouterProduct from "./RouterProduct";
import RouterDescription from "./RouterDescription";
import RouterBenefits from "./RouterBenefits";
import RouterFeatures from "./RouterFeatures";
import RouterSystemFeatures from "./RouterSystemFeatures";
import RouterVideo from "./RouterVideo";
import RouterSims from "./RouterSims";
import RouterFaq from "./RouterFaq";
import HeroBanner from "./HeroBanner";
import HeroBannerMobile from "./HeroBannerMobile";
import HeroBannerTablet from "./HeroBannerTablet";
import ProductSection from "./ProductSection";
import ProductSectionMobile from "./ProductSectionMobile";
import ProductSectionTablet from "./ProductSectionTablet";
import StickyPriceBannerDesktop from "./StickyPriceBannerDesktop";
import StickyPriceBannerTablet from "./StickyPriceBannerTablet";
import StickyPriceBannerMobile from "./StickyPriceBannerMobile";
import ProductFeaturesGrid from "./ProductFeaturesGrid";
import ProductFeaturesGridMobile from "./ProductFeaturesGridMobile";
import ProductFeaturesGridTablet from "./ProductFeaturesGridTablet";
import ProductBenefitsGrid from "./ProductBenefitsGrid";
import ProductBenefitsGridMobile from "./ProductBenefitsGridMobile";
import ProductBenefitsGridTablet from "./ProductBenefitsGridTablet";
import FeaturedProducts from "./FeaturedProducts";
import FeaturedProductsMobile from "./FeaturedProductsMobile";
import FeaturedProductsTablet from "./FeaturedProductsTablet";
import FAQSection from "./FAQSection";
import FAQSectionMobile from "./FAQSectionMobile";
import FAQSectionTablet from "./FAQSectionTablet";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { useSearchParams } from "next/navigation";
import { plans } from "../consts/plans";
import { usePriceVisibility } from "@/shared/hooks/usePriceVisibility";

const RouterPage = () => {
  const searchParams = useSearchParams();
  const { openModal } = useModalPayment();
  const plan = searchParams.get("plan");
  const priceBlockRef = useRef<HTMLDivElement | null>(null);

  const selected = plan || plans[0].value;
  const { isVisible } = usePriceVisibility(priceBlockRef);
  
  const productInfo = {
  title: "Silent Phone",
  price: "99$ USD",
  subtitle: "Comunicación cifrada y segura",
  iconUrl: "/images/apps/silent-circle/logo.png", 
  ctaLabel: "Comprar ahora",
  categoryId: 35,
  productId: 142,
  onBuy: () => {
      openModal({
        productid: "142",          
        languageCode: "es",
        selectedOption: 35,        
      });
    },
  onChat: () => {
    console.log("chat telegram");
  },
};

const handleRadioChange = (val: string) => {
        console.log("Cambio radio a:", val);
        setSelectedRadio(val);
      };
      
        const [selectedRadio, setSelectedRadio] = useState<string>("");
        useEffect(() => {
        if (
          plans.length > 0 &&
          (!selectedRadio || !plans.some((p) => p.label === selectedRadio))
        ) {
          console.log("Inicializa selectedRadio con:", plans[0].label);
          setSelectedRadio(plans[0].label);
        }
      }, [plans]);
const featuresGrid = [
    {
      image: "/images/router/red.png",
      title: "Selección de Antenas Aleatorias​",
      description:
        "El router se conecta a antenas aleatorias y no a la más cercana, lo que garantiza una mejor seguridad digital y protección contra IMSI Catchers.​",
    },
    {
      image: "/images/router/caballo.png",
      title: "Protección anti pegasus",
      description:
        "Notas de voz con la capacidad de grabar y proporcionar una alternativa segura al correo de voz. ",
    },
    {
      image: "/images/router/sim.png",
      title: "Camaleón + SIM Encriptada",
      description:
        "Al combinar el Router Camaleón con la SIM Encriptada de Encriptados, tendrás la mayor seguridad posible, eliminando el rastro o identificación.",
    },
    {
      image: "/images/router/celular.png",
      title: "Cambio de IMEI",
      description:
        "Esta función te permite cambiar el número IMEI cada que se reinicie el Router esto elimina el rastro cada vez y es el equivalente a cambiar de dispositivo.",
    },
  ];
  const benefits = [
    {
      icon: "/images/apps/silent-circle/icono.png",
      title: "Ideal para empresarios y anónimos digitales",
      description:
        "Perfecto para quienes se desplazan con frecuencia o desean mantener su identidad completamente protegida en línea. ",
    },
    {
      icon: "/images/apps/silent-circle/icono.png",
      title: "Tecnología de encriptación de alto nivel: ",
      description:
        "Protege todas tus conexiones, evitando que tus datos sean interceptados.",
    },
    {
      icon: "/images/apps/silent-circle/icono.png",
      title: "Protección avanzada contra hackeos y malware",
      description:
        "Evita la inyección directa de virus o software malicioso en tu dispositivo móvil, manteniendo tu conexión y tus datos completamente seguros.",
    },
    {
      icon: "/images/apps/silent-circle/icono.png",
      title: "Compatibilidad universal Wifi:",
      description:
        "Funciona con cualquier dispositivo que se conecte a Wi-Fi.",
    },
    {
      icon: "/images/apps/silent-circle/icono.png",
      title: "En mascara el IMSI",
      description:
        "Oculta tu IMSI para evitar interceptaciones o antenas falsas como IMSI Catcher.",
    },
    {
      icon: "/images/apps/silent-circle/icono.png",
      title: "Doble VPN",
      description:
        "Cuenta con dos VPNs, uno en el software instalado en el router y otro que va directamente en la tarjeta SIM, eso ofrece una doble capa de protección para cada conexión.​",
    },
  ];
  const Faqs = [
    {
      question:
        "¿Este Router es satelital?",
      answer:
        "Nord VPN Chat cifra tus mensajes de extremo a extremo para garantizar privacidad total. Solo tú y tus contactos pueden leer los mensajes.",
    },
    {
      question:
        "¿Qué es el código IMEI?",
      answer:
        "Está disponible para dispositivos iOS y Android compatibles con las versiones actuales de la App Store y Google Play.",
    },
    {
      question: "¿Cómo cambiar IMEI de mi Router Camaleón?",
      answer:
        "Por su seguridad avanzada, facilidad de uso y soporte 24/7, ideal para quienes valoran la privacidad.",
    },
    {
      question: "¿Qué es el doble VPN?",
      answer:
        "Por su seguridad avanzada, facilidad de uso y soporte 24/7, ideal para quienes valoran la privacidad.",
    },
  ];
  return (
    <main className="bg-white min-h-screen">
      <HeroBanner
      imageUrl="/images/router/routerCamaleon.png"
        alt="Armadillo Hero Banner"
         />

      <HeroBannerMobile
      imageUrl="/images/router/routerCamaleon.png"
        alt="Armadillo Hero Banner" />

      <HeroBannerTablet
      imageUrl="/images/router/routerCamaleon.png"
        alt="Armadillo Hero Banner" />

      <ProductSection
        title="Camaleón Router"
        description="El Router Camaleón es la solución ideal para aquellos que buscan privacidad total y una conexión segura a Internet."
        features={[
          "Cambio de IMEI ",
          "Doble VPN",
          "Conexión segura",
        ]}
        price="750$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
        productImage="/images/apps/chat-mail/banner.jpg"
        appStoreUrl="https://apps.apple.com/app/chatmail-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.chatmail"
      />
      <ProductSectionMobile
        title="Camaleón Router"
        description="El Router Camaleón es la solución ideal para aquellos que buscan privacidad total y una conexión segura a Internet."
        features={[
          "Cambio de IMEI ",
          "Doble VPN",
          "Conexión segura",
        ]}
        price="750$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
        productImage="/images/apps/chat-mail/banner.jpg"
        appStoreUrl="https://apps.apple.com/app/chatmail-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.chatmail"
      />
      <ProductSectionTablet
        title="Camaleón Router"
        description="El Router Camaleón es la solución ideal para aquellos que buscan privacidad total y una conexión segura a Internet."
        features={[
          "Cambio de IMEI ",
          "Doble VPN",
          "Conexión segura",
        ]}
        price="750$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
        productImage="/images/apps/chat-mail/banner.jpg"
        appStoreUrl="https://apps.apple.com/app/chatmail-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.chatmail"
      />
      {/* <RouterProduct /> */}
      <div className="hidden lg:block">
        <StickyPriceBannerDesktop
          visible={!isVisible}
          productInfo={productInfo}
        />
      </div>

      {/* Tablet */}
      <div className="hidden md:block lg:hidden">
        <StickyPriceBannerTablet
          visible={!isVisible}
          productInfo={productInfo}
        />
      </div>

      {/* Mobile */}
      <div className="block md:hidden">
        <StickyPriceBannerMobile
          visible={!isVisible}
          productInfo={productInfo}
        />
      </div>
      <ProductFeaturesGrid features={featuresGrid} />
      <ProductFeaturesGridMobile features={featuresGrid} />
      <ProductFeaturesGridTablet features={featuresGrid} />
      <ProductBenefitsGrid
        title="Quédate tranquilo con el router Camaleon"
        benefits={benefits}
      />
      <ProductBenefitsGridMobile
        title="Quédate tranquilo con el router Camaleon"
        benefits={benefits}
      />
      <ProductBenefitsGridTablet
        title="Quédate tranquilo con el router Camaleon"
        benefits={benefits}
      />
      <FeaturedProducts
        left={{
          title: "SIM Card encriptada",
          description:
            "Protégete de los ciberdelincuentes y mantén tu información personal segura",
          buttonLabel: "Comprar",
          onButtonClick: () => alert("Comprar SIM Card encriptada"),
          moreInfoLabel: "Más información",
          onMoreInfo: () => alert("Más información de SIM Card"),
          image: "/images/apps/silent-circle/sim.png",
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/silent-circle/phone.png",
        }}
      />
      <FeaturedProductsMobile
        left={{
          title: "SIM Card encriptada",
          description:
            "Protégete de los ciberdelincuentes y mantén tu información personal segura",
          buttonLabel: "Comprar",
          onButtonClick: () => alert("Comprar SIM Card encriptada"),
          moreInfoLabel: "Más información",
          onMoreInfo: () => alert("Más información de SIM Card"),
          image: "/images/apps/silent-circle/sim.png",
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/silent-circle/phone.png",
        }}
      />
      <FeaturedProductsTablet
        left={{
          title: "SIM Card encriptada",
          description:
            "Protégete de los ciberdelincuentes y mantén tu información personal segura",
          buttonLabel: "Comprar",
          onButtonClick: () => alert("Comprar SIM Card encriptada"),
          moreInfoLabel: "Más información",
          onMoreInfo: () => alert("Más información de SIM Card"),
          image: "/images/apps/silent-circle/sim.png",
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/silent-circle/phone.png",
        }}
      />
      <FAQSection faqs={Faqs} />
      <FAQSectionMobile faqs={Faqs} />
      <FAQSectionTablet faqs={Faqs} />
    </main>
  );
};

export default RouterPage;