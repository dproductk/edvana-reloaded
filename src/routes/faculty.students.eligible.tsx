import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { EligibleStudentsTable } from "@/features/faculty/students/StudentsTables";

const TITLE = "Eligible Students — EDVANA · GP Kolhapur";
const DESCRIPTION = "Students eligible to register for the examination this term.";

export const Route = createFileRoute("/faculty/students/eligible")({
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
        title="Students"
        crumbs={[{ label: "Home", to: "/faculty/dashboard" }, { label: "Students" }, { label: "Eligible Students" }]}
      >
        <EligibleStudentsTable />
      </PageBanner>
    </div>
  );
}
