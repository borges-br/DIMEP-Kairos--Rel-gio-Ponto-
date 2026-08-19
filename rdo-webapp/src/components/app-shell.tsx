"use client";

import Image from "next/image";
import interprojectLogo from "@/assets/brand/interproject-logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { logoutAction } from "@/app/actions/auth";
import {
  ClipboardListIcon,
  CalendarRangeIcon,
  Clock3Icon,
  FolderKanbanIcon,
  LayoutDashboardIcon,
  LogoutIcon,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
  SettingsIcon,
  ShieldIcon,
  UsersIcon,
} from "@/components/icons";

const navigation = [
  { href: "/", label: "Visão geral", icon: LayoutDashboardIcon, page: "dashboard" },
  { href: "/projects", label: "Projetos", icon: FolderKanbanIcon, page: "projects" },
  { href: "/employees", label: "Colaboradores", icon: UsersIcon, page: "employees" },
  { href: "/rdos", label: "Diário de campo", icon: ClipboardListIcon, page: "rdos" },
  { href: "/distribution", label: "Distribuir trabalho", icon: CalendarRangeIcon, page: "distribution" },
  { href: "/hours", label: "Apontamentos", icon: Clock3Icon, page: "hours" },
  { href: "/users", label: "Usuários", icon: ShieldIcon, page: "users" },
  { href: "/settings", label: "Configurações", icon: SettingsIcon, page: "settings" },
];

/** Configurações fica no rodapé da barra; as demais entram na navegação principal. */
const primaryNavigation = navigation.filter((item) => item.page !== "settings");
const settingsItem = navigation[navigation.length - 1];

const COLLAPSE_KEY = "rdo:sidebar-collapsed";
const COLLAPSE_EVENT = "rdo:sidebar-collapsed-change";

/** Preferência de barra recolhida — lida do localStorage sem quebrar a hidratação. */
function subscribeToCollapse(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(COLLAPSE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(COLLAPSE_EVENT, onChange);
  };
}

function readCollapse() {
  try {
    return window.localStorage.getItem(COLLAPSE_KEY) === "1";
  } catch {
    return false;
  }
}

function readCollapseOnServer() {
  return false;
}

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function NavLink({ item, collapsed, pathname }: { item: (typeof navigation)[number]; collapsed: boolean; pathname: string }) {
  const Icon = item.icon;
  const active = isActive(pathname, item.href);
  return (
    <Link href={item.href} className={`nav-link${active ? " active" : ""}`} aria-current={active ? "page" : undefined}>
      <span className="nav-icon"><Icon /></span>
      <span className={collapsed ? "nav-label sr-only" : "nav-label"}>{item.label}</span>
      {collapsed && <span className="nav-tip" aria-hidden="true">{item.label}</span>}
    </Link>
  );
}

export function AppShell({ children, user, visiblePages }: {
  children: React.ReactNode;
  user: { name: string; roles: string[] };
  /** Páginas que o perfil enxerga; a barra nunca oferece um caminho bloqueado. */
  visiblePages: string[];
}) {
  const pathname = usePathname();
  const collapsed = useSyncExternalStore(subscribeToCollapse, readCollapse, readCollapseOnServer);
  const [animated, setAnimated] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const initials = user.name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  const rolesLabel = user.roles.join(" · ") || "sem perfil";

  useEffect(() => {
    if (!accountOpen) return;
    function onPointerDown(event: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) setAccountOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setAccountOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [accountOpen]);

  function toggleSidebar() {
    setAnimated(true);
    try {
      window.localStorage.setItem(COLLAPSE_KEY, collapsed ? "0" : "1");
    } catch {
      /* armazenamento indisponível: preferência não é preservada */
    }
    window.dispatchEvent(new Event(COLLAPSE_EVENT));
  }

  return (
    <div className={`app-frame${collapsed ? " sidebar-collapsed" : ""}${animated ? " shell-ready" : ""}`}>
      <header className="mobile-header">
        <Link href="/" className="brand-lockup" aria-label="InterProject, ir para a visão geral">
          <Image src={interprojectLogo} alt="InterProject" className="brand-logo" priority unoptimized />
        </Link>
        <div className="account-menu" ref={accountRef}>
          <button
            type="button"
            className="avatar avatar-button"
            onClick={() => setAccountOpen((open) => !open)}
            aria-expanded={accountOpen}
            aria-haspopup="menu"
            aria-label={`Conta de ${user.name}`}
          >
            {initials}
          </button>
          {accountOpen && (
            <div className="account-popover" role="menu">
              <div className="account-identity">
                <strong>{user.name}</strong>
                <small>{rolesLabel}</small>
              </div>
              <Link href="/settings" className="account-action" role="menuitem" onClick={() => setAccountOpen(false)}>
                <SettingsIcon />
                Configurações
              </Link>
              <form action={logoutAction}>
                <button type="submit" className="account-action account-action-danger" role="menuitem">
                  <LogoutIcon />
                  Sair da conta
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      <aside className="sidebar" aria-label="Barra lateral">
        <div className="sidebar-head">
          <Link href="/" className="brand-lockup" aria-label="InterProject, ir para a visão geral">
            <Image src={interprojectLogo} alt="InterProject" className="brand-logo" priority unoptimized />
          </Link>
          <p className="sidebar-tagline">Sistema interno</p>
          <button
            type="button"
            className="sidebar-toggle"
            onClick={toggleSidebar}
            aria-label={collapsed ? "Expandir barra lateral" : "Recolher barra lateral"}
            aria-pressed={collapsed}
          >
            {collapsed ? <PanelLeftOpenIcon /> : <PanelLeftCloseIcon />}
            <span className="nav-tip" aria-hidden="true">{collapsed ? "Expandir" : "Recolher"}</span>
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="Navegação principal">
          {primaryNavigation.filter((item) => visiblePages.includes(item.page))
            .map((item) => <NavLink key={item.href} item={item} collapsed={collapsed} pathname={pathname} />)}
        </nav>

        <div className="sidebar-foot">
          {visiblePages.includes("settings")
            && <NavLink item={settingsItem} collapsed={collapsed} pathname={pathname} />}
          <div className="sidebar-user">
            <span className="avatar" aria-hidden="true">{initials}</span>
            <span className="user-copy">
              <strong>{user.name}</strong>
              <small>{rolesLabel}</small>
            </span>
            <form action={logoutAction}>
              <button type="submit" className="icon-button sidebar-logout" aria-label={`Sair da conta de ${user.name}`}>
                <LogoutIcon />
                <span className="nav-tip" aria-hidden="true">Sair</span>
              </button>
            </form>
          </div>
        </div>
      </aside>

      <main className="app-main">{children}</main>

      <nav className="bottom-nav" aria-label="Navegação principal">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(pathname, item.href);
          return (
            <Link key={item.href} href={item.href} className={active ? "active" : ""} aria-current={active ? "page" : undefined}>
              <Icon />
              <span className="sr-only">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
