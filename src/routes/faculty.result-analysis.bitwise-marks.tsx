import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { BitwiseMarksPanel } from "@/features/faculty/exams/ExamPanels";

const TITLE = "Bitwise Marks Download — EDVANA · GP Kolhapur";
const DESCRIPTION = "Download raw component-wise marks for a program and term.";

export const Route = createFileRoute("/faculty/result-analysis/bitwise-marks")({
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
        title="Bitwise Marks Download"
        crumbs={[{ label: "Home", to: "/faculty/dashboard" }, { label: "Result Analysis" }, { label: "Bitwise Marks Download" }]}
      >
        <BitwiseMarksPanel />
      </PageBanner>
    </div>
  );
}
