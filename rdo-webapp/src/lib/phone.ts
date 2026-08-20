/**
 * Telefone brasileiro para E.164, formato exigido pelo CHECK de app_users
 * (`^\+[1-9][0-9]{7,14}$`).
 *
 * Aceita o que a pessoa realmente digita — "(19) 99999-8888", "19999998888",
 * "+55 19 99999-8888" — porque exigir o formato internacional na mao era a
 * origem da recusa no cadastro.
 */
export function toE164BR(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return null;

  // Ja veio internacional e nao e Brasil: preserva como esta.
  if (trimmed.startsWith("+") && !digits.startsWith("55")) {
    return /^[1-9][0-9]{7,14}$/.test(digits) ? `+${digits}` : null;
  }

  // 55 + DDD + numero. So tratamos como codigo do pais quando o resto tem
  // tamanho de telefone nacional, senao "5511..." de um fixo viraria pais.
  const national = digits.startsWith("55") && (digits.length === 12 || digits.length === 13)
    ? digits.slice(2)
    : digits;

  // DDD (2) + 8 (fixo) ou 9 (movel) digitos.
  if (!/^[1-9][0-9]{9,10}$/.test(national)) return null;
  return `+55${national}`;
}

/** Mascara de exibicao enquanto a pessoa digita. */
export function formatPhoneBR(input: string): string {
  const digits0 = input.replace(/\D/g, "");
  // Numero estrangeiro explicito nao leva mascara brasileira: "+1 202 555 0143"
  // viraria "(12) 02555-0143". Deixa a pessoa digitar como quiser.
  if (input.trim().startsWith("+") && !digits0.startsWith("55")) return input.trim();
  const digits = digits0.replace(/^55/, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2);
  if (rest.length <= 4) return `(${ddd}) ${rest}`;
  const split = rest.length > 8 ? 5 : 4;
  return `(${ddd}) ${rest.slice(0, split)}-${rest.slice(split)}`;
}
