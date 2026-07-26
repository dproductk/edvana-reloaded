import { createFileRoute, Outlet } from "@tanstack/react-router";
import { FacultyLayout } from "@/app/layouts/FacultyLayout";

export const Route = createFileRoute("/faculty")({
  component: FacultySection,
});

function FacultySection() {
  return (
    <FacultyLayout>
      <Outlet />
    </FacultyLayout>
  );
}
