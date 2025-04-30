import MobileMenuSvg  from "@/shared/svgs/MobileMenuSvg";
import Link from "next/link";

export default function EncryptedLogoMobile() {
  return (
    <Link href="/" prefetch>
      {/* No necesitas <a> ya que Link envuelve el contenido y maneja la navegación */}
      <MobileMenuSvg />
    </Link>
  );
}