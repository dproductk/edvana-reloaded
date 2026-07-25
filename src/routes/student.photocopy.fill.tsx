import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { PhotocopyFillForm } from "@/features/photocopy/PhotocopyFillForm";

const TITLE = "Fill Photocopy & Verification Form — EDVANA · GP Kolhapur";
const DESCRIPTION = "Apply for photocopy, verification or revaluation of answer sheets.";

export const Route = createFileRoute("/student/photocopy/fill")({
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
        title="Fill Photocopy & Verification Form"
        crumbs={[{ label: "Home", to: "/student/dashboard" }, { label: "Photocopy & Verification" }, { label: "Fill Form" }]}
      >
        <PhotocopyFillForm />
      </PageBanner>
    </div>
  );
}
