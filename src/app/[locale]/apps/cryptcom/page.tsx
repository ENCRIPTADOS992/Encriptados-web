"use client";

import HeroBanner from "../component/templateSoftware/HeroBanner";
import HeroBannerMobile from "../component/templateSoftware/HeroBannerMobile";
import HeroBannerTablet from "../component/templateSoftware/HeroBannerTablet";
import ProductSection from "../component/templateSoftware/ProductSection";
import ProductSectionMobile from "../component/templateSoftware/ProductSectionMobile";
import ProductSectionTablet from "../component/templateSoftware/ProductSectionTablet";
import ProductFeaturesGrid from "../component/templateSoftware/ProductFeaturesGrid";
import ProductFeaturesGridMobile from "../component/templateSoftware/ProductFeaturesGridMobile";
import ProductFeaturesGridTablet from "../component/templateSoftware/ProductFeaturesGridTablet";
import ProductBenefitsGrid from "../component/templateSoftware/ProductBenefitsGrid";
import ProductBenefitsGridMobile from "../component/templateSoftware/ProductBenefitsGridMobile";
import ProductBenefitsGridTablet from "../component/templateSoftware/ProductBenefitsGridTablet";
import HeroVideoSection from "../component/templateSoftware/HeroVideoSection";
import HeroVideoSectionMobile from "../component/templateSoftware/HeroVideoSectionMobile";
import HeroVideoSectionTablet from "../component/templateSoftware/HeroVideoSectionTablet";
import FeaturedProducts from "../component/templateSoftware/FeaturedProducts";
import FeaturedProductsMobile from "../component/templateSoftware/FeaturedProductsMobile";
import FeaturedProductsTablet from "../component/templateSoftware/FeaturedProductsTablet";
import FAQSection from "../component/templateSoftware/FAQSection";
import FAQSectionMobile from "../component/templateSoftware/FAQSectionMobile";
import FAQSectionTablet from "../component/templateSoftware/FAQSectionTablet";
import DownloadAppSection from "../component/templateSoftware/DownloadAppSection";
import DownloadAppSectionMobile from "../component/templateSoftware/DownloadAppSectionMobile";
import DownloadAppSectionTablet from "../component/templateSoftware/DownloadAppSectionTablet";
import { plans } from "./consts/plans";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductById } from "@/features/products/services";
import type { ProductById } from "@/features/products/types/AllProductsResponse";

const prices: Record<string, string> = {
  "6": "349$ USD",
  "12": "595$ USD",
  "12.1": "1495$ USD",
};

