import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { MarksEntryList } from "@/features/faculty/workload/MarksEntryList";

const TITLE = "Internal Marks Entry — EDVANA · GP Kolhapur";
const DESCRIPTION = "Enter UT1, UT2, FA-PR, SA-PR and SLA internal marks.";

export const Route = createFileRoute("/faculty/workload/marks-entry/fill")({
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
        title="Internal Marks Entry"
        crumbs={[{ label: "Home", to: "/faculty/dashboard" }, { label: "Internal Marks Entry" }]}
      >
        <MarksEntryList />
      </PageBanner>
    </div>
  );
}
