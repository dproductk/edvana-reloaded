import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { FacultyDashboardCard } from "@/features/faculty/dashboard/FacultyDashboardCard";

const TITLE = "Faculty Dashboard — EDVANA · GP Kolhapur";
const DESCRIPTION = "Faculty panel home for Government Polytechnic Kolhapur.";

export const Route = createFileRoute("/faculty/dashboard")({
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
        title="Dashboard"
        crumbs={[{ label: "Home", to: "/faculty/dashboard" }, { label: "Dashboard" }]}
      >
        <FacultyDashboardCard />
      </PageBanner>
    </div>
  );
}
