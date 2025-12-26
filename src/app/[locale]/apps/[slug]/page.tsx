"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter, usePathname, notFound } from "next/navigation";

// Componentes Template Producto Unificado
import HeroBanner from "../component/templateProduct/HeroBanner";
import HeroBannerMobile from "../component/templateProduct/HeroBannerMobile";
import HeroBannerTablet from "../component/templateProduct/HeroBannerTablet";
import ProductSection from "../component/templateProduct/ProductSection";
import ProductSectionMobile from "../component/templateProduct/ProductSectionMobile";
import ProductSectionTablet from "../component/templateProduct/ProductSectionTablet";
import ProductFeaturesGrid from "../component/templateProduct/ProductFeaturesGrid";
import ProductFeaturesGridMobile from "../component/templateProduct/ProductFeaturesGridMobile";
import ProductFeaturesGridTablet from "../component/templateProduct/ProductFeaturesGridTablet";
import ProductBenefitsGrid from "../component/templateProduct/ProductBenefitsGrid";
import ProductBenefitsGridMobile from "../component/templateProduct/ProductBenefitsGridMobile";
import ProductBenefitsGridTablet from "../component/templateProduct/ProductBenefitsGridTablet";
import HeroVideoSection from "../component/templateProduct/HeroVideoSection";
import HeroVideoSectionMobile from "../component/templateProduct/HeroVideoSectionMobile";
import HeroVideoSectionTablet from "../component/templateProduct/HeroVideoSectionTablet";
import FeaturedProducts from "../component/templateProduct/FeaturedProducts";
import FeaturedProductsMobile from "../component/templateProduct/FeaturedProductsMobile";
import FeaturedProductsTablet from "../component/templateProduct/FeaturedProductsTablet";
import FAQSection from "../component/templateProduct/FAQSection";
import FAQSectionMobile from "../component/templateProduct/FAQSectionMobile";
import FAQSectionTablet from "../component/templateProduct/FAQSectionTablet";
import StickyPriceBannerDesktop from "../component/templateProduct/StickyPriceBannerDesktop";
import StickyPriceBannerTablet from "../component/templateProduct/StickyPriceBannerTablet";
import StickyPriceBannerMobile from "../component/templateProduct/StickyPriceBannerMobile";
import SecurityFeatures from "../component/templateProduct/SecurityFeatures";
import SecurityFeaturesMobile from "../component/templateProduct/SecurityFeaturesMobile";
import SecurityFeaturesTablet from "../component/templateProduct/SecurityFeaturesTablet";

// Hooks y servicios
import { usePriceVisibility } from "@/shared/hooks/usePriceVisibility";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { getProductById } from "@/features/products/services";
import type { ProductById } from "@/features/products/types/AllProductsResponse";

// Configuración y utilidades locales
import { getProductConfig, isValidProductSlug } from "./productConfig";
import {
  transformChecksToFeatures,
  transformVariantsToPlans,
  getRadioOptionsFromPlans,
  transformAdvantagesToFeaturesGrid,
  transformFeaturesToBenefitsGrid,
  transformFaqs,
  transformSecurityFeatures,
  formatPrice,
  buildProductInfo,
} from "./productUtils";

interface PageProps {
  params: { slug: string; locale: string };
}

export default function ProductPage({ params }: PageProps) {
  const { slug, locale } = params;
  
  return <ProductPageContent slug={slug} locale={locale} />;
}

