import "server-only";

import { createHash } from "node:crypto";
import { requiredEnv } from "@/lib/env";
import { withTenant } from "@/lib/db";
import { burnPasswordTiming, verifyPassword } from "@/lib/auth/password";
import type { AppRole, SessionUser } from "@/lib/auth/session";

type LoginMeta = { ipAddress: string | null; userAgent: string | null };

export async function authenticate(
  email: string,
  password: string,
  meta: LoginMeta,
): Promise<SessionUser | null> {
  const organizationId = requiredEnv("APP_DEFAULT_ORGANIZATION_ID");
  const normalizedEmail = email.trim().toLowerCase();
  const emailHash = createHash("sha256").update(normalizedEmail).digest("hex");

  return withTenant(organizationId, async (client) => {
    const recentFailures = await client.query<{ count: string }>(
      `select count(*)::text as count from rdo.login_attempts
        where organization_id = $1 and email_sha256 = $2
          and not successful and attempted_at > now() - interval '10 minutes'`,
      [organizationId, emailHash],
    );
    if (Number(recentFailures.rows[0]?.count ?? 0) >= 20) {
      return null;
    }

    const result = await client.query<{
      user_id: string;
      display_name: string;
      password_hash: string;
      failed_login_count: number;
      locked_until: Date | null;
      roles: AppRole[];
    }>(
      `select u.id as user_id, u.display_name, c.password_hash,
              c.failed_login_count, c.locked_until,
              coalesce(array_agg(ur.role order by ur.role)
                filter (where ur.role is not null and ur.active), '{}') as roles
         from rdo.app_users u
         join rdo.organization_users ou
           on ou.user_id = u.id and ou.organization_id = $1 and ou.active
         join rdo.user_credentials c
           on c.user_id = u.id and c.organization_id = ou.organization_id
         left join rdo.organization_user_roles ur
           on ur.user_id = u.id and ur.organization_id = ou.organization_id
        where u.email = $2 and u.active
        group by u.id, u.display_name, c.password_hash, c.failed_login_count, c.locked_until`,
      [organizationId, normalizedEmail],
    );

    const account = result.rows[0];
    const locked = Boolean(account?.locked_until && account.locked_until.getTime() > Date.now());
    const validPassword = account && !locked
      ? await verifyPassword(password, account.password_hash)
      : (await burnPasswordTiming(password), false);

    await client.query(
      `insert into rdo.login_attempts
        (organization_id, email_sha256, successful, ip_address, user_agent)
       values ($1, $2, $3, $4, $5)`,
      [organizationId, emailHash, Boolean(validPassword), meta.ipAddress, meta.userAgent?.slice(0, 500)],
    );

    if (!account || !validPassword) {
      if (account && !locked) {
        await client.query(
          `update rdo.user_credentials
              set failed_login_count = failed_login_count + 1,
                  locked_until = case when failed_login_count + 1 >= 5
                    then now() + interval '15 minutes' else locked_until end
            where organization_id = $1 and user_id = $2`,
          [organizationId, account.user_id],
        );
      }
      return null;
    }

    await client.query(
      `update rdo.user_credentials set failed_login_count = 0, locked_until = null
        where organization_id = $1 and user_id = $2`,
      [organizationId, account.user_id],
    );
    await client.query("update rdo.app_users set last_login_at = now() where id = $1", [account.user_id]);

    return {
      userId: account.user_id,
      organizationId,
      displayName: account.display_name,
      roles: account.roles,
    };
  });
}
