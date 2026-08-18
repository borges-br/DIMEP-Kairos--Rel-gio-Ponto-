import { randomBytes, scrypt as nodeScrypt } from "node:crypto";
import pg from "pg";

const required = (name) => {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Variável obrigatória ausente: ${name}`);
  return value;
};

const password = required("ADMIN_PASSWORD");
if (password.length < 12) throw new Error("ADMIN_PASSWORD deve ter ao menos 12 caracteres");

const scrypt = (value, salt) => new Promise((resolve, reject) => {
  nodeScrypt(value, salt, 64, { cost: 16384, blockSize: 8, parallelization: 1, maxmem: 64 * 1024 * 1024 },
    (error, key) => error ? reject(error) : resolve(key));
});
const salt = randomBytes(16);
const key = await scrypt(password, salt);
const passwordHash = ["scrypt", 16384, 8, 1, salt.toString("base64url"), key.toString("base64url")].join("$");
const roles = (process.env.ADMIN_ROLES ?? "admin,director").split(",").map((role) => role.trim()).filter(Boolean);
const allowedRoles = new Set(["leader", "foreman", "manager", "director", "admin"]);
if (roles.some((role) => !allowedRoles.has(role))) throw new Error("ADMIN_ROLES contém papel inválido");

const pool = new pg.Pool({ connectionString: required("DATABASE_ADMIN_URL") });
const client = await pool.connect();
try {
  await client.query("begin");
  const organizationId = required("APP_DEFAULT_ORGANIZATION_ID");
  await client.query(
    `insert into rdo.organizations (id, legal_name, trade_name, cnpj_digits)
     values ($1, $2, $3, nullif(regexp_replace($4, '[^0-9]', '', 'g'), ''))
     on conflict (id) do nothing`,
    [organizationId, required("ORGANIZATION_LEGAL_NAME"), required("ORGANIZATION_TRADE_NAME"), process.env.ORGANIZATION_CNPJ ?? ""],
  );
  const email = required("ADMIN_EMAIL").toLowerCase();
  const userResult = await client.query(
    `insert into rdo.app_users (display_name, email, auth_subject)
     values ($1, $2, $3)
     on conflict (auth_subject) do update set display_name = excluded.display_name, email = excluded.email, active = true
     returning id`,
    [required("ADMIN_NAME"), email, `local:${email}`],
  );
  const userId = userResult.rows[0].id;
  await client.query(
    `insert into rdo.organization_users (organization_id, user_id, active)
     values ($1, $2, true)
     on conflict (organization_id, user_id) do update set active = true`,
    [organizationId, userId],
  );
  await client.query(
    `insert into rdo.user_credentials (organization_id, user_id, password_hash)
     values ($1, $2, $3)
     on conflict (organization_id, user_id) do update
       set password_hash = excluded.password_hash, failed_login_count = 0,
           locked_until = null, password_changed_at = now()`,
    [organizationId, userId, passwordHash],
  );
  await client.query(
    "delete from rdo.organization_user_roles where organization_id = $1 and user_id = $2",
    [organizationId, userId],
  );
  for (const role of roles) {
    await client.query(
      "insert into rdo.organization_user_roles (organization_id, user_id, role) values ($1, $2, $3)",
      [organizationId, userId, role],
    );
  }
  await client.query("commit");
  process.stdout.write(`Administrador criado/atualizado: ${email}\n`);
} catch (error) {
  await client.query("rollback");
  throw error;
} finally {
  client.release();
  await pool.end();
}
