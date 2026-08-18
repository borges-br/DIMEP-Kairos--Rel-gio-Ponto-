import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { ShieldIcon } from "@/components/icons";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Entrar" };

export default async function LoginPage() {
  if (await getSession()) redirect("/");
  return <main className="login-page">
    <section className="login-context">
      <div className="brand-lockup brand-light"><span className="brand-mark">R</span><span><strong>RDO</strong><small>INTERPROJECT</small></span></div>
      <div><span className="eyebrow light">OPERAÇÃO GLB TECH</span><h1>O campo registrado com clareza.</h1><p>Diários, equipe, horas e evidências conectados em um único fluxo auditável.</p></div>
      <div className="login-security"><ShieldIcon /><span><strong>Acesso protegido</strong><small>Sessão segura, permissões por perfil e trilha de auditoria.</small></span></div>
    </section>
    <section className="login-panel"><div className="login-card"><span className="eyebrow">PORTAL OPERACIONAL</span><h2>Bem-vindo</h2><p>Use suas credenciais corporativas para continuar.</p><LoginForm /></div><small className="login-domain">rdo.interproject.com.br</small></section>
  </main>;
}
