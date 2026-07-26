import { useQuery } from "@tanstack/react-query";
import { facultyService } from "@/services/faculty.service";
import { Skeleton } from "@/components/ui/skeleton";

export function FacultyDashboardCard() {
  const { data } = useQuery({
    queryKey: ["faculty", "dashboard"],
    queryFn: () => facultyService.getDashboard(),
  });

  if (!data) {
    return (
      <div className="edvana-card p-8">
        <Skeleton className="h-6 w-72" />
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  return (
    <div className="edvana-card p-8">
      <h2 className="text-xl font-bold text-foreground">{data.welcomeTitle}</h2>
      <p className="mt-2 text-sm text-foreground">
        This is your centralized hub for managing teaching, evaluation and student records.
      </p>
      <ul className="mt-4 list-disc space-y-1.5 pl-6 text-sm text-foreground">
        {data.bullets.map((b, i) => (
          <li key={i}>{b.text}</li>
        ))}
      </ul>
    </div>
  );
}
