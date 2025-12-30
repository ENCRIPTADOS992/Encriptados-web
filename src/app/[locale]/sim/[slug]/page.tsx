"use client";

import { useEffect, useState, useMemo } from "react";
import { notFound } from "next/navigation";
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

// Hooks y servicios
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { getProductById } from "@/features/products/services";
import type { ProductById } from "@/features/products/types/AllProductsResponse";

// Configuración y utilidades locales
import { getSimProductConfig, isValidSimProductSlug } from "./simProductConfig";

interface PageProps {
  params: { slug: string; locale: string };
}

export default function SimProductPage({ params }: PageProps) {
  const { slug, locale } = params;
  
  return <SimProductPageContent slug={slug} locale={locale} />;
}

function SimProductPageContent({ slug, locale }: { slug: string; locale: string }) {
  const { openModal } = useModalPayment();
  
  // Traducciones
  const t = useTranslations("EncryptedSimPage");

  const [product, setProduct] = useState<ProductById | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const config = useMemo(() => getSimProductConfig(slug), [slug]);

  if (!isValidSimProductSlug(slug)) {
    notFound();
  }

  useEffect(() => {
    async function loadProduct() {
      if (!config || config.productId === 0) {
        setIsLoading(false);
        setError("Producto no disponible");
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const productData = await getProductById(String(config.productId), locale);
        setProduct(productData);
      } catch (err) {
        console.error("Error cargando producto SIM:", err);
        setError("Error al cargar el producto");
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, [config, locale]);

  // Transformar checks a features
  const features = useMemo(() => {
    if (!product?.checks) return [];
    return product.checks.map(check => check.name);
  }, [product]);

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
        <div className="w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-6/12 mx-auto px-4">
          <BasicFormProvider>
            <h2 className="text-[24px] sm:text-[30px] lg:text-[38px] text-center font-bold leading-[1.3] mb-6">
              <span className="bg-gradient-to-r from-[#33CDFB] via-[#0EA5E9] to-[#1E3A8A] bg-clip-text text-transparent">
                {t("coverageTitle")}
              </span>
            </h2>
            <div className="flex justify-center text-center mb-6">
              <p className="text-base sm:text-lg leading-relaxed text-[#012029]">
                {t("coverageDescription")}
              </p>
            </div>

            <SearchInput
              inputClassName="border-4 border-[#DCF2F8] focus:outline-none focus:border-[#DCF2F8]"
              iconPosition="left"
              name="searchinputcountry"
              placeholder={t("searchPlaceholder")}
            />
            <div className="mt-4 w-full">
              <ListOfPlans data={ListOfProductsData} />
            </div>
          </BasicFormProvider>
        </div>
      </section>

      {/* Sección de Características de Seguridad */}
      <section className="py-16 md:py-20">
        <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 justify-center mx-auto items-center px-4 text-center">
          <h2 className="text-[24px] sm:text-[30px] lg:text-[38px] font-bold leading-[1.3] text-[#333333] mb-12 md:mb-16">
            {t("improveYourSecurity.titleImproveYourSecurity")}
          </h2>
        </div>
        <div className="w-full sm:w-10/12 md:w-9/12 items-center flex justify-center mx-auto">
          <FeaturesList />
        </div>
      </section>

      {/* Sección Nuestro Objetivo */}
      <section className="bg-[#f4f8fa] py-[8vh]">
        <div className="max-w-[1100px] m-auto justify-center items-center p-4">
          <OurObjetive />
        </div>
      </section>

      {/* Sección Comunícate desde cualquier lugar */}
      <section className="bg-[#E7F4F8] py-12 md:py-16 lg:py-20">
        <div className="flex justify-center px-4 mb-12 md:mb-16">
          <h2 className="text-[24px] sm:text-[30px] lg:text-[38px] font-bold leading-[1.3] text-center text-[#333333] max-w-[1100px]">
            {t("comunicationTitle")}
          </h2>
        </div>
        <div className="max-w-[1100px] mx-auto px-4">
          <BannerSecure />
        </div>
      </section>

      {/* Sección Paga solo por lo que usas */}
      <section className="w-full py-12 md:py-16 lg:py-20 px-4">
        <div className="max-w-[1100px] mx-auto">
          <PayForUse />
        </div>
      </section>

      {/* Sección Por qué llamar con la SIM Encriptada */}
      <section className="max-w-[1100px] m-auto px-4 py-16 md:py-20">
        <div>
          <h2 className="text-[24px] sm:text-[30px] lg:text-[38px] font-bold leading-[1.3] text-center text-[#333333] mb-12 md:mb-16">
            {t("whyCallWithEncryptedSIM.title")}
          </h2>
        </div>
        <div className="flex justify-center">
          <div>
            <WhyCallSim />
          </div>
        </div>
      </section>

      {/* Sección Cobertura en más de 200 países */}
      <section className="pt-12 md:pt-16">
        <BannerCoverage />
      </section>
      
      {/* Aquí irán más secciones: FAQ, etc. */}
    </main>
  );
}
