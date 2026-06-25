import { ReactNode } from "react";

interface PanelProps {
  title: string;
  subtitle?: string;
  module?: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Panel({ title, subtitle, module, right, children, className = "" }: PanelProps) {
  return (
    <section className={`glass-panel relative overflow-hidden ${className}`}>
      <header className="flex items-start justify-between gap-4 px-4 pt-3.5 pb-3 border-b border-border/50">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {module && (
              <span className="text-[10px] uppercase tracking-[0.18em] text-aurora-blue/80 font-semibold font-mono">
                {module}
              </span>
            )}
            <h3 className="text-[14px] font-semibold tracking-tight text-foreground truncate">{title}</h3>
          </div>
          {subtitle && <p className="text-[11px] text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        {right}
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}

export function StatusDot({ tone = "good" }: { tone?: "good" | "warn" | "bad" | "info" }) {
  const cls =
    tone === "good" ? "bg-neo-green shadow-[0_0_8px_hsl(var(--neo-green))]"
    : tone === "warn" ? "bg-solar-gold shadow-[0_0_8px_hsl(var(--solar-gold))]"
    : tone === "bad" ? "bg-alert-red shadow-[0_0_8px_hsl(var(--alert-red))]"
    : "bg-aurora-blue shadow-[0_0_8px_hsl(var(--aurora-blue))]";
  return <span className={`inline-block w-1.5 h-1.5 rounded-full ${cls}`} />;
}
