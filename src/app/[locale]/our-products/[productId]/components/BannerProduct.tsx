import Image from "next/image";
import { useProductById } from "../context/ProductByIdContext";

export default function BannerProduct() {
  const { currentProduct } = useProductById();

  // Solo heroBanners para el HERO BANNER
  const heroBanners = (currentProduct as any)?.heroBanners;

  const desktopSrc = heroBanners?.desktop || "";
  const tabletSrc = heroBanners?.tablet || desktopSrc;
  const mobileSrc = heroBanners?.mobile || tabletSrc;

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
