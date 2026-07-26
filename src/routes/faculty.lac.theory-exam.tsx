import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { AssignedMarksheetsTable } from "@/features/faculty/exams/ExamPanels";

const TITLE = "LAC Theory Exam — EDVANA · GP Kolhapur";
const DESCRIPTION = "Answer-script marksheets assigned to you for evaluation.";

export const Route = createFileRoute("/faculty/lac/theory-exam")({
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
        title="LAC — Theory Exam"
        crumbs={[{ label: "Home", to: "/faculty/dashboard" }, { label: "LAC" }, { label: "Theory Exam" }]}
      >
        <AssignedMarksheetsTable />
      </PageBanner>
    </div>
  );
}
