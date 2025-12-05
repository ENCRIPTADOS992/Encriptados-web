"use client";

import HeroBanner from "../component/templateSoftware/HeroBanner";
import HeroBannerMobile from "../component/templateSoftware/HeroBannerMobile";
import HeroBannerTablet from "../component/templateSoftware/HeroBannerTablet";
import ProductSection from "../component/templateSoftware/ProductSection";
import ProductSectionMobile from "../component/templateSoftware/ProductSectionMobile";
import ProductSectionTablet from "../component/templateSoftware/ProductSectionTablet";
import HeroVideoSection from "../component/templateSoftware/HeroVideoSection";
import HeroVideoSectionMobile from "../component/templateSoftware/HeroVideoSectionMobile";
import HeroVideoSectionTablet from "../component/templateSoftware/HeroVideoSectionTablet";
import FeaturedProducts from "../component/templateSoftware/FeaturedProducts";
import FeaturedProductsMobile from "../component/templateSoftware/FeaturedProductsMobile";
import FeaturedProductsTablet from "../component/templateSoftware/FeaturedProductsTablet";
import SecurityFeatures from "../component/templateSoftware/SecurityFeatures";
import SecurityFeaturesTablet from "../component/templateSoftware/SecurityFeaturesTablet";
import SecurityFeaturesMobile from "../component/templateSoftware/SecurityFeaturesMobile";
import FAQSection from "../component/templateSoftware/FAQSection";
import FAQSectionMobile from "../component/templateSoftware/FAQSectionMobile";
import FAQSectionTablet from "../component/templateSoftware/FAQSectionTablet";
import DownloadAppSection from "../component/templateSoftware/DownloadAppSection";
import DownloadAppSectionMobile from "../component/templateSoftware/DownloadAppSectionMobile";
import DownloadAppSectionTablet from "../component/templateSoftware/DownloadAppSectionTablet";
import { plans } from "./consts/plans";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { getProductById } from "@/features/products/services";
import type { ProductById } from "@/features/products/types/AllProductsResponse";
import { useModalPayment } from "@/providers/ModalPaymentProvider";

import { usePriceVisibility } from "@/shared/hooks/usePriceVisibility";
import StickyPriceBannerDesktop from "../component/templateApps/StickyPriceBannerDesktop";
import StickyPriceBannerTablet from "../component/templateApps/StickyPriceBannerTablet";
import StickyPriceBannerMobile from "../component/templateApps/StickyPriceBannerMobile";

