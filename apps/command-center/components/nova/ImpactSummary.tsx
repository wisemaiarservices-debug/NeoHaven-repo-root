import { impact } from "@/data/mockData";
import { Panel } from "./Panel";
import { Droplets, Leaf, ShieldCheck, TrendingUp } from "lucide-react";

export function ImpactSummary() {
  const items = [
    { icon: <Droplets className="w-4 h-4 text-aurora-blue" />, label: "Expected water savings", value: `${impact.waterSavingsM3} m³`, sub: "vs baseline scenario" },
    { icon: <Leaf className="w-4 h-4 text-neo-green" />,       label: "Carbon reduction",       value: `${impact.carbonReductionKg} kg CO₂e`, sub: "today" },
    { icon: <ShieldCheck className="w-4 h-4 text-solar-gold" />,label: "Resilience gain",       value: `+${impact.resilienceGainPct}%`, sub: "site readiness" },
    { icon: <TrendingUp className="w-4 h-4 text-neo-green" />, label: "Yield risk reduction",  value: `-${impact.yieldRiskReductionPct}%`, sub: "next 7 days" },
  ];
  return (
    <Panel
      module="Impact Report"
      title="If operator approves NOVA plan"
      subtitle="Audit-ready · exportable for pilot reporting"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {items.map(i => (
          <div key={i.label} className="rounded-md border border-border/60 bg-panel-elevated/60 p-3">
            <div className="flex items-center gap-2 stat-label">{i.icon}{i.label}</div>
            <div className="mt-1.5 text-[20px] font-semibold font-mono">{i.value}</div>
            <div className="text-[10px] text-muted-foreground">{i.sub}</div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
