import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RDO Interproject",
    short_name: "RDO",
    description: "RDO, apontamento de horas e integração operacional.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d151d",
    theme_color: "#0d151d",
    lang: "pt-BR",
  };
}
