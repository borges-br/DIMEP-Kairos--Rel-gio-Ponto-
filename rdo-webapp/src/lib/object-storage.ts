import "server-only";

import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { requiredEnv } from "@/lib/env";

let client: S3Client | undefined;

function storageClient() {
  if (!client) {
    client = new S3Client({
      endpoint: requiredEnv("OBJECT_STORAGE_ENDPOINT"),
      region: process.env.OBJECT_STORAGE_REGION || "us-east-1",
      forcePathStyle: process.env.OBJECT_STORAGE_FORCE_PATH_STYLE !== "false",
      credentials: {
        accessKeyId: requiredEnv("OBJECT_STORAGE_ACCESS_KEY"),
        secretAccessKey: requiredEnv("OBJECT_STORAGE_SECRET_KEY"),
      },
    });
  }
  return client;
}

export function objectStorageConfig() {
  return {
    bucket: requiredEnv("OBJECT_STORAGE_BUCKET"),
    provider: process.env.OBJECT_STORAGE_PROVIDER === "s3" ? "s3" : "minio",
  } as const;
}

export async function putObject(key: string, body: Uint8Array, contentType: string) {
  const { bucket } = objectStorageConfig();
  await storageClient().send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
  }));
}

export async function getObject(key: string, range?: string | null) {
  const { bucket } = objectStorageConfig();
  return storageClient().send(new GetObjectCommand({
    Bucket: bucket,
    Key: key,
    Range: range || undefined,
  }));
}
