import type { NextConfig } from "next";

// Origens EXTRAS aceitas em Server Actions. O Next ja compara Origin com
// Host/X-Forwarded-Host e libera a mesma origem sozinho, entao com o proxy
// repassando o host publico esta lista fica vazia e a mesma imagem atende
// qualquer dominio. Preencher aqui so afrouxa o CSRF: use apenas para um
// proxy/CDN cujo host difira do publico.
//
// Lido no BUILD, nunca em runtime: `output: standalone` serializa a config
// dentro de .next/standalone/server.js, que ainda sobrescreve
// __NEXT_PRIVATE_STANDALONE_CONFIG na subida. Nao adianta por no .env.
const allowedOrigins = (process.env.SERVER_ACTIONS_ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  deploymentId: process.env.DEPLOYMENT_VERSION,
  turbopack: { root: process.cwd() },
  experimental: {
    serverActions: { allowedOrigins },
  },
};

export default nextConfig;
