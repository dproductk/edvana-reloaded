import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { FacultyProfileTabs } from "@/features/faculty/profile/FacultyProfileTabs";

const TITLE = "Faculty Profile — EDVANA · GP Kolhapur";
const DESCRIPTION = "Update your department, qualification, academic, bank and document details.";

export const Route = createFileRoute("/faculty/profile")({
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
        title="View / Update Profile"
        crumbs={[{ label: "Home", to: "/faculty/dashboard" }, { label: "Your Profile" }]}
      >
        <FacultyProfileTabs />
      </PageBanner>
    </div>
  );
}
