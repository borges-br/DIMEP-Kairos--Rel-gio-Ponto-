import { Sk, SkBreadcrumbs, SkPage, SkPageHeader } from "@/components/skeleton";

export default function Loading() {
  return (
    <SkPage wide>
      <SkBreadcrumbs items={2} />
      <SkPageHeader />
      <div className="search-bar"><Sk className="sk-dot" /><Sk className="sk-line-md" /><Sk className="sk-button" /></div>
      <section className="employee-grid">
        {Array.from({ length: 4 }).map((_, index) => (
          <article className="employee-card" key={index}>
            <div className="employee-card-head">
              <Sk className="sk-square" />
              <div className="sk-grow">
                <Sk className="sk-line-md" />
                <Sk className="sk-line-sm" />
              </div>
            </div>
            <dl>
              {Array.from({ length: 4 }).map((_, cell) => (
                <div key={cell}>
                  <Sk className="sk-label" />
                  <Sk className="sk-line-lg" />
                </div>
              ))}
            </dl>
            <div className="card-link"><Sk className="sk-crumb-last" /><Sk className="sk-crumb" /></div>
          </article>
        ))}
      </section>
    </SkPage>
  );
}
