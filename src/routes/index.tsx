import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LayoutDashboard,
  Mail,
  FileText,
  ListChecks,
  Search,
  MessageSquare,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { AIDisclaimer } from "@/components/AIDisclaimer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Automate workplace tasks with AI: emails, meeting notes, task planning, research, and chat.",
      },
    ],
  }),
  component: Dashboard,
});

const features = [
  {
    title: "Smart Email Generator",
    description: "Draft professional emails in seconds from a quick brief.",
    icon: Mail,
    to: "/email",
    accent: "from-blue-500/20 to-indigo-500/10",
  },
  {
    title: "Meeting Notes Summarizer",
    description: "Turn raw notes into clear summaries, decisions, and action items.",
    icon: FileText,
    to: "/meeting-notes",
    accent: "from-emerald-500/20 to-teal-500/10",
  },
  {
    title: "AI Task Planner",
    description: "Break down goals into prioritized, actionable task lists.",
    icon: ListChecks,
    to: "/tasks",
    accent: "from-amber-500/20 to-orange-500/10",
  },
  {
    title: "AI Research Assistant",
    description: "Get structured briefings on any topic with key insights.",
    icon: Search,
    to: "/research",
    accent: "from-fuchsia-500/20 to-pink-500/10",
  },
  {
    title: "AI Chatbot",
    description: "Ask anything, brainstorm, or get instant work help.",
    icon: MessageSquare,
    to: "/chat",
    accent: "from-violet-500/20 to-purple-500/10",
  },
];

function Dashboard() {
  return (
    <AppLayout>
      <PageHeader
        icon={LayoutDashboard}
        title="Welcome back"
        description="Your AI-powered workspace for everyday professional tasks."
      />

      <div className="mb-8 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary to-primary-glow p-6 text-primary-foreground shadow-lg md:p-8">
        <div className="flex items-center gap-2 text-sm font-medium opacity-90">
          <Sparkles className="h-4 w-4" /> Powered by AI
        </div>
        <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
          Get more done with less effort.
        </h2>
        <p className="mt-2 max-w-2xl text-sm opacity-90 md:text-base">
          Five focused AI tools to draft, summarize, plan, research, and chat — all in one
          beautifully simple workspace.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <Link key={f.to} to={f.to} className="group">
            <Card className="h-full overflow-hidden border-border transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-elevated)]">
              <div className={`h-1 bg-gradient-to-r ${f.accent}`} />
              <CardHeader>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <f.icon className="h-5 w-5" />
                </div>
                <CardTitle className="flex items-center justify-between text-base">
                  {f.title}
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </CardTitle>
                <CardDescription className="text-sm">{f.description}</CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <AIDisclaimer />
      </div>
    </AppLayout>
  );
}
