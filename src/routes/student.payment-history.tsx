import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { PaymentHistoryTable } from "@/features/payments/PaymentHistoryTable";

const TITLE = "Payment History — EDVANA · GP Kolhapur";
const DESCRIPTION = "All online payments made through the EDVANA student portal.";

export const Route = createFileRoute("/student/payment-history")({
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
        title="Payment History"
        crumbs={[{ label: "Home", to: "/student/dashboard" }, { label: "Payment History" }]}
      >
        <PaymentHistoryTable />
      </PageBanner>
    </div>
  );
}
