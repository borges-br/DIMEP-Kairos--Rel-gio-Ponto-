"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { createUserAction, savePagePermissionsAction, updateUserAction, type UsersState } from "@/app/actions/users";
import { PlusIcon } from "@/components/icons";
import type { OrganizationUser } from "@/lib/dal";
import type { AccessLevel, PageKey } from "@/lib/permissions";
import { roleLabel } from "@/lib/format";
import { formatPhoneBR } from "@/lib/phone";

type Permission = { role: string; page_key: string; access: string };

const accessLabels: { value: AccessLevel; label: string; short: string }[] = [
  { value: "none", label: "Sem acesso", short: "Sem" },
  { value: "read", label: "Somente leitura", short: "Ler" },
  { value: "write", label: "Leitura e escrita", short: "Editar" },
];

/**
 * Três estados no lugar de um <select>. A matriz tem 8 páginas por 5 perfis: com
 * dropdowns eram 40 caixas iguais na tela, impossíveis de varrer com o olho.
 * Aqui o nível fica visível sem abrir nada, e a escrita recebe cor própria para
 * que "quem pode editar o quê" salte à vista.
 */
function AccessChoice({ role, page, current, label }: {
  role: string; page: string; current: string; label: string;
}) {
  return <fieldset className="access-choice">
    <legend className="visually-hidden">{label}</legend>
    {accessLabels.map((option) => <label key={option.value} className={`access-option access-${option.value}`}>
      <input
        type="radio"
        name={`perm:${role}:${page}`}
        value={option.value}
        defaultChecked={current === option.value}
      />
      <span title={option.label}>{option.short}</span>
    </label>)}
  </fieldset>;
}

