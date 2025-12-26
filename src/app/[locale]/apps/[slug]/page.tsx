"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter, usePathname, notFound } from "next/navigation";

// Componentes Template Producto Unificados (Responsive)
import HeroBannerUnified from "../component/templateProduct/HeroBannerUnified";
import ProductSectionUnified from "../component/templateProduct/ProductSectionUnified";
import ProductFeaturesGridUnified from "../component/templateProduct/ProductFeaturesGridUnified";
import ProductBenefitsGridUnified from "../component/templateProduct/ProductBenefitsGridUnified";
import HeroVideoSectionUnified from "../component/templateProduct/HeroVideoSectionUnified";
import FeaturedProductsUnified from "../component/templateProduct/FeaturedProductsUnified";
import FAQSectionUnified from "../component/templateProduct/FAQSectionUnified";
import StickyPriceBannerUnified from "../component/templateProduct/StickyPriceBannerUnified";
import SecurityFeaturesUnified from "../component/templateProduct/SecurityFeaturesUnified";

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

  // Loading state
  if (isLoading) return <ProductPageSkeleton />;

  // Error state
  if (error && !product) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {config?.slug || "Producto"}
          </h1>
          <p className="text-gray-600">{error}</p>
          <p className="text-sm text-gray-400 mt-2">
            Este producto será añadido próximamente.
          </p>
        </div>
      </main>
    );
  }

  // Hero banner images object
  const heroBannerImages = {
    desktop: config?.heroBanners.desktop || "",
    tablet: config?.heroBanners.tablet || "",
    mobile: config?.heroBanners.mobile || "",
  };

  return (
    <main>
      {/* Hero Banner */}
      <HeroBannerUnified 
        imageUrl={heroBannerImages} 
        alt={`${product?.name || slug} Hero Banner`} 
      />

      {/* Product Section with price block ref */}
      <div ref={priceBlockRef}>
        <ProductSectionUnified
          title={product?.name || ""}
          description={product?.description || ""}
          features={features}
          price={currentPrice}
          radioOptions={radioOptions}
          selectedRadio={selectedRadio}
          onRadioChange={handleRadioChange}
          onBuy={handleBuy}
          productImage={config?.productImage || ""}
          appStoreUrl={config?.appStoreUrl}
          googlePlayUrl={config?.googlePlayUrl}
        />
      </div>

      {/* Sticky Price Banner */}
      <StickyPriceBannerUnified visible={!isVisible} productInfo={productInfo} />

      {/* Features Grid */}
      {featuresGrid.length > 0 && (
        <ProductFeaturesGridUnified features={featuresGrid} />
      )}

      {/* Benefits Grid */}
      {benefits.length > 0 && (
        <ProductBenefitsGridUnified 
          title={config?.benefitsTitle || "Te mantenemos conectado de forma segura"} 
          benefits={benefits} 
        />
      )}

      {/* Security Features - Solo para productos tipo software */}
      {isSoftwareTemplate && securityFeatures.length > 0 && (
        <SecurityFeaturesUnified
          title={`Características de seguridad de ${product?.name || "este producto"}`}
          features={securityFeatures}
          imageUrl={config?.productImage || ""}
        />
      )}

      {/* Hero Video Section */}
      {config?.videoUrl && (
        <HeroVideoSectionUnified 
          title={config.videoTitle || `${product?.name}, tu app de comunicación segura`} 
          videoUrl={config.videoUrl} 
        />
      )}

      {/* Featured Products */}
      <FeaturedProductsUnified
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

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <FAQSectionUnified faqs={faqs} title="Preguntas frecuentes" />
      )}
    </main>
  );
}

function ProductPageSkeleton() {
  return (
    <main className="min-h-screen animate-pulse">
      {/* Hero skeleton */}
      <div className="h-44 sm:h-36 lg:h-72 bg-gray-200" />
      
      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
          {/* Text content */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="h-10 bg-gray-200 rounded w-3/4" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-4/6" />
            </div>
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-1/4" />
              <div className="h-12 bg-gray-200 rounded w-1/3" />
            </div>
            <div className="flex gap-3">
              <div className="h-12 bg-gray-200 rounded w-40" />
              <div className="h-12 bg-gray-200 rounded w-32" />
            </div>
          </div>
          
          {/* Image placeholder */}
          <div className="order-1 lg:order-2">
            <div className="h-64 lg:h-80 bg-gray-200 rounded-2xl" />
          </div>
        </div>
      </div>
    </main>
  );
}
