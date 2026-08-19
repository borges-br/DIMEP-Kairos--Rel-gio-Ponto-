import { Sk, SkBreadcrumbs, SkDetailSummary, SkPage, SkPageHeader } from "@/components/skeleton";

export default function Loading() {
  return (
    <SkPage wide>
      <SkBreadcrumbs items={3} />
      <SkPageHeader withAction />
      <SkDetailSummary count={3} />
      <div className="employee-detail-grid">
        <section className="panel detail-box">
          <Sk className="sk-h2 sk-mb" />
          <dl className="profile-list">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index}><Sk className="sk-crumb" /><Sk className="sk-crumb-last" /></div>
            ))}
          </dl>
        </section>
        <section className="panel detail-box">
          <Sk className="sk-h2 sk-mb" />
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="history-link" key={index}>
              <span className="sk-grow"><Sk className="sk-line-md" /><Sk className="sk-line-xs" /></span>
              <Sk className="sk-crumb" />
            </div>
          ))}
        </section>
      </div>
      <section className="panel detail-box detail-wide">
        <Sk className="sk-h2 sk-mb" />
        <div className="history-table">
          <div className="history-row history-head"><Sk className="sk-label" /><Sk className="sk-label" /><Sk className="sk-label" /><Sk className="sk-label" /></div>
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="history-row" key={index}>
              <Sk className="sk-line-lg" />
              <span className="sk-grow"><Sk className="sk-line-lg" /><Sk className="sk-line-sm" /></span>
              <Sk className="sk-line-lg" />
              <Sk className="sk-line-lg" />
            </div>
          ))}
        </div>
      </section>
    </SkPage>
  );
}
