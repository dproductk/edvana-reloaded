import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { PhotocopyConfirmPanel } from "@/features/photocopy/PhotocopyConfirmPanel";

const TITLE = "Confirm Photocopy Form — EDVANA · GP Kolhapur";
const DESCRIPTION = "Verify and confirm your photocopy and verification application.";

export const Route = createFileRoute("/student/photocopy/confirm")({
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
        title="Confirm Photocopy Form"
        crumbs={[{ label: "Home", to: "/student/dashboard" }, { label: "Photocopy & Verification" }, { label: "Confirm Form" }]}
      >
        <PhotocopyConfirmPanel />
      </PageBanner>
    </div>
  );
}
