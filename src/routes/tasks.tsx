import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { AIDisclaimer } from "@/components/AIDisclaimer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ListChecks, Loader2, Sparkles, Copy } from "lucide-react";
import { generateAI } from "@/lib/ai.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — WorkAI" },
      { name: "description", content: "Break goals into prioritized, actionable task plans." },
    ],
  }),
  component: TasksPage,
});

function TasksPage() {
  const gen = useServerFn(generateAI);
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");
  const [constraints, setConstraints] = useState("");
  const [horizon, setHorizon] = useState("week");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePlan() {
    if (!goal.trim()) {
      toast.error("Describe your goal first.");
      return;
    }
    setLoading(true);
    try {
      const res = await gen({
        data: {
          system:
            "You are an expert productivity coach. Break the user's goal into a clear, prioritized plan. Use markdown. Include: ## Overview, ## Milestones, ## Task List (numbered, with priority [High/Med/Low] and estimated time), ## Suggested Schedule. Be realistic and specific.",
          user: `Goal: ${goal}
Time horizon: ${horizon}
Deadline: ${deadline || "not specified"}
Constraints / context: ${constraints || "none"}

Create a focused, actionable plan.`,
        },
      });
      setOutput(res.content);
    } catch (e: any) {
      toast.error(e.message ?? "Failed to plan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppLayout>
      <PageHeader
        icon={ListChecks}
        title="AI Task Planner"
        description="Turn fuzzy goals into clear, prioritized task plans."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Your goal</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="goal">What do you want to accomplish?</Label>
              <Textarea
                id="goal"
                rows={4}
                placeholder="e.g. Launch a new onboarding flow for our SaaS product"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Time horizon</Label>
                <Select value={horizon} onValueChange={setHorizon}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Today</SelectItem>
                    <SelectItem value="week">This week</SelectItem>
                    <SelectItem value="month">This month</SelectItem>
                    <SelectItem value="quarter">This quarter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline (optional)</Label>
                <Input
                  id="deadline"
                  placeholder="e.g. Friday, March 14"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="constraints">Constraints or context</Label>
              <Textarea
                id="constraints"
                rows={3}
                placeholder="e.g. Solo work, 2 hrs/day available, depends on design review"
                value={constraints}
                onChange={(e) => setConstraints(e.target.value)}
              />
            </div>
            <Button onClick={handlePlan} disabled={loading} className="w-full">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              {loading ? "Planning..." : "Create plan"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Plan (editable)</CardTitle>
            {output && (
              <Button size="sm" variant="ghost" onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied"); }}>
                <Copy className="mr-1.5 h-4 w-4" /> Copy
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <Textarea
              rows={20}
              placeholder="Your prioritized action plan will appear here."
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              className="font-mono text-sm"
            />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6"><AIDisclaimer /></div>
    </AppLayout>
  );
}
