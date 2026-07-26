import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { AddDetentionForm } from "@/features/faculty/workload/Detentions";

const TITLE = "Add Detention — EDVANA · GP Kolhapur";
const DESCRIPTION = "Add a per-student detention entry for a course.";

export const Route = createFileRoute("/faculty/workload/detentions/add")({
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
        title="Manage Detention"
        crumbs={[{ label: "Home", to: "/faculty/dashboard" }, { label: "Manage Detentions" }, { label: "Add Detention" }]}
      >
        <AddDetentionForm />
      </PageBanner>
    </div>
  );
}
