import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

type Props = {
  variant: "mobile" | "desktop";
  title: string;
  description: string;
  iconSrc?: string;
  href: string;
};

export default function SecurityTestSection({ variant, title, description, iconSrc = "/icons/icono-grande.svg", href }: Props) {
  const isMobile = variant === "mobile";
  const router = useRouter();
  const t = useTranslations("EncryptedTestPage");

  return (
    <section className="relative w-full overflow-hidden">
      <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-[clamp(220px,28vw,420px)] w-[clamp(240px,28vw,380px)] pointer-events-none ${isMobile ? "hidden md:block" : ""}`}>
        <Image src="/images/lateral-izq.png" alt="" fill className="object-contain object-left" />
      </div>

      <div className={`absolute right-0 top-1/2 -translate-y-1/2 h-[clamp(220px,28vw,420px)] w-[clamp(240px,28vw,380px)] pointer-events-none ${isMobile ? "hidden md:block" : ""}`}>
        <Image src="/images/lateral-der.png" alt="" fill className="object-contain object-right" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 py-[clamp(16px,2.5vw,48px)] min-h-[clamp(220px,36vw,500px)] flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(240px,28vw)_1fr_minmax(240px,28vw)] gap-[clamp(16px,2vw,32px)] items-center w-full">
          <div className="flex justify-center overflow-hidden">
            <Image src={iconSrc} alt="Icono de seguridad" width={180} height={180} style={{ height: isMobile ? "clamp(100px,12vw,180px)" : "clamp(120px,12vw,180px)", width: "auto" }} />
          </div>

          <div className={`${isMobile ? "text-center" : "text-center md:text-left"}`}>
            <h2 className="font-bold text-white leading-[1.3] mb-4 md:mb-5 text-[24px] sm:text-[30px] lg:text-[38px]">{title}</h2>
            <p className="text-gray-300 text-base leading-relaxed">{description}</p>
          </div>

          <div className={`flex ${isMobile ? "justify-center" : "justify-center md:justify-end"}`}>
            <button 
              type="button" 
              onClick={() => router.push(href)} 
              className={`flex items-center gap-3 bg-white text-[#0a0a0a] px-6 md:px-8 py-3 md:py-3.5 rounded-full font-medium hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black ${isMobile ? "w-full max-w-xs justify-center" : ""}`}
              aria-label={`${t("initTest")} - ${title}`}
            >
              <span className="text-base">{t("initTest")}</span>
              <Image src="/icons/icono-boton.svg" alt="" width={24} height={24} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
