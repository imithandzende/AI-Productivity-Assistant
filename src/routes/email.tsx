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
import { Mail, Loader2, Copy, Sparkles } from "lucide-react";
import { generateAI } from "@/lib/ai.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — WorkAI" },
      { name: "description", content: "Generate professional emails with AI in seconds." },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  const gen = useServerFn(generateAI);
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("medium");
  const [context, setContext] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!context.trim()) {
      toast.error("Please describe what the email is about.");
      return;
    }
    setLoading(true);
    try {
      const res = await gen({
        data: {
          system:
            "You are an expert business writer. Write clear, polished emails. Output ONLY the email body (with greeting and sign-off). No commentary.",
          user: `Write an email with the following details:
- Recipient: ${recipient || "the recipient"}
- Subject: ${subject || "(infer a clear subject)"}
- Tone: ${tone}
- Length: ${length}
- Context / what to say: ${context}

If a subject was not provided, start the output with "Subject: <your subject>" on the first line, then a blank line, then the email.`,
        },
      });
      setOutput(res.content);
    } catch (e: any) {
      toast.error(e.message ?? "Failed to generate email");
    } finally {
      setLoading(false);
    }
  }

  function copyOutput() {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  }

  return (
    <AppLayout>
      <PageHeader
        icon={Mail}
        title="Smart Email Generator"
        description="Draft professional, on-tone emails from a short brief."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Brief</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient</Label>
                <Input
                  id="recipient"
                  placeholder="e.g. Sarah, my manager"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject (optional)</Label>
                <Input
                  id="subject"
                  placeholder="Auto-generate if blank"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="concise">Concise & direct</SelectItem>
                    <SelectItem value="persuasive">Persuasive</SelectItem>
                    <SelectItem value="apologetic">Apologetic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Length</Label>
                <Select value={length} onValueChange={setLength}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="long">Long</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="context">What should the email say?</Label>
              <Textarea
                id="context"
                rows={6}
                placeholder="e.g. Follow up on the Q3 marketing proposal, ask for feedback by Friday, mention the new pricing tier."
                value={context}
                onChange={(e) => setContext(e.target.value)}
              />
            </div>
            <Button onClick={handleGenerate} disabled={loading} className="w-full">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              {loading ? "Generating..." : "Generate email"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Draft (editable)</CardTitle>
            {output && (
              <Button size="sm" variant="ghost" onClick={copyOutput}>
                <Copy className="mr-1.5 h-4 w-4" /> Copy
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <Textarea
              rows={18}
              placeholder="Your AI-generated email will appear here. Edit freely before sending."
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              className="font-mono text-sm"
            />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <AIDisclaimer />
      </div>
    </AppLayout>
  );
}
