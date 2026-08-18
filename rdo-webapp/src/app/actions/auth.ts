"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { authenticate } from "@/lib/auth/authenticate";
import { createSession, revokeCurrentSession } from "@/lib/auth/session";

export type LoginState = { error?: string } | undefined;

const loginSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(8).max(256),
});

export async function loginAction(_state: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: "Informe um e-mail e uma senha válidos." };

  const requestHeaders = await headers();
  const user = await authenticate(parsed.data.email, parsed.data.password, {
    ipAddress: requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || null,
    userAgent: requestHeaders.get("user-agent"),
  });
  if (!user) return { error: "Credenciais inválidas ou acesso temporariamente bloqueado." };

  await createSession(user);
  redirect("/");
}

export async function logoutAction() {
  await revokeCurrentSession();
  redirect("/login");
}
