import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { FeedbackForm } from "@/features/feedback/FeedbackForm";

const TITLE = "Endterm Faculty Feedback — EDVANA · GP Kolhapur";
const DESCRIPTION = "Rate your faculty on teaching parameters for the endterm cycle.";

export const Route = createFileRoute("/student/feedback/endterm")({
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
        title="Endterm Faculty Feedback"
        crumbs={[{ label: "Home", to: "/student/dashboard" }, { label: "Faculty Feedback" }, { label: "Endterm Feedback" }]}
      >
        <FeedbackForm title="Endterm Feedback" description="Feedback for the endterm teaching cycle." scope="faculty" />
      </PageBanner>
    </div>
  );
}
