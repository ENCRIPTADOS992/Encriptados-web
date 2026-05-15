import MobileMenuSvg  from "@/shared/svgs/MobileMenuSvg";
import { localizeInternalHref } from "@/shared/utils/localizedNavigation";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function EncryptedLogoMobile() {
  const locale = useLocale();

  return (
    <Link href={localizeInternalHref("/", locale)} prefetch>
      {/* No necesitas <a> ya que Link envuelve el contenido y maneja la navegación */}
      <MobileMenuSvg />
    </Link>
  );
}