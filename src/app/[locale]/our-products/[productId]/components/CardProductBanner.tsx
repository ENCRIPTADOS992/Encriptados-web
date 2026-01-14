import React from "react";
import Image from "next/image";
import DownloadApkSvg from "@/shared/svgs/DownloadApkSvg";

import { useProductById } from "../context/ProductByIdContext";

/**
 * CardProductBanner - Imagen del producto con botones de descarga opcionales
 * Usa productImage si viene, fallback a images[0].src
 * Muestra botones de App Store / Google Play solo si vienen las URLs
 */
const CardProductBanner = () => {
  const { currentProduct } = useProductById();

  // Obtener campos con fallbacks
  const productImage = (currentProduct as any)?.productImage;
  const iconUrl = (currentProduct as any)?.iconUrl;
  const appStoreUrl = (currentProduct as any)?.appStoreUrl;
  const googlePlayUrl = (currentProduct as any)?.googlePlayUrl;
  const apkUrl = (currentProduct as any)?.apkUrl;
  
  // Prioridad: productImage > images[0].src
  const imageUrl = productImage || currentProduct?.images?.[0]?.src;

  // NO mostrar nada si no hay imagen
  if (!imageUrl) {
    return null;
  }

  return (
    <div className="flex-col flex items-center justify-center h-full">
      <div className="w-full h-full flex flex-col items-center bg-[#222222] rounded-3xl relative">
        {/* Logo/Icon badge (opcional) */}
        {iconUrl && (
          <div className="absolute top-4 right-4 z-10">
            <Image
              src={iconUrl}
              alt={`${currentProduct?.name || 'Product'} Logo`}
              width={40}
              height={40}
              className="rounded-lg"
            />
          </div>
        )}
        
        <div className="w-full rounded-3xl flex justify-center items-center mb-4">
          <Image
            src={imageUrl}
            alt={currentProduct?.name || "Product Banner"}
            width={200}
            height={200}
            className="-translate-y-7 object-cover"
            priority
          />
        </div>
      </div>
      
      {/* Botones de descarga (solo si vienen las URLs) */}
      {(appStoreUrl || googlePlayUrl || apkUrl) && (
        <div className="flex justify-center gap-4 mt-4">
          {appStoreUrl && (
            <a 
              href={appStoreUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
            >
              <Image
                src="/images/apps/app-store-badge.png"
                alt="Download on App Store"
                width={120}
                height={40}
              />
            </a>
          )}
          {googlePlayUrl && (
            <a 
              href={googlePlayUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
            >
              <Image
                src="/images/apps/google-play-badge.png"
                alt="Get it on Google Play"
                width={120}
                height={40}
              />
            </a>
          )}
          {apkUrl && (
            <a 
              href={apkUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
            >
              <DownloadApkSvg className="w-[120px] h-auto" />
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default CardProductBanner;
