import { useState, type ReactNode } from "react";
import { Navigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppFooter } from "@/components/layout/AppFooter";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { STUDENT_NAV } from "@/constants/student-nav";
import { studentService } from "@/services/student.service";
import { useAuth } from "@/store/auth";
import { Skeleton } from "@/components/ui/skeleton";

interface StudentLayoutProps {
  children: ReactNode;
}

export function StudentLayout({ children }: StudentLayoutProps) {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { data: profile } = useQuery({
    queryKey: ["student", "profile"],
    queryFn: () => studentService.getProfile(),
    enabled: !!user,
  });

  if (!user) return <Navigate to="/login" />;
  if (user.baseProfile !== "student") return <Navigate to="/login" />;

  return (
    <div className="flex min-h-screen flex-col bg-page">
      <AppHeader onToggleSidebar={() => setSidebarOpen((v) => !v)} />
      <div className="flex flex-1">
        {profile ? (
          <AppSidebar
            sections={STUDENT_NAV}
            header={<StudentProfileCard profile={profile} />}
            open={sidebarOpen}
          />

        ) : (
          <aside className="w-72 shrink-0 border-r border-border bg-sidebar p-4">
            <Skeleton className="mx-auto h-24 w-24 rounded-full" />
            <Skeleton className="mx-auto mt-4 h-4 w-40" />
            <Skeleton className="mx-auto mt-2 h-3 w-24" />
          </aside>
        )}
        <main className="flex flex-1 flex-col">
          <div className="flex-1">{children}</div>
          <AppFooter />
        </main>
      </div>
    </div>
  );
}
