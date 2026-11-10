import { Panel } from "./Panel";
import { Droplets, Leaf, ShieldCheck, TrendingUp } from "lucide-react";

const categories = [
  { icon: Droplets, label: "Water savings", detail: "Awaiting meter baseline and verified water observations" },
  { icon: Leaf, label: "Carbon accounting", detail: "Awaiting energy mix, generation and approved methodology" },
  { icon: ShieldCheck, label: "Resilience", detail: "No validated site-specific resilience assessment" },
  { icon: TrendingUp, label: "Yield outcomes", detail: "Awaiting crop baseline and measured harvest data" },
];

export function ImpactSummary() {
  return (
    <Panel module="Impact Report · evidence gate" title="Impact not yet measurable" subtitle="No savings, reductions or improvements are claimed without a measured baseline and verified observations.">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {categories.map(({ icon: Icon, label, detail }) => (
          <div key={label} className="rounded-md border border-border/60 bg-panel-elevated/60 p-3">
            <div className="flex items-center gap-2 text-[13px] font-medium">
              <Icon className="h-4 w-4 text-aurora-blue" />
              {label}
            </div>
            <p className="mt-2 text-[11px] leading-5 text-muted-foreground">{detail}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}
