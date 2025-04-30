import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["encriptados.io", "encriptados.nyc3.cdn.digitaloceanspaces.com"], // Add your hostname here
  },
};

export default withNextIntl(nextConfig);
