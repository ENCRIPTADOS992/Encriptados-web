"use client";
import { Menu } from "lucide-react";
import Button from "@/shared/components/Button";
import EncryptedLogoSvg from "@/shared/svgs/EncryptedLogoSvg";
import ProfileSvg from "@/shared/svgs/ProfileSvg";
import { useEffect, useRef } from "react";

import SupportChat from "@/shared/components/SupportChat";
import { useTranslations } from "next-intl";
import useMenuStore from "@/store/useMenuStore";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const DashboardHeader = () => {
  const { toggleMenu, closeMenu, isMenuOpen } = useMenuStore();

  const router = useRouter();

  const menuRef = useRef<HTMLDivElement>(null);

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
  }, [isMenuOpen]);

  const t = useTranslations("DashboardPage");

  return (
    <header className="w-full bg-[#0D0D0D] p-4 flex justify-between items-center">
      <button
        className="md:hidden p-2  rounded hover:bg-gray-800"
        onClick={toggleMenu}
      >
        <Menu color={"white"} size={25} />
      </button>

      <div className="hidden md:block w-64 md:w-64 ">
        <EncryptedLogoSvg width={250} />
      </div>

      <div className="flex gap-x-2">
        <div className="hidden md:block">
          <SupportChat />
        </div>
        <Button iconPosition="right" icon={<ProfileSvg />} intent="profile">
          {t("menuDashboard.header.myAccount")}
        </Button>
        <Button
          onClick={() => {
            Cookies.remove("authToken");
            router.push("/login");
          }}
          intent="dangerMetal"
          customStyles="bg-[#2D0505] text-[#FF6C6C] font-light"
        >
          {t("menuDashboard.header.logOut")}
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
