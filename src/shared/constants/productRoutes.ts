interface ProductRouteItem {
  name: string; 
  link: string; 
  categoryId: number;
  displayNames?: string[];
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
  // Extra (no visibles en frontend pero mantenidos en el array completo)
  { name: "Total Sec", link: "/system8", categoryId: 35 },
  { name: "T2 Communicator", link: "/apps/t2-communicator", categoryId: 35 },
  
  // Aplicaciones (38)
  { name: "Silent Phone", link: "/apps/silent-circle", categoryId: 38 },
  { name: "VaultChat", link: "/apps/vault-chat", categoryId: 38 },
  { name: "Armadillo", link: "/apps/armadillo", categoryId: 38 },
  { name: "Threema", link: "/apps/threema", categoryId: 38 },
  { name: "Threema Work", link: "/apps/threema-work", categoryId: 38 },
  { name: "VncLagoon", link: "/apps/vnc-lagoon", categoryId: 38 },
  { name: "Salt", link: "/apps/salt", categoryId: 38 },
  { name: "NordVPN", link: "/apps/nord-vpn", categoryId: 38 },
];
