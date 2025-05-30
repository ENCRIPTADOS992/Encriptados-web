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
};

export default withNextIntl(nextConfig);
