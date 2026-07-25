import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { PrintableForm } from "@/features/shared/PrintableForm";

const TITLE = "Exam Form Receipt Cum Acknowledgement — EDVANA · GP Kolhapur";
const DESCRIPTION = "Print the receipt cum acknowledgement for your examination form.";

export const Route = createFileRoute("/student/exam-registration/receipt")({
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
        title="Exam Form Receipt Cum Acknowledgement"
        crumbs={[{ label: "Home", to: "/student/dashboard" }, { label: "Exam Registration" }, { label: "Receipt" }]}
      >
        <PrintableForm variant="exam" kind="receipt" />
      </PageBanner>
    </div>
  );
}
