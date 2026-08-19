import "server-only";

import { HeadBucketCommand, S3Client } from "@aws-sdk/client-s3";
import { externalRequest } from "@/lib/integrations/http";

export type ProbeResult = {
  service: "dimep" | "imuv" | "storage";
  label: string;
  online: boolean;
  detail: string;
  durationMs: number;
};

const marksPath = () => process.env.DIMEP_MARKS_PATH?.trim() || "RestServiceApi/Appointment/GetAppointmentsPointer";
const peoplePath = () => process.env.IMUV_PEOPLE_PATH?.trim() || "people";

function failure(error: unknown) {
  const message = error instanceof Error ? error.message : "erro desconhecido";
  return message.replace(/\s+/g, " ").slice(0, 160);
}

async function timed(work: () => Promise<string>) {
  const startedAt = Date.now();
  try {
    return { online: true, detail: await work(), durationMs: Date.now() - startedAt };
  } catch (error) {
    return { online: false, detail: failure(error), durationMs: Date.now() - startedAt };
  }
}

/**
 * Conversa de verdade com cada serviço, com o menor payload possível: o card de
 * Configurações precisa dizer se a comunicação existe agora, não se as variáveis
 * de ambiente estão preenchidas.
 */
export async function probeIntegrations(): Promise<ProbeResult[]> {
  const [dimep, imuv, storage] = await Promise.all([
    timed(async () => {
      const today = new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo" }).format(new Date());
      await externalRequest("DIMEP", marksPath(), {
        method: "POST",
        body: { DataInicial: today, DataFinal: today, Page: 1, PageSize: 1 },
      });
      return "Respondeu à consulta de marcações.";
    }),
    timed(async () => {
      const path = peoplePath();
      await externalRequest("IMUV", `${path}${path.includes("?") ? "&" : "?"}page=1&per-page=1`);
      return "Respondeu à consulta de pessoas.";
    }),
    timed(async () => {
      const bucket = process.env.OBJECT_STORAGE_BUCKET?.trim();
      const endpoint = process.env.OBJECT_STORAGE_ENDPOINT?.trim();
      if (!bucket || !endpoint) throw new Error("Bucket ou endpoint não configurado.");
      const client = new S3Client({
        endpoint,
        region: process.env.OBJECT_STORAGE_REGION || "us-east-1",
        forcePathStyle: process.env.OBJECT_STORAGE_FORCE_PATH_STYLE !== "false",
        credentials: {
          accessKeyId: process.env.OBJECT_STORAGE_ACCESS_KEY?.trim() || "",
          secretAccessKey: process.env.OBJECT_STORAGE_SECRET_KEY?.trim() || "",
        },
      });
      try {
        await client.send(new HeadBucketCommand({ Bucket: bucket }));
        return `Bucket ${bucket} acessível.`;
      } finally {
        client.destroy();
      }
    }),
  ]);

  return [
    { service: "dimep", label: "DIMEP Kairos", ...dimep },
    { service: "imuv", label: "IMUV", ...imuv },
    { service: "storage", label: "Armazenamento de evidências", ...storage },
  ];
}
