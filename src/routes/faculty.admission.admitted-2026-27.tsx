import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { AdmittedTable } from "@/features/faculty/admission/AdmissionTables";

const TITLE = "Admitted 2026-27 — EDVANA · GP Kolhapur";
const DESCRIPTION = "Students admitted for the 2026-27 session by year and division.";

export const Route = createFileRoute("/faculty/admission/admitted-2026-27")({
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
        title="Admission"
        crumbs={[{ label: "Home", to: "/faculty/dashboard" }, { label: "Admission" }, { label: "Admitted (2026-27)" }]}
      >
        <AdmittedTable session="2026-27" />
      </PageBanner>
    </div>
  );
}
