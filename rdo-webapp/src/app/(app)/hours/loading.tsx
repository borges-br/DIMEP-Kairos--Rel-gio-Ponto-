import { Sk, SkBreadcrumbs, SkPage, SkPageHeader } from "@/components/skeleton";

const headers = ["Data", "Colaborador", "Origem / etapa", "Tempo", "Alocações", "Conciliação"];

export default function Loading() {
  return (
    <SkPage>
      <SkBreadcrumbs items={2} />
      <SkPageHeader withAction />
      <div className="info-banner">
        <Sk className="sk-dot" />
        <div className="sk-grow">
          <Sk className="sk-line-md" />
          <Sk className="sk-lead" />
        </div>
      </div>
      <div className="table-shell">
        <table className="data-table">
          <thead>
            <tr>{headers.map((label) => <th key={label}><Sk className="sk-label" /></th>)}</tr>
          </thead>
          <tbody>
            {Array.from({ length: 8 }).map((_, row) => (
              <tr key={row}>
                {headers.map((label) => (
                  <td key={label} data-label={label}><Sk className="sk-line-sm" /></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SkPage>
  );
}
