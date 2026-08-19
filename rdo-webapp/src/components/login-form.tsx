"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction } from "@/app/actions/auth";
import { ArrowIcon, EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "@/components/icons";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button type="submit" className="button button-primary button-block button-large" disabled={pending}>
    {pending ? <><span className="button-spinner" aria-hidden="true" />Entrando…</> : <>Entrar no sistema <ArrowIcon /></>}
  </button>;
}

export function LoginForm() {
  const [state, action] = useActionState(loginAction, undefined);
  const [revealed, setRevealed] = useState(false);
  return (
    <form action={action} className="login-form">
      <div className="field-group">
        <label className="field-label" htmlFor="email"><MailIcon />E-mail corporativo</label>
        <input className="input-field" id="email" name="email" type="email" inputMode="email" autoComplete="username" maxLength={254} required placeholder="nome@interproject.com.br" />
      </div>
      <div className="field-group">
        <label className="field-label" htmlFor="password"><LockIcon />Senha</label>
        <div className="input-affix">
          <input className="input-field" id="password" name="password" type={revealed ? "text" : "password"} autoComplete="current-password" minLength={8} maxLength={256} required placeholder="••••••••" />
          <button type="button" className="affix-button" onClick={() => setRevealed((value) => !value)} aria-pressed={revealed} aria-label={revealed ? "Ocultar senha" : "Mostrar senha"}>
            {revealed ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>
      {state?.error && <p className="form-error" role="alert">{state.error}</p>}
      <SubmitButton />
      <p className="form-note">Acesso exclusivo a usuários autorizados. As ações ficam registradas para auditoria.</p>
    </form>
  );
}
