"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

// Componentes de SIM
import HeroSimSection from "./components/HeroSimSection";
import SimTimBanner from "./components/SimTimBanner";
import ProductInfoSection from "./components/ProductInfoSection";

// Componentes de Cobertura
import { BasicFormProvider } from "@/shared/components/BasicFormProvider";
import SearchInput from "@/shared/components/SearchInput";
import ListOfPlans from "@/app/[locale]/encrypted-sim/components/ListOfPlans";
import { ListOfProductsData } from "@/app/[locale]/encrypted-sim/constants/ListOfProductsData";
import FeaturesList from "@/app/[locale]/encrypted-sim/components/FeaturesList";
import OurObjetive from "@/app/[locale]/encrypted-sim/components/OurObjetive";
import BannerSecure from "@/app/[locale]/encrypted-sim/components/BannerSecure";
import PayForUse from "@/app/[locale]/encrypted-sim/components/PayForUse";
import WhyCallSim from "@/app/[locale]/encrypted-sim/components/WhyCallSim/WhyCallSim";
import BannerCoverage from "@/shared/BannerCoverage";
import FAQSection from "@/app/[locale]/apps/component/templateProduct/FAQSection";
import WhereUseSimSection from "@/app/[locale]/tim-sim/components/WhereUseSimSection";

// Hooks y servicios
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { getProductById } from "@/features/products/services";
import type { ProductById } from "@/features/products/types/AllProductsResponse";
import { usePriceVisibility } from "@/shared/hooks/usePriceVisibility";
import StickyPriceBanner from "@/app/[locale]/apps/component/templateProduct/StickyPriceBanner";

// Configuración y utilidades locales
import {
  getSimProductConfig,
  getConfigForProduct,
  isValidSimProductSlug,
  deriveProductFamily,
  deriveProductFormat,
  shouldShowEncryptedSections,
  shouldShowTimSections,
  shouldShowEsimInfo,
  shouldShowShippingInfo,
  validateProductMatchesSlug,
  getSlugFromBackendFields,
  type ProductFamily,
  type ProductFormat,
} from "./simProductConfig";

interface PageProps {
  slug: string;
  locale: string;
  initialProduct: ProductById | null;
}

