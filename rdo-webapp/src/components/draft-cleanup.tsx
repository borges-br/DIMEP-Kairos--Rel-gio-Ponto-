"use client";

import { useEffect } from "react";
import { clearDraft } from "@/lib/rdo-draft";

/**
 * O RDO foi gravado no servidor, então o rascunho local perdeu a razão de existir.
 * A limpeza acontece aqui — e não ao enviar o formulário — porque a criação
 * redireciona para esta página e um envio que falha precisa manter o rascunho.
 */
export function DraftCleanup() {
  useEffect(() => { clearDraft(); }, []);
  return null;
}
