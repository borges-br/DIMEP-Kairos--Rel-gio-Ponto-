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
    // O site.webmanifest que acompanha o pacote de icones nao e usado: este
    // manifest.ts ja e servido pelo Next e mantem nome, idioma e as cores do
    // tema escuro do app, que o arquivo gerado traria em branco.
    icons: [
      { src: "/icons/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/android-chrome-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
