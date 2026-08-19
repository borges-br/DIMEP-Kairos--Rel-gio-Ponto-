import { Sk, SkBreadcrumbs, SkPage, SkPageHeader } from "@/components/skeleton";

export default function Loading() {
  return (
    <SkPage>
      <SkBreadcrumbs items={2} />
      <SkPageHeader />
      <div className="search-box"><Sk className="sk-dot" /><Sk className="sk-line-md" /></div>
      <div className="project-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <article className="project-card" key={index}>
            <div className="project-card-top"><Sk className="sk-crumb" /><Sk className="sk-chip" /></div>
            <Sk className="sk-h3 sk-mt" />
            <Sk className="sk-line-sm" />
            <div className="project-meta"><Sk className="sk-crumb" /><Sk className="sk-crumb" /></div>
            <div className="card-link"><Sk className="sk-crumb-last" /><Sk className="sk-crumb" /></div>
          </article>
        ))}
      </div>
    </SkPage>
  );
}
