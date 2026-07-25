import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { SectionCard } from "@/components/common/SectionCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { studentService } from "@/services/student.service";
import type { FeedbackQuestion } from "@/types/student-modules";

const RATINGS = ["Excellent", "Very Good", "Good", "Average", "Poor"];

interface FeedbackFormProps {
  title: string;
  description: string;
  scope: "faculty" | "facility";
}

/** Ratings-grid feedback form shared by midterm, endterm and facility feedback. */
export function FeedbackForm({ title, description, scope }: FeedbackFormProps) {
  const { data: questions } = useQuery<FeedbackQuestion[]>({
    queryKey: ["student", "feedback-questions", scope],
    queryFn: () =>
      scope === "faculty"
        ? studentService.getFeedbackQuestions()
        : studentService.getFacilityQuestions(),
  });
  const { data: faculty } = useQuery({
    queryKey: ["student", "feedback-faculty"],
    queryFn: () => studentService.getFeedbackFaculty(),
    enabled: scope === "faculty",
  });

  const [selectedFaculty, setSelectedFaculty] = useState<string>("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [remarks, setRemarks] = useState("");

  const submit = useMutation({
    mutationFn: () => studentService.submitFeedback(),
    onSuccess: () => {
      toast.success("Feedback submitted. Thank you!");
      setAnswers({});
      setRemarks("");
    },
    onError: () => toast.error("Could not submit feedback."),
  });

  const allAnswered =
    !!questions &&
    questions.every((q) => answers[q.id]) &&
    (scope !== "faculty" || !!selectedFaculty);

  if (!questions) {
    return (
      <SectionCard title={title} description={description}>
        <div className="space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard title={title} description={description}>
      {scope === "faculty" && (
        <div className="mb-6 max-w-md">
          <label className="mb-1.5 block text-sm font-semibold text-foreground">
            Select faculty / subject
          </label>
          <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
            <SelectTrigger>
              <SelectValue placeholder="Choose faculty" />
            </SelectTrigger>
            <SelectContent>
              {(faculty ?? []).map((f) => (
                <SelectItem key={f.id} value={f.id}>
                  {f.facultyName} — {f.subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-panel">
              <th className="w-12 border-b border-border px-4 py-3 text-left text-[12px] font-bold uppercase tracking-wide text-muted-foreground">
                #
              </th>
              <th className="border-b border-border px-4 py-3 text-left text-[12px] font-bold uppercase tracking-wide text-muted-foreground">
                Parameter
              </th>
              <th className="w-64 border-b border-border px-4 py-3 text-left text-[12px] font-bold uppercase tracking-wide text-muted-foreground">
                Rating
              </th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q, i) => (
              <tr key={q.id} className="odd:bg-background even:bg-panel/40">
                <td className="border-b border-border px-4 py-3 text-muted-foreground">{i + 1}</td>
                <td className="border-b border-border px-4 py-3 text-foreground">{q.text}</td>
                <td className="border-b border-border px-4 py-3">
                  <Select
                    value={answers[q.id] ?? ""}
                    onValueChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      {RATINGS.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 max-w-2xl">
        <label className="mb-1.5 block text-sm font-semibold text-foreground">
          Additional remarks (optional)
        </label>
        <Textarea
          rows={4}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Share any suggestions..."
        />
      </div>

      <Button
        className="mt-6"
        size="lg"
        disabled={!allAnswered || submit.isPending}
        onClick={() => submit.mutate()}
      >
        {submit.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Submit feedback
      </Button>
    </SectionCard>
  );
}
