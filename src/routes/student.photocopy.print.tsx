import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { PrintableForm } from "@/features/shared/PrintableForm";

const TITLE = "Print Photocopy & Verification Form — EDVANA · GP Kolhapur";
const DESCRIPTION = "Preview and print your photocopy and verification application.";

export const Route = createFileRoute("/student/photocopy/print")({
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
        title="Print Photocopy & Verification Form"
        crumbs={[{ label: "Home", to: "/student/dashboard" }, { label: "Photocopy & Verification" }, { label: "Print Form" }]}
      >
        <PrintableForm variant="photocopy" kind="form" />
      </PageBanner>
    </div>
  );
}
