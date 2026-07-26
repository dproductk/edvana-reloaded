import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { NilDetentionListTable } from "@/features/faculty/workload/Detentions";

const TITLE = "Nil Detention List — EDVANA · GP Kolhapur";
const DESCRIPTION = "All nil-detention declarations submitted by faculty.";

export const Route = createFileRoute("/faculty/workload/detentions/nil-list")({
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
        crumbs={[{ label: "Home", to: "/faculty/dashboard" }, { label: "Manage Nil Detentions" }, { label: "Nil Detention List" }]}
      >
        <NilDetentionListTable />
      </PageBanner>
    </div>
  );
}
