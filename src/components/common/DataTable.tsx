import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface Column<T> {
  header: string;
  cell: (row: T, index: number) => ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T, index: number) => string;
  empty?: string;
}

/** Compact bordered table matching the EDVANA listing screens. */
export function DataTable<T>({ columns, rows, rowKey, empty = "No records found." }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-panel">
            {columns.map((c, i) => (
              <th
                key={i}
                className={cn(
                  "border-b border-border px-4 py-3 text-left text-[12px] font-bold uppercase tracking-wide text-muted-foreground",
                  c.align === "right" && "text-right",
                  c.align === "center" && "text-center",
                  c.className,
                )}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-sm text-muted-foreground"
              >
                {empty}
              </td>
            </tr>
          ) : (
            rows.map((row, ri) => (
              <tr key={rowKey(row, ri)} className="odd:bg-background even:bg-panel/40">
                {columns.map((c, ci) => (
                  <td
                    key={ci}
                    className={cn(
                      "border-b border-border px-4 py-3 text-foreground",
                      c.align === "right" && "text-right",
                      c.align === "center" && "text-center",
                      c.className,
                    )}
                  >
                    {c.cell(row, ri)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
