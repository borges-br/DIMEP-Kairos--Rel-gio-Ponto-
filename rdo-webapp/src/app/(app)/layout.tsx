import type { ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import { roleLabel } from "@/lib/format";
import { getPageAccess, pageKeys } from "@/lib/permissions";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const { session, access } = await getPageAccess();
  const visiblePages = pageKeys.filter((page) => access[page] !== "none");
  return <AppShell
    user={{ name: session.displayName, roles: session.roles.map(roleLabel) }}
    visiblePages={visiblePages}
  >{children}</AppShell>;
}
