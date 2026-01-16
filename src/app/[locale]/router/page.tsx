"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useParams } from "next/navigation";

// Componentes Template Producto
import HeroBanner from "../apps/component/templateProduct/HeroBanner";
import ProductSection from "../apps/component/templateProduct/ProductSection";
import ProductFeaturesGrid from "../apps/component/templateProduct/ProductFeaturesGrid";
import ProductBenefitsGrid from "../apps/component/templateProduct/ProductBenefitsGrid";
import HeroVideoSection from "../apps/component/templateProduct/HeroVideoSection";
import FeaturedProducts from "../apps/component/templateProduct/FeaturedProducts";
import FAQSection from "../apps/component/templateProduct/FAQSection";
import StickyPriceBanner from "../apps/component/templateProduct/StickyPriceBanner";

// Hooks y servicios
import { usePriceVisibility } from "@/shared/hooks/usePriceVisibility";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { getProductById } from "@/features/products/services";
import type { ProductById } from "@/features/products/types/AllProductsResponse";
import { getProductBannerImages } from "../apps/[slug]/productUtils";

// Configuración del router
const ROUTER_CONFIG = {
  productId: 59747,
  categoryId: 36,
  heroBanners: {
    desktop: "/images/router/hero-desktop.png",
    tablet: "/images/router/hero-tablet.png",
    mobile: "/images/router/hero-mobile.png",
  },
  productImage: "/images/router/card_fondo.png",
  iconUrl: "/images/router/logo.png",
  benefitIcon: "/images/router/icono.png",
  videoUrl: "https://www.youtube.com/embed/router-video",
  videoTitle: "Router Camaleón - Privacidad total en tu conexión",
  benefitsTitle: "Quédate tranquilo con el router Camaleón",
  relatedProducts: {
    simProductId: "508",
    esimProductId: "454",
  },
};

// Funciones de transformación
function transformChecksToFeatures(product: ProductById | null): string[] {
  if (!product) return [];
  const checks = (product as any).checks || [];
  return checks.map((c: { name: string }) => c.name);
}

function transformVariantsToPlans(
  variants: any[],
  product?: ProductById | null
): { label: string; value: string; price: number }[] {
  // Si hay variantes, usarlas
  if (variants && variants.length > 0) {
    return variants.map((v) => ({
      label: v.licensetime === "ROUTER" ? "Router" : `${v.licensetime} meses`,
      value: String(v.id),
      price: Number(v.price),
    }));
  }
  
  // Si NO hay variantes, usar licensetime y price del producto
  if (product) {
    const licensetime = (product as any).licensetime || "0";
    const price = Number((product as any).price) || 0;
    const licenseLabel = licensetime === "0" ? "Única" : `${licensetime} meses`;
    
    return [{
      label: `Licencia ${licenseLabel}`,
      value: String((product as any).id),
      price: price,
    }];
  }
  
  return [];
}

function getRadioOptionsFromPlans(plans: { label: string }[]): string[] {
  return plans.map((p) => p.label);
}

function transformAdvantagesToFeaturesGrid(product: ProductById | null, benefitIcon?: string) {
  if (!product) return [];
  const features = (product as any).features || [];
  return features.map((f: { name: string; description: string; image?: string }) => ({
    image: f.image || benefitIcon || "/images/router/icono.png",
    title: f.name,
    description: f.description,
  }));
}

function transformFeaturesToBenefitsGrid(product: ProductById | null, benefitIcon?: string) {
  if (!product) return [];
  const advantages = (product as any).advantages || [];
  return advantages.map((a: { name: string; description: string; image?: string }) => ({
    icon: a.image || benefitIcon || "/images/router/icono.png",
    title: a.name,
    description: a.description,
  }));
}

function transformFaqs(product: ProductById | null) {
  if (!product) return [];
  const faqs = (product as any).faqs || [];
  return faqs.map((f: { name: string; description: string }) => ({
    question: f.name,
    answer: f.description,
  }));
}

function formatPrice(price: number | string | undefined): string {
  if (!price) return "$0 USD";
  return `$${Number(price).toLocaleString()} USD`;
}

