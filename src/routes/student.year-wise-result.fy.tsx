import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { ResultView } from "@/features/result/ResultView";

const TITLE = "First Year Result — EDVANA · GP Kolhapur";
const DESCRIPTION = "Consolidated first year result with subject marks and grades.";

export const Route = createFileRoute("/student/year-wise-result/fy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="pb-10">
      <PageBanner
        title="First Year Result"
        crumbs={[{ label: "Home", to: "/student/dashboard" }, { label: "Year-Wise Result" }, { label: "FY Result" }]}
      >
        <ResultView scope="fy" title="First Year Result" />
      </PageBanner>
    </div>
  );
}
