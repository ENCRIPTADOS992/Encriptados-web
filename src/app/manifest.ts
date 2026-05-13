import type { MetadataRoute } from "next";
import { SEO_DEFAULT_DESCRIPTION, SEO_SITE_NAME } from "@/shared/seo/constants";
import { buildAbsoluteUrl } from "@/shared/seo/url";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SEO_SITE_NAME} Web`,
    short_name: SEO_SITE_NAME,
    description: SEO_DEFAULT_DESCRIPTION,
    start_url: buildAbsoluteUrl("/"),
    scope: buildAbsoluteUrl("/"),
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: buildAbsoluteUrl("/images/footer/encriptados-logo-201.png"),
        sizes: "201x201",
        type: "image/png",
      },
    ],
  };
}