const Page = () => {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const productId = searchParams.get("productId");
  const selected = plan || plans[0].value;
  const [product, setProduct] = useState<ProductById | null>(null);
	const priceBlockRef = useRef<HTMLDivElement | null>(null);
  const { isVisible } = usePriceVisibility(priceBlockRef);
  const { openModal } = useModalPayment();

  const router = useRouter();
  const pathname = usePathname();
  const buildSimMoreInfoUrl = (productId: string) => {
    const basePath = `/our-products/sim-more-info?productId=${productId}`;
    const match = pathname.match(/^\/([a-zA-Z-]+)(\/|$)/);
    if (!match) return basePath;

    const locale = match[1];
    if (basePath.startsWith(`/${locale}/`)) return basePath;

    return `/${locale}${basePath}`;
  };

  const handleMoreInfo = (productId: string) => {
    const href = buildSimMoreInfoUrl(productId);
    console.log("[ChatMail Page] 👉 Navegando a más info:", { productId, href });
    router.push(href);
  };

  const handleSimBuy = (productId: string) => {
    console.log("🛒 [ChatMail Page] Comprar SIM", {
      productid: productId,
      languageCode: "es",
    });
    openModal({ productid: productId, languageCode: "es" });
  };
  const productInfo = {
  title: "Silent Phone",
  price: "99$ USD",
  subtitle: "Comunicación cifrada y segura",
  iconUrl: "/images/apps/silent-circle/logo.png", 
  ctaLabel: "Comprar ahora",
  categoryId: 35,
  productId: 168,
  onBuy: () => {
      openModal({
        productid: "168",          
        languageCode: "es",
        selectedOption: 35,        
      });
    },
  onChat: () => {
    console.log("chat telegram");
  },
};

  const Faqs = [
	{
	  question: "¿Qué es y para qué sirve el celular IntactPhone?",
	  answer:
		"Intactphone es un celular cifrado de grado militar con un hardware y software fuertes. No solo protege el dispositivo de ataques cibernéticos o brechas de seguridad sino contra situaciones ambientales como agua, caídas o golpes.",
	},
	{
	  question: "¿IntactPhone, cuál es el precio?",
	  answer:
		"El precio del celular Intactphone varía de acuerdo a su modelo y licencia. Se puede adquirir en Encriptados.io desde un valor aproximado de $1000 USD.",
	},
	{
	  question: "¿IntactPhone, quién lo fabrica?",
	  answer:
		"CommuniTake, la casa madre de Intact, manufactura completamente el dispositivo. Desde el hardware hasta el sistema operativo. Esto buscando prevenir la sustitución de código por parte de malintencionados y las brechas de información. Conócelo.",
	},
  ];
  const securityFeaturesData = [
	{
	  title: "Bloqueo de Redes",
	  description: "Implementar medidas para prevenir intentos de acceso o ataques a través de conexiones inalámbricas.",
	},
	{
	  title: "Seguridad del dispositivos",
	  description:
		"Incrementa la seguridad del dispositivo usando nuestra Sim Card Encriptados",
	},
	{
	  title: "Borrado remoto",
	  description: "Secure MDM iPhone te permite borrar remotamente todos los datos del dispositivo en cualquier situación de emergencia —pérdida, robo o riesgo de filtración.",
	},
	{
	  title: "VPN Permanente",
	  description: "No funcionará sin una conexión VPN, lo que garantiza que tus comunicaciones permanezcan seguras",
	},
	{
	  title: "Sistema restringido y privado",
	  description:
		"Restringimos el uso e instalación de aplicaciones o softwares que puedan comprometer la seguridad del dispositivo.",
	},
	{
	  title: "Comunicaciones seguras",
	  description:
		"Usa cifrado de extremo a extremo con estándares de seguridad militar para proteger correos, mensajes, llamadas y archivos.",
	},
	{
	  title: "Contenedor Seguro",
	  description: "Un contenedor que previene fugas de información o el ingreso de malware al dispositivo.",
	},
	{
	  title: "Cuenta Privada",
	  description:
		"No utilices cuentas personales para identificarse con Apple",
	},
	{
	  title: "Fortalecimiento de Políticas TI",
	  description:
		"Ajusta las políticas del dispositivo para eliminar accesos que pongan en riesgo la seguridad.",
	}
  ];
  useEffect(() => {
	if (productId) {
	  getProductById(productId, "es").then(setProduct).catch(console.error);
	}
  }, [productId]);

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
	  
  return (
	<div>
	  <HeroBanner
		imageUrl="/images/apps/secure-mdm-iphone/secure-banner-desktop.png"
		alt="Secure MDM Android Hero Banner"
	  />
	  <HeroBannerMobile
		imageUrl="/images/apps/secure-mdm-iphone/secure-banner-mobile.png"
		alt="Secure MDM Android Hero Banner"
	  />
	  <HeroBannerTablet
		imageUrl="/images/apps/secure-mdm-iphone/secure-phone-tablet.png"
		alt="Secure MDM Android Hero Banner"
	  />
	  <div ref={priceBlockRef}>
	  <ProductSection
		title="SECURE MDM IPHONE"
		description="Blinda con el mayor grado de seguridad tu iPhone"
		features={[
		  "Mensajería segura",
		  "Bloqueo de Redes",
		  "Borrado remoto",
		]}
		price="600$ USD"
		radioOptions={plans.map((p) => p.label)}
		selectedRadio={selectedRadio}
		onRadioChange={handleRadioChange}
		onBuy={productInfo.onBuy}
		onChat={productInfo.onChat}
		productImage="/images/apps/secure-mdm-iphone/banner-3-months.jpg"
		appStoreUrl="https://apps.apple.com/app/secure-mdm-iphone-app"
		googlePlayUrl="https://play.google.com/store/apps/details?id=com.secure-mdm-iphone"
	  />
	  
	  <ProductSectionMobile
		title="SECURE MDM IPHONE"
		description="Blinda con el mayor grado de seguridad tu iPhone"
		features={[
		  "Mensajería segura",
		  "Bloqueo de Redes",
		  "Borrado remoto",
		]}
		price="600$ USD"
		radioOptions={plans.map((p) => p.label)}
		selectedRadio={selectedRadio}
		onRadioChange={handleRadioChange}
		onBuy={productInfo.onBuy}
		onChat={productInfo.onChat}
		productImage="/images/apps/secure-mdm-iphone/banner-3-months.jpg"
		appStoreUrl="https://apps.apple.com/app/secure-mdm-iphone-app"
		googlePlayUrl="https://play.google.com/store/apps/details?id=com.secure-mdm-iphone"
	  />
	 
	  <ProductSectionTablet
		title="SECURE MDM IPHONE"
		description="Blinda con el mayor grado de seguridad tu iPhone"
		features={[
		  "Mensajería segura",
		  "Bloqueo de Redes",
		  "Borrado remoto",
		]}
		price="600$ USD"
		radioOptions={plans.map((p) => p.label)}
		selectedRadio={selectedRadio}
		onRadioChange={handleRadioChange}
		onBuy={productInfo.onBuy}
		onChat={productInfo.onChat}
		productImage="/images/apps/secure-mdm-iphone/banner-3-months.jpg"
		appStoreUrl="https://apps.apple.com/app/secure-mdm-iphone-app"
		googlePlayUrl="https://play.google.com/store/apps/details?id=com.secure-mdm-iphone"
	  />
	  </div>
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
	  <SecurityFeatures
		title="Beneficios de MDM iPhone"
		features={securityFeaturesData}
		imageUrl="/images/apps/secure-mdm-iphone/phoneSecurity.png"
	  />
	  <SecurityFeaturesTablet
		title="Beneficios de MDM iPhone"
		features={securityFeaturesData}
		imageUrl="/images/apps/secure-mdm-iphone/phoneSecurity.png"
	  />
	  <SecurityFeaturesMobile
		title="Beneficios de MDM iPhone"
		features={securityFeaturesData}
		imageUrl="/images/apps/secure-mdm-iphone/phoneSecurity.png"
	  />

	  <HeroVideoSection
		title={`¿Cómo encriptar tu celular para que nadie pueda espiarte?`}
		videoUrl="https://www.youtube.com/embed/O9MF_k5A0M0?si=JHnq_TXbcUxox_-Q"
	  />
	  <HeroVideoSectionMobile
		title={`¿Cómo encriptar tu celular para que nadie pueda espiarte?`}
		videoUrl="https://www.youtube.com/embed/O9MF_k5A0M0?si=JHnq_TXbcUxox_-Q"
	  />
	  <HeroVideoSectionTablet
		title={`¿Cómo encriptar tu celular para que nadie pueda espiarte?`}
		videoUrl="https://www.youtube.com/embed/O9MF_k5A0M0?si=JHnq_TXbcUxox_-Q"
	  />
	  <FeaturedProducts
        left={{
          title: "SIM Card encriptada",
          description:
            "Protégete de los ciberdelincuentes y mantén tu información personal segura",
          buttonLabel: "Comprar",
          onButtonClick: () => handleSimBuy("508"), 
          moreInfoLabel: "Más información",
          onMoreInfo: () => handleMoreInfo("508"),
          image: "/images/apps/armadillo-v2/sim.png",
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => handleMoreInfo("454"), 
          image: "/images/apps/armadillo-v2/phone.png",
        }}
      />
      <FeaturedProductsMobile
        left={{
          title: "SIM Card encriptada",
          description:
            "Protégete de los ciberdelincuentes y mantén tu información personal segura",
          buttonLabel: "Comprar",
          onButtonClick: () => handleSimBuy("508"),
          moreInfoLabel: "Más información",
          onMoreInfo: () => handleMoreInfo("508"),
          image: "/images/apps/armadillo-v2/sim.png",
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => handleMoreInfo("454"),
          image: "/images/apps/armadillo-v2/phone.png",
        }}
      />
      <FeaturedProductsTablet
        left={{
          title: "SIM Card encriptada",
          description:
            "Protégete de los ciberdelincuentes y mantén tu información personal segura",
          buttonLabel: "Comprar",
          onButtonClick: () => handleSimBuy("508"),
          moreInfoLabel: "Más información",
          onMoreInfo: () => handleMoreInfo("508"),
          image: "/images/apps/armadillo-v2/sim.png",
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => handleMoreInfo("454"),
          image: "/images/apps/armadillo-v2/phone.png",
        }}
      />
	  <FAQSection faqs={Faqs} />
	  <FAQSectionMobile faqs={Faqs} />
	  <FAQSectionTablet faqs={Faqs} />
	  <DownloadAppSection />
	  <DownloadAppSectionMobile />
	  <DownloadAppSectionTablet />
	</div>
  );
};

export default Page;
