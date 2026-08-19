import { Sk, SkBreadcrumbs, SkPage, SkPageHeader } from "@/components/skeleton";

export default function Loading() {
  return (
    <SkPage>
      <SkBreadcrumbs items={2} />
      <SkPageHeader />
      <div className="settings-grid">
        {Array.from({ length: 3 }).map((_, index) => (
          <article className="integration-card" key={index}>
            <Sk className="sk-icon sk-mb" />
            <div className="integration-title">
              <div className="sk-grow">
                <Sk className="sk-label" />
                <Sk className="sk-h2" />
              </div>
              <Sk className="sk-chip" />
            </div>
            <div className="sk-summary-body">
              <Sk className="sk-line" />
              <Sk className="sk-line-md" />
            </div>
            <dl>
              {Array.from({ length: 3 }).map((_, row) => (
                <div key={row}><Sk className="sk-crumb-last" /><Sk className="sk-crumb" /></div>
              ))}
            </dl>
          </article>
        ))}
      </div>
      <section className="panel imuv-sync-panel">
        <div className="sk-stack">
          <Sk className="sk-eyebrow" />
          <Sk className="sk-h2" />
          <Sk className="sk-lead" />
        </div>
        <div className="sync-buttons">
          <Sk className="sk-button" />
          <Sk className="sk-button" />
        </div>
      </section>
      <section className="security-panel">
        <Sk className="sk-dot" />
        <div className="sk-grow">
          <Sk className="sk-h2" />
          <Sk className="sk-lead" />
          <Sk className="sk-line-sm" />
        </div>
      </section>
    </SkPage>
  );
}
