import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import WorldIcon from "@/shared/svgs/WorldIcon";
import  useLanguageSwitcher  from "@/shared/hooks/useLanguageSwitcher"; // Ajusta el path según tu estructura

type LocaleLanguages = "es" | "en" | "fr" | "it" | "pt"; // Define los idiomas permitidos

export default function LanguageDropdown() {
  const { currentLocale, changeLanguage } = useLanguageSwitcher();
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const languages = [
    { code: "es", name: "Español" },
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "it", name: "Italiano" },
    { code: "pt", name: "Portugues" },
  ]

  return (
    <div className="relative">
      <button
        onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
        className="flex items-center text-sm text-white px-3 py-2 rounded-xl"
        aria-haspopup="true"
        aria-expanded={languageDropdownOpen}
      >
        <WorldIcon height={16} width={16} />
        <span className="ml-2 uppercase">
          {languages.find((lang) => lang.code === currentLocale)?.name.slice(0, 2)}
        </span>
        <ChevronDown className="ml-1" />
      </button>
      <AnimatePresence>
        {languageDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute bg-[#151515] text-sm text-white rounded-xl shadow-md mt-2 z-50 w-32 text-center"
          >
            {languages.map((language) => (
              <div
                key={language.code}
                onClick={() => {
                  if (["es", "en", "fr", "it", "pt"].includes(language.code)) {
                    changeLanguage(language.code as LocaleLanguages); // Aseguramos el tipo
                  }
                  setLanguageDropdownOpen(false);
                }}
                className="px-4 py-2 hover:bg-[#0e0e0e] cursor-pointer rounded-xl"
              >
                {language.name}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

