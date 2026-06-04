import { ShieldAlert } from "lucide-react";

export function AIDisclaimer({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-start gap-2 rounded-lg border border-border bg-muted/50 p-3 text-xs text-muted-foreground ${className}`}
    >
      <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <p>
        <span className="font-medium text-foreground">Responsible AI:</span> Generated content may
        contain errors or biases. Review and edit before sharing. Do not submit confidential data.
      </p>
    </div>
  );
}
