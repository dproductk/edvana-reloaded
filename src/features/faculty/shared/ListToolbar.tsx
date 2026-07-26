import type { ReactNode } from "react";
import { Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ListToolbarProps {
  entries: number;
  onEntriesChange: (n: number) => void;
  search: string;
  onSearchChange: (s: string) => void;
  onExport?: () => void;
  children?: ReactNode;
}

/** entries-per-page selector + search box (+ optional Export to Excel). */
export function ListToolbar({
  entries,
  onEntriesChange,
  search,
  onSearchChange,
  onExport,
  children,
}: ListToolbarProps) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Show</span>
          <select
            aria-label="Entries per page"
            value={entries}
            onChange={(e) => onEntriesChange(Number(e.target.value))}
            className="h-9 rounded-md border border-input bg-background px-2 text-sm"
          >
            {[10, 25, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <span className="text-xs text-muted-foreground">entries</span>
        </div>
        {children}
      </div>

      <div className="flex items-end gap-3">
        {onExport && (
          <Button type="button" variant="outline" size="sm" onClick={onExport}>
            <Download className="mr-2 h-4 w-4" />
            Export to Excel
          </Button>
        )}
        <div className="space-y-1.5">
          <Label htmlFor="list-search" className="sr-only">
            Search
          </Label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="list-search"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search"
              className="h-9 w-56 pl-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  disabled?: boolean;
}

export function FilterSelect({
  label,
  value,
  onChange,
  options,
  placeholder = "All",
  disabled,
}: FilterSelectProps) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">
        {label} <span className="text-destructive">*</span>
      </Label>
      <select
        aria-label={label}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-56 rounded-md border border-input bg-background px-2 text-sm disabled:opacity-50"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
