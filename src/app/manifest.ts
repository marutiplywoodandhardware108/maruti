import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#14110d",
    theme_color: "#c9a227",
    icons: [
      {
        src: "/images/logo.jpeg",
        sizes: "1242x1242",
        type: "image/jpeg",
      },
    ],
  };
}
