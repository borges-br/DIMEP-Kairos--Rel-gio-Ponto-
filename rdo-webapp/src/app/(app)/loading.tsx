import { Sk, SkMetricGrid, SkPage, SkPageHeader, SkPanelHeading } from "@/components/skeleton";

export default function Loading() {
  return (
    <SkPage>
      <SkPageHeader withAction />
      <SkMetricGrid count={4} />
      <div className="dashboard-grid">
        <article className="panel recent-panel">
          <SkPanelHeading />
          <div className="data-list">
            {Array.from({ length: 5 }).map((_, index) => (
              <div className="data-row" key={index}>
                <Sk className="sk-square" />
                <span className="data-copy sk-grow">
                  <Sk className="sk-line-md" />
                  <Sk className="sk-line-xs" />
                </span>
                <Sk className="sk-chip" />
              </div>
            ))}
          </div>
        </article>
        <aside className="panel next-action sk-stack">
          <Sk className="sk-icon" />
          <Sk className="sk-eyebrow" />
          <Sk className="sk-h2" />
          <Sk className="sk-line" />
          <Sk className="sk-line-lg" />
          <Sk className="sk-button-block" />
        </aside>
      </div>
    </SkPage>
  );
}
