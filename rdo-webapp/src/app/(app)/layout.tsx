import type { ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import { requireSession } from "@/lib/auth/session";
import { roleLabel } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const session = await requireSession();
  return <AppShell user={{ name: session.displayName, roles: session.roles.map(roleLabel) }}>{children}</AppShell>;
}
