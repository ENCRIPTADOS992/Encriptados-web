import { ChevronRight } from "lucide-react";

type MenuItem = {
  title: string;
  link: string;
  description?: string;
};

type Category = {
  title: string;
  description: string;
  items: MenuItem[];
};

type Props = {
  categories: Category[];
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  label?: string;
  className?: string;
  buttonClassName?: string;
};

export default function Others({
  categories,
  isOpen,
  setIsOpen,
  label = "Otros",
  className = "",
  buttonClassName = "",
}: Props) {
  return (
    <nav className={`relative flex items-center ${className}`}>
      {/* Botón para abrir/cerrar el menú */}
      <button
        className={`menu-button flex items-center gap-2 ${buttonClassName}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label} <ChevronRight className={`transform ${isOpen ? "rotate-90" : ""}`} />
      </button>

      {/* Contenido del menú */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-[#1A1A1A] text-white rounded-lg shadow-lg z-50">
          {categories.map((category, index) => (
            <div key={index} className="p-4 border-b border-gray-700 last:border-none">
              <h3 className="text-lg font-semibold">{category.title}</h3>
              <p className="text-sm text-gray-400 mb-2">{category.description}</p>
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a
                      href={item.link}
                      className="text-sm text-[#44D3FF] hover:text-white transition-colors"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
