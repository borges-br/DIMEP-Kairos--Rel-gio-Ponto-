import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Entrar" };

export default async function LoginPage() {
  if (await getSession()) redirect("/");
  return <main className="login-page">
    <section className="login-shell" aria-label="Acesso ao RDO">
      <div className="brand-lockup login-brand"><span className="brand-mark">R</span><span><strong>RDO</strong><small>INTERPROJECT</small></span></div>
      <div className="login-card"><LoginForm /></div>
      <small className="login-domain">rdo.interproject.com.br</small>
    </section>
  </main>;
}
