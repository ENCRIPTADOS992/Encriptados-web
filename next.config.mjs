import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "encriptados.io", 
      "encriptados.nyc3.cdn.digitaloceanspaces.com",
      "encriptados.es"
    ],
  },
   eslint: {
    ignoreDuringBuilds: true, 
  },
  async redirects() {
    return [
      // Redirecciones de URLs legacy a nuevas URLs basadas en nombre
      {
        source: "/:locale/apps/silent-circle",
        destination: "/:locale/apps/silent-phone",
        permanent: true,
      },
      {
        source: "/:locale/apps/armadillo-v2",
        destination: "/:locale/apps/armadillo",
        permanent: true,
      },
      {
        source: "/:locale/apps/vault-chat-v2",
        destination: "/:locale/apps/vaultchat",
        permanent: true,
      },
      // Redirección para NordVPN (legacy 'nordvpn' a nuevo 'nord-vpn')
      {
        source: "/:locale/apps/nordvpn",
        destination: "/:locale/apps/nord-vpn",
        permanent: true,
      },
      // También sin locale explícito (next-intl maneja esto, pero por seguridad)
      {
        source: "/apps/silent-circle",
        destination: "/apps/silent-phone",
        permanent: true,
      },
      {
        source: "/apps/armadillo-v2",
        destination: "/apps/armadillo",
        permanent: true,
      },
      {
        source: "/apps/vault-chat-v2",
        destination: "/apps/vaultchat",
        permanent: true,
      },
      {
        source: "/apps/nordvpn",
        destination: "/apps/nord-vpn",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