// Variantes de animación para secciones
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function SimProductPageContent({ slug, locale, initialProduct }: PageProps) {
  const { openModal } = useModalPayment();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Traducciones
  const t = useTranslations("EncryptedSimPage");

  const [product, setProduct] = useState<ProductById | null>(initialProduct);
  const [isLoading, setIsLoading] = useState(!initialProduct);
  const [error, setError] = useState<string | null>(null);
  const [validationChecked, setValidationChecked] = useState(false);

  // Obtener productId desde query params
  const productIdFromUrl = searchParams.get("productId");
  const priceFromUrl = searchParams.get("price");
  const gbFromUrl = searchParams.get("gb")?.toUpperCase();
  const regionFromUrl = searchParams.get("region");
  const regionCodeFromUrl = searchParams.get("regionCode");
  const flagUrlFromUrl = searchParams.get("flagUrl");

  // Config estático para assets (banners, imágenes) - fallback al slug de la URL
  const staticConfig = useMemo(() => getSimProductConfig(slug), [slug]);

  if (!isValidSimProductSlug(slug)) {
    notFound();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // CARGA DEL PRODUCTO
  // Prioridad: productId del query param > productId del config estático
  // ═══════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    async function loadProduct() {
      // Determinar qué productId usar
      const productIdToLoad = productIdFromUrl || (staticConfig?.productId ? String(staticConfig.productId) : null);

      if (!productIdToLoad) {
        setIsLoading(false);
        setError("Producto no disponible - No se especificó ID");
        return;
      }

      // Si ya tenemos el producto cargado (desde el server) y coincide con el ID que necesitamos, no recargar
      if (product && String(product.id) === String(productIdToLoad)) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const productData = await getProductById(productIdToLoad, locale);
        setProduct(productData);
      } catch (err) {
        console.error("Error cargando producto SIM:", err);
        setError("Error al cargar el producto");
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, [productIdFromUrl, staticConfig, locale]);

  // ═══════════════════════════════════════════════════════════════════════════
  // VALIDACIÓN: El backend es la fuente de verdad
  // Si el producto no corresponde a la URL actual, redirigir al slug correcto
  // ═══════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    if (!product || isLoading || validationChecked) return;

    const validation = validateProductMatchesSlug(product, slug, locale);

    // Debug para identificar por qué redirige
    if (!validation.isValid) {
      console.warn(`[SIM Page] Validation mismatch for Product ${product.id}:`, {
        provider: product.provider,
        type: product.type_product,
        currentSlug: slug,
        expectedSlug: validation.expectedSlug,
        derivedFamily: deriveProductFamily(product.provider),
        derivedFormat: deriveProductFormat(product.type_product)
      });
    }

    setValidationChecked(true);

    // Protección contra redirecciones a URLs inválidas y bucles infinitos
    if (!validation.isValid && validation.redirectUrl && validation.expectedSlug) {
      // 1. Verificar que el expectedSlug sea un slug válido conocido
      if (!isValidSimProductSlug(validation.expectedSlug)) {
        console.error(
          `[SIM Page] ⚠️ Slug inválido detectado, no redirigiendo:`,
          { expectedSlug: validation.expectedSlug, product: product.id, provider: product.provider }
        );
        return;
      }

      // 2. Protección contra bucles de redirección
      const isRedirected = searchParams.get("rd") === "1";
      if (isRedirected) {
        console.warn(
          `[SIM Page] 🛑 Bucle de redirección detectado. Se detiene la redirección automática.`,
          { currentSlug: slug, expectedSlug: validation.expectedSlug, productId: product.id }
        );
        return;
      }

      console.warn(
        `[SIM Page] Producto no corresponde a URL. ` +
        `Producto ID ${product.id} (provider: "${product.provider}", type: "${product.type_product}") ` +
        `debería estar en "${validation.expectedSlug}", no en "${slug}". ` +
        `Redirigiendo a ${validation.redirectUrl}`
      );

      // Construir URL de redirección
      const targetUrl = new URL(validation.redirectUrl, window.location.origin);

      // Mantener params existentes (productId, price, buy)
      searchParams.forEach((value, key) => {
        targetUrl.searchParams.set(key, value);
      });

      // Marcar como redirigido para evitar bucles
      targetUrl.searchParams.set("rd", "1");

      router.replace(targetUrl.pathname + targetUrl.search);
    }
  }, [product, isLoading, slug, locale, router, validationChecked, productIdFromUrl, searchParams]);

  // Obtener config basado en el producto cargado (no en la URL)
  const config = useMemo(() => {
    return getConfigForProduct(product) || staticConfig;
  }, [product, staticConfig]);

  // Transformar checks a features
  const features = useMemo(() => {
    if (!product?.checks) return [];
    return product.checks.map(check => check.name);
  }, [product]);

  // Transformar FAQs del producto
  const faqs = useMemo(() => {
    if (!product?.faqs) return [];
    return product.faqs.map(faq => ({
      question: faq.name,
      answer: faq.description,
    }));
  }, [product]);

  // ═══════════════════════════════════════════════════════════════════════════
  // DERIVACIÓN: Determinar family y format desde campos del backend
  // ═══════════════════════════════════════════════════════════════════════════
  const productFamily: ProductFamily = useMemo(() => {
    return deriveProductFamily(product?.provider);
  }, [product?.provider]);

  const productFormat: ProductFormat = useMemo(() => {
    return deriveProductFormat(product?.type_product);
  }, [product?.type_product]);

  // Flags para renderizado condicional de secciones
  const showEncryptedSections = shouldShowEncryptedSections(productFamily);
  const showTimSections = shouldShowTimSections(productFamily);
  // TODO: Usar estos flags cuando se implementen las secciones de eSIM y envío
  const _showEsimInfo = shouldShowEsimInfo(productFormat);
  const _showShippingInfo = shouldShowShippingInfo(productFormat);

  // Ref para detectar visibilidad del bloque de precio (para StickyBanner)
  const priceBlockRef = useRef<HTMLDivElement | null>(null);
  const { isVisible: isPriceVisible } = usePriceVisibility(priceBlockRef);

  // Formatear precio
  const formatPrice = (price: number | string): string => {
    const numericPrice = typeof price === "string" ? parseFloat(price) : price;
    if (isNaN(numericPrice)) return "Consultar";
    return `${numericPrice}$ USD`;
  };

  // Precio efectivo: priorizar precio de URL, luego precio del producto
  const effectivePrice = useMemo(() => {
    if (priceFromUrl) {
      const urlPrice = parseFloat(priceFromUrl);
      if (!isNaN(urlPrice)) return urlPrice;
    }
    const productPrice = typeof product?.price === "string"
      ? parseFloat(product.price)
      : product?.price;
    return productPrice ?? 0;
  }, [priceFromUrl, product?.price]);

  // ═══════════════════════════════════════════════════════════════════════════
  // AUTO-POPUP: Detectar parámetro buy=1 y abrir modal automáticamente
  // ═══════════════════════════════════════════════════════════════════════════
  const buyPopupTriggered = useRef(false);

  // ═══════════════════════════════════════════════════════════════════════════
  // AUTO-POPUP: DEPRECATED - Logic moved to useModalPaymentController.ts
  // ═══════════════════════════════════════════════════════════════════════════
  // The global controller (useModalPaymentController) now handles buy=1 detection
  // and parameter parsing for all SIM pages. This prevents race conditions.
  // We keep this comment for documentation but remove the logic.


  // Obtener imagen del producto de la API
  const productImage = useMemo(() => {
    if (product?.images && product.images.length > 0) {
      return product.images[0].src;
    }
    return config?.productImage || "/images/encrypted-sim/Encrypted_sim_card.webp";
  }, [product, config]);

  const handleBuy = (productId?: string, priceOverride?: number) => {
    openModal({
      productid: productId || String(product?.id || config?.productId),
      languageCode: locale,
      selectedOption: 40,
      initialPrice: priceOverride ?? effectivePrice,
      initialGb: gbFromUrl || undefined,
      initialRegion: regionFromUrl || undefined,
      initialRegionCode: regionCodeFromUrl || undefined,
      flagUrl: flagUrlFromUrl || undefined,
    });
  };

  // Traducciones para el componente
  const heroTranslations = useMemo(() => ({
    priceFrom: t("products.data.priceRange")?.includes("-") ? "Desde" : "Precio",
    buyNow: t("CardSim.buyNow"),
    benefitsTitle: t("characteristics.title") || "Beneficios para ti:",
  }), [t]);

  // ProductInfo para StickyPriceBanner - Carga dinámica según el producto
  const productInfo = useMemo(() => ({
    title: product?.name || config?.slug || "SIM",
    price: formatPrice(effectivePrice),
    subtitle: product?.description?.substring(0, 50) + "..." || "Comunicación segura",
    iconUrl: (product as any)?.iconUrl || config?.iconUrl || "/images/encrypted-sim/icons/sim-icon.png",
    ctaLabel: t("CardSim.buyNow") || "Comprar ahora",
    onBuy: () => handleBuy(),
    onChat: () => window.open("https://t.me/Encriptados", "_blank"),
  }), [product, config, effectivePrice, t, handleBuy]);

  // Loading state
  if (isLoading) {
    return (
      <main className="min-h-screen bg-white text-black">
        <div className="animate-pulse">
          <div className="h-[200px] sm:h-[284px] bg-gray-900" />
          <div className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="h-10 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                    <div className="h-4 bg-gray-200 rounded w-4/6" />
                  </div>
                  <div className="h-12 bg-gray-200 rounded w-1/3" />
                </div>
                <div className="h-64 bg-gray-200 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (error && !product) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 bg-white text-black">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {config?.slug || "Producto SIM"}
          </h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Banner Hero - Dinámico según productFamily */}
      {showTimSections ? (
        <>
          <SimTimBanner
            productName={product?.name || config?.slug || "SIM TIM"}
            onBuy={() => handleBuy()}
          />
          {/* Sección de información del producto para TIM */}
          <ProductInfoSection
            productName={product?.name || config?.slug || "SIM TIM"}
            productImage={productImage}
            features={features}
            price={formatPrice(effectivePrice)}
            onBuy={() => handleBuy()}
            appStoreUrl="https://apps.apple.com/app/encriptados"
            googlePlayUrl="https://play.google.com/store/apps/details?id=com.encriptados"
            apkUrl="https://encriptados.io/apk"
            gbBadge={gbFromUrl || undefined}
            regionBadge={regionFromUrl || undefined}
            regionCode={regionCodeFromUrl || undefined}
            flagUrl={flagUrlFromUrl || undefined}
            priceBlockRef={priceBlockRef}
            translations={heroTranslations}
          />
          <WhereUseSimSection locale={locale} />
        </>
      ) : (
        <HeroSimSection
          productName={product?.name || config?.slug || "SIM Encriptada"}
          productImage={productImage}
          heroImage={config?.heroBanners?.desktop}
          features={features}
          price={formatPrice(effectivePrice)}
          onBuy={() => handleBuy()}
          appStoreUrl="https://apps.apple.com/app/encriptados"
          googlePlayUrl="https://play.google.com/store/apps/details?id=com.encriptados"
          apkUrl="https://encriptados.io/apk"
          priceBlockRef={priceBlockRef}
          translations={heroTranslations}
        />
      )}

      {/* Sticky Price Banner - Aparece cuando el bloque de precio no es visible */}
      <StickyPriceBanner visible={!isPriceVisible} productInfo={productInfo} />

      {/* Sección de Cobertura con buscador - Solo para Encriptados, no TIM */}
      {showEncryptedSections && (
        <motion.section
          className="py-12 md:py-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <BasicFormProvider>
              <h2 className="text-[24px] sm:text-[30px] lg:text-[38px] text-center font-bold leading-[1.3] mb-6">
                <span className="bg-gradient-to-r from-[#33CDFB] via-[#0EA5E9] to-[#1E3A8A] bg-clip-text text-transparent">
                  {t("coverageTitle")}
                </span>
              </h2>
              <div className="max-w-3xl mx-auto text-center mb-6">
                <p className="text-base sm:text-lg leading-relaxed text-[#012029]">
                  {t("coverageDescription")}
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                <SearchInput
                  inputClassName="border-4 border-[#DCF2F8] focus:outline-none focus:border-[#DCF2F8]"
                  iconPosition="left"
                  name="searchinputcountry"
                  placeholder={t("searchPlaceholder")}
                />
              </div>
              <div className="max-w-3xl mx-auto mt-4">
                <ListOfPlans data={ListOfProductsData} />
              </div>
            </BasicFormProvider>
          </div>
        </motion.section>
      )}

      {/* Sección de Características de Seguridad */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <FeaturesList variant={showTimSections ? "tim" : "encrypted"} />
      </motion.section>

      {/* Sección Nuestro Objetivo */}
      <motion.section
        className="bg-[#f4f8fa] py-12 md:py-16 lg:py-20"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <OurObjetive variant={showTimSections ? "tim" : "encrypted"} />
        </div>
      </motion.section>

      {/* Sección Comunícate desde cualquier lugar */}
      <motion.section
        className="bg-[#F4F8FA] py-12 md:py-16 lg:py-20"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-center text-gray-800">
            {t("comunicationTitle")}
          </h2>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <BannerSecure />
        </div>
      </motion.section>

      {/* Sección Paga solo por lo que usas */}
      <motion.section
        className="py-12 md:py-16 lg:py-20"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <PayForUse />
        </div>
      </motion.section>

      {/* Sección Por qué llamar con la SIM Encriptada */}
      <motion.section
        className="py-16 md:py-20"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-center text-gray-800 mb-12 md:mb-16">
            {t("whyCallWithEncryptedSIM.title")}
          </h2>
          <div className="flex justify-center">
            <WhyCallSim />
          </div>
        </div>
      </motion.section>

      {/* Sección Cobertura en más de 200 países */}
      <motion.section
        className="pt-12 md:pt-16"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <BannerCoverage />
      </motion.section>

      {/* Sección Preguntas Frecuentes */}
      {faqs.length > 0 && (
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <FAQSection faqs={showTimSections ? faqs.slice(0, 3) : faqs} title="Preguntas Frecuentes" />
        </motion.div>
      )}
    </main>
  );
}
