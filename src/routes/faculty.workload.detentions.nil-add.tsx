import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { AddNilDetentionForm } from "@/features/faculty/workload/Detentions";

const TITLE = "Add Nil Detention — EDVANA · GP Kolhapur";
const DESCRIPTION = "Declare a division and course as having no detained students.";

export const Route = createFileRoute("/faculty/workload/detentions/nil-add")({
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
        title="Manage Nil Detention"
        crumbs={[{ label: "Home", to: "/faculty/dashboard" }, { label: "Manage Nil Detentions" }, { label: "Add Nil Detention" }]}
      >
        <AddNilDetentionForm />
      </PageBanner>
    </div>
  );
}
