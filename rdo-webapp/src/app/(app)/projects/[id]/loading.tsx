import { Sk, SkBreadcrumbs, SkDetailSummary, SkPage, SkPageHeader, SkPanelHeading } from "@/components/skeleton";

export default function Loading() {
  return (
    <SkPage wide>
      <SkBreadcrumbs items={3} />
      <SkPageHeader withAction />
      <SkDetailSummary count={2} />
      <section className="panel detail-panel">
        <SkPanelHeading />
        <div className="task-tabs">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="sk-tab" key={index}><Sk /><Sk /></div>
          ))}
        </div>
        <article className="selected-task-panel">
          <div className="sk-grow">
            <Sk className="sk-crumb-last" />
            <Sk className="sk-h3" />
            <Sk className="sk-lead" />
          </div>
          <Sk className="sk-button" />
        </article>
      </section>
    </SkPage>
  );
}
