import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { RegisteredStudentsTable } from "@/features/faculty/students/StudentsTables";

const TITLE = "Registered Students — EDVANA · GP Kolhapur";
const DESCRIPTION = "Students who have completed exam registration.";

export const Route = createFileRoute("/faculty/students/registered")({
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
        crumbs={[{ label: "Home", to: "/faculty/dashboard" }, { label: "Students" }, { label: "Registered Students" }]}
      >
        <RegisteredStudentsTable />
      </PageBanner>
    </div>
  );
}
