import EncryptedLogoSvg from "@/shared/svgs/EncryptedLogoSvg";
import Link from "next/link";

export default function EncryptedLogo() {
  return (
    <Link href="/" className="hidden md:block self-center scale-125" prefetch>
      {/* No necesitas <a> ya que Link envuelve el contenido y maneja la navegación */}
      <EncryptedLogoSvg width={200} />
    </Link>
  );
}