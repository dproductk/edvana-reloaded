import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { ResultView } from "@/features/result/ResultView";

const TITLE = "Result SUMMER 2026 — EDVANA · GP Kolhapur";
const DESCRIPTION = "Subject-wise marks, grades, SGPA and CGPA for SUMMER 2026.";

export const Route = createFileRoute("/student/result")({
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
        title="Result SUMMER 2026"
        crumbs={[{ label: "Home", to: "/student/dashboard" }, { label: "Result" }]}
      >
        <ResultView scope="current" title="Result — SUMMER 2026" />
      </PageBanner>
    </div>
  );
}
