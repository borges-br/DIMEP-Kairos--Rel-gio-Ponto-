import { Sk, SkBreadcrumbs, SkPage, SkPageHeader } from "@/components/skeleton";

export default function Loading() {
  return (
    <SkPage>
      <SkBreadcrumbs items={2} />
      <SkPageHeader withAction />
      <div className="rdo-list">
        {Array.from({ length: 6 }).map((_, index) => (
          <article className="rdo-card" key={index}>
            <Sk className="sk-date" />
            <div className="rdo-copy sk-grow">
              <Sk className="sk-crumb" />
              <Sk className="sk-line-md" />
              <Sk className="sk-line-sm" />
            </div>
            <Sk className="sk-chip" />
            <Sk className="sk-square" />
          </article>
        ))}
      </div>
    </SkPage>
  );
}
