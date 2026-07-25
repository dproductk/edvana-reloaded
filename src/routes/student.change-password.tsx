import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { ChangePasswordForm } from "@/features/account/ChangePasswordForm";

const TITLE = "Change Password — EDVANA · GP Kolhapur";
const DESCRIPTION = "Update your EDVANA student portal account password.";

export const Route = createFileRoute("/student/change-password")({
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
        title="Change Password"
        crumbs={[{ label: "Home", to: "/student/dashboard" }, { label: "Change Password" }]}
      >
        <ChangePasswordForm />
      </PageBanner>
    </div>
  );
}
