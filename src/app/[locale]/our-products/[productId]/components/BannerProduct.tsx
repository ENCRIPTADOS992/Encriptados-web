import Image from "next/image";
import { useProductById } from "../context/ProductByIdContext";

export default function BannerProduct() {
  const { currentProduct } = useProductById();

  // Solo heroBanners para el HERO BANNER
  const heroBanners = (currentProduct as any)?.heroBanners;

  const desktopSrc = heroBanners?.desktop || "";
  const mobileSrc = heroBanners?.mobile || desktopSrc;
  // Si tablet está vacío, usar mobile como fallback
  const tabletSrc = heroBanners?.tablet || mobileSrc;

  // NO mostrar si no hay ninguna imagen disponible
  if (!desktopSrc && !mobileSrc) {
    return null;
  }

  return (
    <div className="w-full" style={{ position: 'relative' }}>
      {/* Mobile */}
      {mobileSrc && (
        <Image
          src={mobileSrc}
          alt={`${currentProduct?.name || 'Product'} Banner Mobile`}
          width={1200}
          height={400}
          sizes="100vw"
          className="block md:hidden w-full h-auto"
          style={{ width: '100%', height: 'auto', display: 'block' }}
          quality={100}
          priority
        />
      )}

      {/* Desktop */}
      {desktopSrc && (
        <Image
          src={desktopSrc}
          alt={`${currentProduct?.name || 'Product'} Banner Desktop`}
          width={1920}
          height={600}
          quality={100}
          sizes="100vw"
          className="hidden md:block w-full h-auto"
          style={{ width: '100%', height: 'auto', display: 'block' }}
          priority
        />
      )}
    </div>
  );
}
