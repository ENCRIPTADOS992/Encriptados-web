"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
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
import RouterCamaleon from "../component/RouterCamaleon";
import PrivateAppStore from "../component/PrivateAppStore";
import CustomizeAppCatalog from "../component/CustomizeAppCatalog";

// Hooks y servicios
import { usePriceVisibility } from "@/shared/hooks/usePriceVisibility";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { getProductById, getProductBySlug } from "@/features/products/services";
import type { ProductById } from "@/features/products/types/AllProductsResponse";
import { useProductDetail } from "@/features/products/queries/useProductDetail";

// Configuración y utilidades locales
import { getProductConfig } from "./productConfig";
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
  slug: string;
  locale: string;
  initialProduct: ProductById | null;
}

export default function ProductPageContent({ slug, locale, initialProduct }: PageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const priceBlockRef = useRef<HTMLDivElement | null>(null);
  const { isVisible } = usePriceVisibility(priceBlockRef);
  const { openModal } = useModalPayment();

  // Traducciones
  const t = useTranslations("appsShared.productTemplate");
  const tSim = useTranslations("appsShared");
  const tOurProducts = useTranslations("OurProductsPage.simCards");

  // State for radio selection
  const [selectedRadio, setSelectedRadio] = useState<string>("");

  const config = useMemo(() => getProductConfig(slug), [slug]);

  // Determine identifier and type for the hook
  const searchParamProductId = searchParams.get("productId");
  const searchParamVariantId = searchParams.get("variantId");
  const searchParamCategoryId = searchParams.get("categoryId");
  const searchParamBuy = searchParams.get("buy");

  // Priority: 
  // 1. Query Param ID (allows overriding static config via URL)
  // 2. Static Config ID (legacy/stable behavior for known apps)
  // 3. Slug (fallback for dynamic apps without ID in URL)
  const identifier = searchParamProductId
    ? searchParamProductId
    : (config?.productId ? String(config.productId) : slug);

  const identifierType = (searchParamProductId || config?.productId) ? "id" : "slug";

  const {
    data: productData,
    isLoading: isQueryLoading,
    error: queryError,
  } = useProductDetail(identifier, identifierType, locale, {
    initialData: initialProduct,
    enabled: true,
  });

  const product = productData || null;
  const isLoading = isQueryLoading && !product;
  const error = queryError ? t("productLoadError") : (productData === null && !isQueryLoading ? t("productNotAvailable") : null);

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
      // Si hay variantId en la URL, pre-seleccionar esa variante
      if (searchParamVariantId) {
        const matchingPlan = plans.find(p => String(p.variantId) === searchParamVariantId);
        if (matchingPlan) {
          setSelectedRadio(matchingPlan.label);
          return;
        }
      }
      setSelectedRadio(plans[0].label);
    }
  }, [plans, selectedRadio, searchParamVariantId]);

  const selectedPlan = useMemo(() => {
    return plans.find(p => p.label === selectedRadio) || plans[0] || null;
  }, [plans, selectedRadio]);

  const currentPrice = useMemo(() => {
    if (selectedPlan) return formatPrice(selectedPlan.price);
    // Si está en oferta, mostrar sale_price como precio principal
    if (product?.on_sale && product?.sale_price) {
      return formatPrice(product.sale_price);
    }
    return formatPrice(product?.price || 0);
  }, [selectedPlan, product]);

  // Precio original cuando hay oferta (para mostrar tachado)
  const originalPrice = useMemo(() => {
    if (!selectedPlan && product?.on_sale && product?.sale_price && product?.price) {
      return formatPrice(product.price);
    }
    return undefined;
  }, [selectedPlan, product]);

  const isOnSale = !selectedPlan && product?.on_sale === true;

  const handleRadioChange = (val: string) => setSelectedRadio(val);

  // === AUTO-ABRIR POPUP si viene con ?buy=1 ===
  const buyAutoOpenedRef = useRef(false);
  useEffect(() => {
    if (searchParamBuy !== "1") return;
    if (buyAutoOpenedRef.current) return;
    if (!product) return;

    // Esperar a que se resuelva la variante si viene en la URL
    if (searchParamVariantId && plans.length > 0) {
      const matchingPlan = plans.find(p => String(p.variantId) === searchParamVariantId);
      const planToUse = matchingPlan || selectedPlan;
      const priceStr = planToUse?.price
        ?? (product?.on_sale && product?.sale_price ? product.sale_price : product?.price)
        ?? 0;
      const numericPrice = typeof priceStr === 'string' ? parseFloat(priceStr) : priceStr;

      buyAutoOpenedRef.current = true;
      openModal({
        productid: String(product?.id || config?.productId),
        languageCode: locale,
        selectedOption: Number(searchParamCategoryId) || product?.category?.id || config?.categoryId || 38,
        initialPrice: numericPrice,
        iconUrl: config?.iconUrl,
        variantId: planToUse?.variantId,
      });

      // Limpiar ?buy de la URL
      const url = new URL(window.location.href);
      url.searchParams.delete("buy");
      window.history.replaceState({}, "", url.toString());
    } else if (!searchParamVariantId) {
      // Sin variantId, abrir con el plan seleccionado por defecto
      const priceStr = selectedPlan?.price
        ?? (product?.on_sale && product?.sale_price ? product.sale_price : product?.price)
        ?? 0;
      const numericPrice = typeof priceStr === 'string' ? parseFloat(priceStr) : priceStr;

      buyAutoOpenedRef.current = true;
      openModal({
        productid: String(product?.id || config?.productId),
        languageCode: locale,
        selectedOption: Number(searchParamCategoryId) || product?.category?.id || config?.categoryId || 38,
        initialPrice: numericPrice,
        iconUrl: config?.iconUrl,
        variantId: selectedPlan?.variantId,
      });

      const url = new URL(window.location.href);
      url.searchParams.delete("buy");
      window.history.replaceState({}, "", url.toString());
    }
  }, [searchParamBuy, searchParamVariantId, searchParamCategoryId, product, plans, selectedPlan, openModal, locale, config]);

  const handleBuy = () => {
    // Extraer precio numérico - usar sale_price si está en oferta
    const priceStr = selectedPlan?.price
      ?? (product?.on_sale && product?.sale_price ? product.sale_price : product?.price)
      ?? 0;
    const numericPrice = typeof priceStr === 'string' ? parseFloat(priceStr) : priceStr;

    openModal({
      productid: String(product?.id || config?.productId),
      languageCode: locale,
      selectedOption: product?.category?.id || config?.categoryId || 38,
      initialPrice: numericPrice,
      iconUrl: config?.iconUrl,
      variantId: selectedPlan?.variantId,
    });
  };

  const handleChat = () => console.log("Chat support");

  const buildSimUrl = (slug: string) => {
    const basePath = `/${slug}`;
    const match = pathname.match(/^\/([a-zA-Z-]+)(\/|$)/);
    if (!match) return basePath;
    return `/${match[1]}${basePath}`;
  };

  const handleMoreInfo = (slug: string) => router.push(buildSimUrl(slug));
  const handleSimBuy = (productId: string) => openModal({ productid: productId, languageCode: locale, selectedOption: 40 });
  const handleFeaturedSimInfo = (path: string) => router.push(`/${locale}${path}`);

  const productInfo = useMemo(() =>
    buildProductInfo(product, config, selectedPlan, handleBuy, handleChat, buildTranslations),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [product, config, selectedPlan, locale, openModal, buildTranslations]
  );

  const productSectionTranslations = useMemo(() => ({
    priceFrom: t("priceFrom"),
    buyNow: t("buyNow"),
    selectPlan: t("selectPlan"),
    downloadAppStore: t("downloadAppStore"),
    downloadGooglePlay: t("downloadGooglePlay"),
  }), [t]);

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

  // Hero banner images - Priorizar heroBanners del API, solo usar config si API no tiene el campo
  // Si API devuelve string vacío "", respetarlo (no usar fallback del config)
  const apiHeroBanners = (product as any)?.heroBanners;
  const heroBannerImages = {
    desktop: apiHeroBanners?.desktop !== undefined ? apiHeroBanners.desktop : (config?.heroBanners?.desktop || ""),
    tablet: apiHeroBanners?.tablet !== undefined ? apiHeroBanners.tablet : (config?.heroBanners?.tablet || ""),
    mobile: apiHeroBanners?.mobile !== undefined ? apiHeroBanners.mobile : (config?.heroBanners?.mobile || ""),
  };

  // URLs de video y tiendas de apps - Priorizar datos del backend
  const videoUrl = (product as any)?.videoUrl || config?.videoUrl;
  const videoText = (product as any)?.video_text || t("videoTitle", { productName: product?.name || "" });
  const apiAppStoreUrl = (product as any)?.appStoreUrl;
  const apiGooglePlayUrl = (product as any)?.googlePlayUrl;
  const apiApkUrl = (product as any)?.apkUrl;
  const appStoreUrl = apiAppStoreUrl !== undefined ? apiAppStoreUrl : config?.appStoreUrl;
  const googlePlayUrl = apiGooglePlayUrl !== undefined ? apiGooglePlayUrl : config?.googlePlayUrl;
  const apkUrl = apiApkUrl !== undefined ? apiApkUrl : config?.apkUrl;
  const iconUrl = (product as any)?.iconUrl || config?.iconUrl || "";

  // Imagen del producto - Prioridad: buyNowImage (dinámico) > buyNowImage (base) > productImage > image_full > images[0] > config
  // Lógica para seleccionar imagen dinámica basada en variante y idioma
  const buyNowVariants = (product as any)?.buyNowImage_variants;
  let dynamicImage = "";

  if (buyNowVariants && Array.isArray(buyNowVariants) && selectedPlan) {
    // Intentar encontrar coincidencia exacta (duración + idioma)
    // Nota: selectedPlan.licensetime puede ser "6 Meses", "6 Months", etc.
    // La API devuelve "6", "12", "PHONE", etc. en license_duration.
    // Limpiamos selectedPlan.value (que suele ser el ID) o usamos logic extra si necesario.
    // En transformVariantsToPlans, 'value' es el ID de la variante.
    // Necesitamos el 'raw' licensetime de la variante seleccionada.

    // Buscar la variante original en product.variants usando el ID
    // Buscar la variante original en product.variants usando el ID
    const originalVariant = (product as any)?.variants?.find((v: any) => String(v.id) === selectedPlan.value);

    // Si no encuentra por ID, intentar extraer duración del label del plan o usar el value directamente si parece una duración
    let targetDuration = originalVariant?.licensetime || "0";

    if (!originalVariant) {
      // Fallback: Si selectedPlan.value es la duración
      targetDuration = selectedPlan.value;
    }

    // Normalizar targetDuration (ej: si es "PHONE", la API espera "PHONE" o "phone"?)
    // Asumimos coincidencia de string directa o parcial.

    // DEBUG: Ver que está comparando
    console.log("DynamicImage Debug:", {
      selectedPlanValue: selectedPlan.value,
      originalVariant,
      targetDuration,
      locale,
      buyNowVariants
    });

    const normalizeDuration = (d: string | number) => String(d).toLowerCase().trim();

    const matchedVariant = buyNowVariants.find((v: any) => {
      const vDuration = normalizeDuration(v.license_duration);
      const tDuration = normalizeDuration(targetDuration);

      // 1. Coincidencia exacta normalizada
      if (vDuration === tDuration) return v.lang === locale;

      // 2. Coincidencia de número (ej: "6 meses" vs "6")
      const vNum = vDuration.replace(/\D/g, '');
      const tNum = tDuration.replace(/\D/g, '');
      if (vNum && tNum && vNum === tNum) return v.lang === locale;

      return false;
    });

    if (matchedVariant) {
      dynamicImage = matchedVariant.image;
    } else {
      // Fallback: intentar solo por duración en idioma por defecto (es) o cualquier idioma si no existe
      // Usar misma lógica relajada para fallback
      const fallbackVariant = buyNowVariants.find((v: any) => {
        const vDuration = normalizeDuration(v.license_duration);
        const tDuration = normalizeDuration(targetDuration);
        const isMatch = vDuration === tDuration ||
          (vDuration.replace(/\D/g, '') === tDuration.replace(/\D/g, '') && vDuration.replace(/\D/g, '') !== '');
        return isMatch && v.lang === 'es';
      });
      if (fallbackVariant) dynamicImage = fallbackVariant.image;
    }
  }

  const productImage =
    dynamicImage ||
    (product as any)?.buyNowImage ||
    (product as any)?.productImage ||
    (product as any)?.image_full ||
    product?.images?.[0]?.src ||
    config?.productImage ||
    "";

  return (
    <main className="bg-white text-black">
      {/* Hero Banner */}
      <HeroBanner
        imageUrl={heroBannerImages}
        alt={`${product?.name || slug} Hero Banner`}
      />

      {!product ? (
        <div className="min-h-[45vh]" />
      ) : (
        <>
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
            apkUrl={apkUrl}
            storeButtons={config?.storeButtons}
            priceBlockRef={priceBlockRef}
            languageCode={locale}
            translations={productSectionTranslations}
            onSale={isOnSale}
            regularPrice={originalPrice}
          />

          <StickyPriceBanner visible={!isVisible} productInfo={productInfo} />

          {featuresGrid.length > 0 && (
            <ProductFeaturesGrid features={featuresGrid} title={t("featuresTitle")} />
          )}

          {benefits.length > 0 && (
            <ProductBenefitsGrid
              benefits={benefits}
              title={(product as any)?.title_benefits || t("benefitsTitle")}
              imageBenefits={(product as any)?.image_benefits}
              productName={product?.name}
            />
          )}

          {slug === "router-camaleon" && <RouterCamaleon />}

          {videoUrl && <HeroVideoSection title={videoText} videoUrl={videoUrl} />}

          <FeaturedProducts
            left={{
              title: tOurProducts("encrypted.title"),
              description: tOurProducts("encrypted.description"),
              buttonLabel: tOurProducts("moreInfo"),
              onButtonClick: () => handleFeaturedSimInfo("/sim-encriptada"),
              image: "/images/our-products/1b097c330ad6a7135bc1084b2ca6886438cde653.png",
            }}
            right={{
              title: tOurProducts("tim.title"),
              subtitle: tOurProducts("tim.description"),
              buttonLabel: tOurProducts("moreInfo"),
              onButtonClick: () => handleFeaturedSimInfo("/tim-sim"),
              image: "/images/our-products/timpersona.png",
            }}
          />

          {slug.includes("galaxia-mdm") && <PrivateAppStore />}

          {slug.includes("galaxia-mdm") && <CustomizeAppCatalog />}


          {faqs.length > 0 && <FAQSection faqs={faqs} title={t("faqTitle")} />}
        </>
      )}
    </main>
  );
}
