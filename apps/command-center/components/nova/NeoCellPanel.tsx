import { infra } from "@/data/mockData";
import { Panel, StatusDot } from "./Panel";

export function NeoCellPanel() {
  const rows = [
    { label: "Gateways online", value: `${infra.gatewaysOnlinePct}%`, tone: "good" },
    { label: "Sensors online",  value: `${infra.sensorsOnlinePct}%`,  tone: "warn" },
    { label: "Edge battery reserve", value: `${infra.edgeBatteryReservePct}%`, tone: "good" },
    { label: "Data latency",    value: `${infra.dataLatencyMs} ms`,   tone: "warn" },
    { label: "Pump node health", value: infra.pumpNodeHealth,         tone: "good" },
    { label: "Readiness score", value: `${infra.readinessScore}/100`, tone: "good" },
  ] as const;
  return (
    <Panel
      module="NOVA Infrastructure · NeoCell"
      title="Edge readiness & telemetry"
      subtitle="LoRaWAN mesh · 8 nodes · 1 degraded"
    >
      <div className="grid grid-cols-3 gap-2">
        {rows.map(r => (
          <div key={r.label} className="rounded-md border border-border/60 bg-panel-elevated/60 px-3 py-2.5">
            <div className="flex items-center justify-between">
              <span className="stat-label">{r.label}</span>
              <StatusDot tone={r.tone as any} />
            </div>
            <div className="mt-1 text-[15px] font-semibold font-mono">{r.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-md border border-border/60 overflow-hidden">
        <table className="w-full text-[12px]">
          <thead className="bg-panel-elevated/80 text-muted-foreground text-[10px] uppercase tracking-wider">
            <tr><th className="text-left px-3 py-2">Node</th><th className="text-left px-3 py-2">Type</th><th className="text-left px-3 py-2">Status</th><th className="text-right px-3 py-2">Latency</th></tr>
          </thead>
          <tbody>
            {infra.nodes.map(n => (
              <tr key={n.id} className="border-t border-border/40 hover:bg-panel-elevated/60">
                <td className="px-3 py-1.5 font-mono">{n.id}</td>
                <td className="px-3 py-1.5">{n.type}</td>
                <td className="px-3 py-1.5">
                  <span className={`chip ${n.status === "online" ? "border-neo-green/40 text-neo-green bg-neo-green/10" : "border-solar-gold/40 text-solar-gold bg-solar-gold/10"}`}>
                    {n.status}
                  </span>
                </td>
                <td className="px-3 py-1.5 text-right font-mono">{n.latency} ms</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
