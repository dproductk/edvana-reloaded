interface DetailGridProps {
  items: { label: string; value: string }[];
  columns?: 2 | 3;
}

export function DetailGrid({ items, columns = 3 }: DetailGridProps) {
  return (
    <dl
      className={`grid gap-x-8 gap-y-4 ${columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}
    >
      {items.map((it) => (
        <div key={it.label}>
          <dt className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
            {it.label}
          </dt>
          <dd className="mt-1 text-sm font-medium text-foreground">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
