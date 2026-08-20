"use server";

import { randomUUID } from "node:crypto";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAnyRole } from "@/lib/auth/session";
import { hashPassword } from "@/lib/auth/password";
import { withTenant } from "@/lib/db";
import { pageKeys, roleOrder } from "@/lib/permissions";
import { toE164BR } from "@/lib/phone";

export type UsersState = { ok?: string; error?: string } | undefined;

const roles = z.enum(["leader", "foreman", "manager", "hr", "director", "admin"]);

const userSchema = z.object({
  displayName: z.string().trim().min(3, "Informe o nome completo.").max(200),
  email: z.string().trim().toLowerCase().email("E-mail inválido.").max(320),
  // app_users guarda em E.164, mas quem digita usa o formato brasileiro: a
  // conversao acontece aqui, e nao como exigencia na tela.
  phone: z.preprocess(
    (value) => {
      if (typeof value !== "string" || !value.trim()) return null;
      return toE164BR(value) ?? "invalido";
    },
    z.string().regex(/^\+[1-9][0-9]{7,14}$/, "Telefone inválido. Use DDD e número, como (19) 99999-8888.").nullable(),
  ),
  password: z.string().min(12, "A senha deve ter ao menos 12 caracteres.").max(200),
  collaboratorId: z.preprocess(
    (value) => typeof value === "string" && value.trim() ? value.trim() : null,
    z.string().uuid().nullable(),
  ),
  roles: z.array(roles).min(1, "Selecione ao menos um perfil."),
});

/**
 * Um unico "Não foi possível criar o usuário." escondia a causa real e obrigava
 * a ir ao log do servidor para descobrir qualquer coisa. Os codigos do Postgres
 * abaixo cobrem o que de fato acontece nesta tela; o resto continua generico,
 * mas com o codigo anexado para dar rastro.
 */
function describeDbFailure(error: unknown, acao: string) {
  const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
  const constraint = typeof error === "object" && error && "constraint" in error ? String(error.constraint) : "";
  if (code === "23505") {
    if (constraint.includes("email")) return "Já existe um usuário com este e-mail.";
    if (constraint.includes("auth_subject")) return "Já existe uma conta usando este e-mail como identificador.";
    return "Já existe um registro com estes dados.";
  }
  if (code === "23514" && constraint.includes("phone")) {
    return "Telefone inválido. Use DDD e número, como (19) 99999-8888.";
  }
  if (code === "23514") return `Os dados não passaram na validação do banco (${constraint || "restrição"}).`;
  if (code === "42501") return "O banco recusou a escrita por política de acesso. Avise o administrador.";
  if (code === "23503") return "Há um vínculo inválido: confira o colaborador selecionado.";
  return `Não foi possível ${acao}${code ? ` (erro ${code})` : ""}.`;
}

