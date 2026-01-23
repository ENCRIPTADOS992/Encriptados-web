"use client";

import { useEffect, useState, useRef } from "react";
import FilterProductsBar from "@/app/[locale]/our-products/components/FilterProductsBar/FilterProductsBar";
import { ProductFilters } from "@/features/products/types/ProductFilters";
import { usePriceVisibility } from "@/shared/hooks/usePriceVisibility";

/**
 * GlobalFloatingMenu
 * 
 * Reusable floating menu component that appears on scroll.
 * Uses the same FilterProductsBar component from our-products page.
 * 
 * Usage:
 * ```tsx
 * <GlobalFloatingMenu />
 * ```
 */
export default function GlobalFloatingMenu() {
    // Ref para detectar cuando salen del viewport los filtros (trigger point)
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const { isVisible: isTriggerVisible } = usePriceVisibility(triggerRef);

    // Estado para controlar si el usuario ha cerrado el modal flotante
    const [isFloatingModalDismissed, setIsFloatingModalDismissed] = useState(false);

    // Mostrar modal flotante cuando el trigger no es visible y no ha sido cerrado
    const showFloatingMenu = !isTriggerVisible && !isFloatingModalDismissed;

    // Handler para cerrar el modal flotante
    const handleCloseFloatingModal = () => {
        setIsFloatingModalDismissed(true);
    };

    // Reset del estado cuando el trigger vuelve a ser visible
    useEffect(() => {
        if (isTriggerVisible) {
            setIsFloatingModalDismissed(false);
        }
    }, [isTriggerVisible]);

    // Default filters - can be extended if needed
    const [filters] = useState<ProductFilters>({
        selectedOption: "all",
        provider: "all",
        os: "all",
        license: "all",
        encriptadosprovider: "all",
        timprovider: "all",
    });

    // Empty update function since this is read-only
    const updateFilters = () => {
        // Not used in floating menu - user will be redirected on click
    };

    return (
        <>
            {/* Invisible trigger element at the top of the page */}
            <div
                ref={triggerRef}
                className="absolute top-32 left-0 right-0 h-1 pointer-events-none"
                aria-hidden="true"
            />

            {/* Floating menu */}
            {showFloatingMenu && (
                <FilterProductsBar
                    filters={filters}
                    updateFilters={updateFilters}
                    variant="floating"
                    onClose={handleCloseFloatingModal}
                />
            )}
        </>
    );
}
