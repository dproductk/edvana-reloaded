import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { ExamPaymentPanel } from "@/features/exam-registration/ExamPaymentPanel";

const TITLE = "Online Payment — EDVANA · GP Kolhapur";
const DESCRIPTION = "Pay the examination fee online through UPI, net banking or card.";

export const Route = createFileRoute("/student/exam-registration/payment")({
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
        title="Online Payment"
        crumbs={[{ label: "Home", to: "/student/dashboard" }, { label: "Exam Registration" }, { label: "Online Payment" }]}
      >
        <ExamPaymentPanel />
      </PageBanner>
    </div>
  );
}
