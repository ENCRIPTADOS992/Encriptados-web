"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { getProductLink, getSimProductUrl, isActivarAppsProduct } from "@/shared/utils/productRouteResolver";
import { buildWpV3Url } from "@/shared/constants/backend";
import {
  getProductCategoryApiParam,
  PRODUCT_CATEGORY_IDS,
  isRouterCategoryId,
  isSimCategoryId,
} from "@/shared/constants/productCategories";

interface Product {
  id: number;
  name: string;
  price: number | string;
  images: { src: string }[];
  category: { id: number; name: string };
  slug?: string;
  provider?: string;
  type_product?: string;
  iconUrl?: string;
}

interface ProductSearchProps {
  placeholder?: string;
}

const fetchProductsByCategory = async (
  categoryId: number,
  lang: string
): Promise<Product[]> => {
  try {
    const categoryParam = getProductCategoryApiParam(categoryId);
    const response = await fetch(
      buildWpV3Url("/store/products", {
        category_id: categoryParam,
        lang,
      })
    );
    if (!response.ok) return [];
    const data = await response.json();
    return data.products || [];
  } catch {
    return [];
  }
};

const normalizeText = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const getProductRoute = (product: Product): string => {
  const categoryId = product.category.id;

  if (isActivarAppsProduct(product.name, categoryId, product.id)) {
    return "/activar-apps";
  }

  if (isSimCategoryId(categoryId)) {
    return getSimProductUrl(product.provider, product.type_product);
  }

  if (isRouterCategoryId(categoryId)) {
    return "/router";
  }

  const link = getProductLink(
    product.name,
    categoryId,
    product.id,
    product.provider,
    product.type_product
  );

  if (link) {
    return link;
  }

  const slug = product.slug || product.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  return `/apps/${slug}`;
};

export default function ProductSearch({
  placeholder = "Buscar producto",
}: ProductSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const locale = useLocale();

  const { data: appsProducts = [] } = useQuery({
    queryKey: ["search-products", PRODUCT_CATEGORY_IDS.APPS, locale],
    queryFn: () => fetchProductsByCategory(PRODUCT_CATEGORY_IDS.APPS, locale),
    staleTime: 5 * 60 * 1000,
  });

  const { data: systemsProducts = [] } = useQuery({
    queryKey: ["search-products", PRODUCT_CATEGORY_IDS.SOFTWARE, locale],
    queryFn: () => fetchProductsByCategory(PRODUCT_CATEGORY_IDS.SOFTWARE, locale),
    staleTime: 5 * 60 * 1000,
  });

  const { data: routerProducts = [] } = useQuery({
    queryKey: ["search-products", PRODUCT_CATEGORY_IDS.ROUTERS, locale],
    queryFn: () => fetchProductsByCategory(PRODUCT_CATEGORY_IDS.ROUTERS, locale),
    staleTime: 5 * 60 * 1000,
  });

  const { data: simProducts = [] } = useQuery({
    queryKey: ["search-products", PRODUCT_CATEGORY_IDS.SIMS, locale],
    queryFn: () => fetchProductsByCategory(PRODUCT_CATEGORY_IDS.SIMS, locale),
    staleTime: 5 * 60 * 1000,
  });

  const allProducts = useMemo(() => {
    const combined = [
      ...appsProducts,
      ...systemsProducts,
      ...routerProducts,
      ...simProducts,
    ];
    const uniqueMap = new Map<number, Product>();
    combined.forEach((p) => {
      if (!uniqueMap.has(p.id)) {
        uniqueMap.set(p.id, p);
      }
    });
    return Array.from(uniqueMap.values());
  }, [appsProducts, systemsProducts, routerProducts, simProducts]);

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const normalizedQuery = normalizeText(query);
    return allProducts
      .filter((product) => normalizeText(product.name).includes(normalizedQuery))
      .slice(0, 8);
  }, [query, allProducts]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredProducts.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredProducts.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredProducts.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && filteredProducts[selectedIndex]) {
          navigateToProduct(filteredProducts[selectedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setQuery("");
        break;
    }
  };

  const navigateToProduct = (product: Product) => {
    const route = getProductRoute(product);
    router.push(`/${locale}${route}`);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-[220px]">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => query.trim() && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label={placeholder}
          className="w-full pl-9 pr-3 py-1.5 bg-[#2A2A2A] border border-[#3A3A3A] rounded-full text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#44D3FF] transition-colors"
        />
      </div>

      <AnimatePresence>
        {isOpen && filteredProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-[#1E1E1E] border border-[#3A3A3A] rounded-lg shadow-xl overflow-hidden z-50"
          >
            {filteredProducts.map((product, index) => {
              const imageSrc = product.iconUrl || product.images?.[0]?.src;
              return (
              <button
                key={product.id}
                onClick={() => navigateToProduct(product)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  index === selectedIndex
                    ? "bg-[#2A2A2A]"
                    : "hover:bg-[#2A2A2A]"
                }`}
              >
                {imageSrc && (
                  <div className="relative w-10 h-10 flex-shrink-0">
                    <Image
                      src={imageSrc}
                      alt={product.name}
                      fill
                      className="object-contain rounded"
                      sizes="40px"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{product.name}</p>
                  <p className="text-xs text-gray-400">
                    {product.category.name}
                  </p>
                </div>
                <span className="text-sm text-[#44D3FF] font-medium">
                  ${typeof product.price === "number" ? product.price : product.price}
                </span>
              </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && query.trim() && filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-[#1E1E1E] border border-[#3A3A3A] rounded-lg shadow-xl p-4 z-50"
          >
            <p className="text-sm text-gray-400 text-center">
              No se encontraron productos
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
