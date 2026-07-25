import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { FeedbackForm } from "@/features/feedback/FeedbackForm";

const TITLE = "Midterm Faculty Feedback — EDVANA · GP Kolhapur";
const DESCRIPTION = "Rate your faculty on teaching parameters for the midterm cycle.";

export const Route = createFileRoute("/student/feedback/midterm")({
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
        title="Midterm Faculty Feedback"
        crumbs={[{ label: "Home", to: "/student/dashboard" }, { label: "Faculty Feedback" }, { label: "Midterm Feedback" }]}
      >
        <FeedbackForm title="Midterm Feedback" description="Feedback for the midterm teaching cycle." scope="faculty" />
      </PageBanner>
    </div>
  );
}
