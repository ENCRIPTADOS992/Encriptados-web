"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter, usePathname, notFound } from "next/navigation";
import { useTranslations } from "next-intl";

// Componentes template de producto (reutilizados de apps)
import HeroBanner from "../../apps/component/templateProduct/HeroBanner";
import ProductSection from "../../apps/component/templateProduct/ProductSection";
import ProductFeaturesGrid from "../../apps/component/templateProduct/ProductFeaturesGrid";
import ProductBenefitsGrid from "../../apps/component/templateProduct/ProductBenefitsGrid";
import FeaturedProducts from "../../apps/component/templateProduct/FeaturedProducts";
import FAQSection from "../../apps/component/templateProduct/FAQSection";
import StickyPriceBanner from "../../apps/component/templateProduct/StickyPriceBanner";

// Componente específico de SIM - Cobertura
import BannerCoverage from "@/shared/BannerCoverage";

// Hooks y servicios
import { usePriceVisibility } from "@/shared/hooks/usePriceVisibility";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { getProductById } from "@/features/products/services";
import type { ProductById } from "@/features/products/types/AllProductsResponse";

// Configuración y utilidades locales
import { getSimProductConfig, isValidSimProductSlug } from "./simProductConfig";
import {
  transformChecksToFeatures,
  transformVariantsToSimPlans,
  getRadioOptionsFromSimPlans,
  transformAdvantagesToFeaturesGrid,
  transformFeaturesToBenefitsGrid,
  transformFaqs,
  formatPrice,
  buildSimProductInfo,
  type SimTranslations,
  type BuildSimProductInfoTranslations,
} from "./simProductUtils";

interface PageProps {
  params: { slug: string; locale: string };
}

export default function SimProductPage({ params }: PageProps) {
  const { slug, locale } = params;
  
  return <SimProductPageContent slug={slug} locale={locale} />;
}

function SimProductPageContent({ slug, locale }: { slug: string; locale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const priceBlockRef = useRef<HTMLDivElement | null>(null);
  const { isVisible } = usePriceVisibility(priceBlockRef);
  const { openModal } = useModalPayment();
  
  // Traducciones
  const t = useTranslations("appsShared.productTemplate");
  const tShared = useTranslations("appsShared");

  const [product, setProduct] = useState<ProductById | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRadio, setSelectedRadio] = useState<string>("");

  const config = useMemo(() => getSimProductConfig(slug), [slug]);

  if (!isValidSimProductSlug(slug)) {
    notFound();
  }

  // Traducciones para planes SIM (memoizadas)
  const simTranslations: SimTranslations = useMemo(() => ({
    plan: locale === "es" ? "Plan" : locale === "en" ? "Plan" : locale === "fr" ? "Forfait" : locale === "it" ? "Piano" : "Plano",
    days: locale === "es" ? "días" : locale === "en" ? "days" : locale === "fr" ? "jours" : locale === "it" ? "giorni" : "dias",
    unlimited: locale === "es" ? "Ilimitado" : locale === "en" ? "Unlimited" : locale === "fr" ? "Illimité" : locale === "it" ? "Illimitato" : "Ilimitado",
    dataIncluded: locale === "es" ? "Datos incluidos" : locale === "en" ? "Data included" : locale === "fr" ? "Données incluses" : locale === "it" ? "Dati inclusi" : "Dados incluídos",
  }), [locale]);

  // Traducciones para buildSimProductInfo
  const buildTranslations: BuildSimProductInfoTranslations = useMemo(() => ({
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
        console.error("Error cargando producto SIM:", err);
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
    return transformVariantsToSimPlans(variants, product, simTranslations);
  }, [product, simTranslations]);

  const radioOptions = useMemo(() => getRadioOptionsFromSimPlans(plans), [plans]);
  const features = useMemo(() => transformChecksToFeatures(product), [product]);
  const featuresGrid = useMemo(() => transformAdvantagesToFeaturesGrid(product, config?.benefitIcon), [product, config]);
  const benefits = useMemo(() => transformFeaturesToBenefitsGrid(product, config), [product, config]);
  const faqs = useMemo(() => transformFaqs(product), [product]);

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
      selectedOption: product?.category?.id || 40,
    });
  };

  const handleChat = () => console.log("Chat support");

  const buildSimUrl = (simSlug: string) => {
    const basePath = `/sim/${simSlug}`;
    const match = pathname.match(/^\/([a-zA-Z-]+)(\/|$)/);
    if (!match) return basePath;
    return `/${match[1]}${basePath}`;
  };

  const handleMoreInfo = (simSlug: string) => {
    router.push(buildSimUrl(simSlug));
  };

  const handleSimBuy = (productId: string) => {
    openModal({ productid: productId, languageCode: locale, selectedOption: 40 });
  };

  const productInfo = useMemo(() => 
    buildSimProductInfo(product, config, selectedPlan, handleBuy, handleChat, buildTranslations),
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
  if (isLoading) return <SimProductPageSkeleton />;

  // Error state
  if (error && !product) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {config?.slug || "Producto SIM"}
          </h1>
          <p className="text-gray-600">{error}</p>
          <p className="text-sm text-gray-400 mt-2">
            {t("productComingSoon")}
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
          productImage={config?.productImage || ""}
          translations={productSectionTranslations}
        />
      </div>

      {/* Sticky Price Banner */}
      <StickyPriceBanner visible={!isVisible} productInfo={productInfo} />

      {/* Features Grid */}
      {featuresGrid.length > 0 && (
        <ProductFeaturesGrid 
          features={featuresGrid} 
          title={t("featuresTitle")}
        />
      )}

      {/* Benefits Grid */}
      {benefits.length > 0 && (
        <ProductBenefitsGrid 
          benefits={benefits}
          title={(product as any)?.title_benefits || t("benefitsTitle")}
          imageBenefits={(product as any)?.image_benefits}
          productName={product?.name}
        />
      )}

      {/* Banner de Cobertura - Solo si está habilitado en config */}
      {config?.showCoverage && (
        <div className="py-8 lg:py-12">
          <BannerCoverage />
        </div>
      )}

      {/* Featured Products - Otros productos SIM */}
      <FeaturedProducts
        left={{
          title: tShared("encryptedSim.title"),
          description: tShared("encryptedSim.description"),
          buttonLabel: tShared("encryptedSim.button"),
          onButtonClick: () => handleSimBuy("508"),
          moreInfoLabel: tShared("encryptedSim.link"),
          onMoreInfo: () => handleMoreInfo(config?.relatedProducts.simEncriptadaSlug || "sim-encriptada"),
          image: "/images/apps/armadillo-v2/sim.png",
        }}
        right={{
          title: tShared("simDataPlans.title"),
          subtitle: tShared("simDataPlans.subtitle"),
          buttonLabel: tShared("simDataPlans.button"),
          onButtonClick: () => handleMoreInfo(config?.relatedProducts.timSimSlug || "tim-sim"),
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

function SimProductPageSkeleton() {
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
      
      {/* Coverage skeleton */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-48 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    </main>
  );
}
