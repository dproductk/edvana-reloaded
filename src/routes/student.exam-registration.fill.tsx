import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { ExamFormFill } from "@/features/exam-registration/ExamFormFill";

const TITLE = "Fill Exam Form — EDVANA · GP Kolhapur";
const DESCRIPTION = "Select subjects and submit your examination form for the current term.";

export const Route = createFileRoute("/student/exam-registration/fill")({
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
        title="Fill Exam Form"
        crumbs={[{ label: "Home", to: "/student/dashboard" }, { label: "Exam Registration" }, { label: "Fill Exam Form" }]}
      >
        <ExamFormFill />
      </PageBanner>
    </div>
  );
}
