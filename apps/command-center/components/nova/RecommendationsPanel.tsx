import { recommendations } from "@/data/mockData";
import { Panel } from "./Panel";
import { ShieldCheck, Clock } from "lucide-react";

const priorityCls = (p: string) =>
  p === "High" ? "border-alert-red/40 text-alert-red bg-alert-red/10"
  : p === "Medium" ? "border-solar-gold/40 text-solar-gold bg-solar-gold/10"
  : "border-aurora-blue/40 text-aurora-blue bg-aurora-blue/10";

export function RecommendationsPanel({ compact = false }: { compact?: boolean }) {
  const items = compact ? recommendations.slice(0, 3) : recommendations;
  return (
    <Panel
      module="NOVA Recommendations"
      title="Operator-approved action queue"
      subtitle="No autonomous control · all actions require human approval"
      right={
        <span className="chip border-border/60 text-muted-foreground bg-panel-elevated/60">
          {recommendations.filter(r => r.status === "Awaiting approval").length} awaiting
        </span>
      }
    >
      <div className="space-y-2.5">
        {items.map(r => (
          <article key={r.id} className="rounded-md border border-border/60 bg-panel-elevated/60 p-3.5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider">
                  <span className="text-muted-foreground">{r.id}</span>
                  <span className="text-aurora-blue">{r.module}</span>
                  <span className={`chip ${priorityCls(r.priority)}`}>{r.priority}</span>
                </div>
                <h4 className="mt-1 text-[13.5px] font-semibold tracking-tight">{r.title}</h4>
                <p className="text-[12px] text-muted-foreground mt-1 leading-relaxed">{r.rationale}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Confidence</div>
                <div className="text-[15px] font-mono font-semibold text-aurora-blue">{Math.round(r.confidence * 100)}%</div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2 text-[11px]">
              <Impact label="Water" value={r.impact.water} />
              <Impact label="Carbon" value={r.impact.carbon} />
              <Impact label="Resilience" value={r.impact.resilience} />
              <Impact label="Yield" value={r.impact.yield} />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className={`text-[11px] inline-flex items-center gap-1 ${r.status === "Approved" ? "text-neo-green" : "text-solar-gold"}`}>
                {r.status === "Approved" ? <ShieldCheck className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                {r.status}
              </span>
              <div className="flex items-center gap-2">
                <button className="text-[11px] px-2.5 py-1 rounded-md border border-border hover:bg-panel-elevated transition-colors">Hold</button>
                <button className="text-[11px] px-2.5 py-1 rounded-md border border-aurora-blue/50 bg-aurora-blue/10 text-aurora-blue hover:bg-aurora-blue/20 transition-colors">Approve</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function Impact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border/50 bg-midnight/40 px-2 py-1.5">
      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-mono text-foreground text-[12px]">{value}</div>
    </div>
  );
}
