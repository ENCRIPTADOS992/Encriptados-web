"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import FilterProductsBar from "./components/FilterProductsBar/FilterProductsBar";
import CardOurProducts from "./components/CardOurProducts";
import { usePriceVisibility } from "@/shared/hooks/usePriceVisibility";
import Typography from "@/shared/components/Typography";


import { BasicFormProvider } from "@/shared/components/BasicFormProvider";
import ListOfProducts from "./components/ListOfProducts";
import { useTranslations } from "next-intl";
import BannerOurProductsMobile from "./components/BannerOurProductsMobile";
import BannerOurProducts from "./components/BannerOurProducts";
import { useProductFilters } from "@/features/products/hooks/useProductFilters";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { useGetProducts } from "@/features/products/queries/useGetProducts";
import SilentCircleBanner from "./components/SilentCircleBanner";
import BannerSecureMdmNew from "./components/BannerSecureMdmNew";
import SecureCommunicationBanner from "./components/SecureCommunicationBanner";
import BannerSmsActivation from "./components/BannerSmsActivation";
import SectionWrapper from "@/shared/components/SectionWrapper";

const OurProductsPage = () => {
  const { openModal } = useModalPayment();
  const t = useTranslations("OurProductsPage");
  const { filters, updateFilters } = useProductFilters();
  const pathname = usePathname();

  const filterRef = useRef<HTMLDivElement | null>(null);
  const cardSectionRef = useRef<HTMLDivElement | null>(null);
  const selectedOption = parseInt(filters.selectedOption, 10);
  const { data: products, isFetching, isError } = useGetProducts(
    selectedOption,
    filters.provider
  );

  useEffect(() => {
    console.log("[OurProductsPage] Página montada correctamente ✅");

    // Leer parámetro 'category' de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category");

    if (categoryParam) {
      // Actualizar filtros con la categoría de la URL
      updateFilters({ selectedOption: categoryParam });

      // Hacer scroll a la sección de filtros después de un pequeño delay
      setTimeout(() => {
        const filtersEl = document.getElementById("filters-section");
        if (filtersEl) {
          const rect = filtersEl.getBoundingClientRect();
          const offset = window.scrollY + rect.top - 16;
          window.scrollTo({ top: offset, behavior: "smooth" });
        }
      }, 500);

      // Limpiar el parámetro de la URL sin recargar la página
      const url = new URL(window.location.href);
      url.searchParams.delete("category");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  useEffect(() => {
    console.log("[OurProductsPage] Current filters:", filters);
  }, [filters]);


  // Detectar cuando la barra de filtros estática sale del viewport
  const { isVisible: isFilterVisible } = usePriceVisibility(filterRef);
  const [isPastFilter, setIsPastFilter] = useState(false);

  // Check strict scroll position
  useEffect(() => {
    const checkScroll = () => {
      // Lógica específica para HOME (ruta raíz o locale raíz)
      const isHomePage = pathname === "/" || /^\/[a-z]{2}$/.test(pathname);

      if (isHomePage) {
        if (cardSectionRef.current) {
          const rect = cardSectionRef.current.getBoundingClientRect();
          // "apartir del componente de la imagen se mostrara el pupup"
          // Significa que cuando llegamos a la sección de cards (visible en pantalla), se activa.
          // rect.top < window.innerHeight significa que el componente ha entrado en el viewport.
          // Usamos un offset (ej. window.innerHeight * 0.8) para que no sea tan inmediato si se quiere.
          // Pero "apartir del componente" sugiere en cuanto visualmente estamos ahí.
          setIsPastFilter(rect.top < window.innerHeight);
        }
      } else {
        // Lógica anterior o por defecto para otras páginas (si se usa allí)
        if (filterRef.current) {
          const rect = filterRef.current.getBoundingClientRect();
          setIsPastFilter(rect.bottom < 0);
        }
      }
    };

    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll(); // Check initial state

    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, [pathname]);

  // Estado para controlar si el usuario ha cerrado el modal flotante
  const [isFloatingModalDismissed, setIsFloatingModalDismissed] = useState(false);

  // Mostrar modal flotante SOLO cuando:
  // 1. Los filtros estáticos NO son visibles (isFilterVisible === false)
  // 2. El usuario ha hecho scroll MÁS ALLÁ de los filtros (isPastFilter === true)
  // 3. No ha sido cerrado manualmente (!isFloatingModalDismissed)
  const showFloatingFilters = !isFilterVisible && isPastFilter && !isFloatingModalDismissed;

  // Handler para cerrar el modal flotante
  const handleCloseFloatingModal = () => {
    setIsFloatingModalDismissed(true);
  };

  // Reset del estado cuando los filtros vuelven a ser visibles (para que el modal pueda reaparecer)
  useEffect(() => {
    if (isFilterVisible) {
      setIsFloatingModalDismissed(false);
    }
  }, [isFilterVisible]);


  return (
    <>
      <BasicFormProvider defaultValue={filters}>

        <SectionWrapper className="block sm:hidden">
          <BannerOurProductsMobile />
        </SectionWrapper>

        {/* Banner para dispositivos mayores que móvil */}
        <div
          className="hidden sm:block w-full bg-black"
          style={{
            background:
              "radial-gradient(circle at 75% -70%, #7EE0FF 0%, rgb(37, 191, 238) 20%, #000 60%)",
          }}
        >
          <SectionWrapper>
            <BannerOurProducts />
          </SectionWrapper>
        </div>
        <div className="bg-[#000]">
          <SectionWrapper className="bg-black py-1">
            <Typography
              variant="h2"
              as="h1"
              className="bg-gradient-to-r text-2xl sm:text-3xl md:text-[38px] justify-center font-bold mt-2 sm:mt-4 flex items-center from-[#FFFF] to-[#35CDFB] bg-clip-text text-transparent mb-6 sm:mb-7 text-center"
            >
              {t("filterProducts.title")}
            </Typography>

            <div id="buysimappsection" ref={filterRef}>
              <div id="filters-section">
                <FilterProductsBar
                  filters={filters}
                  updateFilters={updateFilters}
                  products={products}
                />
              </div>

              {showFloatingFilters && (
                <FilterProductsBar
                  filters={filters}
                  updateFilters={updateFilters}
                  products={products}
                  variant="floating"
                  onClose={handleCloseFloatingModal}
                />
              )}

              <ListOfProducts filters={filters} />
            </div>

          </SectionWrapper>

          <SectionWrapper className="py-1">
            <div ref={cardSectionRef}>
              <CardOurProducts filters={filters} />
            </div>
          </SectionWrapper>


          <SectionWrapper className="py-0 md:py-1">
            <SilentCircleBanner />
          </SectionWrapper>

          <SectionWrapper className="py-0 md:py-2">
            <BannerSmsActivation />
          </SectionWrapper>

          <SectionWrapper className="py-0 md:py-1">
            <BannerSecureMdmNew />
          </SectionWrapper>

          <SectionWrapper className="py-0 md:py-1">
            <SecureCommunicationBanner />
          </SectionWrapper>
        </div>
      </BasicFormProvider>
    </>
  );
};

export default OurProductsPage;
