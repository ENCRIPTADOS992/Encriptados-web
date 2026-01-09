"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter, usePathname, notFound, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

// Componentes template de producto
import HeroBanner from "../component/templateProduct/HeroBanner";
import ProductSection from "../component/templateProduct/ProductSection";
import ProductFeaturesGrid from "../component/templateProduct/ProductFeaturesGrid";
import ProductBenefitsGrid from "../component/templateProduct/ProductBenefitsGrid";
import HeroVideoSection from "../component/templateProduct/HeroVideoSection";
import FeaturedProducts from "../component/templateProduct/FeaturedProducts";
import FAQSection from "../component/templateProduct/FAQSection";
import StickyPriceBanner from "../component/templateProduct/StickyPriceBanner";

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
  formatPrice,
  buildProductInfo,
  getProductBannerImages,
  type LicenseTranslations,
  type BuildProductInfoTranslations,
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
  const searchParams = useSearchParams();
  const priceBlockRef = useRef<HTMLDivElement | null>(null);
  const { isVisible } = usePriceVisibility(priceBlockRef);
  const { openModal } = useModalPayment();
  
  // Traducciones
  const t = useTranslations("appsShared.productTemplate");
  const tSim = useTranslations("appsShared");

  const [product, setProduct] = useState<ProductById | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRadio, setSelectedRadio] = useState<string>("");

  const config = useMemo(() => getProductConfig(slug), [slug]);

  if (!isValidProductSlug(slug)) {
    notFound();
  }

  // Traducciones para licencias (memoizadas)
  const licenseTranslations: LicenseTranslations = useMemo(() => ({
    license: t("license"),
    month: locale === "es" ? "Mes" : locale === "en" ? "Month" : locale === "fr" ? "Mois" : locale === "it" ? "Mese" : "Mês",
    months: locale === "es" ? "Meses" : locale === "en" ? "Months" : locale === "fr" ? "Mois" : locale === "it" ? "Mesi" : "Meses",
    unique: t("licenseUnique"),
  }), [t, locale]);

  // Traducciones para buildProductInfo
  const buildTranslations: BuildProductInfoTranslations = useMemo(() => ({
    buyNow: t("buyNow"),
    priceConsult: t("priceConsult"),
    defaultSubtitle: "",
  }), [t]);

  useEffect(() => {
    async function loadProduct() {
      if (!config || config.productId === 0) {
        setIsLoading(false);
        setError(t("productNotAvailable"));
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const productData = await getProductById(String(config.productId), locale);
        setProduct(productData);
      } catch (err) {
        console.error("Error cargando producto:", err);
        setError(t("productLoadError"));
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, [config, locale, t]);

  const plans = useMemo(() => {
    if (!product) return [];
    const variants = (product as any).variants || [];
    return transformVariantsToPlans(variants, product, licenseTranslations);
  }, [product, licenseTranslations]);

  const radioOptions = useMemo(() => getRadioOptionsFromPlans(plans), [plans]);
  const features = useMemo(() => transformChecksToFeatures(product), [product]);
  const featuresGrid = useMemo(() => transformAdvantagesToFeaturesGrid(product, config?.benefitIcon), [product, config]);
  const benefits = useMemo(() => transformFeaturesToBenefitsGrid(product, config), [product, config]);
  const faqs = useMemo(() => transformFaqs(product), [product]);
  
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

  // === AUTO-ABRIR POPUP si viene con ?buy=1 ===
  useEffect(() => {
    const buyParam = searchParams.get("buy");
    if (buyParam === "1" && product && !isLoading) {
      // Pequeño delay para asegurar que todo está cargado
      const timer = setTimeout(() => {
        const priceStr = selectedPlan?.price ?? product?.price ?? 0;
        const numericPrice = typeof priceStr === 'string' ? parseFloat(priceStr) : priceStr;
        
        openModal({
          productid: String(product?.id || config?.productId),
          languageCode: locale,
          selectedOption: (product as any)?.category?.id || config?.categoryId || 38,
          initialPrice: numericPrice,
        });
        
        // Limpiar el parámetro de la URL sin recargar
        const url = new URL(window.location.href);
        url.searchParams.delete("buy");
        window.history.replaceState({}, "", url.toString());
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [searchParams, product, isLoading, selectedPlan, config, locale, openModal]);

  const handleBuy = () => {
    // Extraer precio numérico
    const priceStr = selectedPlan?.price ?? product?.price ?? 0;
    const numericPrice = typeof priceStr === 'string' ? parseFloat(priceStr) : priceStr;
    
    openModal({
      productid: String(product?.id || config?.productId),
      languageCode: locale,
      selectedOption: product?.category?.id || 38,
      initialPrice: numericPrice,
    });
  };

  const handleChat = () => console.log("Chat support");

  const buildSimUrl = (slug: string) => {
    const basePath = `/sim/${slug}`;
    const match = pathname.match(/^\/([a-zA-Z-]+)(\/|$)/);
    if (!match) return basePath;
    return `/${match[1]}${basePath}`;
  };

  const handleMoreInfo = (slug: string) => router.push(buildSimUrl(slug));
  const handleSimBuy = (productId: string) => openModal({ productid: productId, languageCode: locale, selectedOption: 40 });

  const productInfo = useMemo(() => 
    buildProductInfo(product, config, selectedPlan, handleBuy, handleChat, buildTranslations),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [product, config, selectedPlan, locale, openModal, buildTranslations]
  );

  // Traducciones para ProductSection
  const productSectionTranslations = useMemo(() => ({
    priceFrom: t("priceFrom"),
    buyNow: t("buyNow"),
    selectPlan: t("selectPlan"),
    downloadAppStore: t("downloadAppStore"),
    downloadGooglePlay: t("downloadGooglePlay"),
  }), [t]);

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
            {t("productComingSoon")}
          </p>
        </div>
      </main>
    );
  }

  // Hero banner images - Solo heroBanners del API o config estático
  const heroBannerImages = {
    desktop: (product as any)?.heroBanners?.desktop || config?.heroBanners.desktop || "",
    tablet: (product as any)?.heroBanners?.tablet || config?.heroBanners.tablet || "",
    mobile: (product as any)?.heroBanners?.mobile || config?.heroBanners.mobile || "",
  };

  // URLs de video y tiendas de apps - Priorizar datos del backend
  const videoUrl = (product as any)?.videoUrl || config?.videoUrl;
  const videoText = (product as any)?.video_text || t("videoTitle", { productName: product?.name || "" });
  const appStoreUrl = (product as any)?.appStoreUrl || config?.appStoreUrl;
  const googlePlayUrl = (product as any)?.googlePlayUrl || config?.googlePlayUrl;
  const iconUrl = (product as any)?.iconUrl || config?.iconUrl || "";
  
  // Imagen del producto - Prioridad: buyNowImage > productImage > image_full > images[0] > config
  const productImage = 
    (product as any)?.buyNowImage || 
    (product as any)?.productImage || 
    (product as any)?.image_full || 
    product?.images?.[0]?.src ||
    config?.productImage || 
    "";

  return (
    <main>
      {/* Hero Banner */}
      <HeroBanner 
        imageUrl={heroBannerImages} 
        alt={`${product?.name || slug} Hero Banner`} 
      />

      {/* Product Section with price block ref */}
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
          productImage={productImage}
          appStoreUrl={appStoreUrl}
          googlePlayUrl={googlePlayUrl}
          translations={productSectionTranslations}
        />
      </div>

      {/* Sticky Price Banner */}
      <StickyPriceBanner visible={!isVisible} productInfo={productInfo} />

      {/* Features Grid - Screenshots/imágenes grandes del producto */}
      {featuresGrid.length > 0 && (
        <ProductFeaturesGrid 
          features={featuresGrid} 
          title={t("featuresTitle")}
        />
      )}

      {/* Benefits Grid - Beneficios con iconos */}
      {benefits.length > 0 && (
        <ProductBenefitsGrid 
          benefits={benefits}
          title={(product as any)?.title_benefits || t("benefitsTitle")}
          imageBenefits={(product as any)?.image_benefits}
          productName={product?.name}
        />
      )}

      {/* Hero Video Section */}
      {videoUrl && (
        <HeroVideoSection 
          title={videoText} 
          videoUrl={videoUrl} 
        />
      )}

      {/* Featured Products */}
      <FeaturedProducts
        left={{
          title: tSim("encryptedSim.title"),
          description: tSim("encryptedSim.description"),
          buttonLabel: tSim("encryptedSim.button"),
          onButtonClick: () => handleSimBuy(config?.relatedProducts.simProductId || "508"),
          moreInfoLabel: tSim("encryptedSim.link"),
          onMoreInfo: () => handleMoreInfo("sim-encriptada"),
          image: "/images/apps/armadillo-v2/sim.png",
        }}
        right={{
          title: tSim("simDataPlans.title"),
          subtitle: tSim("simDataPlans.subtitle"),
          buttonLabel: tSim("simDataPlans.button"),
          onButtonClick: () => handleMoreInfo("tim-sim"),
          image: "/images/apps/armadillo-v2/phone.png",
        }}
      />

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <FAQSection faqs={faqs} title={t("faqTitle")} />
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
