import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { FeedbackForm } from "@/features/feedback/FeedbackForm";

const TITLE = "Facility Feedback Form — EDVANA · GP Kolhapur";
const DESCRIPTION = "Share feedback on classrooms, labs, library and campus amenities.";

export const Route = createFileRoute("/student/facility-feedback")({
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
        title="Facility Feedback Form"
        crumbs={[{ label: "Home", to: "/student/dashboard" }, { label: "Facility Feedback" }]}
      >
        <FeedbackForm title="Facility Feedback" description="Rate the institute facilities and amenities." scope="facility" />
      </PageBanner>
    </div>
  );
}
