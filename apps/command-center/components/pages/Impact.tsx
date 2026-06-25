import { AppShell } from "@/components/layout/AppShell";
import { ImpactSummary } from "@/components/nova/ImpactSummary";
import { PageHeader } from "./Agriculture";
import { impact } from "@/data/mockData";

export default function Impact() {
  return (
    <AppShell>
      <PageHeader module="Impact Reports" title="Outcome accounting" subtitle="Aggregated water, carbon, resilience and yield outcomes attributable to NOVA-approved actions." />
      <div className="space-y-4">
        <ImpactSummary />
        <div className="glass-panel p-5">
          <h3 className="text-[14px] font-semibold mb-2">Pilot reporting note</h3>
          <p className="text-[12.5px] text-muted-foreground leading-relaxed">
            All impact figures are computed from operator-approved actions over the active scenario window.
            Baseline is the pre-NOVA operating mode for the same forecast inputs.
            Today's contribution: {impact.waterSavingsM3} m³ water · {impact.carbonReductionKg} kg CO₂e · +{impact.resilienceGainPct}% resilience · -{impact.yieldRiskReductionPct}% yield risk.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
