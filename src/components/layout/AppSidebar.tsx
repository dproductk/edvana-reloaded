import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { NavSection, NavGroup } from "@/constants/student-nav";
import { cn } from "@/lib/utils";
import { StudentProfileCard } from "@/components/layout/StudentProfileCard";
import type { StudentProfile } from "@/types/student";

interface AppSidebarProps {
  sections: NavSection[];
  profile: StudentProfile;
  open: boolean;
}

export function AppSidebar({ sections, profile, open }: AppSidebarProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      className={cn(
        "shrink-0 overflow-y-auto border-r border-border bg-sidebar transition-[width] duration-200",
        open ? "w-72" : "w-0",
      )}
      aria-hidden={!open}
    >
      <div className={cn("min-w-72 pb-6", !open && "pointer-events-none opacity-0")}>
        <StudentProfileCard profile={profile} />

        <nav className="mt-4 px-2">
          {sections.map((section, i) => (
            <div key={i} className="mb-2">
              {section.section && (
                <div className="mt-4 mb-1 px-4 text-[11px] font-bold tracking-wider text-muted-foreground">
                  {section.section}
                </div>
              )}
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <SidebarItem key={item.label} item={item} pathname={pathname} />
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}

function SidebarItem({ item, pathname }: { item: NavGroup; pathname: string }) {
  const hasChildren = !!item.children?.length;
  const childActive = hasChildren && item.children!.some((c) => pathname === c.to);
  const [expanded, setExpanded] = useState(childActive);
  const Icon = item.icon;

  if (hasChildren) {
    return (
      <li>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            childActive && "bg-sidebar-accent text-sidebar-accent-foreground",
          )}
        >
          <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="flex-1 text-left">{item.label}</span>
          <ChevronRight
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform",
              expanded && "rotate-90",
            )}
          />
        </button>
        {expanded && (
          <ul className="mt-0.5 mb-1 space-y-0.5 pl-9">
            {item.children!.map((leaf) => {
              const active = pathname === leaf.to;
              return (
                <li key={leaf.to}>
                  <Link
                    to={leaf.to}
                    className={cn(
                      "block rounded-md px-3 py-2 text-[13px] text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      active && "bg-sidebar-accent font-medium text-sidebar-accent-foreground",
                    )}
                  >
                    {leaf.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  }

  const active = pathname === item.to;
  return (
    <li>
      <Link
        to={item.to!}
        className={cn(
          "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          active && "bg-sidebar-accent font-medium text-sidebar-accent-foreground",
        )}
      >
        <Icon className={cn("h-4 w-4 shrink-0", active ? "text-sidebar-primary" : "text-muted-foreground")} />
        <span>{item.label}</span>
      </Link>
    </li>
  );
}
