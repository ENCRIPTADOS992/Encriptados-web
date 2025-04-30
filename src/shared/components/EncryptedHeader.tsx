"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import Navigation from "./HeaderComponents/Navigation";
import MegaMenu from "./HeaderComponents/MegaMenu";
import MobileMenu from "./HeaderComponents/MobileMenu";
import LanguageDropdown from "./HeaderComponents/LanguageSelector";
import EncryptedLogo from "./HeaderComponents/EncryptedLogo";
import Link from "next/link";
import {
  useTranslatedProductsCategories,
  useTranslatedOthersCategories,
  useTranslatedUsCategories
} from "./HeaderComponents/data/CategoryMenu";
import WorldIcon from "../svgs/WorldIcon";
import { useTranslations } from "next-intl";

export default function EncryptedHeader() {
  const t = useTranslations("encryptedHeader");

  const productsCategories = useTranslatedProductsCategories(); // Obtén las categorías traducidas
  const othersCategories = useTranslatedOthersCategories(); // Obtén las otras categorías traducidas
  const usCategories = useTranslatedUsCategories(); // Obtén Nosotros traducidos

  const [isMobile, setIsMobile] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<"products" | "others" | "us">(
    "products"
  );
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(
    productsCategories[0]?.items[0] || {
      title: t("menu.notAvailable"),
      link: "#",
      description: t("menu.noItemsAvailable"),
      image: "/placeholder.svg",
    }
  );

  const headerRef = useRef<HTMLDivElement>(null);

  // Cierra el menú de escritorio
  const closeMegaMenu = () => setIsDesktopMenuOpen(false);

  // Detecta si el viewport es móvil
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsDesktopMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Maneja el cambio de menú (productos u otros)
  const handleMenuChange = (menu: "products" | "others" | "us") => {
    setCurrentMenu(menu);
    setActiveCategory(0);
    setHoveredItem(
      menu === "products"
        ? productsCategories[0]?.items[0]
        : menu === "others"
        ? othersCategories[0]?.items[0]
        : usCategories[0]?.items[0]
    );
    setIsDesktopMenuOpen(true);
  };

  // Memoriza las categorías actuales para optimizar renders
  const currentCategories = useMemo(() => {
    if (currentMenu === "products") return productsCategories;
    if (currentMenu === "others") return othersCategories;
    if (currentMenu == "us") return usCategories;
    return usCategories;
  }, [currentMenu]);

  // Renderizado para dispositivos móviles
  if (isMobile) {
    return <MobileMenu />;
  }

  // Renderizado para dispositivos de escritorio
  return (
    <header className="relative z-50" ref={headerRef}>
      <div className="bg-[#151515] border-b border-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            {/* Logo y selector de idioma */}
            <div className="flex flex-row">
              <EncryptedLogo />
              <LanguageDropdown />
            </div>

            {/* Menú de navegación */}
            <div className="hidden lg:flex items-center gap-0">
              {/* Tienda */}
              <Link
                href="/"
                prefetch
                className="px-4 py-2 text-sm text-white hover:bg-[#054d6121] rounded-full transition-colors"
              >
                {t("menu.store.label")}
                <span className="ml-2 px-2 py-0.5 text-xs bg-[#06546C] text-[#44D3FF] rounded-full">
                  {t("menu.store.new")}
                </span>
              </Link>

              <Link
                href="/deliveries"
                prefetch
                className="px-4 py-2 text-sm text-white hover:bg-[#054d6121] rounded-full transition-colors"
              >
                {t("menu.deliveries", { defaultValue: "Entregas" })}
              </Link>
              
              {/* Navegación de Productos */}
              <Navigation
                isOpen={isDesktopMenuOpen && currentMenu === "products"}
                setIsOpen={() => handleMenuChange("products")}
                label={t("menu.products")}
                buttonClassName="px-4 py-2"
              />

              {/* Navegación de Otros */}
              <Navigation
                isOpen={isDesktopMenuOpen && currentMenu === "others"}
                setIsOpen={() => handleMenuChange("others")}
                label={t("menu.others")}
                buttonClassName="px-4 py-2"
              />

              {/* Nosotros */}
              <Navigation
                isOpen={isDesktopMenuOpen && currentMenu == "us"}
                setIsOpen={() => handleMenuChange("us")}
                label={t("menu.us")}
                buttonClassName="px-4 py-2"
              />
               

              {/* Ingresar */}
              <Link
                href="/login"
                prefetch
                className="px-4 ml-14 py-2 text-sm text-[#1C1B1F] bg-[#E3F8FF] hover:bg-gray-100 rounded-xl transition-colors flex items-center gap-2"
              >
                <WorldIcon color="#1C1B1F" />
                {t("menu.login")}
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Mega Menu */}
      <AnimatePresence>
        {isDesktopMenuOpen && (
          <MegaMenu
            categories={currentCategories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            closeMegaMenu={closeMegaMenu}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
