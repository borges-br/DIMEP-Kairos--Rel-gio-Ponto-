import { Sk, SkBreadcrumbs, SkFormSection, SkPage, SkPageHeader } from "@/components/skeleton";

export default function Loading() {
  return (
    <SkPage wide>
      <SkBreadcrumbs items={3} />
      <SkPageHeader />
      <div className="rdo-form">
        <SkFormSection fields={2} columns="two-columns" />
        <SkFormSection fields={4} columns="two-columns" />
        <SkFormSection fields={3} columns="three-columns" />
        {Array.from({ length: 3 }).map((_, index) => (
          <section className="optional-section" key={index}>
            <div className="sk-optional">
              <Sk />
              <Sk className="sk-square-sm" />
            </div>
          </section>
        ))}
        <section className="form-section final-section">
          <div className="submit-row">
            <div className="sk-grow">
              <Sk className="sk-h3" />
              <Sk className="sk-lead" />
            </div>
            <Sk className="sk-button-lg" />
          </div>
        </section>
      </div>
    </SkPage>
  );
}
