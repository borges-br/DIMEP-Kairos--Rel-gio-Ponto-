import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { requireSession, type AppRole, type SessionUser } from "@/lib/auth/session";
import { withTenant } from "@/lib/db";

export type PageKey = "dashboard" | "projects" | "employees" | "rdos" | "distribution" | "hours" | "users" | "settings";
export type AccessLevel = "none" | "read" | "write";

export const pageKeys: PageKey[] = ["dashboard", "projects", "employees", "rdos", "distribution", "hours", "users", "settings"];

export const pageLabels: Record<PageKey, string> = {
  dashboard: "Visão geral", projects: "Projetos", employees: "Colaboradores", rdos: "Diário de campo",
  distribution: "Distribuir trabalho", hours: "Apontamentos", users: "Usuários", settings: "Configurações",
};

export const roleOrder: AppRole[] = ["leader", "foreman", "manager", "hr", "director", "admin"];

const rank: Record<AccessLevel, number> = { none: 0, read: 1, write: 2 };

export function atLeast(current: AccessLevel, required: AccessLevel) {
  return rank[current] >= rank[required];
}

/**
 * O administrador nao passa pela tabela: ele mantem escrita em tudo para que a
 * propria tela de permissoes nunca possa trancar quem a edita.
 */
export const getPageAccess = cache(async (): Promise<{ session: SessionUser; access: Record<PageKey, AccessLevel> }> => {
  const session = await requireSession();
  const access = Object.fromEntries(pageKeys.map((key) => [key, "none"])) as Record<PageKey, AccessLevel>;
  if (session.roles.includes("admin")) {
    for (const key of pageKeys) access[key] = "write";
    return { session, access };
  }
  if (!session.roles.length) return { session, access };

  const rows = await withTenant(session.organizationId, async (client) => {
    const result = await client.query<{ page_key: PageKey; access: AccessLevel }>(
      `select page_key, access from rdo.page_permissions
        where organization_id = $1 and role = any($2::text[])`,
      [session.organizationId, session.roles],
    );
    return result.rows;
  });
  // Com varios perfis vale sempre o mais permissivo.
  for (const row of rows) {
    if (rank[row.access] > rank[access[row.page_key]]) access[row.page_key] = row.access;
  }
  return { session, access };
});

/** Bloqueia a pagina quando o perfil nao alcanca o nivel exigido. */
export async function requirePageAccess(page: PageKey, required: AccessLevel = "read") {
  const { session, access } = await getPageAccess();
  if (!atLeast(access[page], required)) redirect(access.dashboard === "none" ? "/login" : "/");
  return { session, access, level: access[page] };
}

/** Versao para Server Actions: lanca em vez de redirecionar. */
export async function assertPageWrite(page: PageKey) {
  const { session, access } = await getPageAccess();
  if (!atLeast(access[page], "write")) throw new Error("PAGE_FORBIDDEN");
  return session;
}
