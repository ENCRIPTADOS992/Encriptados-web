"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { useGetProducts } from "@/features/products/queries/useGetProducts";
import CardProductItem from "./CardProductItem";
import Typography from "@/shared/components/Typography";
import Paragraph from "@/shared/components/Paragraph";

export interface BannerIcon {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ProductBannerSectionProps {
  /** Path to the background image (relative to /public) */
  backgroundImage: string;
  /**
   * CSS gradient applied as an overlay on top of the background image.
   * Use a left-to-right linear-gradient to keep text legible on the left.
   * Defaults to a dark-left to transparent-right gradient.
   */
  gradient?: string;
  /** Badge label rendered above the title */
  badge?: string;
  /** Tailwind bg-* class for the badge pill. Defaults to cyan. */
  badgeBgClass?: string;
  title: string;
  description: string;
  /** Optional app/service icons rendered below the description */
  icons?: BannerIcon[];
  /** WooCommerce category ID used to fetch products */
  categoryId: number;
  /**
   * Case-insensitive substring used to find the product inside the fetched list.
   * E.g. "silent phone" or "activar".
   */
  productNameFilter: string;
  className?: string;
}

const DEFAULT_GRADIENT =
  "linear-gradient(90deg, rgba(0,0,0,0.88) 38%, rgba(0,0,0,0.08) 100%)";

/**
 * Generic full-width banner with a background image + gradient overlay,
 * left-side text content, and a right-side product card.
 *
 * Usage:
 * ```tsx
 * <ProductBannerSection
 *   backgroundImage="/images/our-products/my-bg.webp"
 *   gradient="linear-gradient(90deg, rgba(0,19,25,0.9) 35%, rgba(0,18,24,0.2) 100%)"
 *   badge="Nuevo lanzamiento"
 *   badgeBgClass="bg-[#10B4E7]"
 *   title="Mi Producto"
 *   description="Descripción del producto."
 *   icons={[{ src: "/images/icons/whatsapp.svg", alt: "WhatsApp" }]}
 *   categoryId={38}
 *   productNameFilter="mi producto"
 * />
 * ```
 */
const ProductBannerSection: React.FC<ProductBannerSectionProps> = ({
  backgroundImage,
  gradient = DEFAULT_GRADIENT,
  badge,
  badgeBgClass = "bg-[#10B4E7]",
  title,
  description,
  icons,
  categoryId,
  productNameFilter,
  className = "",
}) => {
  const { data: allProducts, isLoading } = useGetProducts(categoryId, "all");

  const product = useMemo(() => {
    if (!allProducts) return undefined;
    return allProducts.find((p) =>
      p.name.toLowerCase().includes(productNameFilter.toLowerCase())
    );
  }, [allProducts, productNameFilter]);

  if (isLoading) return null;

  /* ── Shared text block ─────────────────────────────────────────────── */
  const textBlock = (
    <div className="space-y-4 text-center lg:text-left">
      {badge && (
        <span
          className={`inline-block ${badgeBgClass} px-4 py-1 rounded-full text-xs sm:text-sm font-semibold text-white`}
        >
          {badge}
        </span>
      )}

      <Typography variant="h3" as="h2" className="text-2xl md:text-[30px]">
        {title}
      </Typography>

      <Paragraph
        variant="body"
        color="secondary"
        className="text-sm sm:text-base max-w-md mx-auto lg:mx-0"
      >
        {description}
      </Paragraph>

      {icons && icons.length > 0 && (
        <div className="flex justify-center lg:justify-start gap-3 pt-1 flex-wrap">
          {icons.map((icon) => (
            <Image
              key={icon.alt}
              src={icon.src}
              alt={icon.alt}
              width={icon.width ?? 44}
              height={icon.height ?? 44}
              className="rounded-2xl"
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* ── Mobile ──────────────────────────────────────────────────────── */}
      <div
        className={`block sm:hidden relative overflow-hidden w-screen left-1/2 -translate-x-1/2 text-white py-8 rounded-none ${className}`}
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
          />
        </div>
        {/* Gradient overlay — sits above image, below content */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,13,17,0.93) 0%, rgba(0,13,17,0.75) 100%)",
          }}
        />

        <div className="relative z-[2] px-5">{textBlock}</div>

        {product && (
          <div className="relative z-[2] mt-6 px-5">
            <CardProductItem product={product} />
          </div>
        )}
      </div>

      {/* ── Desktop / Tablet ────────────────────────────────────────────── */}
      <div
        className={`hidden sm:block relative overflow-hidden w-full rounded-2xl sm:rounded-3xl text-white ${className}`}
        style={{ minHeight: 220 }}
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Gradient overlay — sits above image, below content */}
        <div
          className="absolute inset-0 z-[1]"
          style={{ background: gradient }}
        />

        {/* Content row */}
        <div className="relative z-[2] flex flex-col lg:flex-row items-center lg:justify-between gap-6 px-6 sm:px-10 md:px-14 lg:px-16 py-8 sm:py-10">
          {/* Left: text */}
          <div className="w-full lg:w-1/2">{textBlock}</div>

          {/* Right: product card */}
          {product && (
            <div className="flex-shrink-0 w-[305px] flex justify-center lg:justify-end pr-0 lg:pr-10">
              <CardProductItem product={product} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductBannerSection;
