import { Sk, SkBreadcrumbs, SkDetailSummary, SkPage, SkPageHeader, SkPanelHeading } from "@/components/skeleton";

export default function Loading() {
  return (
    <SkPage wide>
      <SkBreadcrumbs items={3} />
      <SkPageHeader withAction />
      <SkDetailSummary count={3} />
      <section className="panel detail-panel">
        <SkPanelHeading />
        <div className="activity-summary-list">
          {Array.from({ length: 3 }).map((_, index) => (
            <article key={index}>
              <Sk className="sk-square-sm" />
              <div className="sk-grow">
                <Sk className="sk-crumb-last" />
                <Sk className="sk-h3" />
                <Sk className="sk-lead" />
                <Sk className="sk-line-md" />
              </div>
            </article>
          ))}
        </div>
      </section>
      <div className="detail-grid">
        {Array.from({ length: 2 }).map((_, index) => (
          <section className="panel detail-box" key={index}>
            <Sk className="sk-h2 sk-mb" />
            <div className="sk-stack">
              <Sk className="sk-line-lg" />
              <Sk className="sk-line-md" />
              <Sk className="sk-line-sm" />
            </div>
          </section>
        ))}
      </div>
      <section className="panel detail-box detail-wide">
        <Sk className="sk-h2" />
        <Sk className="sk-lead" />
        <div className="media-gallery">
          {Array.from({ length: 2 }).map((_, index) => (
            <div className="media-card" key={index}>
              <Sk className="sk-thumb" />
              <div className="sk-grow">
                <Sk className="sk-line-md" />
                <Sk className="sk-line-xs" />
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="workflow-panel">
        <div className="sk-stack">
          <Sk className="sk-h2" />
          <Sk className="sk-lead" />
        </div>
        <div className="workflow-actions">
          <Sk className="sk-button" />
          <Sk className="sk-button" />
        </div>
      </section>
    </SkPage>
  );
}
