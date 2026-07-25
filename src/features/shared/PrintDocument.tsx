import type { ReactNode } from "react";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/common/SectionCard";
import { APP } from "@/constants/app";

interface PrintDocumentProps {
  cardTitle: string;
  documentTitle: string;
  subtitle?: string;
  children: ReactNode;
}

/** Printable A4-style document preview with a print action. */
export function PrintDocument({
  cardTitle,
  documentTitle,
  subtitle,
  children,
}: PrintDocumentProps) {
  return (
    <SectionCard
      title={cardTitle}
      actions={
        <Button variant="outline" onClick={() => window.print()}>
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
      }
    >
      <div className="mx-auto max-w-3xl rounded-lg border border-dashed border-border bg-background p-8">
        <div className="border-b border-border pb-4 text-center">
          <p className="text-base font-bold tracking-wide text-foreground">{APP.collegeName}</p>
          <p className="mt-1 text-sm font-semibold text-brand">{documentTitle}</p>
          {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="pt-6">{children}</div>
        <div className="mt-10 flex items-end justify-between text-xs text-muted-foreground">
          <span>Generated on {new Date().toLocaleDateString("en-IN")}</span>
          <div className="text-center">
            <div className="h-10" />
            <span className="border-t border-border pt-1">Signature of Student</span>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
