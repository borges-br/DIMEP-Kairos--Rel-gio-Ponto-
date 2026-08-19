import type { ReactNode } from "react";

/**
 * Blocos puramente visuais usados pelos arquivos `loading.tsx`.
 * Cada rota monta seu próprio esqueleto reaproveitando as classes reais da página,
 * de modo que a silhueta do carregamento corresponda ao conteúdo que será exibido.
 *
 * Todas as medidas vivem em `globals.css`: a CSP do proxy não permite estilos inline.
 */

export function Sk({ className = "" }: { className?: string }) {
  return <span className={`sk ${className}`} />;
}

export function SkRepeat({ count, className }: { count: number; className: string }) {
  return <>{Array.from({ length: count }).map((_, index) => <Sk key={index} className={className} />)}</>;
}

/** Cabeçalho de página: eyebrow, título, descrição e (opcionalmente) uma ação. */
export function SkPageHeader({ withAction = false }: { withAction?: boolean }) {
  return (
    <div className="sk-page-header">
      <div>
        <Sk className="sk-eyebrow" />
        <Sk className="sk-h1" />
        <Sk className="sk-lead" />
      </div>
      {withAction && <Sk className="sk-button" />}
    </div>
  );
}

export function SkBreadcrumbs({ items = 2 }: { items?: number }) {
  return (
    <div className="breadcrumbs">
      <div className="sk-row">
        {Array.from({ length: items }).map((_, index) => (
          <Sk key={index} className={index === items - 1 ? "sk-crumb-last" : "sk-crumb"} />
        ))}
      </div>
    </div>
  );
}

/** Envelope comum: marca a região como ocupada para leitores de tela. */
export function SkPage({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <div className={`page-container${wide ? " wide-page" : ""}`} data-skeleton aria-busy="true" aria-live="polite">
      <span className="sr-only">Carregando conteúdo da página…</span>
      {children}
    </div>
  );
}

export function SkMetricGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="metric-grid">
      {Array.from({ length: count }).map((_, index) => (
        <div className="metric-card" key={index}>
          <Sk className="sk-icon" />
          <div className="sk-grow">
            <Sk className="sk-num" />
            <Sk className="sk-line-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkDetailSummary({ count = 3 }: { count?: number }) {
  return (
    <div className="detail-summary">
      {Array.from({ length: count }).map((_, index) => (
        <article key={index}>
          <Sk className="sk-dot" />
          <span className="sk-grow">
            <Sk className="sk-label" />
            <Sk className="sk-value" />
          </span>
        </article>
      ))}
    </div>
  );
}

export function SkPanelHeading() {
  return (
    <div className="panel-heading">
      <div className="sk-grow">
        <Sk className="sk-h2" />
        <Sk className="sk-line-md" />
      </div>
      <Sk className="sk-crumb" />
    </div>
  );
}

export function SkFormFields({ count = 4, columns = "two-columns" }: { count?: number; columns?: string }) {
  return (
    <div className={`form-grid ${columns}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div className="field-group" key={index}>
          <Sk className="sk-label" />
          <Sk className="sk-field" />
        </div>
      ))}
    </div>
  );
}

export function SkFormSection({ fields = 4, columns = "two-columns" }: { fields?: number; columns?: string }) {
  return (
    <section className="form-section">
      <div className="section-heading">
        <Sk className="sk-square-sm" />
        <div className="sk-grow">
          <Sk className="sk-h2" />
          <Sk className="sk-lead" />
        </div>
      </div>
      <SkFormFields count={fields} columns={columns} />
    </section>
  );
}
