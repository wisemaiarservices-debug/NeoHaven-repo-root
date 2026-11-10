import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "./Agriculture";

export default function Settings() {
  const rows = [
    ["Organization", "NeoHaven Urban Labs Inc."],
    ["Product", "NOVA OS — shared operations and intelligence layer"],
    ["Active site", "None configured"],
    ["Autonomy mode", "Advisory only · operator approval required"],
    ["Data residency", "Not configured / not verified"],
    ["Module websites", "NeoAgro · NeoGrid · NeoCell"],
    ["Live field telemetry", "Not connected / not verified"],
    ["Persistent observation storage", "D1 schema prepared · database not provisioned"],
    ["Authenticated module ingestion", "Prototype and contract in development · not deployed"],
    ["Production deployment", "Existing production alias retained; feature branch is not merged"],
  ];
  return (
    <AppShell>
      <PageHeader module="Settings" title="Deployment profile" subtitle="Verified configuration state. Unknown values are explicitly marked rather than inferred." />
      <div className="glass-panel divide-y divide-border/50">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-1 gap-1 px-4 py-3 text-[13px] md:grid-cols-3">
            <div className="text-muted-foreground">{k}</div>
            <div className="md:col-span-2 font-mono text-foreground/90">{v}</div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
