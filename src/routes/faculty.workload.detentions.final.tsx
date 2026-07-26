import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { DetentionListTable } from "@/features/faculty/workload/Detentions";

const TITLE = "Final Detention List — EDVANA · GP Kolhapur";
const DESCRIPTION = "Confirmed final detention list with Excel export.";

export const Route = createFileRoute("/faculty/workload/detentions/final")({
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
        crumbs={[{ label: "Home", to: "/faculty/dashboard" }, { label: "Manage Detentions" }, { label: "Final Detention List" }]}
      >
        <DetentionListTable scope="final" />
      </PageBanner>
    </div>
  );
}
