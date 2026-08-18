"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction } from "@/app/actions/auth";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button type="submit" className="button button-primary button-block" disabled={pending}>{pending ? "Entrando…" : "Entrar com segurança"}</button>;
}

export function LoginForm() {
  const [state, action] = useActionState(loginAction, undefined);
  return (
    <form action={action} className="login-form">
      <label className="field-label" htmlFor="email">E-mail corporativo</label>
      <input className="input-field" id="email" name="email" type="email" inputMode="email" autoComplete="username" maxLength={254} required placeholder="nome@empresa.com.br" />
      <label className="field-label" htmlFor="password">Senha</label>
      <input className="input-field" id="password" name="password" type="password" autoComplete="current-password" minLength={8} maxLength={256} required />
      {state?.error && <p className="form-error" role="alert">{state.error}</p>}
      <SubmitButton />
      <p className="form-note">Acesso exclusivo a usuários autorizados. As ações ficam registradas para auditoria.</p>
    </form>
  );
}
