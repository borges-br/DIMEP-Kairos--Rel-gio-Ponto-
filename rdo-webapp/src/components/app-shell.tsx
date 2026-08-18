"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logoutAction } from "@/app/actions/auth";
import { ClipboardIcon, ClockIcon, CloseIcon, HomeIcon, LogoutIcon, MenuIcon, ProjectsIcon, SettingsIcon, UsersIcon } from "@/components/icons";

const navigation = [
  { href: "/", label: "Visão geral", shortLabel: "Início", icon: HomeIcon },
  { href: "/projects", label: "Projetos", shortLabel: "Projetos", icon: ProjectsIcon },
  { href: "/employees", label: "Funcionários", shortLabel: "Equipe", icon: UsersIcon },
  { href: "/rdos", label: "Diários de campo", shortLabel: "RDOs", icon: ClipboardIcon },
  { href: "/hours", label: "Apontamentos", shortLabel: "Horas", icon: ClockIcon },
  { href: "/settings", label: "Configurações", shortLabel: "Config", icon: SettingsIcon },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function AppShell({ children, user }: { children: React.ReactNode; user: { name: string; roles: string[] } }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const initials = user.name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();

  return (
    <div className="app-frame">
      <header className="mobile-header">
        <Link href="/" className="brand-lockup" aria-label="RDO Interproject, início">
          <span className="brand-mark">R</span><span><strong>RDO</strong><small>INTERPROJECT</small></span>
        </Link>
        <button className="icon-button" type="button" onClick={() => setOpen(!open)} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open}>
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </header>

      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-head">
          <Link href="/" className="brand-lockup" onClick={() => setOpen(false)}>
            <span className="brand-mark">R</span><span><strong>RDO</strong><small>INTERPROJECT</small></span>
          </Link>
          <p>Diário de obra e horas</p>
        </div>
        <nav className="sidebar-nav" aria-label="Navegação principal">
          {navigation.map((item) => {
            const Icon = item.icon;
            return <Link key={item.href} href={item.href} className={isActive(pathname, item.href) ? "active" : ""} onClick={() => setOpen(false)}><Icon /><span>{item.label}</span></Link>;
          })}
        </nav>
        <div className="sidebar-user">
          <span className="avatar">{initials}</span>
          <span className="user-copy"><strong>{user.name}</strong><small>{user.roles.join(" · ") || "sem perfil"}</small></span>
          <form action={logoutAction}><button type="submit" className="icon-button" aria-label="Sair"><LogoutIcon /></button></form>
        </div>
      </aside>
      {open && <button type="button" className="sidebar-backdrop" onClick={() => setOpen(false)} aria-label="Fechar menu" />}

      <main className="app-main">{children}</main>

      <nav className="bottom-nav" aria-label="Navegação para celular">
        {navigation.map((item) => {
          const Icon = item.icon;
          return <Link key={item.href} href={item.href} className={isActive(pathname, item.href) ? "active" : ""}><Icon /><span>{item.shortLabel}</span></Link>;
        })}
      </nav>
    </div>
  );
}
