import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { DuplicateIdForm } from "@/features/duplicate-id/DuplicateIdForm";

const TITLE = "Duplicate ID Card — EDVANA · GP Kolhapur";
const DESCRIPTION = "Apply for a duplicate student identity card and track the request.";

export const Route = createFileRoute("/student/duplicate-id")({
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
        title="Duplicate ID Card"
        crumbs={[{ label: "Home", to: "/student/dashboard" }, { label: "Duplicate ID Card" }]}
      >
        <DuplicateIdForm />
      </PageBanner>
    </div>
  );
}
