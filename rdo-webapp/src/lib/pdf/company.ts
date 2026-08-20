import "server-only";

/**
 * Dados institucionais impressos no cabecalho do RDO. Ficam em variavel de
 * ambiente com este padrao para que outra empresa use o mesmo sistema sem
 * recompilar, mas sem exigir configuracao para funcionar.
 */
export const company = {
  name: process.env.COMPANY_NAME?.trim() || "Interproject Projetos e Instalações Ltda - EPP",
  document: process.env.COMPANY_DOCUMENT?.trim() || "19.122.400/0001-06",
  address: process.env.COMPANY_ADDRESS?.trim()
    || "R. Alceste Del Cistia, 85 - Retiro São João, Sorocaba - SP, 18085-751",
  phone: process.env.COMPANY_PHONE?.trim() || "(15) 3500-6915",
  email: process.env.COMPANY_EMAIL?.trim() || "contato@interproject.com.br",
} as const;