function ProductPageContent({ slug, locale }: { slug: string; locale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const priceBlockRef = useRef<HTMLDivElement | null>(null);
  const { isVisible } = usePriceVisibility(priceBlockRef);
  const { openModal } = useModalPayment();

  const [product, setProduct] = useState<ProductById | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRadio, setSelectedRadio] = useState<string>("");

  const config = useMemo(() => getProductConfig(slug), [slug]);

  if (!isValidProductSlug(slug)) {
    notFound();
  }

  useEffect(() => {
    async function loadProduct() {
      if (!config || config.productId === 0) {
        setIsLoading(false);
        setError("Este producto aún no está disponible en el catálogo.");
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const productData = await getProductById(String(config.productId), locale);
        setProduct(productData);
      } catch (err) {
        console.error("Error cargando producto:", err);
        setError("No se pudo cargar la información del producto.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, [config, locale]);

  const plans = useMemo(() => {
    if (!product) return [];
    const variants = (product as any).variants || [];
    return transformVariantsToPlans(variants);
  }, [product]);

  const radioOptions = useMemo(() => getRadioOptionsFromPlans(plans), [plans]);
  const features = useMemo(() => transformChecksToFeatures(product), [product]);
  const featuresGrid = useMemo(() => transformAdvantagesToFeaturesGrid(product, config?.benefitIcon), [product, config]);
  const benefits = useMemo(() => transformFeaturesToBenefitsGrid(product, config), [product, config]);
  const faqs = useMemo(() => transformFaqs(product), [product]);
  const securityFeatures = useMemo(() => transformSecurityFeatures(product), [product]);
  
  const isSoftwareTemplate = config?.templateType === "software";

  useEffect(() => {
    if (plans.length > 0 && !selectedRadio) {
      setSelectedRadio(plans[0].label);
    }
  }, [plans, selectedRadio]);

  const selectedPlan = useMemo(() => {
    return plans.find(p => p.label === selectedRadio) || plans[0] || null;
  }, [plans, selectedRadio]);

  const currentPrice = useMemo(() => {
    if (selectedPlan) return formatPrice(selectedPlan.price);
    return formatPrice(product?.price || 0);
  }, [selectedPlan, product]);

  const handleRadioChange = (val: string) => setSelectedRadio(val);

  const handleBuy = () => {
    openModal({
      productid: String(product?.id || config?.productId),
      languageCode: locale,
      selectedOption: product?.category?.id || 38,
    });
  };

  const handleChat = () => console.log("Chat support");

  const buildSimMoreInfoUrl = (productId: string) => {
    const basePath = `/our-products/sim-more-info?productId=${productId}`;
    const match = pathname.match(/^\/([a-zA-Z-]+)(\/|$)/);
    if (!match) return basePath;
    return `/${match[1]}${basePath}`;
  };

  const handleMoreInfo = (productId: string) => router.push(buildSimMoreInfoUrl(productId));
  const handleSimBuy = (productId: string) => openModal({ productid: productId, languageCode: locale });

  const productInfo = useMemo(() => 
    buildProductInfo(product, config, selectedPlan, handleBuy, handleChat),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [product, config, selectedPlan, locale, openModal]
  );

  if (isLoading) return <ProductPageSkeleton />;

  if (error && !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{config?.slug || "Producto"}</h1>
          <p className="text-gray-600">{error}</p>
          <p className="text-sm text-gray-400 mt-2">Este producto será añadido próximamente.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HeroBanner imageUrl={config?.heroBanners.desktop || ""} alt={`${product?.name || slug} Hero Banner`} />
      <HeroBannerMobile imageUrl={config?.heroBanners.mobile || ""} alt={`${product?.name || slug} Hero Banner`} />
      <HeroBannerTablet imageUrl={config?.heroBanners.tablet || ""} alt={`${product?.name || slug} Hero Banner`} />

      <div ref={priceBlockRef}>
        <ProductSection
          title={product?.name || ""}
          description={product?.description || ""}
          features={features}
          price={currentPrice}
          radioOptions={radioOptions}
          selectedRadio={selectedRadio}
          onRadioChange={handleRadioChange}
          onBuy={handleBuy}
          onChat={handleChat}
          productImage={config?.productImage || ""}
          appStoreUrl={config?.appStoreUrl}
          googlePlayUrl={config?.googlePlayUrl}
        />
        <ProductSectionMobile
          title={product?.name || ""}
          description={product?.description || ""}
          features={features}
          price={currentPrice}
          radioOptions={radioOptions}
          selectedRadio={selectedRadio}
          onRadioChange={handleRadioChange}
          onBuy={handleBuy}
          onChat={handleChat}
          productImage={config?.productImage || ""}
          appStoreUrl={config?.appStoreUrl}
          googlePlayUrl={config?.googlePlayUrl}
        />
        <ProductSectionTablet
          title={product?.name || ""}
          description={product?.description || ""}
          features={features}
          price={currentPrice}
          radioOptions={radioOptions}
          selectedRadio={selectedRadio}
          onRadioChange={handleRadioChange}
          onBuy={handleBuy}
          onChat={handleChat}
          productImage={config?.productImage || ""}
          appStoreUrl={config?.appStoreUrl}
          googlePlayUrl={config?.googlePlayUrl}
        />
      </div>

      <div className="hidden lg:block">
        <StickyPriceBannerDesktop visible={!isVisible} productInfo={productInfo} />
      </div>
      <div className="hidden sm:block lg:hidden">
        <StickyPriceBannerTablet visible={!isVisible} productInfo={productInfo} />
      </div>
      <div className="block sm:hidden">
        <StickyPriceBannerMobile visible={!isVisible} productInfo={productInfo} />
      </div>

      {featuresGrid.length > 0 && (
        <>
          <ProductFeaturesGrid features={featuresGrid} />
          <ProductFeaturesGridMobile features={featuresGrid} />
          <ProductFeaturesGridTablet features={featuresGrid} />
        </>
      )}

      {benefits.length > 0 && (
        <>
          <ProductBenefitsGrid title={config?.benefitsTitle || "Te mantenemos conectado de forma segura"} benefits={benefits} />
          <ProductBenefitsGridMobile title={config?.benefitsTitle || "Te mantenemos conectado de forma segura"} benefits={benefits} />
          <ProductBenefitsGridTablet title={config?.benefitsTitle || "Te mantenemos conectado de forma segura"} benefits={benefits} />
        </>
      )}

      {/* SecurityFeatures: Solo para productos tipo software */}
      {isSoftwareTemplate && securityFeatures.length > 0 && (
        <>
          <SecurityFeatures
            title={`Características de seguridad de ${product?.name || "este producto"}`}
            features={securityFeatures}
            imageUrl={config?.productImage || ""}
          />
          <SecurityFeaturesMobile
            title={`Características de seguridad de ${product?.name || "este producto"}`}
            features={securityFeatures}
            imageUrl={config?.productImage || ""}
          />
          <SecurityFeaturesTablet
            title={`Características de seguridad de ${product?.name || "este producto"}`}
            features={securityFeatures}
            imageUrl={config?.productImage || ""}
          />
        </>
      )}

      {config?.videoUrl && (
        <>
          <HeroVideoSection title={config.videoTitle || `${product?.name}, tu app de comunicación segura`} videoUrl={config.videoUrl} />
          <HeroVideoSectionMobile title={config.videoTitle || `${product?.name}, tu app de comunicación segura`} videoUrl={config.videoUrl} />
          <HeroVideoSectionTablet title={config.videoTitle || `${product?.name}, tu app de comunicación segura`} videoUrl={config.videoUrl} />
        </>
      )}

      <FeaturedProducts
        left={{
          title: "SIM Card encriptada",
          description: "Protégete de los ciberdelincuentes",
          buttonLabel: "Comprar",
          onButtonClick: () => handleSimBuy(config?.relatedProducts.simProductId || "508"),
          moreInfoLabel: "Más información",
          onMoreInfo: () => handleMoreInfo(config?.relatedProducts.simProductId || "508"),
          image: "/images/apps/armadillo-v2/sim.png",
        }}
        right={{
          title: "E-SIM Encriptada",
          subtitle: "Conectividad global segura",
          buttonLabel: "Ver más",
          onButtonClick: () => handleMoreInfo(config?.relatedProducts.esimProductId || "454"),
          image: "/images/apps/armadillo-v2/phone.png",
        }}
      />
      <FeaturedProductsMobile
        left={{
          title: "SIM Card encriptada",
          description: "Protégete de los ciberdelincuentes",
          buttonLabel: "Comprar",
          onButtonClick: () => handleSimBuy(config?.relatedProducts.simProductId || "508"),
          moreInfoLabel: "Más información",
          onMoreInfo: () => handleMoreInfo(config?.relatedProducts.simProductId || "508"),
          image: "/images/apps/armadillo-v2/sim.png",
        }}
        right={{
          title: "E-SIM Encriptada",
          subtitle: "Conectividad global segura",
          buttonLabel: "Ver más",
          onButtonClick: () => handleMoreInfo(config?.relatedProducts.esimProductId || "454"),
          image: "/images/apps/armadillo-v2/phone.png",
        }}
      />
      <FeaturedProductsTablet
        left={{
          title: "SIM Card encriptada",
          description: "Protégete de los ciberdelincuentes",
          buttonLabel: "Comprar",
          onButtonClick: () => handleSimBuy(config?.relatedProducts.simProductId || "508"),
          moreInfoLabel: "Más información",
          onMoreInfo: () => handleMoreInfo(config?.relatedProducts.simProductId || "508"),
          image: "/images/apps/armadillo-v2/sim.png",
        }}
        right={{
          title: "E-SIM Encriptada",
          subtitle: "Conectividad global segura",
          buttonLabel: "Ver más",
          onButtonClick: () => handleMoreInfo(config?.relatedProducts.esimProductId || "454"),
          image: "/images/apps/armadillo-v2/phone.png",
        }}
      />

      {faqs.length > 0 && (
        <>
          <FAQSection faqs={faqs} title="Preguntas frecuentes" />
          <FAQSectionMobile faqs={faqs} />
          <FAQSectionTablet faqs={faqs} />
        </>
      )}
    </div>
  );
}

function ProductPageSkeleton() {
  return (
    <div className="min-h-screen animate-pulse">
      <div className="h-[400px] bg-gray-200" />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
          <div className="h-[300px] bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
