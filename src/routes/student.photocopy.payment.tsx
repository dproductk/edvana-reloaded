import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { PhotocopyPaymentPanel } from "@/features/photocopy/PhotocopyPaymentPanel";

const TITLE = "Photocopy Online Payment — EDVANA · GP Kolhapur";
const DESCRIPTION = "Pay the photocopy and verification fee online.";

export const Route = createFileRoute("/student/photocopy/payment")({
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
        title="Photocopy Online Payment"
        crumbs={[{ label: "Home", to: "/student/dashboard" }, { label: "Photocopy & Verification" }, { label: "Online Payment" }]}
      >
        <PhotocopyPaymentPanel />
      </PageBanner>
    </div>
  );
}
