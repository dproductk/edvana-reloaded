import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { OnlineExamList } from "@/features/online-exam/OnlineExamList";

const TITLE = "Online Exam — EDVANA · GP Kolhapur";
const DESCRIPTION = "See scheduled online examinations and start a live test.";

export const Route = createFileRoute("/student/online-exam")({
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
        title="Online Exam"
        crumbs={[{ label: "Home", to: "/student/dashboard" }, { label: "Online Exam" }]}
      >
        <OnlineExamList />
      </PageBanner>
    </div>
  );
}
