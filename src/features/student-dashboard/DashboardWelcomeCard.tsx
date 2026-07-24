import { useQuery } from "@tanstack/react-query";
import { studentService } from "@/services/student.service";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardWelcomeCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["student", "dashboard"],
    queryFn: () => studentService.getDashboard(),
  });

  if (isLoading || !data) {
    return (
      <div className="edvana-card p-8">
        <Skeleton className="h-6 w-72" />
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  return (
    <div className="edvana-card p-8">
      <h2 className="text-xl font-bold text-foreground">{data.welcomeTitle}</h2>
      <p className="mt-2 text-sm text-foreground">
        This is your centralized hub for managing your academic activities.
      </p>
      <ul className="mt-4 list-disc space-y-1.5 pl-6 text-sm text-foreground">
        {data.bullets.map((b, i) => (
          <li key={i}>{b.text}</li>
        ))}
      </ul>
    </div>
  );
}
