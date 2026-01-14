"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircleArrowDown, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import EncryptedLogoMobile from "./EncrytedLogoMovbile";
import LanguageDropdown from "./LanguageSelector";
import { useTranslations } from "next-intl";

export default function MobileMenu() {
  const t = useTranslations("menuMobile");

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Menú plano sin submenús según el diseño
  const menuItems = [
    { title: t("store.label"), link: "/", badge: t("store.new") },
    { title: t("offers"), link: "/offers" },
    { title: t("deliveries.label"), link: "/deliveries" },
    { title: t("distributors"), link: "/distributors" },
    { title: t("blogs"), link: "/blog" },
    { title: t("securityTest"), link: "/encrypted-test" },
    { title: t("aboutUs"), link: "/about-us" },
    { title: t("ambassadors"), link: "/ambassadors" },
    { title: t("locations"), link: "/where-to-find-us" },
  ];

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLinkClick = (link: string) => {
    setIsOpen(false);
    router.push(link);
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    handleRouteChange();
    return () => {};
  }, [router]);

  // Bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <div className="sticky top-0 z-50 bg-[#151515] border-b border-[#1A1A1A]">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-2">
            <EncryptedLogoMobile />
            <LanguageDropdown />
          </div>

          <button
            onClick={toggleMenu}
            className="text-white"
            aria-label={isOpen ? t("closeMenu") : t("openMenu")}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Contenido del menú móvil */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            className="fixed inset-0 bg-[#0A0A0A] overflow-y-auto z-50"
          >
            <div className="flex flex-col min-h-full">
              {/* Header del menú */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-[#222222]">
                <div className="flex items-center space-x-2">
                  <EncryptedLogoMobile />
                  <LanguageDropdown />
                </div>
                <button
                  onClick={toggleMenu}
                  className="text-white"
                  aria-label={t("closeMenu")}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Lista de menú */}
              <div className="flex-1 overflow-y-auto p-6">
                <nav className="divide-y divide-[#222222]">
                  {menuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleLinkClick(item.link)}
                      className="flex items-center gap-3 w-full px-4 py-3 text-left text-white/80 hover:text-white transition-colors"
                    >
                      <span className="text-xl font-extralight">
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className="px-2 py-0.5 text-xs text-[#44D3FF] bg-[#06546C] rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Banner de descarga de app */}
              <div className="bg-[#0A0A0A] p-4">
                <div 
                  className="rounded-xl overflow-hidden relative"
                  style={{ background: 'linear-gradient(180deg, #111111 43.75%, #2A2A2A 100%)' }}
                >
                  {/* Layout para móvil */}
                  <div className="sm:hidden p-4 pb-0">
                    <div className="flex items-start gap-4">
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2 mb-3">
                          <CircleArrowDown className="w-8 h-8 text-[#35CDFB]" />
                        </div>
                        <h3 className="text-white text-lg font-semibold mb-1">
                          {t("downloadApp.title")}
                        </h3>
                        <p className="text-white/60 text-sm">
                          {t("downloadApp.description")}
                        </p>
                      </div>
                      <div className="flex-shrink-0 self-end">
                        <Image
                          src="/images/footer/image-movil.webp"
                          alt="App Encriptados"
                          width={120}
                          height={180}
                          className="h-auto w-[100px] object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Layout para tablet/iPad */}
                  <div className="hidden sm:flex items-center p-6">
                    {/* Contenido izquierdo */}
                    <div className="flex-1">
                      <div className="flex flex-col gap-3 mb-4">
                        <CircleArrowDown className="w-10 h-10 text-[#35CDFB]" />
                        <div>
                          <h3 className="text-white text-xl font-semibold mb-1">
                            {t("downloadApp.title")}
                          </h3>
                          <p className="text-white/60 text-sm">
                            {t("downloadApp.description")}
                          </p>
                        </div>
                      </div>
                      
                      {/* Botones de descarga - solo tablet */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <a
                            href="https://apps.apple.com/app/encriptados"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-opacity hover:opacity-80"
                          >
                            <Image
                              src="/images/footer/app-store.svg"
                              alt="App Store"
                              width={120}
                              height={40}
                              className="h-10 w-auto"
                            />
                          </a>
                          <a
                            href="https://play.google.com/store/apps/details?id=com.encriptados"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-opacity hover:opacity-80"
                          >
                            <Image
                              src="/images/footer/google-play.svg"
                              alt="Google Play"
                              width={120}
                              height={40}
                              className="h-10 w-auto"
                            />
                          </a>
                        </div>
                        <a
                          href="https://encriptados.io/apk"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-opacity hover:opacity-80"
                        >
                          <Image
                            src="/images/footer/apk.svg"
                            alt="Descargar APK"
                            width={120}
                            height={40}
                            className="h-10 w-auto"
                          />
                        </a>
                      </div>
                    </div>

                    {/* Imagen del móvil - tablet (40% del contenedor) */}
                    <div className="w-[40%] self-end -mb-6 flex justify-end">
                      <Image
                        src="/images/footer/image-movil.webp"
                        alt="App Encriptados"
                        width={280}
                        height={420}
                        className="h-auto max-w-full object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Botones de descarga - solo móvil */}
                <div className="flex items-center gap-2 mt-4 sm:hidden">
                  <a
                    href="https://apps.apple.com/app/encriptados"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-80"
                  >
                    <Image
                      src="/images/footer/app-store.svg"
                      alt="App Store"
                      width={110}
                      height={36}
                      className="h-9 w-auto"
                    />
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.encriptados"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-80"
                  >
                    <Image
                      src="/images/footer/google-play.svg"
                      alt="Google Play"
                      width={110}
                      height={36}
                      className="h-9 w-auto"
                    />
                  </a>
                  <a
                    href="https://encriptados.io/apk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-80"
                  >
                    <Image
                      src="/images/footer/apk.svg"
                      alt="Descargar APK"
                      width={110}
                      height={36}
                      className="h-9 w-auto"
                    />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
