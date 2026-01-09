import Image from "next/image";
import { useProductById } from "../context/ProductByIdContext";

export default function BannerProduct() {
  const { currentProduct } = useProductById();

  // Prioridad: heroBanners > buyNowImage > image_full > images[]
  const heroBanners = (currentProduct as any)?.heroBanners;
  const buyNowImage = (currentProduct as any)?.buyNowImage;
  const imageFull = (currentProduct as any)?.image_full;
  const images = currentProduct?.images;

  // Helper para verificar si una URL es válida
  const isValidUrl = (url: string | undefined | null): boolean => {
    return !!url && url.trim().length > 0;
  };

  // Determinar imágenes a usar con prioridad extendida
  const desktopSrc = 
    (isValidUrl(heroBanners?.desktop) && heroBanners.desktop) || 
    (isValidUrl(buyNowImage) && buyNowImage) ||
    imageFull || 
    images?.[1]?.src || 
    images?.[0]?.src;
  
  const tabletSrc = 
    (isValidUrl(heroBanners?.tablet) && heroBanners.tablet) || 
    (isValidUrl(buyNowImage) && buyNowImage) ||
    imageFull || 
    images?.[0]?.src ||
    desktopSrc;
  
  const mobileSrc = 
    (isValidUrl(heroBanners?.mobile) && heroBanners.mobile) || 
    (isValidUrl(buyNowImage) && buyNowImage) ||
    imageFull || 
    images?.[0]?.src ||
    tabletSrc;

  // NO mostrar si no hay ninguna imagen disponible
  if (!desktopSrc && !mobileSrc) {
    return null;
  }

  return (
    <div className="relative w-full h-[150px] md:h-[359px] bg-gray-200">
      {/* Mobile */}
      {mobileSrc && (
        <Image
          src={mobileSrc}
          alt={`${currentProduct?.name || 'Product'} Banner Mobile`}
          fill
          sizes="100vw"
          className="block md:hidden object-cover"
          quality={100}
        />
      )}

      {/* Desktop */}
      {desktopSrc && (
        <Image
          src={desktopSrc}
          alt={`${currentProduct?.name || 'Product'} Banner Desktop`}
          fill
          quality={100}
          sizes="100vw"
          className="hidden md:block object-cover"
        />
      )}
    </div>
  );
}
