import Link from "next/link";

type MenuItem = {
  title: string;
  link: string; // Enlace a la sección o página
  description?: string;
};

type Props = {
  items: MenuItem[]; // Lista de elementos de la categoría
  setHoveredItem: (item: MenuItem) => void; // Actualiza el elemento seleccionado para la previsualización
  categoryLink?: string; // Enlace a la categoría principal (opcional)
  closeMegaMenu?: () => void; // Nueva función para cerrar el MegaMenu
};

export default function CategoryPreview({
  items,
  setHoveredItem,
  closeMegaMenu, // Recibe la función para cerrar el menú
}: Props) {
  return (
    <div className="col-span-3">
      <div className="space-y-4">
        {/* Renderiza todos los elementos de la categoría */}
        {items.map((item, index) =>
          item.link ? (
            <Link
              passHref={true}
              key={index}
              href={item.link} // Usa el enlace definido en `item.link`
              className="block text-gray-300 hover:text-white transition-colors"
              onMouseEnter={() => setHoveredItem(item)} // Actualiza el estado del elemento seleccionado
              onClick={() => closeMegaMenu && closeMegaMenu()} // Cierra el menú si `closeMegaMenu` está definido
            >
              <div>
                <p className="font-medium">{item.title}</p>
              </div>
            </Link>
          ) : (
            <div key={index} className="block text-gray-500">
              {item.title} (Enlace no disponible)
            </div>
          )
        )}
      </div>
    </div>
  );
}
