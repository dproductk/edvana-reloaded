import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { ExamHistorySearch } from "@/features/faculty/history/ExamHistorySearch";

const TITLE = "Exam & Result History — EDVANA · GP Kolhapur";
const DESCRIPTION = "Look up a student's exam and result history by enrollment number.";

export const Route = createFileRoute("/faculty/exam-result-history")({
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
        title="Exam & Result History"
        crumbs={[{ label: "Home", to: "/faculty/dashboard" }, { label: "Exam & Result History" }]}
      >
        <ExamHistorySearch />
      </PageBanner>
    </div>
  );
}
