import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { AdmissionEligibleTable } from "@/features/faculty/admission/AdmissionTables";

const TITLE = "Eligible Students SY — EDVANA · GP Kolhapur";
const DESCRIPTION = "Second year students eligible for admission in 2026-27.";

export const Route = createFileRoute("/faculty/admission/eligible-sy")({
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
        crumbs={[{ label: "Home", to: "/faculty/dashboard" }, { label: "Admission" }, { label: "Eligible (SY)" }]}
      >
        <AdmissionEligibleTable year="sy" />
      </PageBanner>
    </div>
  );
}
