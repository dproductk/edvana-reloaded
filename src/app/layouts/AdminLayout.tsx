import { useState, type ReactNode } from "react";
import { Navigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppFooter } from "@/components/layout/AppFooter";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AdminProfileCard } from "@/components/layout/AdminProfileCard";
import { ADMIN_NAV } from "@/constants/admin-nav";
import { adminService } from "@/services/admin.service";
import { useAuth } from "@/store/auth";
import { Skeleton } from "@/components/ui/skeleton";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { data: profile } = useQuery({
    queryKey: ["admin", "profile"],
    queryFn: () => adminService.getProfile(),
    enabled: !!user,
  });

  if (!user) return <Navigate to="/login" />;
  if (user.baseProfile !== "admin" && user.baseProfile !== "administrative") {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-page">
      <AppHeader onToggleSidebar={() => setSidebarOpen((v) => !v)} />
      <div className="flex flex-1">
        {profile ? (
          <AppSidebar
            sections={ADMIN_NAV}
            header={<AdminProfileCard profile={profile} />}
            open={sidebarOpen}
          />
        ) : (
          <aside className="w-72 shrink-0 border-r border-border bg-sidebar p-4">
            <Skeleton className="mx-auto h-24 w-24 rounded-full" />
            <Skeleton className="mx-auto mt-4 h-4 w-40" />
            <Skeleton className="mx-auto mt-2 h-3 w-24" />
          </aside>
        )}
        <main className="flex min-w-0 flex-1 flex-col">
          <div className="min-w-0 flex-1">{children}</div>
          <AppFooter />
        </main>
      </div>
    </div>
  );
}
