import { PRODUCT_CATEGORY_IDS } from "@/shared/constants/productCategories";

export type AllowedMode = "new_user" | "roning_code" | "recharge";

export interface ProductRouteItem {
  name: string;
  link: string;
  categoryId: number;
  displayNames?: string[];
  uiPolicy?: {
    showTabs?: boolean;
    allowedModes?: AllowedMode[];
  };
}

export interface SimProductRouteItem {
  name: string;
  link: string;
  categoryId: number;
  productId: number;
}

export const SIM_PRODUCT_ROUTES: SimProductRouteItem[] = [
  { name: "SIM Encriptada", link: "/sim/sim-encriptada", categoryId: PRODUCT_CATEGORY_IDS.SIMS, productId: 508 },
  { name: "eSIM Encriptada", link: "/sim/esim-encriptada", categoryId: PRODUCT_CATEGORY_IDS.SIMS, productId: 449 },
  { name: "SIM TIM", link: "/sim/tim-sim", categoryId: PRODUCT_CATEGORY_IDS.SIMS, productId: 448 },
  { name: "eSIM TIM", link: "/sim/esim-tim", categoryId: PRODUCT_CATEGORY_IDS.SIMS, productId: 454 },
];

export const PRODUCT_ROUTES: ProductRouteItem[] = [
  { name: "Galaxia MDM Iphone", link: "/apps/galaxia-mdm", categoryId: PRODUCT_CATEGORY_IDS.SOFTWARE },
  { name: "Secure MDM iPhone", link: "/apps/secure-mdm-iphone", categoryId: PRODUCT_CATEGORY_IDS.SOFTWARE },
  { name: "Secure MDM Android", link: "/apps/secure-mdm-android", categoryId: PRODUCT_CATEGORY_IDS.SOFTWARE },
  { name: "Cryptcom", link: "/apps/cryptcom", categoryId: PRODUCT_CATEGORY_IDS.SOFTWARE },
  { name: "Renati", link: "/apps/renati", categoryId: PRODUCT_CATEGORY_IDS.SOFTWARE },
  { name: "ChatMail", link: "/apps/chat-mail", categoryId: PRODUCT_CATEGORY_IDS.SOFTWARE },
  { name: "SecureCrypt", link: "/apps/securecrypt", categoryId: PRODUCT_CATEGORY_IDS.SOFTWARE },
  { name: "Armadillo", link: "/apps/armadillo-v2", categoryId: PRODUCT_CATEGORY_IDS.SOFTWARE },
  { name: "VaultChat", link: "/apps/vault-chat-v2", categoryId: PRODUCT_CATEGORY_IDS.SOFTWARE },
  { name: "Ultra X", link: "/apps/ultrax", categoryId: PRODUCT_CATEGORY_IDS.SOFTWARE },
  { name: "Intact Phone", link: "/apps/intact-phone", categoryId: PRODUCT_CATEGORY_IDS.SOFTWARE },
  { name: "DEC Secure", link: "/apps/dec-secure", categoryId: PRODUCT_CATEGORY_IDS.SOFTWARE },
  {
    name: "Silent Phone",
    link: "/apps/silent-circle",
    categoryId: PRODUCT_CATEGORY_IDS.APPS,
    uiPolicy: {
      showTabs: true,
      allowedModes: ["new_user", "roning_code", "recharge"],
    },
  },
  { name: "Armadillo Chat", link: "/apps/armadillo-chat", categoryId: PRODUCT_CATEGORY_IDS.APPS },
  { name: "Threema Work", link: "/apps/threema-work", categoryId: PRODUCT_CATEGORY_IDS.APPS },
  { name: "Threema", link: "/apps/threema", categoryId: PRODUCT_CATEGORY_IDS.APPS },
  { name: "Nord VPN", link: "/apps/nord-vpn", categoryId: PRODUCT_CATEGORY_IDS.APPS },
  { name: "VaultChat", link: "/apps/vault-chat", categoryId: PRODUCT_CATEGORY_IDS.APPS },
  { name: "Salt App", link: "/apps/salt", categoryId: PRODUCT_CATEGORY_IDS.APPS },
  { name: "VNC Lagoon", link: "/apps/vnc-lagoon", categoryId: PRODUCT_CATEGORY_IDS.APPS },
  {
    name: "Activar Apps",
    link: "/activar-apps",
    categoryId: PRODUCT_CATEGORY_IDS.ACTIVATE_APPS,
    displayNames: ["Activar App"],
  },
];
