import "server-only";

import { Pool, type PoolClient } from "pg";
import { booleanEnv, integerEnv, requiredEnv } from "@/lib/env";

declare global {
  var __rdoPool: Pool | undefined;
}

export function getPool(): Pool {
  if (!globalThis.__rdoPool) {
    globalThis.__rdoPool = new Pool({
      connectionString: requiredEnv("DATABASE_URL"),
      max: integerEnv("DATABASE_POOL_MAX", 10),
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
      ssl: booleanEnv("DATABASE_SSL") ? { rejectUnauthorized: true } : undefined,
      application_name: "rdo-webapp",
    });
  }
  return globalThis.__rdoPool;
}

export async function withTenant<T>(
  organizationId: string,
  work: (client: PoolClient) => Promise<T>,
): Promise<T> {
  const client = await getPool().connect();
  try {
    await client.query("begin");
    await client.query("select set_config('app.organization_id', $1, true)", [organizationId]);
    const result = await work(client);
    await client.query("commit");
    return result;
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
  }
}
