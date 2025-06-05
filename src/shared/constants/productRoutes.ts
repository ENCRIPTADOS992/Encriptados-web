interface ProductRouteItem {
  name: string; 
  link: string; 
  categoryId: number;
}

export const PRODUCT_ROUTES: ProductRouteItem[] = [
  // Sistemas (35)
  { name: "Ultra X", link: "/apps/ultrax", categoryId: 35 },
  { name: "Armadillo", link: "/apps/armadillo-v2", categoryId: 35 },
  { name: "VaultChat", link: "/apps/vault-chat-v2", categoryId: 35 },
  { name: "Cryptcom", link: "/apps/cryptcom", categoryId: 35 },
  { name: "Renati", link: "/apps/renati", categoryId: 35 },
  { name: "ChatMail", link: "/apps/chat-mail", categoryId: 35 },
  { name: "DEC Secure", link: "/apps/dec-secure", categoryId: 35 },
  { name: "Total Sec", link: "/system8", categoryId: 35 },
  { name: "T2 Communicator", link: "/apps/t2-communicator", categoryId: 35 },
  { name: "Intact Phone", link: "/apps/intact-phone", categoryId: 35 },
  { name: "Secure MDM iPhone", link: "/system1", categoryId: 35 },
  { name: "Secure MDM Android", link: "/system2", categoryId: 35 },

  // Aplicaciones (38)
  { name: "Silent Circle", link: "/apps/silent-circle", categoryId: 38 },
  { name: "Nord VPN", link: "/apps/nord-vpn", categoryId: 38 },
  { name: "Salt", link: "/apps/salt", categoryId: 38 },
  { name: "VNClagoon", link: "/apps/vnc-lagoon", categoryId: 38 },
  { name: "Threema", link: "/threema", categoryId: 38 },
  { name: "SecureCrypt", link: "/app9", categoryId: 38 },
  { name: "Elyon", link: "/app10", categoryId: 38 },
];