const Page = () => {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const productId = searchParams.get("productId");
  const selected = plan || plans[0].value;
  const [product, setProduct] = useState<ProductById | null>(null);
  const featuresGrid = [
    {
      image: "/images/apps/cryptcom/chat.png",
      title: "Chat",
      description:
        "Chats cifrados: Envía texto, imágenes, notas de voz y videos de forma segura y encriptada. ",
    },
    {
      image: "/images/apps/cryptcom/chat-cifrado.png",
      title: "Chat Cifrado",
      description:
        "Con la opción de grupos anónimos de conocimiento cero, los usuarios no podrán ver ni recuperar la información de contacto de los miembros del grupo.",
    },
    {
      image: "/images/apps/cryptcom/mensajeria.png",
      title: "Mensajería segura",
      description:
        "Mensajería combinada y chat y correo electrónico cifrados Chats cifrados híbridos en la vista de chat en vivo con marcas de verificación de notificación entregada y leída, funciones de eliminación y edición de mensajes, traducción de texto.",
    },
    {
      image: "/images/apps/cryptcom/chat-enmascarado.png",
      title: "Chat enmascarado",
      description:
        "El texto se convierte en una fuente enmascarada ilegible cuando el dispositivo está inactivo.",
    },
  ];
  const Faqs =[
     {
      question: "¿Cómo se hace la encriptación de un celular Cryptcom?",
      answer:
        "Al encriptar el celular con una licencia Cryptcom, se reemplaza el sistema operativo original por uno encriptado de grado militar, con características especiales como chats cifrados, llamadas seguras, destrucción remota, entre otras que puedes conocer en encriptados.io.",
    },
    {
      question:
        "¿Qué funcionalidades voy a tener al encriptar mi celular con Cryptcom?",
      answer:
        "Además de la seguridad y privacidad que ofrece el celular encriptado Cryptcom, tendrás funcionalidades como chats cifrados, borrado remoto, mail cifrado, mensajes temporizados, baúl en la nube y múltiples aplicaciones cifradas.",
    },
    {
      question:
        "¿Cómo funciona el borrado remoto en un celular encriptado como Cryptcom?",
      answer:
        "En caso de perder el teléfono o ser víctima de robo, se podrá enviar una combinación predeterminada de caracteres al propio chat de tu celular Cryptcom para eliminar toda la información. En otros casos, se podrá hacer contactando al proveedor de la licencia.",
    },
  ]
  useEffect(() => {
    if (productId) {
      getProductById(productId, "es").then(setProduct).catch(console.error);
    }
  }, [productId]);

  return (
    <div>
      <HeroBanner
        imageUrl="/images/apps/cryptcom/cryptcom-banner-desktop.png"
        alt="Armadillo Hero Banner"
      />
      <HeroBannerMobile imageUrl="/images/apps/cryptcom/cryptcom-banner-mobile.png" 
        alt="Armadillo Hero Banner" />
      <HeroBannerTablet imageUrl="/images/apps/cryptcom/bannerIpad.png" 
        alt="Armadillo Hero Banner" />
      <ProductSection
        title="Cryptcom"
        description="Convierte tu teléfono inteligente en un dispositivo de comunicaciones altamente seguro."
        features={[
          "Cambiador automático de IMEI",
          "Baúl cifrado en la nube",
          "Encubrimiento de aplicaciones",
        ]}
        price="729$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/cryptcom/phone-cryptcom-app.png"
        appStoreUrl="https://apps.apple.com/app/chatmail-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.chatmail"
      />
      <ProductSectionMobile
        title="Cryptcom"
        description="Convierte tu teléfono inteligente en un dispositivo de comunicaciones altamente seguro."
        features={[
          "Cambiador automático de IMEI",
          "Baúl cifrado en la nube",
          "Encubrimiento de aplicaciones",
        ]}
        price="729$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/cryptcom/phone-cryptcom-app.png"
        appStoreUrl="https://apps.apple.com/app/chatmail-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.chatmail"
      />
      <ProductSectionTablet
        title="Cryptcom"
        description="Convierte tu teléfono inteligente en un dispositivo de comunicaciones altamente seguro."
        features={[
          "Cambiador automático de IMEI",
          "Baúl cifrado en la nube",
          "Encubrimiento de aplicaciones",
        ]}
        price="729$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/cryptcom/phone-cryptcom-app.png"
        appStoreUrl="https://apps.apple.com/app/chatmail-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.chatmail"
      />
      <ProductFeaturesGrid features={featuresGrid} />
      <ProductFeaturesGridMobile features={featuresGrid} /> 
      <ProductFeaturesGridTablet features={featuresGrid}/>
      <HeroVideoSection
        title={`Cryptcom El Sistema operativo que volverá inhackeable tu celular`}
        videoUrl="https://www.youtube.com/embed/BkT7D_akpyU"
      />
      <HeroVideoSectionMobile
        title={`Cryptcom El Sistema operativo que volverá inhackeable tu celular`}
        videoUrl="https://www.youtube.com/embed/BkT7D_akpyU"
      />
      <HeroVideoSectionTablet
        title={`Cryptcom El Sistema operativo que volverá inhackeable tu celular`}
        videoUrl="https://www.youtube.com/embed/BkT7D_akpyU"
      />
      <FeaturedProducts
        left={{
          title: "SIM Card encriptada",
          description: "Protégete de los ciberdelincuentes y mantén tu información personal segura",
          buttonLabel: "Comprar",
          onButtonClick: () => alert("Comprar SIM Card encriptada"),
          moreInfoLabel: "Más información",
          onMoreInfo: () => alert("Más información de SIM Card"),
          image: "/images/apps/armadillo-v2/sim.png", 
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/armadillo-v2/phone.png",
        }}
      />
      <FeaturedProductsMobile
        left={{
          title: "SIM Card encriptada",
          description: "Protégete de los ciberdelincuentes y mantén tu información personal segura",
          buttonLabel: "Comprar",
          onButtonClick: () => alert("Comprar SIM Card encriptada"),
          moreInfoLabel: "Más información",
          onMoreInfo: () => alert("Más información de SIM Card"),
          image: "/images/apps/armadillo-v2/sim.png", 
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/armadillo-v2/phone.png",
        }}
      />
      <FeaturedProductsTablet
        left={{
          title: "SIM Card encriptada",
          description: "Protégete de los ciberdelincuentes y mantén tu información personal segura",
          buttonLabel: "Comprar",
          onButtonClick: () => alert("Comprar SIM Card encriptada"),
          moreInfoLabel: "Más información",
          onMoreInfo: () => alert("Más información de SIM Card"),
          image: "/images/apps/armadillo-v2/sim.png", 
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/armadillo-v2/phone.png",
        }}
      />
      <FAQSection faqs={Faqs}/>
      <FAQSectionMobile faqs={Faqs}/>
      <FAQSectionTablet faqs={Faqs}/>
      <DownloadAppSection />
      <DownloadAppSectionMobile/>
      <DownloadAppSectionTablet/>
    </div>
  );
};

export default Page;
