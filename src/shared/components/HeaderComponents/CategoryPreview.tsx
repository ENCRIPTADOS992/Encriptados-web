import Link from "next/link";

type MenuItem = {
  title: string;
  link: string;
  description?: string;
};

type Props = {
  items: MenuItem[];
  setHoveredItem: (item: MenuItem) => void;
  categoryLink?: string;
  closeMegaMenu?: () => void;
  categoryTitle?: string;
};

export default function CategoryPreview({
  items,
  setHoveredItem,
  closeMegaMenu,
  categoryTitle,
}: Props) {
  const isExternal = (href: string) => /^https?:\/\//i.test(href);
  
  return (
    <div className="w-[150px] xl:w-[180px] flex-shrink-0">
      {/* Encabezado de la categoría */}
      <p className="text-[12px] font-normal text-[#757575] mb-4 leading-none whitespace-nowrap">{categoryTitle || "Categorías"}</p>
      
      <div className="space-y-3">
        {items.map((item, index) => {
          const ItemContent = (
            <p className="text-[#757575] text-[16px] font-bold hover:text-white transition-colors py-1 leading-none whitespace-nowrap">
              {item.title}
            </p>
          );

          return item.link ? (
            isExternal(item.link) ? (
              <a
                key={index}
                href={item.link}
                className="block"
                onMouseEnter={() => setHoveredItem(item)}
                onClick={() => closeMegaMenu && closeMegaMenu()}
              >
                {ItemContent}
              </a>
            ) : (
              <Link
                key={index}
                href={item.link}
                className="block"
                onMouseEnter={() => setHoveredItem(item)}
                onClick={() => closeMegaMenu && closeMegaMenu()}
              >
                {ItemContent}
              </Link>
            )
          ) : (
            <div key={index} className="block text-gray-600 text-sm py-1">
              {item.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}
