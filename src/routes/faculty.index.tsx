import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/faculty/")({
  component: () => <Navigate to="/faculty/dashboard" />,
});
