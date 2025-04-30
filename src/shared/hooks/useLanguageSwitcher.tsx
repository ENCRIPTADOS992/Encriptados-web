"use client";

import { useRouter, usePathname } from "next/navigation";

export type LocaleLanguages = "es" | "en" | "pt" | "it" | "fr";

const useLanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Detecta el idioma actual revisando los prefijos de ruta
  const currentLocale: LocaleLanguages =
    (["es", "en", "pt", "it", "fr"].find((lang) =>
      pathname.startsWith(`/${lang}`)
    ) as LocaleLanguages) || "en";

  const changeLanguage = (locale: LocaleLanguages) => {
    // Reemplaza el idioma actual por el nuevo idioma seleccionado en la ruta
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
  };

  return {
    currentLocale,
    changeLanguage,
  };
};

export default useLanguageSwitcher;
