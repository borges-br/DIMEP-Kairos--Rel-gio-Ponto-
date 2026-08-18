import "server-only";

type ProviderStatus = {
  provider: "imuv" | "dimep";
  configured: boolean;
  missing: string[];
  baseUrlConfigured: boolean;
};

type StorageStatus = {
  configured: boolean;
  missing: string[];
  provider: string;
  endpointConfigured: boolean;
};

function status(provider: ProviderStatus["provider"], required: string[]): ProviderStatus {
  const missing = required.filter((name) => !process.env[name]?.trim());
  return {
    provider,
    configured: missing.length === 0,
    missing,
    baseUrlConfigured: Boolean(process.env[`${provider.toUpperCase()}_API_BASE_URL`]?.trim()),
  };
}

export function getSafeIntegrationConfiguration() {
  const storageRequired = [
    "OBJECT_STORAGE_ENDPOINT",
    "OBJECT_STORAGE_BUCKET",
    "OBJECT_STORAGE_ACCESS_KEY",
    "OBJECT_STORAGE_SECRET_KEY",
  ];
  const storageMissing = storageRequired.filter((name) => !process.env[name]?.trim());
  const storage: StorageStatus = {
    configured: storageMissing.length === 0,
    missing: storageMissing,
    provider: process.env.OBJECT_STORAGE_PROVIDER?.trim() || "não definido",
    endpointConfigured: Boolean(process.env.OBJECT_STORAGE_ENDPOINT?.trim()),
  };

  return {
    imuv: status("imuv", ["IMUV_API_BASE_URL", "IMUV_API_TOKEN", "IMUV_TENANT"]),
    dimep: status("dimep", ["DIMEP_API_BASE_URL", "DIMEP_TENANT", "DIMEP_MARKS_PATH"]),
    storage,
  };
}

export function integrationTimeout(provider: "IMUV" | "DIMEP") {
  const value = Number.parseInt(process.env[`${provider}_TIMEOUT_MS`] ?? "15000", 10);
  return Number.isFinite(value) ? Math.min(Math.max(value, 1000), 60000) : 15000;
}
