import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { AdmissionFeeTable } from "@/features/student-fees/AdmissionFeeTable";

const TITLE = "Admission Fee — EDVANA · GP Kolhapur";
const DESCRIPTION = "View admission and tuition fee particulars, payment status and receipts.";

export const Route = createFileRoute("/student/admission-fee")({
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
        title="Admission Fee"
        crumbs={[{ label: "Home", to: "/student/dashboard" }, { label: "Admission Fee" }]}
      >
        <AdmissionFeeTable />
      </PageBanner>
    </div>
  );
}
