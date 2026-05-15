import EncryptedLogoSvg from "@/shared/svgs/EncryptedLogoSvg";
import { localizeInternalHref } from "@/shared/utils/localizedNavigation";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function EncryptedLogo() {
  const locale = useLocale();

  return (
    <Link href={localizeInternalHref("/", locale)} className="hidden md:block self-center scale-125" prefetch>
      {/* No necesitas <a> ya que Link envuelve el contenido y maneja la navegación */}
      <EncryptedLogoSvg width={200} />
    </Link>
  );
}