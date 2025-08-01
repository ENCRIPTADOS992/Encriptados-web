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
      image: "/images/apps/dec-secure/vpn-active.png",
      title: "VPN Siempre Activa",
      description:
        "Secure Call no funcionará si no se puede establecer una conexión VPN segura, lo que garantiza que tus comunicaciones nunca se envíen expuestas.",
    },
    {
      image: "/images/apps/dec-secure/call.png",
      title: "Contenedor Dedicado",
      description:
        "Se requiere la instalación de Secure Call dentro de un contenedor dedicado, protegiendo los datos y el uso de la aplicación contra el espionaje inapropiado. La lista de contactos de Secure Call dedicada es inaccesible desde fuera de la aplicación, lo que mantiene tus contactos de Secure Call privados y discretos.",
    },
    {
      image: "/images/apps/dec-secure/secure-call.png",
      title: "DEC Secure Call",
      description:
        "DEC Secure Call te ofrece todo lo que esperas en una aplicación de comunicaciones seguras, incluido el cifrado AES-256 siempre activo; llamadas de voz individuales y grupales, videollamadas y mensajería Sus comunicaciones son 100% privadas, no podemos escuchar tus llamadas ni leer tus mensajes bajo ninguna circunstancia, y no se almacena nada en nuestros servidores.",
    },
    {
      image: "/images/apps/dec-secure/call.png",
      title: "Conferencia y llamadas grupales",
      description:
        "Las llamadas de video y de voz múltiple totalmente encriptadas de hasta 10 participantes te permiten utilizar una única plataforma para todas tus comunicaciones seguras.",
    },
  ];
  const Faqs =[
    {
          "question": "¿Qué archivos puedo proteger con la Aplicación dec-secure?",
          "answer": "Puedes proteger mensajes, archivos, contactos y llamadas de voz. Toda tu información viaja cifrada de extremo a extremo."
        },
        {
          "question": "¿Por qué debería usar la aplicación dec-secure en mi empresa?",
          "answer": "Porque ofrece máxima seguridad, protección contra intrusiones y cifrado total, evitando fugas de información corporativa."
        },
        {
          "question": "¿Por qué debería usar una aplicación cifrada como dec-secure en vez de una convencional?",
          "answer": "Las apps convencionales no ofrecen protección real ante espionaje, dec-secure garantiza privacidad y confidencialidad absoluta."
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
        imageUrl="/images/apps/dec-secure/hero-desktop.jpg"
        alt="Armadillo Hero Banner"
      />
      <HeroBannerMobile imageUrl="/images/apps/dec-secure/hero-mobile.jpg" 
        alt="Armadillo Hero Banner" />
      <HeroBannerTablet imageUrl="/images/apps/dec-secure/banner_ipad.png" 
        alt="Armadillo Hero Banner" />
      <ProductSection
        title="DEC Secure"
        description="DEC Secure ofrece total tranquilidad cuando se trata de la privacidad y seguridad de la información en tu dispositivo móvil."
        features={[
          "VPN sin clic",
          "Bloqueo y borrado remoto",
          "Mensajes y llamadas cifradas",
        ]}
        price="349$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/dec-secure/banner-3-months.jpg"
        appStoreUrl="https://apps.apple.com/app/dec-secure-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.dec-secure"
      />
      <ProductSectionMobile
        title="DEC Secure"
        description="DEC Secure ofrece total tranquilidad cuando se trata de la privacidad y seguridad de la información en tu dispositivo móvil."
        features={[
          "VPN sin clic",
          "Bloqueo y borrado remoto",
          "Mensajes y llamadas cifradas",
        ]}
        price="349$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/dec-secure/banner-3-months.jpg"
        appStoreUrl="https://apps.apple.com/app/dec-secure-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.dec-secure"
      />
      <ProductSectionTablet
        title="DEC Secure"
        description="DEC Secure ofrece total tranquilidad cuando se trata de la privacidad y seguridad de la información en tu dispositivo móvil."
        features={[
          "VPN sin clic",
          "Bloqueo y borrado remoto",
          "Mensajes y llamadas cifradas",
        ]}
        price="349$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/dec-secure/banner-3-months.jpg"
        appStoreUrl="https://apps.apple.com/app/dec-secure-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.dec-secure"
      />
      <ProductFeaturesGrid features={featuresGrid} />
      <ProductFeaturesGridMobile features={featuresGrid} /> 
      <ProductFeaturesGridTablet features={featuresGrid}/>
      <HeroVideoSection
        title={`Cómo Proteger mi Celular de Malware y Hackers para evitar Intervenciones 2023`}
        videoUrl="https://www.youtube.com/embed/Og3xt5izfSU"
      />
      <HeroVideoSectionMobile
        title={`Cómo Proteger mi Celular de Malware y Hackers para evitar Intervenciones 2023`}
        videoUrl="https://www.youtube.com/embed/Og3xt5izfSU"
      />
      <HeroVideoSectionTablet
        title={`Cómo Proteger mi Celular de Malware y Hackers para evitar Intervenciones 2023`}
        videoUrl="https://www.youtube.com/embed/Og3xt5izfSU"
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
