import type { Metadata } from "next";
import Image from "next/image";
import glbtechLogo from "@/assets/brand/glbtech-logo.png";
import interprojectLogo from "@/assets/brand/interproject-logo.png";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Entrar" };

export default async function LoginPage() {
  if (await getSession()) redirect("/");
  return <main className="login-page">
    <div className="login-backdrop" aria-hidden="true"><span className="login-scrim" /></div>
    <section className="login-shell" aria-label="Acesso ao RDO InterProject">
      <div className="login-brand">
        <Image src={interprojectLogo} alt="InterProject" priority unoptimized />
        <h1>Sistema interno</h1>
        <p>Acesse sua conta para gerenciar projetos e equipes de campo.</p>
      </div>
      <div className="login-card"><LoginForm /></div>
    </section>
    <footer className="login-footer">
      <Image src={glbtechLogo} alt="GLB Tech" className="glbtech-logo" loading="eager" unoptimized />
      <p>Sistema desenvolvido por <a href="https://borgesti.com" target="_blank" rel="noopener noreferrer">Borges TI</a></p>
    </footer>
  </main>;
}
