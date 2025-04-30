import { ChevronRight } from "lucide-react";

type Props = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  label?: string; // Texto del botón
  className?: string; // Estilos personalizados para el contenedor del nav
  buttonClassName?: string; // Estilos personalizados para el botón
};

export default function Navigation({
  isOpen,
  setIsOpen,
  label = "Productos", // Valor por defecto
  className = "",
  buttonClassName = "",
}: Props) {
  return (
    <nav className={`flex items-center justify-between ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen} // Mejora de accesibilidad
        className={`text-white text-sm hover:text-gray-300 flex items-center ${buttonClassName}`}
      >
        {label}
        <ChevronRight
          className={`w-4 h-4 ml-1 transition-transform ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </button>
    </nav>
  );
}

