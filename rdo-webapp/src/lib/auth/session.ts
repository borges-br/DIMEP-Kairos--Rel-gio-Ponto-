import "server-only";

import { createHash, randomBytes } from "node:crypto";
import { cache } from "react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { integerEnv } from "@/lib/env";
import { withTenant } from "@/lib/db";

export type AppRole = "leader" | "foreman" | "manager" | "hr" | "director" | "admin";

export type SessionUser = {
  userId: string;
  organizationId: string;
  displayName: string;
  roles: AppRole[];
};

function cookieName() {
  return (
    process.env.AUTH_COOKIE_NAME ??
    (process.env.NODE_ENV === "production" ? "__Host-rdo_session" : "rdo_session")
  );
}

function tokenHash(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function parseCookie(value?: string) {
  if (!value) return null;
  const separator = value.indexOf(".");
  if (separator < 1) return null;
  const organizationId = value.slice(0, separator);
  const token = value.slice(separator + 1);
  if (!/^[0-9a-f-]{36}$/i.test(organizationId) || token.length < 32) return null;
  return { organizationId, token };
}

export async function createSession(user: SessionUser) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + integerEnv("SESSION_TTL_HOURS", 8) * 60 * 60 * 1000);
  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
  const userAgent = requestHeaders.get("user-agent")?.slice(0, 500) || null;

  await withTenant(user.organizationId, async (client) => {
    await client.query(
      `insert into rdo.user_sessions
        (organization_id, user_id, token_sha256, expires_at, ip_address, user_agent)
       values ($1, $2, $3, $4, $5, $6)`,
      [user.organizationId, user.userId, tokenHash(token), expiresAt, forwardedFor, userAgent],
    );
  });

  const store = await cookies();
  store.set(cookieName(), `${user.organizationId}.${token}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
    priority: "high",
  });
}

export const getSession = cache(async (): Promise<SessionUser | null> => {
  const parsed = parseCookie((await cookies()).get(cookieName())?.value);
  if (!parsed) return null;

  return withTenant(parsed.organizationId, async (client) => {
    const result = await client.query<{
      user_id: string;
      organization_id: string;
      display_name: string;
      roles: AppRole[];
    }>(
      `select s.user_id, s.organization_id, u.display_name,
              coalesce(array_agg(ur.role order by ur.role)
                filter (where ur.role is not null and ur.active), '{}') as roles
         from rdo.user_sessions s
         join rdo.organization_users ou
           on ou.organization_id = s.organization_id and ou.user_id = s.user_id and ou.active
         join rdo.app_users u on u.id = s.user_id and u.active
         left join rdo.organization_user_roles ur
           on ur.organization_id = s.organization_id and ur.user_id = s.user_id
        where s.organization_id = $1
          and s.token_sha256 = $2
          and s.revoked_at is null
          and s.expires_at > now()
        group by s.user_id, s.organization_id, u.display_name`,
      [parsed.organizationId, tokenHash(parsed.token)],
    );
    const row = result.rows[0];
    return row
      ? {
          userId: row.user_id,
          organizationId: row.organization_id,
          displayName: row.display_name,
          roles: row.roles,
        }
      : null;
  });
});

export async function requireSession(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}

export async function requireAnyRole(allowed: AppRole[]): Promise<SessionUser> {
  const session = await requireSession();
  if (!session.roles.some((role) => allowed.includes(role))) redirect("/");
  return session;
}

export async function revokeCurrentSession() {
  const store = await cookies();
  const parsed = parseCookie(store.get(cookieName())?.value);
  if (parsed) {
    await withTenant(parsed.organizationId, async (client) => {
      await client.query(
        `update rdo.user_sessions set revoked_at = now()
          where organization_id = $1 and token_sha256 = $2 and revoked_at is null`,
        [parsed.organizationId, tokenHash(parsed.token)],
      );
    });
  }
  store.delete(cookieName());
}
