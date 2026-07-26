import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { ResultAnalysisTable } from "@/features/faculty/exams/ExamPanels";

const TITLE = "Result Analysis SUMMER 2025 — EDVANA · GP Kolhapur";
const DESCRIPTION = "Course-wise pass / fail statistics for SUMMER 2025.";

export const Route = createFileRoute("/faculty/result-analysis/summer-2025")({
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
        title="Result Analysis"
        crumbs={[{ label: "Home", to: "/faculty/dashboard" }, { label: "Result Analysis" }, { label: "SUMMER 2025" }]}
      >
        <ResultAnalysisTable term="SUMMER 2025" />
      </PageBanner>
    </div>
  );
}
