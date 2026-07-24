import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { DashboardWelcomeCard } from "@/features/student-dashboard/DashboardWelcomeCard";

export const Route = createFileRoute("/student/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — EDVANA · GP Kolhapur" },
      {
        name: "description",
        content:
          "Your centralized hub to manage registration, exams, hall tickets, fees and results.",
      },
      { property: "og:title", content: "Dashboard — EDVANA · GP Kolhapur" },
      {
        property: "og:description",
        content:
          "Your centralized hub to manage registration, exams, hall tickets, fees and results.",
      },
    ],
  }),
  component: StudentDashboardPage,
});

function StudentDashboardPage() {
  return (
    <div className="pb-10">
      <PageBanner title="Dashboard" crumbs={[{ label: "Home", to: "/student/dashboard" }]}>
        <DashboardWelcomeCard />
      </PageBanner>
    </div>
  );
}
