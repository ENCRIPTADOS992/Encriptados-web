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

const Page = () => {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const productId = searchParams.get("productId");
  const selected = plan || plans[0].value;
  const [product, setProduct] = useState<ProductById | null>(null);
  const featuresGrid = [
    {
      image: "/images/apps/secureCrypt/imagen_setup.png",
      title: "Cifrado ECC",
      description:
        "El protocolo de encriptación SecureCrypt usa encriptación ECC de 512 bits, que es equivalente a RSA de 15,360 bits. Nuevas claves ECC para cada mensaje.",
    },
    {
      image: "/images/apps/secureCrypt/phone_image.png",
      title: "Mensajes temporizados",
      description:
        "Habilitar el modo de quema de mensajes, permite al remitente de un mensaje configurar un temporizador y hacer que el mensaje enviado se autodestruya tanto desde el dispositivo del remitente como desde el dispositivo del destinatario.",
    },
    {
      image: "/images/apps/secureCrypt/mensajes.png",
      title: "Archivos Encriptados",
      description:
        "Comparte archivos de forma segura y protegida sin riesgo de acceso no autorizado.",
    },
    {
      image: "/images/apps/secureCrypt/llamadas.png",
      title: "Llamadas Encriptadas",
      description:
        "Comunicación de voz segura con cifrado extremo a extremo, protegiendo la privacidad de tus conversaciones.",
    },
  ];
  const Faqs =[
    {
          "question": "¿Qué archivos puedo proteger con la Aplicación SecureCrypt?",
          "answer": "Puedes proteger mensajes, archivos, contactos y llamadas de voz. Toda tu información viaja cifrada de extremo a extremo."
        },
        {
          "question": "¿Por qué debería usar la aplicación SecureCrypt en mi empresa?",
          "answer": "Porque ofrece máxima seguridad, protección contra intrusiones y cifrado total, evitando fugas de información corporativa."
        },
        {
          "question": "¿Por qué debería usar una aplicación cifrada como SecureCrypt en vez de una convencional?",
          "answer": "Las apps convencionales no ofrecen protección real ante espionaje, SecureCrypt garantiza privacidad y confidencialidad absoluta."
        }
  ]
  useEffect(() => {
    if (productId) {
      getProductById(productId, "es").then(setProduct).catch(console.error);
    }
  }, [productId]);

  return (
    <div>
      <HeroBanner
        imageUrl="/images/apps/secureCrypt/banner.png"
        alt="Armadillo Hero Banner"
      />
      <HeroBannerMobile imageUrl="/images/apps/secureCrypt/mobile.jpg" 
        alt="Armadillo Hero Banner" />
      <HeroBannerTablet imageUrl="/images/apps/secureCrypt/banner.png" 
        alt="Armadillo Hero Banner" />
      <ProductSection
        title="SecureCrypt"
        description="SecureCrypt utiliza servidores globales descentralizados que se autodestruyen cada 24 horas. Este enfoque evita que datos se guarden tu movil."
        features={[
          "Chat Encriptado",
          "Bóveda encriptada ",
          "Llamadas Encriptadas",
        ]}
        price="375$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/secureCrypt/Group_fondo.png"
        appStoreUrl="https://apps.apple.com/app/securecrypt-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.securecrypt"
      />
      <ProductSectionMobile
               title="SecureCrypt"
        description="SecureCrypt utiliza servidores globales descentralizados que se autodestruyen cada 24 horas. Este enfoque evita que datos se guarden tu movil."
        features={[
          "Chat Encriptado",
          "Bóveda encriptada ",
          "Llamadas Encriptadas",
        ]}
        price="375$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/secureCrypt/Group_fondo.png"
        appStoreUrl="https://apps.apple.com/app/securecrypt-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.securecrypt"
      />
      <ProductSectionTablet
                title="SecureCrypt"
        description="SecureCrypt utiliza servidores globales descentralizados que se autodestruyen cada 24 horas. Este enfoque evita que datos se guarden tu movil."
        features={[
          "Chat Encriptado",
          "Bóveda encriptada ",
          "Llamadas Encriptadas",
        ]}
        price="375$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/secureCrypt/Group_fondo.png"
        appStoreUrl="https://apps.apple.com/app/securecrypt-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.securecrypt"
      />
      <ProductFeaturesGrid features={featuresGrid} />
      <ProductFeaturesGridMobile features={featuresGrid} /> 
      <ProductFeaturesGridTablet features={featuresGrid}/>
      <HeroVideoSection
        title={`SecureCrypt App, comunicaciones seguras y encriptadas para chatear en secreto`}
        videoUrl="https://www.youtube.com/embed/YvuaT5-uaUg"
      />
      <HeroVideoSectionMobile
        title={`SecureCrypt App, comunicaciones seguras y encriptadas para chatear en secreto`}
        videoUrl="https://www.youtube.com/embed/YvuaT5-uaUg"
      />
      <HeroVideoSectionTablet
        title={`SecureCrypt App, comunicaciones seguras y encriptadas para chatear en secreto`}
        videoUrl="https://www.youtube.com/embed/YvuaT5-uaUg"
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
