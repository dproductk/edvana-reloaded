import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { QuestionBankTable } from "@/features/faculty/exams/ExamPanels";

const TITLE = "Question Bank — EDVANA · GP Kolhapur";
const DESCRIPTION = "Manage MCQ question bank submissions and approval status.";

export const Route = createFileRoute("/faculty/online-exam/question-bank")({
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
        title="Question Bank"
        crumbs={[{ label: "Home", to: "/faculty/dashboard" }, { label: "Manage Online Exam" }, { label: "Question Bank" }]}
      >
        <QuestionBankTable />
      </PageBanner>
    </div>
  );
}
