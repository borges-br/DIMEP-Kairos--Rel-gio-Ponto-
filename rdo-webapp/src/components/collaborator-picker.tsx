"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CloseIcon, PlusIcon, SearchIcon, UsersIcon } from "@/components/icons";

export type CollaboratorOption = {
  id: string;
  name: string;
  cpfDigits: string | null;
  jobTitle: string | null;
  projectMember: boolean;
};

function normalized(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
}

function maskCpf(value: string | null) {
  if (!value || value.length !== 11) return null;
  return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`;
}

export function CollaboratorPicker({
  collaborators,
  selectedIds,
  onChange,
}: {
  collaborators: CollaboratorOption[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const selected = collaborators.filter((item) => selectedIds.includes(item.id));
  const filtered = useMemo(() => {
    const query = normalized(search.trim());
    if (!query) return collaborators;
    const digits = search.replace(/\D/g, "");
    return collaborators.filter((item) => normalized(`${item.name} ${item.jobTitle || ""}`).includes(query)
      || Boolean(digits && item.cpfDigits?.includes(digits)));
  }, [collaborators, search]);

  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  function toggle(id: string) {
    onChange(selectedIds.includes(id) ? selectedIds.filter((item) => item !== id) : [...selectedIds, id]);
  }

  return <fieldset className="team-fieldset">
    <legend><UsersIcon /> Equipe nesta atividade <b>*</b></legend>
    <p className="field-help">Responsáveis da tarefa vindos do IMUV ficam pré-selecionados. Abra a lista para pesquisar por nome, CPF ou função.</p>
    <div className="team-selection-summary">
      <div>
        <strong>{selected.length} colaborador(es) selecionado(s)</strong>
        {selected.length ? <ul>{(showAll ? selected : selected.slice(0, 4)).map((member) => <li key={member.id}>
          <span><b>{member.name}</b>{member.jobTitle && <small>{member.jobTitle}</small>}</span>
          <button type="button" onClick={() => toggle(member.id)} aria-label={`Remover ${member.name}`}><CloseIcon /></button>
        </li>)}{selected.length > 4 && <li><button type="button" className="team-selection-more" onClick={() => setShowAll((value) => !value)} aria-expanded={showAll}>
          {showAll ? "Mostrar menos" : `+ ${selected.length - 4} colaborador(es)`}
        </button></li>}</ul> : <small>Ninguém selecionado.</small>}
      </div>
      <button type="button" className="button button-secondary" onClick={() => setOpen(true)}><PlusIcon />Adicionar colaborador</button>
    </div>

    {open && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section className="sync-modal collaborator-modal" role="dialog" aria-modal="true" aria-labelledby="collaborator-modal-title">
        <header><div><span className="eyebrow">EQUIPE DA ATIVIDADE</span><h2 id="collaborator-modal-title">Selecionar colaboradores</h2></div><button type="button" className="icon-button" onClick={() => setOpen(false)} aria-label="Fechar"><CloseIcon /></button></header>
        <div className="collaborator-search"><SearchIcon /><input ref={searchRef} className="input-field" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Pesquisar..." aria-label="Pesquisar por nome, CPF ou função" /><span>{filtered.length} resultado(s)</span></div>
        <div className="collaborator-scroll" role="list">
          {filtered.map((member) => {
            const cpf = maskCpf(member.cpfDigits);
            const checked = selectedIds.includes(member.id);
            return <label className={`collaborator-row${checked ? " selected" : ""}`} key={member.id} role="listitem">
              <input type="checkbox" checked={checked} onChange={() => toggle(member.id)} />
              <span><strong>{member.name}</strong><small>{[cpf ? `CPF ${cpf}` : null, member.jobTitle].filter(Boolean).join(" · ") || "Identificação funcional não informada"}</small></span>
              <em>{member.projectMember ? "Equipe do projeto" : "Cadastro de colaboradores"}</em>
            </label>;
          })}
          {!filtered.length && <p className="empty-copy">Nenhum colaborador corresponde à pesquisa.</p>}
        </div>
        <footer><span className="modal-selection-count">{selected.length} selecionado(s)</span><button type="button" className="button button-primary" onClick={() => setOpen(false)}>Concluir seleção</button></footer>
      </section>
    </div>}
  </fieldset>;
}