function Submit({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return <button type="submit" className="button button-primary" disabled={pending}>{pending ? pendingLabel : label}</button>;
}

function Feedback({ state }: { state: UsersState }) {
  if (state?.error) return <p className="form-error" role="alert">{state.error}</p>;
  if (state?.ok) return <p className="readiness-note" role="status">{state.ok}</p>;
  return null;
}

function RoleChecks({ name, selected }: { name: string; selected: string[] }) {
  return <div className="role-checks">{(["leader", "foreman", "manager", "hr", "director", "admin"] as const).map((role) =>
    <label key={role} className="check-chip">
      <input type="checkbox" name={name} value={role} defaultChecked={selected.includes(role)} />
      <span>{roleLabel(role)}</span>
    </label>)}
  </div>;
}

/** Mascara enquanto digita: o banco guarda E.164, mas ninguem digita assim. */
function PhoneField() {
  const [value, setValue] = useState("");
  return <label className="field-group"><span>Telefone</span>
    <input
      className="input-field" name="phone" inputMode="tel" autoComplete="tel" maxLength={20}
      placeholder="(19) 99999-8888" value={value}
      onChange={(event) => setValue(formatPhoneBR(event.target.value))}
    />
    <small className="field-help">Opcional. Guardado no padrão internacional (+55).</small>
  </label>;
}

function UserRow({ user, isSelf }: { user: OrganizationUser; isSelf: boolean }) {
  const [state, action] = useActionState<UsersState, FormData>(updateUserAction, undefined);
  const [open, setOpen] = useState(false);
  return <article className={`user-row${user.active ? "" : " inactive"}${open ? " open" : ""}`}>
    <span className="user-initials">{user.display_name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase()}</span>
    <div className="user-identity">
      <strong>{user.display_name}{isSelf && <em> · você</em>}</strong>
      <small>{user.email}</small>
      {user.collaborator_name && <small className="user-link">Vinculado a {user.collaborator_name}</small>}
    </div>
    <div className="user-roles">{user.roles.length
      ? user.roles.map((role) => <span className="status-badge status-neutral" key={role}>{roleLabel(role)}</span>)
      : <span className="status-badge status-warning">Sem perfil</span>}</div>
    <span className={`status-badge ${user.active ? "status-success" : "status-neutral"}`}>{user.active ? "Ativo" : "Inativo"}</span>
    <button type="button" className="text-button" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
      {open ? "Fechar" : "Editar acesso"}
    </button>
    {open && <form action={action} className="user-edit">
      <input type="hidden" name="userId" value={user.user_id} />
      <RoleChecks name="roles" selected={user.roles} />
      <div className="form-grid two-columns">
        <label className="field-group"><span>Nova senha</span><input className="input-field" type="password" name="password" minLength={12} autoComplete="new-password" placeholder="Deixe em branco para manter" /><small className="field-help">Trocar a senha encerra as sessões abertas do usuário.</small></label>
        <label className="check-row"><input type="checkbox" name="active" defaultChecked={user.active} /><span>Conta ativa</span></label>
      </div>
      <Feedback state={state} />
      <Submit label="Salvar acesso" pendingLabel="Salvando…" />
    </form>}
  </article>;
}

export function UsersAdmin({ users, permissions, collaborators, currentUserId }: {
  users: OrganizationUser[];
  permissions: Permission[];
  collaborators: { id: string; name: string }[];
  currentUserId: string;
}) {
  const [createState, createAction] = useActionState<UsersState, FormData>(createUserAction, undefined);
  const [permissionState, permissionAction] = useActionState<UsersState, FormData>(savePagePermissionsAction, undefined);
  const [creating, setCreating] = useState(false);
  const pages: PageKey[] = ["dashboard", "projects", "employees", "rdos", "distribution", "hours", "users", "settings"];
  const labels: Record<PageKey, string> = {
    dashboard: "Visão geral", projects: "Projetos", employees: "Colaboradores", rdos: "Diário de campo",
    distribution: "Distribuir trabalho", hours: "Apontamentos", users: "Usuários", settings: "Configurações",
  };
  const editableRoles = ["leader", "foreman", "manager", "hr", "director"] as const;
  const current = (role: string, page: string) =>
    permissions.find((item) => item.role === role && item.page_key === page)?.access ?? "none";

  return <>
    <section className="panel users-panel">
      <div className="resource-heading">
        <div><h2>Usuários do sistema</h2><p>Contas de acesso ao RDO, independentes do cadastro de colaboradores sincronizado.</p></div>
        <button type="button" className="button button-secondary" onClick={() => setCreating((value) => !value)}>
          <PlusIcon />{creating ? "Cancelar" : "Novo usuário"}
        </button>
      </div>

      {creating && <form action={createAction} className="user-create">
        <div className="form-grid two-columns">
          <label className="field-group"><span>Nome completo <b>*</b></span><input className="input-field" name="displayName" minLength={3} maxLength={200} required /></label>
          <label className="field-group"><span>E-mail <b>*</b></span><input className="input-field" type="email" name="email" maxLength={320} required autoComplete="off" /></label>
          <PhoneField />
          <label className="field-group"><span>Colaborador vinculado</span><select className="input-field" name="collaboratorId" defaultValue=""><option value="">Sem vínculo</option>{collaborators.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><small className="field-help">Vincular permite ligar as horas do usuário ao cadastro do ponto.</small></label>
        </div>
        <label className="field-group"><span>Senha inicial <b>*</b></span><input className="input-field" type="password" name="password" minLength={12} required autoComplete="new-password" /><small className="field-help">Mínimo de 12 caracteres. Entregue ao usuário por um canal seguro e peça a troca no primeiro acesso.</small></label>
        <fieldset className="team-fieldset"><legend>Perfis <b>*</b></legend><RoleChecks name="roles" selected={["leader"]} /></fieldset>
        <Feedback state={createState} />
        <Submit label="Cadastrar usuário" pendingLabel="Cadastrando…" />
      </form>}

      <div className="user-list">{users.map((user) =>
        <UserRow key={user.user_id} user={user} isSelf={user.user_id === currentUserId} />)}</div>
    </section>

    <section className="panel users-panel">
      <div className="resource-heading"><div><h2>Permissões por página</h2><p>Cada perfil recebe acesso individual: sem acesso, somente leitura ou leitura e escrita. O administrador mantém escrita em tudo.</p></div></div>
      <form action={permissionAction}>
        <div className="table-shell"><table className="data-table permission-table">
          <thead><tr><th>Página</th>{editableRoles.map((role) => <th key={role}>{roleLabel(role)}</th>)}</tr></thead>
          <tbody>{pages.map((page) => <tr key={page}>
            <td data-label="Página"><strong>{labels[page]}</strong></td>
            {editableRoles.map((role) => <td key={role} data-label={roleLabel(role)}>
              <AccessChoice role={role} page={page} current={current(role, page)}
                label={`${labels[page]} para ${roleLabel(role)}`} />
            </td>)}
          </tr>)}</tbody>
        </table></div>
        <Feedback state={permissionState} />
        <div className="distribution-submit"><Submit label="Salvar permissões" pendingLabel="Salvando…" /></div>
      </form>
    </section>
  </>;
}
