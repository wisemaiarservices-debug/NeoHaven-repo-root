import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "./Agriculture";

export default function Settings() {
  const rows = [
    ["Organization", "NeoHaven AI Urban Labs"],
    ["Product", "NOVA OS — AI Operating System for Sustainable Infrastructure"],
    ["Active site", "SolarHub Agrivoltaic Demo Site (NHV-SH-01)"],
    ["Autonomy mode", "Advisory only · operator approval required"],
    ["Data residency", "EU-West · edge-first"],
    ["Modules enabled", "NeoAgro · NeoGrid · NeoCell · NOVA Core AI v0"],
    ["Telemetry rate", "1 Hz site stream · 5s aggregate"],
    ["Fallback mode", "Cached digital twin renders when edge link drops"],
  ];
  return (
    <AppShell>
      <PageHeader module="Settings" title="Deployment profile" subtitle="Configuration for this pilot. Demo prototype — values are read-only." />
      <div className="glass-panel divide-y divide-border/50">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-3 px-4 py-3 text-[13px]">
            <div className="text-muted-foreground">{k}</div>
            <div className="col-span-2 font-mono text-foreground/90">{v}</div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
