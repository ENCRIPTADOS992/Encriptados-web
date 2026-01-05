"use client";

import { useEffect, useState, useMemo } from "react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

// Componentes de SIM
import HeroSimSection from "./components/HeroSimSection";

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

// Hooks y servicios
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { getProductById } from "@/features/products/services";
import type { ProductById } from "@/features/products/types/AllProductsResponse";

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
  type ProductFamily,
  type ProductFormat,
} from "./simProductConfig";

interface PageProps {
  params: { slug: string; locale: string };
}

export default function SimProductPage({ params }: PageProps) {
  const { slug, locale } = params;
  
  return <SimProductPageContent slug={slug} locale={locale} />;
}

function SimProductPageContent({ slug, locale }: { slug: string; locale: string }) {
  const { openModal } = useModalPayment();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Traducciones
  const t = useTranslations("EncryptedSimPage");

  const [product, setProduct] = useState<ProductById | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [validationChecked, setValidationChecked] = useState(false);

  // Obtener productId desde query params
  const productIdFromUrl = searchParams.get("productId");
  
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
    setValidationChecked(true);

    if (!validation.isValid && validation.redirectUrl) {
      console.warn(
        `[SIM Page] Producto no corresponde a URL. ` +
        `Producto ID ${product.id} (provider: "${product.provider}", type: "${product.type_product}") ` +
        `debería estar en "${validation.expectedSlug}", no en "${slug}". ` +
        `Redirigiendo a ${validation.redirectUrl}`
      );
      // Mantener el productId en la URL de redirección
      const redirectWithId = productIdFromUrl 
        ? `${validation.redirectUrl}?productId=${productIdFromUrl}`
        : validation.redirectUrl;
      router.replace(redirectWithId);
    }
  }, [product, isLoading, slug, locale, router, validationChecked, productIdFromUrl]);

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

  // Formatear precio
  const formatPrice = (price: number | string): string => {
    const numericPrice = typeof price === "string" ? parseFloat(price) : price;
    if (isNaN(numericPrice)) return "Consultar";
    return `${numericPrice}$ USD`;
  };

  // Obtener imagen del producto de la API
  const productImage = useMemo(() => {
    if (product?.images && product.images.length > 0) {
      return product.images[0].src;
    }
    return config?.productImage || "/images/encrypted-sim/Encrypted_sim_card.png";
  }, [product, config]);

  const handleBuy = (productId?: string) => {
    openModal({
      productid: productId || String(product?.id || config?.productId),
      languageCode: locale,
      selectedOption: 40,
    });
  };

  // Traducciones para el componente
  const heroTranslations = useMemo(() => ({
    priceFrom: t("products.data.priceRange")?.includes("-") ? "Desde" : "Precio",
    buyNow: t("CardSim.buyNow"),
    benefitsTitle: t("characteristics.title") || "Beneficios para ti:",
  }), [t]);

  // Loading state
  if (isLoading) {
    return (
      <main className="min-h-screen bg-black">
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
      <main className="min-h-screen flex items-center justify-center px-4">
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
    <main className="min-h-screen">
      <HeroSimSection
        productName={product?.name || config?.slug || "SIM Encriptada"}
        productImage={productImage}
        features={features}
        price={formatPrice(product?.price || 0)}
        onBuy={() => handleBuy()}
        appStoreUrl="https://apps.apple.com/app/encriptados"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.encriptados"
        apkUrl="https://encriptados.io/apk"
        translations={heroTranslations}
      />
      
      {/* Sección de Cobertura con buscador */}
      <section className="py-12 md:py-16">
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
                inputClassName="h-[84px] rounded-full border-2 border-[#DCF2F8] px-6 py-2.5 focus:outline-none focus:border-[#33CDFB]"
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
      </section>

      {/* Sección de Características de Seguridad - SOLO ENCRYPTED */}
      {showEncryptedSections && (
        <section>
          <FeaturesList />
        </section>
      )}

      {/* Sección Nuestro Objetivo - SOLO ENCRYPTED */}
      {showEncryptedSections && (
        <section className="bg-[#f4f8fa] py-12 md:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <OurObjetive />
          </div>
        </section>
      )}

      {/* Sección Comunícate desde cualquier lugar - SOLO ENCRYPTED */}
      {showEncryptedSections && (
        <section className="bg-[#F4F8FA] py-12 md:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-center text-gray-800">
              {t("comunicationTitle")}
            </h2>
          </div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <BannerSecure />
          </div>
        </section>
      )}

      {/* Sección Paga solo por lo que usas */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <PayForUse />
        </div>
      </section>

      {/* Sección Por qué llamar con la SIM Encriptada - SOLO ENCRYPTED */}
      {showEncryptedSections && (
        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-center text-gray-800 mb-12 md:mb-16">
              {t("whyCallWithEncryptedSIM.title")}
            </h2>
            <div className="flex justify-center">
              <WhyCallSim />
            </div>
          </div>
        </section>
      )}

      {/* TODO: Sección de Planes de Datos - SOLO TIM */}
      {showTimSections && (
        <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-center text-gray-800 mb-8">
              Planes de Datos TIM
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Navega en más de 200 países con nuestros planes de datos internacionales.
            </p>
            {/* Aquí irían los planes de datos de TIM */}
          </div>
        </section>
      )}

      {/* Sección Cobertura en más de 200 países */}
      <section className="pt-12 md:pt-16">
        <BannerCoverage />
      </section>

      {/* Sección Preguntas Frecuentes */}
      {faqs.length > 0 && (
        <FAQSection faqs={faqs} title="Preguntas Frecuentes" />
      )}
    </main>
  );
}
