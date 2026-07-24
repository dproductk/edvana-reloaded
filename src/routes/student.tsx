import { createFileRoute, Outlet } from "@tanstack/react-router";
import { StudentLayout } from "@/app/layouts/StudentLayout";

export const Route = createFileRoute("/student")({
  component: StudentSection,
});

function StudentSection() {
  return (
    <StudentLayout>
      <Outlet />
    </StudentLayout>
  );
}