export async function createUserAction(_state: UsersState, formData: FormData): Promise<UsersState> {
  const session = await requireAnyRole(["admin"]);
  const parsed = userSchema.safeParse({
    displayName: formData.get("displayName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: String(formData.get("password") ?? ""),
    collaboratorId: formData.get("collaboratorId"),
    roles: formData.getAll("roles").map(String),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message || "Revise os dados do usuário." };
  const input = parsed.data;

  try {
    const outcome = await withTenant(session.organizationId, async (client) => {
      const duplicate = await client.query(
        "select 1 from rdo.app_users where email = $1",
        [input.email],
      );
      if (duplicate.rows[0]) return "email-taken";

      // O id vem da aplicacao em vez de "returning id": a policy de INSERT em
      // app_users permite a escrita, mas RETURNING tambem exige passar pela
      // policy de SELECT, que so aceita quem ja tem vinculo em
      // organization_users — vinculo criado logo abaixo. A conta nunca
      // satisfaria essa condicao no proprio insert.
      const userId = randomUUID();
      await client.query(
        `insert into rdo.app_users (id, display_name, email, phone_e164, auth_subject)
         values ($1, $2, $3, $4, $3)`,
        [userId, input.displayName, input.email, input.phone],
      );
      await client.query(
        `insert into rdo.organization_users (organization_id, user_id, collaborator_id)
         values ($1, $2, $3)`,
        [session.organizationId, userId, input.collaboratorId],
      );
      await client.query(
        `insert into rdo.user_credentials (organization_id, user_id, password_hash)
         values ($1, $2, $3)`,
        [session.organizationId, userId, await hashPassword(input.password)],
      );
      for (const role of input.roles) {
        await client.query(
          "insert into rdo.organization_user_roles (organization_id, user_id, role) values ($1,$2,$3)",
          [session.organizationId, userId, role],
        );
      }
      await client.query(
        `insert into rdo.audit_events
          (organization_id, actor_user_id, entity_table, entity_id, action, new_data, reason)
         values ($1,$2,'app_users',$3,'insert',$4::jsonb,'Usuário cadastrado pela tela de Usuários')`,
        [session.organizationId, session.userId, userId, JSON.stringify({ email: input.email, roles: input.roles })],
      );
      return "ok";
    });
    if (outcome === "email-taken") return { error: "Já existe um usuário com este e-mail." };
    revalidatePath("/users");
    return { ok: `Usuário ${input.displayName} criado. Peça a troca da senha no primeiro acesso.` };
  } catch (error) {
    console.error("Falha ao criar usuário", error);
    return { error: describeDbFailure(error, "criar o usuário") };
  }
}

const updateSchema = z.object({
  userId: z.string().uuid(),
  active: z.boolean(),
  roles: z.array(roles).min(1, "Selecione ao menos um perfil."),
  password: z.preprocess(
    (value) => typeof value === "string" && value.trim() ? value.trim() : null,
    z.string().min(12, "A nova senha deve ter ao menos 12 caracteres.").max(200).nullable(),
  ),
});

export async function updateUserAction(_state: UsersState, formData: FormData): Promise<UsersState> {
  const session = await requireAnyRole(["admin"]);
  const parsed = updateSchema.safeParse({
    userId: formData.get("userId"),
    active: formData.get("active") === "on",
    roles: formData.getAll("roles").map(String),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message || "Revise os dados do usuário." };
  const input = parsed.data;
  // Sem essa trava, o administrador consegue remover o proprio acesso e ninguem
  // mais consegue devolve-lo pela interface.
  if (input.userId === session.userId && (!input.active || !input.roles.includes("admin"))) {
    return { error: "Você não pode remover o próprio acesso de administrador." };
  }

  try {
    await withTenant(session.organizationId, async (client) => {
      await client.query(
        `update rdo.app_users u set active = $3
           from rdo.organization_users ou
          where ou.organization_id = $1 and ou.user_id = u.id and u.id = $2`,
        [session.organizationId, input.userId, input.active],
      );
      await client.query(
        "delete from rdo.organization_user_roles where organization_id = $1 and user_id = $2",
        [session.organizationId, input.userId],
      );
      for (const role of input.roles) {
        await client.query(
          "insert into rdo.organization_user_roles (organization_id, user_id, role) values ($1,$2,$3)",
          [session.organizationId, input.userId, role],
        );
      }
      if (input.password) {
        await client.query(
          `insert into rdo.user_credentials (organization_id, user_id, password_hash)
           values ($1,$2,$3)
           on conflict (organization_id, user_id) do update
             set password_hash = excluded.password_hash, failed_login_count = 0,
                 locked_until = null, password_changed_at = now()`,
          [session.organizationId, input.userId, await hashPassword(input.password)],
        );
        // Trocar a senha encerra as sessoes abertas daquele usuario.
        await client.query(
          `update rdo.user_sessions set revoked_at = now()
            where organization_id = $1 and user_id = $2 and revoked_at is null`,
          [session.organizationId, input.userId],
        );
      }
      await client.query(
        `insert into rdo.audit_events
          (organization_id, actor_user_id, entity_table, entity_id, action, new_data, reason)
         values ($1,$2,'app_users',$3,'update',$4::jsonb,'Acesso ajustado pela tela de Usuários')`,
        [session.organizationId, session.userId, input.userId,
          JSON.stringify({ active: input.active, roles: input.roles, passwordChanged: Boolean(input.password) })],
      );
    });
    revalidatePath("/users");
    return { ok: "Acesso atualizado." };
  } catch (error) {
    console.error("Falha ao atualizar usuário", error);
    return { error: "Não foi possível atualizar o usuário." };
  }
}

export async function savePagePermissionsAction(_state: UsersState, formData: FormData): Promise<UsersState> {
  const session = await requireAnyRole(["admin"]);
  const entries: { role: string; page: string; access: string }[] = [];
  for (const role of roleOrder) {
    if (role === "admin") continue; // O administrador mantem escrita total por regra da aplicacao.
    for (const page of pageKeys) {
      const value = String(formData.get(`perm:${role}:${page}`) ?? "none");
      if (!["none", "read", "write"].includes(value)) return { error: "Nível de acesso inválido." };
      entries.push({ role, page, access: value });
    }
  }

  try {
    await withTenant(session.organizationId, async (client) => {
      for (const entry of entries) {
        await client.query(
          `insert into rdo.page_permissions (organization_id, role, page_key, access, updated_by_user_id)
           values ($1,$2,$3,$4,$5)
           on conflict (organization_id, role, page_key) do update
             set access = excluded.access, updated_by_user_id = excluded.updated_by_user_id`,
          [session.organizationId, entry.role, entry.page, entry.access, session.userId],
        );
      }
      await client.query(
        `insert into rdo.audit_events
          (organization_id, actor_user_id, entity_table, entity_id, action, new_data, reason)
         values ($1,$2,'page_permissions',$1,'update',$3::jsonb,'Matriz de permissões atualizada')`,
        [session.organizationId, session.userId, JSON.stringify(entries)],
      );
    });
    revalidatePath("/users");
    revalidatePath("/", "layout");
    return { ok: "Permissões salvas. Cada usuário vê o novo acesso na próxima navegação." };
  } catch (error) {
    console.error("Falha ao salvar permissões", error);
    return { error: "Não foi possível salvar as permissões." };
  }
}
