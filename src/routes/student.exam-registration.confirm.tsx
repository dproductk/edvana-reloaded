import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { ExamConfirmPanel } from "@/features/exam-registration/ExamConfirmPanel";

const TITLE = "Confirm Exam Form — EDVANA · GP Kolhapur";
const DESCRIPTION = "Verify and finally confirm your submitted examination form.";

export const Route = createFileRoute("/student/exam-registration/confirm")({
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
        title="Confirm Exam Form"
        crumbs={[{ label: "Home", to: "/student/dashboard" }, { label: "Exam Registration" }, { label: "Confirm Exam Form" }]}
      >
        <ExamConfirmPanel />
      </PageBanner>
    </div>
  );
}
