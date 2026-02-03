import { motion } from "framer-motion";
import CategoryPreview from "./CategoryPreview";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { AnimatePresence } from "framer-motion";

type MenuItem = {
  title: string;
  link: string;
  image?: string;
  description?: string;
};

type Category = {
  title: string;
  description?: string;
  link: string;
  image?: string;
  items: MenuItem[];
};

type Props = {
  categories: Category[];
  isOpen?: boolean;
  activeCategory: number;
  setActiveCategory: (index: number) => void;
  hoveredItem: MenuItem | null;
  setHoveredItem: (item: MenuItem) => void;
  closeMegaMenu: () => void;
};

export default function MegaMenu({
  categories,
  activeCategory,
  setActiveCategory,
  hoveredItem,
  setHoveredItem,
  closeMegaMenu,
}: Props) {
  const t = useTranslations("megaMenu");
  const isExternal = (href: string) => /^https?:\/\//i.test(href);

  const activeCategoryData = categories[activeCategory] || {};
  const activeItems = activeCategoryData.items || [];
  const activeCategoryLink = activeCategoryData.link;
  const activeCategoryImage = activeCategoryData.image || "/placeholder.svg";

  // Determinar el título de la tercera columna según la categoría
  const getSubcategoryTitle = (categoryTitle: string) => {
    const title = categoryTitle?.toLowerCase() || "";
    if (title.includes("sim")) return "Categorías";
    if (title.includes("software") || title.includes("sistema")) return "Sistemas";
    if (title.includes("router")) return "Productos";
    return categoryTitle;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="absolute right-80 z-20 mt-2"
        style={{
          background: "#0E0E0EB2",
          backdropFilter: "blur(34px)",
          borderRadius: "1.25rem",
        }}
        onMouseLeave={closeMegaMenu}
      >
        <div className="px-8 py-8">
          <div className="flex gap-8">
            {/* Columna izquierda: Imagen de preview */}
            <div className="w-[380px] flex-shrink-0">
              <div className="rounded-xl overflow-hidden">
                <Image
                  src={
                    hoveredItem?.image ||
                    activeCategoryImage ||
                    "/placeholder.svg"
                  }
                  alt={
                    hoveredItem?.title ||
                    activeCategoryData.title ||
                    t("preview")
                  }
                  width={380}
                  height={260}
                  className="w-full h-[240px] object-cover rounded-xl"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-white text-[20px] font-normal leading-none">
                  {hoveredItem?.description ||
                    hoveredItem?.title ||
                    activeCategoryData.description ||
                    t("preview")}
                </h3>
                <Link
                  prefetch={true}
                  href={hoveredItem?.link || activeCategoryLink || "#"}
                  className="inline-flex items-center text-[16px] font-normal text-[#757575] hover:text-white mt-3 transition-colors leading-none"
                  onClick={closeMegaMenu}
                >
                  {t("seeMore")}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>

            {/* Columna central: Lista de categorías */}
            <div className="w-[280px] flex-shrink-0 space-y-1">
              {categories.map((category, index) => {
                const isActive = activeCategory === index;
                const CategoryContent = (
                  <div
                    className={`block px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#171717]"
                        : "hover:bg-[#171717]"
                    }`}
                    onMouseEnter={() => {
                      setActiveCategory(index);
                      setHoveredItem({
                        title: "",
                        link: "",
                        description: "",
                        image: "",
                      });
                    }}
                  >
                    <h3 className={`text-[18px] font-semibold leading-none flex items-center gap-2 ${
                      isActive ? "text-white" : "text-[#757575]"
                    }`}>
                      {category.title}
                      {isActive && <ArrowRight className="w-4 h-4" />}
                    </h3>
                    <p className={`text-[12px] font-normal mt-2 leading-none ${
                      isActive ? "text-[#757575]" : "text-[#757575]"
                    }`}>
                      {category.description}
                    </p>
                  </div>
                );

                return isExternal(category.link) ? (
                  <a
                    href={category.link}
                    key={index}
                    onClick={closeMegaMenu}
                  >
                    {CategoryContent}
                  </a>
                ) : (
                  <Link
                    prefetch={true}
                    href={category.link}
                    key={index}
                    onClick={closeMegaMenu}
                  >
                    {CategoryContent}
                  </Link>
                );
              })}
            </div>

            {/* Columna derecha: Subcategorías (solo si hay items) */}
            {activeItems.length > 0 && (
              <CategoryPreview
                items={activeItems}
                setHoveredItem={setHoveredItem}
                categoryLink={activeCategoryLink}
                closeMegaMenu={closeMegaMenu}
                categoryTitle={getSubcategoryTitle(activeCategoryData.title)}
              />
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
