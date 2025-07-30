"use client";

import HeroBanner from "../component/templateApps/HeroBanner";
import HeroBannerMobile from "../component/templateApps/HeroBannerMobile";
import HeroBannerTablet from "../component/templateApps/HeroBannerTablet";
import ProductSection from "../component/templateApps/ProductSection";
import ProductSectionMobile from "../component/templateApps/ProductSectionMobile";
import ProductSectionTablet from "../component/templateApps/ProductSectionTablet";
import ProductFeaturesGrid from "../component/templateApps/ProductFeaturesGrid";
import ProductFeaturesGridMobile from "../component/templateApps/ProductFeaturesGridMobile";
import ProductFeaturesGridTablet from "../component/templateApps/ProductFeaturesGridTablet";
import ProductBenefitsGrid from "../component/templateApps/ProductBenefitsGrid";
import ProductBenefitsGridMobile from "../component/templateApps/ProductBenefitsGridMobile";
import ProductBenefitsGridTablet from "../component/templateApps/ProductBenefitsGridTablet";
import HeroVideoSection from "../component/templateApps/HeroVideoSection";
import HeroVideoSectionMobile from "../component/templateApps/HeroVideoSectionMobile";
import HeroVideoSectionTablet from "../component/templateApps/HeroVideoSectionTablet";
import FeaturedProducts from "../component/templateApps/FeaturedProducts";
import FeaturedProductsMobile from "../component/templateApps/FeaturedProductsMobile";
import FeaturedProductsTablet from "../component/templateApps/FeaturedProductsTablet";
import FAQSection from "../component/templateApps/FAQSection";
import FAQSectionMobile from "../component/templateApps/FAQSectionMobile";
import FAQSectionTablet from "../component/templateApps/FAQSectionTablet";
import DownloadAppSection from "../component/templateApps/DownloadAppSection";
import DownloadAppSectionMobile from "../component/templateApps/DownloadAppSectionMobile";
import DownloadAppSectionTablet from "../component/templateApps/DownloadAppSectionTablet";
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
  const benefits = [
    {
      icon: "/images/apps/armadillo-v2/icono.png",
      title: "Acceso sencillo a la cuenta",
      description:
        "Active o renueve su cuenta de Armadillo Chat para asegurarse de tener el software, las comunicaciones y el soporte más seguros.",
    },
    {
      icon: "/images/apps/armadillo-v2/icono.png",
      title: "Soporte 24/7",
      description:
        "También puede hablar directamente con nuestros expertos en seguridad móvil a través de Armadillo Chat sobre sus preocupaciones de seguridad.",
    },
    {
      icon: "/images/apps/armadillo-v2/icono.png",
      title: "Interfaz sencilla",
      description:
        "Armadillo Chat no solo es una aplicación completamente segura, también es muy fácil de usar.",
    },
    {
      icon: "/images/apps/armadillo-v2/icono.png",
      title: "Privacidad y seguridad",
      description:
        "Armadillo Chat es una aplicación de mensajería instantánea de alta seguridad. Con actualizaciones constantes nos aseguramos que todas tus comunicaciones sean privadas y que estén fuera del alcance de cualquier tercero malintencionado.",
    },
    {
      icon: "/images/apps/armadillo-v2/icono.png",
      title: "Alertas sobre posibles impostores",
      description:
        "Armadillo Chat le advierte automáticamente sobre posibles impostores en su lista de contactos y otros dispositivos conectados a su cuenta. En el modo de alta seguridad, también le advertirá sobre cualquier amigo que no haya verificado.",
    },
    {
      icon: "/images/apps/armadillo-v2/icono.png",
      title: "Notificaciones Push",
      description:
        "Armadillo Chat no solo es una aplicación completamente segura, también es muy fácil de usar.",
    },
  ];
  const Faqs =[
    {
      question: "¿Qué es el celular cifrado Armadillo Phone?",
      answer: "Es un celular cifrado que ofrece protección avanzada contra piratería. Cuenta con llamadas y videollamadas cifradas, chats encriptados y otras características que lo hacen un equipo seguro a prueba de hackers.",
    },
    {
      question: "¿Dónde comprar Armadillo Phone Celular cifrado?",
      answer: "Puedes adquirir tu celular Armadillo Phone o la licencia en Encriptados.io. Paga con el medio de pago que desees y recíbelo en el menor tiempo posible.",
    },
    {
      question: "¿Que es el cifrado OMEMO que utiliza Armadillo Phone?",
      answer: "OMEMO es un protocolo moderno que proporciona cifrado de extremo a extremo multicapa lo que permite la sincronización segura de mensajes entre múltiples clientes, incluso si algunos de ellos están fuera de línea.",
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
        imageUrl="/images/apps/armadillo-v2/armadillo_software.png"
        alt="Armadillo Hero Banner"
      />
      <HeroBannerMobile imageUrl="/images/apps/armadillo-v2/bannermobile.png" 
        alt="Armadillo Hero Banner" />
      <HeroBannerTablet imageUrl="/images/apps/armadillo-v2/bannertablet.png" 
        alt="Armadillo Hero Banner" />
      <ProductSection
        title="Armadillo"
        description="Un equipo ultra seguro a prueba de ataques y fácil de usar."
        features={[
          "Llamadas y videollamadas cifradas",
          "Interfaz intuitiva",
          "Chats cifrados con borrado remoto",
        ]}
        price="349$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/armadillo-v2/productSoftware.jpg"
        appStoreUrl="https://apps.apple.com/app/armadillo-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.armadillo"
      />
      <ProductSectionMobile
        title="Armadillo"
        description="Un equipo ultra seguro a prueba de ataques y fácil de usar."
        features={[
          "Llamadas y videollamadas cifradas",
          "Interfaz intuitiva",
          "Chats cifrados con borrado remoto",
        ]}
        price="349$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/armadillo-v2/productSoftware.jpg"
        appStoreUrl="https://apps.apple.com/app/armadillo-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.armadillo"
      />
      <ProductSectionTablet
        title="Armadillo"
        description="Un equipo ultra seguro a prueba de ataques y fácil de usar."
        features={[
          "Llamadas y videollamadas cifradas",
          "Interfaz intuitiva",
          "Chats cifrados con borrado remoto",
        ]}
        price="349$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/armadillo-v2/productSoftware.jpg"
        appStoreUrl="https://apps.apple.com/app/armadillo-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.armadillo"
      />
      <ProductBenefitsGrid benefits={benefits} />
      <ProductBenefitsGridMobile benefits={benefits}/>
      <ProductBenefitsGridTablet benefits={benefits}/>
      <HeroVideoSection
        title={`Teléfonos Seguros y Celulares Encriptados Que No Conoces ¿Cómo tener Uno?`}
        videoUrl="https://www.youtube.com/embed/X9iE-f8briY"
      />
      <HeroVideoSectionMobile
        title={`Teléfonos Seguros y Celulares Encriptados Que No Conoces ¿Cómo tener Uno?`}
        videoUrl="https://www.youtube.com/embed/X9iE-f8briY"
      />
      <HeroVideoSectionTablet
        title={`Teléfonos Seguros y Celulares Encriptados Que No Conoces ¿Cómo tener Uno?`}
        videoUrl="https://www.youtube.com/embed/X9iE-f8briY"
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
