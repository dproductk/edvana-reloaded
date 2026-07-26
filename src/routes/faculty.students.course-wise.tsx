import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { CourseWiseRegisteredTable } from "@/features/faculty/students/StudentsTables";

const TITLE = "Course-Wise Registered — EDVANA · GP Kolhapur";
const DESCRIPTION = "Course-by-course breakdown of exam registrations.";

export const Route = createFileRoute("/faculty/students/course-wise")({
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
        crumbs={[{ label: "Home", to: "/faculty/dashboard" }, { label: "Students" }, { label: "Course-Wise Registered" }]}
      >
        <CourseWiseRegisteredTable />
      </PageBanner>
    </div>
  );
}
