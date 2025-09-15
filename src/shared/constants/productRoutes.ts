// src/shared/constants/productRoutes.ts
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

export const PRODUCT_ROUTES: ProductRouteItem[] = [
  // Sistemas (35)
 { name: "Secure MDM iPhone", link: "/apps/secure-mdm-iphone", categoryId: 35 },
  { name: "Secure MDM Android", link: "/apps/secure-mdm-android", categoryId: 35 },
  { name: "Cryptcom", link: "/apps/cryptcom", categoryId: 35 },
  { name: "Renati", link: "/apps/renati", categoryId: 35 },
  { name: "ChatMail", link: "/apps/chat-mail", categoryId: 35 },
  { name: "Armadillo", link: "/apps/armadillo-v2", categoryId: 35 },
  { name: "VaultChat", link: "/apps/vault-chat-v2", categoryId: 35 },
  { name: "Ultra X", link: "/apps/ultrax", categoryId: 35 },
  { name: "Intact Phone", link: "/apps/intact-phone", categoryId: 35 },
  { name: "DEC Secure", link: "/apps/dec-secure", categoryId: 35 },
  { name: "SecureCrypt", link: "/apps/secureCrypt", categoryId: 35 },
  // Extra (no visibles en frontend pero mantenidos en el array completo)
  { name: "Total Sec", link: "/system8", categoryId: 35 },
  { name: "T2 Communicator", link: "/apps/t2-communicator", categoryId: 35 },
  
  // Aplicaciones (38)
  {
    name: "Silent Phone",
    link: "/apps/silent-circle",
    categoryId: 38,
    uiPolicy: {
      showTabs: true,                 
    },
  },
  { name: "VaultChat", link: "/apps/vault-chat", categoryId: 38 },
  { name: "Armadillo Chat", link: "/apps/armadillo", categoryId: 38 },
  { name: "Threema", link: "/apps/threema", categoryId: 38 },
  { name: "Threema Work", link: "/apps/threema-work", categoryId: 38 },
  { name: "VNC Lagoon", link: "/apps/vnc-lagoon", categoryId: 38 },
  { name: "Salt App", link: "/apps/salt", categoryId: 38 },
  { name: "Nord VPN", link: "/apps/nord-vpn", categoryId: 38 },
];
