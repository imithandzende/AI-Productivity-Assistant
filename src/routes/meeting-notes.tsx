import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { AIDisclaimer } from "@/components/AIDisclaimer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Loader2, Copy, Sparkles } from "lucide-react";
import { generateAI } from "@/lib/ai.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/meeting-notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — WorkAI" },
      { name: "description", content: "Turn raw meeting notes into clean summaries with action items." },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  const gen = useServerFn(generateAI);
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSummarize() {
    if (!notes.trim()) {
      toast.error("Paste your meeting notes first.");
      return;
    }
    setLoading(true);
    try {
      const res = await gen({
        data: {
          system:
            "You are an expert meeting analyst. Summarize meeting notes into a clean structured markdown document with these sections: ## Summary, ## Key Decisions, ## Action Items (with owner if mentioned and due date if mentioned), ## Open Questions, ## Next Steps. Be concise and specific.",
          user: `Summarize the following meeting notes:\n\n${notes}`,
        },
      });
      setOutput(res.content);
    } catch (e: any) {
      toast.error(e.message ?? "Failed to summarize");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppLayout>
      <PageHeader
        icon={FileText}
        title="Meeting Notes Summarizer"
        description="Paste raw notes or a transcript and get a structured summary."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Raw notes</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              rows={18}
              placeholder="Paste raw meeting notes, transcript, or bullet points here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <Button onClick={handleSummarize} disabled={loading} className="w-full">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              {loading ? "Summarizing..." : "Summarize"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Summary (editable)</CardTitle>
            {output && (
              <Button size="sm" variant="ghost" onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied"); }}>
                <Copy className="mr-1.5 h-4 w-4" /> Copy
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <Textarea
              rows={18}
              placeholder="Summary, decisions, and action items will appear here."
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
