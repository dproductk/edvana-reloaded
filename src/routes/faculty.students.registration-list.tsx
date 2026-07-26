import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { RegistrationListTable } from "@/features/faculty/students/StudentsTables";

const TITLE = "Registration List — EDVANA · GP Kolhapur";
const DESCRIPTION = "Student-course registration list filtered by program and semester.";

export const Route = createFileRoute("/faculty/students/registration-list")({
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
        crumbs={[{ label: "Home", to: "/faculty/dashboard" }, { label: "Students" }, { label: "Registration List" }]}
      >
        <RegistrationListTable />
      </PageBanner>
    </div>
  );
}
