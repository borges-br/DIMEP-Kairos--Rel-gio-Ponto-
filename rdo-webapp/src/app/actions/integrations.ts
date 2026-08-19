"use server";

import { requireSession } from "@/lib/auth/session";
import { probeIntegrations, type ProbeResult } from "@/lib/integrations/probe";

export async function checkIntegrationsAction(): Promise<ProbeResult[]> {
  await requireSession();
  return probeIntegrations();
}
