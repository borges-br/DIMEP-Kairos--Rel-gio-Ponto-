import { Sk, SkBreadcrumbs, SkPage, SkPageHeader } from "@/components/skeleton";

export default function Loading() {
  return (
    <SkPage>
      <SkBreadcrumbs items={2} />
      <SkPageHeader />
      <section className="panel health-card">
        <div className="health-head">
          <div className="sk-grow">
            <Sk className="sk-eyebrow" />
            <Sk className="sk-h2" />
          </div>
          <Sk className="sk-button" />
        </div>
        <ul className="health-list">
          {Array.from({ length: 3 }).map((_, index) => (
            <li className="health-item checking" key={index}>
              <span className="health-flash" aria-hidden="true" />
              <div className="sk-grow">
                <Sk className="sk-line-sm" />
                <Sk className="sk-line-md" />
              </div>
            </li>
          ))}
        </ul>
      </section>
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
    </SkPage>
  );
}
