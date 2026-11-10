import { Panel } from "./Panel";
import { Brain, CloudSun, Database, ShieldCheck, Activity, AlertTriangle } from "lucide-react";

const capabilities = [
  { name: "API process health", status: "Deployed", detail: "NOVA Core Worker health endpoint is live.", icon: Activity, tone: "text-neo-green" },
  { name: "NASA POWER daily data", status: "Provider retrieval", detail: "Gridded weather and solar records can be requested for operator-entered coordinates and dates.", icon: CloudSun, tone: "text-aurora-blue" },
  { name: "Deterministic screening", status: "Limited", detail: "Rule-based screening is available for supplied inputs; it is not a trained or calibrated predictive model.", icon: Brain, tone: "text-aurora-blue" },
  { name: "Persistent observations", status: "Not provisioned", detail: "D1 schema and read-only inspection code are prepared in an unmerged branch; no live database is connected.", icon: Database, tone: "text-solar-gold" },
  { name: "Forecasting and optimization", status: "Not validated", detail: "No site-calibrated forecast, dispatch optimizer or quantified scenario result is currently available.", icon: AlertTriangle, tone: "text-solar-gold" },
  { name: "Operator decisions", status: "Human review only", detail: "Recommendations and infrastructure actions must remain advisory and require explicit operator approval.", icon: ShieldCheck, tone: "text-aurora-blue" },
];

export function NovaCorePanel() {
  return (
    <Panel
      module="NOVA Core · capability registry"
      title="Intelligence services and evidence status"
      subtitle="A transparent view of what the shared intelligence layer can currently support. No synthetic forecast or impact figures are displayed."
    >
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {capabilities.map(({ name, status, detail, icon: Icon, tone }) => (
          <div key={name} className="rounded-md border border-border/60 bg-panel-elevated/50 p-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-[13px] font-semibold">
                <Icon className={`h-4 w-4 ${tone}`} />
                {name}
              </div>
              <span className={`text-[10px] font-mono uppercase tracking-wide ${tone}`}>{status}</span>
            </div>
            <p className="mt-2 text-[12px] leading-5 text-muted-foreground">{detail}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-md border border-aurora-blue/25 bg-aurora-blue/5 p-3 text-[11px] leading-5 text-muted-foreground">
        Data trust rule: provider-derived weather/solar values, caller-supplied inputs, synthetic defaults and verified field observations are separate data classes. A successful API response does not upgrade a value's provenance.
      </div>
    </Panel>
  );
}
