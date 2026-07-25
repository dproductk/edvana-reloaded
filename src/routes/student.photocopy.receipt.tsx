import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { PrintableForm } from "@/features/shared/PrintableForm";

const TITLE = "Photocopy Receipt Cum Acknowledgement — EDVANA · GP Kolhapur";
const DESCRIPTION = "Print the receipt cum acknowledgement for your photocopy application.";

export const Route = createFileRoute("/student/photocopy/receipt")({
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
        title="Photocopy Receipt Cum Acknowledgement"
        crumbs={[{ label: "Home", to: "/student/dashboard" }, { label: "Photocopy & Verification" }, { label: "Receipt" }]}
      >
        <PrintableForm variant="photocopy" kind="receipt" />
      </PageBanner>
    </div>
  );
}
