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
import { Search, Loader2, Sparkles, Copy } from "lucide-react";
import { generateAI } from "@/lib/ai.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — WorkAI" },
      { name: "description", content: "Get structured research briefings on any topic." },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const gen = useServerFn(generateAI);
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("general professional");
  const [depth, setDepth] = useState("standard");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleResearch() {
    if (!topic.trim()) {
      toast.error("Enter a topic to research.");
      return;
    }
    setLoading(true);
    try {
      const res = await gen({
        data: {
          system:
            "You are a sharp research analyst. Produce a structured briefing in markdown with: ## TL;DR (3 bullets), ## Background, ## Key Insights, ## Opportunities & Risks, ## Recommended Next Steps, ## Open Questions. Be specific, balanced, and avoid filler. Clearly flag assumptions. Do not invent statistics — when uncertain, say so.",
          user: `Topic: ${topic}
Audience: ${audience}
Depth: ${depth}

Produce a research briefing.`,
        },
      });
      setOutput(res.content);
    } catch (e: any) {
      toast.error(e.message ?? "Failed to research");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppLayout>
      <PageHeader
        icon={Search}
        title="AI Research Assistant"
        description="Structured briefings on any topic, ready in seconds."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Research brief</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic or question</Label>
              <Textarea
                id="topic"
                rows={4}
                placeholder="e.g. Current state of AI agents in enterprise customer support"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="audience">Audience</Label>
                <Input
                  id="audience"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Depth</Label>
                <Select value={depth} onValueChange={setDepth}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quick">Quick overview</SelectItem>
                    <SelectItem value="standard">Standard briefing</SelectItem>
                    <SelectItem value="deep">Deep dive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleResearch} disabled={loading} className="w-full">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              {loading ? "Researching..." : "Generate briefing"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Briefing (editable)</CardTitle>
            {output && (
              <Button size="sm" variant="ghost" onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied"); }}>
                <Copy className="mr-1.5 h-4 w-4" /> Copy
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <Textarea
              rows={20}
              placeholder="Your research briefing will appear here."
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
