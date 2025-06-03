import Image from "next/image";
import { useProductById } from "../context/ProductByIdContext";

export default function BannerProduct() {
  const { currentProduct } = useProductById();

  if (!currentProduct || !currentProduct.images?.length) {
    return <div className="w-full h-[150px] md:h-[359px] bg-gray-200" />;
  }

  const mobileSrc = currentProduct.images[0].src;
  const desktopSrc =
    currentProduct.images.length > 1
      ? currentProduct.images[1].src
      : currentProduct.images[0].src;

  return (
    <div className="relative w-full h-[150px]  md:h-[359px] bg-gray-200">
        <Image
          src={mobileSrc}
          alt="Product Banner for Mobile"
          fill
          sizes="100vw"
          className="block md:hidden object-cover"
          quality={100}
        />

        <Image
          src={desktopSrc}
          alt="Product Banner for Desktop"
          fill
          quality={100}
          sizes="100vw"
          className="hidden md:block object-cover"
        />
    </div>
  );
}
