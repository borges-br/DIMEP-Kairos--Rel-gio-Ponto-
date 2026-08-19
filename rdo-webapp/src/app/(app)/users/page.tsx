import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { UsersAdmin } from "@/components/users-admin";
import { getUsersAdminData } from "@/lib/dal";
import { requirePageAccess } from "@/lib/permissions";

export const metadata: Metadata = { title: "Usuários" };

export default async function UsersPage() {
  await requirePageAccess("users", "write");
  const { session, users, permissions, collaborators } = await getUsersAdminData();
  return <div className="page-container wide-page">
    <Breadcrumbs items={[{ label: "Visão geral", href: "/" }, { label: "Usuários" }]} />
    <header className="page-header"><div><span className="eyebrow">ACESSO E PERMISSÕES</span><h1>Usuários</h1><p>Quem entra no sistema, com qual perfil e o que cada perfil enxerga.</p></div></header>
    <UsersAdmin users={users} permissions={permissions} collaborators={collaborators} currentUserId={session.userId} />
  </div>;
}
