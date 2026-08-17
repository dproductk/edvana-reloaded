import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AdminLayout } from "@/app/layouts/AdminLayout";

export const Route = createFileRoute("/admin")({
  component: AdminSection,
});

function AdminSection() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
