"use client";

import {
  BarChart3,
  Activity,
  ShoppingBag,
  Tag,
  Monitor,
  Settings,
} from "lucide-react";
import ProfileSvg from "@/shared/svgs/ProfileSvg";
import { ReactNode, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import useMenuStore from "@/store/useMenuStore";
import SupportChat from "@/shared/components/SupportChat";

interface MenuItem {
  icon: ReactNode;
  label: string;
  link: { [key: string]: string };
  badge?: string;
}

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const language = useLocale();
  const { isMenuOpen, toggleMenu, closeMenu } = useMenuStore();
  const menuRef = useRef<HTMLDivElement>(null);
  const pathName = usePathname();
  const pathFormat = pathName.replace(/^\/[a-z]{2}/, "");
  const t = useTranslations("DashboardPage");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, closeMenu]);

  const menuItems: MenuItem[] = [
    {
      icon: <BarChart3 size={24} />,
      label: t("menuDashboard.items.mySimConsume"),
      link: {
        es: "/dashboard/uso-datos",
        en: "/dashboard/data-usage",
        fr: "/dashboard/utilisation-des-donnees",
        it: "/dashboard/uso-dei-datis",
        pt: "/dashboard/uso-de-dados",
      },
    },
    {
      icon: <Activity size={24} />,
      label: t("menuDashboard.items.myActivities"),
      link: {
        es: "/dashboard/mi-actividad",
        en: "/dashboard/my-activity",
        fr: "/dashboard/mon-activite",
        it: "/dashboard/la-mia-attivita",
        pt: "/dashboard/minha-atividade",
      },
    },
    {
      icon: <ShoppingBag size={24} />,
      label: t("menuDashboard.items.store"),
      link: {
        es: "/dashboard/tienda",
        en: "/dashboard/store",
        fr: "/dashboard/boutique",
        it: "/dashboard/negozio",
        pt: "/dashboard/loja",
      },
      badge: "NUEVO",
    },
    {
      icon: <Tag size={24} />,
      label: t("menuDashboard.items.myPurchases"),
      link: {
        es: "/dashboard/mis-compras",
        en: "/dashboard/my-purchases",
        fr: "/dashboard/mes-achats",
        it: "/dashboard/i-miei-acquisti",
        pt: "/dashboard/minhas-compras",
      },
    },
    {
      icon: <Monitor size={24} />,
      label: t("menuDashboard.items.accountAdmin"),
      link: {
        en: "/dashboard/admin-account",
        es: "/dashboard/cuenta-admin",
        fr: "/dashboard/compte-admin",
        it: "/dashboard/account-admin",
        pt: "/dashboard/conta-admin",
      },
    },
    {
      icon: <Settings size={24} />,
      label: t("menuDashboard.items.userConfig"),
      link: {
        en: "/dashboard/config-account",
        es: "/dashboard/configuracion-cuenta",
        fr: "/dashboard/configuration-compte",
        it: "/dashboard/configurazione-account",
        pt: "/dashboard/configuracao-conta",
      },
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#1C1C1C] text-white">
      <div className="flex flex-grow relative">
        {/* Sidebar */}
        <aside
          ref={menuRef}
          className={`fixed inset-0 bg-[#1C1C1C] transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:w-80 md:translate-x-0 z-50`}
        >
          {/* Account header */}
          <div className="pl-14 pr-8 py-10">
            <div className="flex items-center gap-3">
              <div className="bg-[#BCEFFF] rounded-full p-2">
                <ProfileSvg width={24} height={24} color="#0F587E" />
              </div>
              <div>
                <p className="text-xs text-gray-400">
                  CUENTA DE TIEMPO ILIMITADO
                </p>
                <p className="text-sm font-medium">4291 - 4118 - **** - ****</p>
              </div>
            </div>
            <hr className="border-[#373737] mt-8" />
          </div>

          {/* Navigation menu */}
          <nav className="py-4">
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.link[language]}
                    onClick={() => closeMenu()}
                    className={`flex items-center px-14 py-5 hover:bg-[#353535] ${
                      pathFormat === item.link[language]
                        ? "bg-[#353535] [&>span]:text-[#ffffff] [&_svg]:text-[#16C9FF]"
                        : "[&>span:first-child]:text-gray-400"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className="text-sm flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="text-xs bg-[#044052] text-[#BCEFFF] px-2 py-1  rounded-full font-light tracking-wide">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support button */}
          <div className="absolute bottom-8 left-0 right-0 px-14 block md:hidden">
            <SupportChat />
          </div>
        </aside>

        {/* Mobile menu trigger */}
        <button
          className="fixed bottom-4 right-4 z-40 md:hidden bg-[#1A1A1A] p-3 rounded-full shadow-lg"
          onClick={toggleMenu}
        >
          <Menu />
        </button>

        {/* Main content */}
        <main className="flex-grow bg-[#EEF5F9] relative">
          <div className="p-4 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

// Menu icon component
function Menu(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