export default function RouterPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "es";
  const priceBlockRef = useRef<HTMLDivElement | null>(null);
  const { isVisible } = usePriceVisibility(priceBlockRef);
  const { openModal } = useModalPayment();

  const [product, setProduct] = useState<ProductById | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRadio, setSelectedRadio] = useState<string>("");

  useEffect(() => {
    async function loadProduct() {
      try {
        setIsLoading(true);
        setError(null);
        const productData = await getProductById(String(ROUTER_CONFIG.productId), locale);
        setProduct(productData);
      } catch (err) {
        console.error("Error cargando router:", err);
        setError("No se pudo cargar la información del producto.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, [locale]);

  // Transformaciones de datos
  const plans = useMemo(() => {
    if (!product) return [];
    const variants = (product as any).variants || [];
    return transformVariantsToPlans(variants, product);
  }, [product]);

  const radioOptions = useMemo(() => getRadioOptionsFromPlans(plans), [plans]);
  const features = useMemo(() => transformChecksToFeatures(product), [product]);
  const featuresGrid = useMemo(() => transformAdvantagesToFeaturesGrid(product, ROUTER_CONFIG.benefitIcon), [product]);
  const benefits = useMemo(() => transformFeaturesToBenefitsGrid(product, ROUTER_CONFIG.benefitIcon), [product]);
  const faqs = useMemo(() => transformFaqs(product), [product]);

  // Inicializar radio seleccionado
  useEffect(() => {
    if (plans.length > 0 && !selectedRadio) {
      setSelectedRadio(plans[0].label);
    }
  }, [plans, selectedRadio]);

  // Precio actual
  const currentPrice = useMemo(() => {
    const selectedPlan = plans.find((p) => p.label === selectedRadio);
    return selectedPlan?.price || (product as any)?.price || 0;
  }, [plans, selectedRadio, product]);

  // Handlers
  const handleRadioChange = (value: string) => {
    setSelectedRadio(value);
  };

  const handleBuy = () => {
    const selectedPlan = plans.find((p) => p.label === selectedRadio);
    openModal({
      productid: selectedPlan?.value || String(ROUTER_CONFIG.productId),
      languageCode: locale,
      selectedOption: ROUTER_CONFIG.categoryId,
    });
  };

  const handleChat = () => {
    window.open("https://t.me/Encriptados", "_blank");
  };

  // Producto Info para StickyBanner - Priorizar datos del backend
  const productIconUrl = (product as any)?.iconUrl || ROUTER_CONFIG.iconUrl;
  
  const productInfo = useMemo(() => ({
    title: (product as any)?.name || "Camaleón Router",
    price: formatPrice(currentPrice),
    subtitle: (product as any)?.description?.substring(0, 50) + "..." || "Privacidad total",
    iconUrl: productIconUrl,
    ctaLabel: "Comprar",
    categoryId: ROUTER_CONFIG.categoryId,
    productId: ROUTER_CONFIG.productId,
    onBuy: handleBuy,
    onChat: handleChat,
  }), [product, currentPrice, handleBuy]);

  // Loading state
  if (isLoading) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7CC9A7]" />
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="bg-white min-h-screen flex flex-col items-center justify-center p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Camaleón Router</h1>
        <p className="text-gray-600 mb-2">{error}</p>
        <p className="text-gray-400 text-sm">Por favor, intenta más tarde.</p>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Banner - Usar función con fallback inteligente (heroBanners > buyNowImage > images > config) */}
      <HeroBanner
        imageUrl={getProductBannerImages(product, {
          slug: "router-camaleon",
          productId: ROUTER_CONFIG.productId,
          categoryId: ROUTER_CONFIG.categoryId,
          templateType: "router",
          heroBanners: ROUTER_CONFIG.heroBanners,
          productImage: ROUTER_CONFIG.productImage,
          iconUrl: ROUTER_CONFIG.iconUrl,
          benefitIcon: ROUTER_CONFIG.benefitIcon,
          relatedProducts: ROUTER_CONFIG.relatedProducts,
        })}
        alt={(product as any)?.name || "Camaleón Router"}
      />

      {/* Product Section */}
      <div ref={priceBlockRef}>
        <ProductSection
          title={(product as any)?.name || "Camaleón Router"}
          description={(product as any)?.description || "El Router Camaleón es la solución ideal para aquellos que buscan privacidad total y una conexión segura a Internet."}
          features={features}
          price={formatPrice(currentPrice)}
          radioOptions={radioOptions}
          selectedRadio={selectedRadio}
          onRadioChange={handleRadioChange}
          onBuy={handleBuy}
          productImage={(product as any)?.buyNowImage || (product as any)?.productImage || (product as any)?.image_full || product?.images?.[0]?.src || ROUTER_CONFIG.productImage}
        />
      </div>

      {/* Sticky Price Banner */}
      <StickyPriceBanner
        visible={!isVisible}
        productInfo={productInfo}
      />

      {/* Features Grid */}
      {featuresGrid.length > 0 && (
        <ProductFeaturesGrid features={featuresGrid} />
      )}

      {/* Benefits Grid - Usar title_benefits del backend */}
      {benefits.length > 0 && (
        <ProductBenefitsGrid
          title={(product as any)?.title_benefits || ROUTER_CONFIG.benefitsTitle}
          benefits={benefits}
          imageBenefits={(product as any)?.image_benefits}
          productName={(product as any)?.name}
        />
      )}

      {/* Video Section - Priorizar datos del backend */}
      {((product as any)?.videoUrl || ROUTER_CONFIG.videoUrl) && (
        <HeroVideoSection
          videoUrl={(product as any)?.videoUrl || ROUTER_CONFIG.videoUrl}
          title={(product as any)?.video_text || ROUTER_CONFIG.videoTitle}
        />
      )}

      {/* Featured Products (SIM/eSIM) */}
      <FeaturedProducts
        left={{
          title: "SIM Card encriptada",
          description: "Protégete de los ciberdelincuentes y mantén tu información personal segura",
          buttonLabel: "Más información",
          onButtonClick: () => window.location.href = `/${locale}/sim-encriptada`,
          image: "/images/our-products/1b097c330ad6a7135bc1084b2ca6886438cde653.png",
        }}
        right={{
          title: "SIM TIM Conéctate con total anonimato",
          subtitle: "Tus datos no expiran sin importar el tiempo que tardes en consumirlos",
          buttonLabel: "Más información",
          onButtonClick: () => window.location.href = `/${locale}/tim-sim`,
          image: "/images/our-products/timpersona.png",
        }}
      />

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <FAQSection faqs={faqs} />
      )}
    </main>
  );
}
