import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RDO Interproject",
    short_name: "RDO",
    description: "RDO, apontamento de horas e integração operacional.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f7fb",
    theme_color: "#0f766e",
    lang: "pt-BR",
  };
}
