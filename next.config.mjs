import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  transpilePackages: ['swiper'],
  distDir: process.env.NEXT_DIST_DIR || (process.env.NODE_ENV === "development" ? ".next-dev" : ".next"),
  skipTrailingSlashRedirect: true,
  experimental: {
    // Use child processes (more stable) instead of worker threads for static generation
    workerThreads: false,
  },
  images: {
    unoptimized: true, // Desactivar optimización de Vercel - las webp ya están optimizadas
    remotePatterns: [
      { protocol: 'https', hostname: 'admin.encriptados.io' },
      { protocol: 'https', hostname: 'encriptados.io' },
      { protocol: 'https', hostname: 'encriptados.nyc3.cdn.digitaloceanspaces.com' },
      { protocol: 'https', hostname: 'encriptados.es' },
      { protocol: 'http', hostname: 'encriptados.es' },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      // Redirección temporal (307) de activar-apps → home
      {
        source: "/:locale/apps/activar-apps",
        destination: "/:locale",
        permanent: false,
      },
      {
        source: "/apps/activar-apps",
        destination: "/",
        permanent: false,
      },
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
      // Redirección para NordVPN (legacy 'nordvpn' a nuevo 'nord-vpn')
      {
        source: "/:locale/apps/nordvpn",
        destination: "/:locale/apps/nord-vpn",
        permanent: true,
      },
      {
        source: "/:locale/apps/salt",
        destination: "/:locale/apps/salt-app",
        permanent: true,
      },
      {
        source: "/:locale/apps/vnclagoon",
        destination: "/:locale/apps/vnc-lagoon",
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
        source: "/apps/nordvpn",
        destination: "/apps/nord-vpn",
        permanent: true,
      },
      {
        source: "/apps/salt",
        destination: "/apps/salt-app",
        permanent: true,
      },
      {
        source: "/apps/vnclagoon",
        destination: "/apps/vnc-lagoon",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
