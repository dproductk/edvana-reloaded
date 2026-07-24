import { Link } from "@tanstack/react-router";
import { Fragment, type ReactNode } from "react";

export interface Crumb {
  label: string;
  to?: string;
}

interface PageBannerProps {
  title: string;
  crumbs: Crumb[];
  children?: ReactNode;
}

/**
 * Blue page banner used at the top of every content page in EDVANA.
 * Renders breadcrumb + large H1, then hosts a white content card that
 * overlaps the bottom of the banner (via negative margin on children).
 */
export function PageBanner({ title, crumbs, children }: PageBannerProps) {
  return (
    <div>
      <div className="edvana-banner">
        <nav aria-label="Breadcrumb" className="mb-1 text-sm text-brand-foreground/80">
          {crumbs.map((c, i) => (
            <Fragment key={i}>
              {c.to ? (
                <Link to={c.to} className="hover:underline">
                  {c.label}
                </Link>
              ) : (
                <span>{c.label}</span>
              )}
              {i < crumbs.length - 1 && <span className="mx-1.5">›</span>}
            </Fragment>
          ))}
        </nav>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      </div>
      {children && <div className="-mt-14 px-8">{children}</div>}
    </div>
  );
}
