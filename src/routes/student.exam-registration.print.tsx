import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { PrintableForm } from "@/features/shared/PrintableForm";

const TITLE = "Print Exam Form — EDVANA · GP Kolhapur";
const DESCRIPTION = "Preview and print your confirmed examination form.";

export const Route = createFileRoute("/student/exam-registration/print")({
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
        title="Print Exam Form"
        crumbs={[{ label: "Home", to: "/student/dashboard" }, { label: "Exam Registration" }, { label: "Print Exam Form" }]}
      >
        <PrintableForm variant="exam" kind="form" />
      </PageBanner>
    </div>
  );
}
