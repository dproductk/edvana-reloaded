import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/layout/PageBanner";
import { ProfileForm } from "@/features/student-profile/ProfileForm";

const TITLE = "View / Update Profile — EDVANA · GP Kolhapur";
const DESCRIPTION = "Review and update your personal, contact, academic and bank details.";

export const Route = createFileRoute("/student/profile")({
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
        title="View / Update Profile"
        crumbs={[{ label: "Home", to: "/student/dashboard" }, { label: "Profile" }]}
      >
        <ProfileForm />
      </PageBanner>
    </div>
  );
}
