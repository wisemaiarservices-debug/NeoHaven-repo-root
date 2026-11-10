import { Panel } from "./Panel";
import { Radio, ShieldAlert } from "lucide-react";

export function NeoCellPanel() {
  return (
    <Panel module="NOVA Infrastructure · NeoCell" title="Device integration not connected" subtitle="No deployed NeoCell API or authenticated gateway/sensor feed has been verified.">
      <div className="rounded-md border border-solar-gold/30 bg-solar-gold/5 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Radio className="h-4 w-4 text-solar-gold" />
          No device observations available
        </div>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          Gateway uptime, sensor availability, latency, node health and readiness scores are intentionally omitted. They will be calculated only from authenticated device records and timestamped observations.
        </p>
      </div>
      <div className="mt-3 flex items-start gap-2 text-[11px] leading-5 text-muted-foreground">
        <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-aurora-blue" />
        API process health and website availability do not establish that a physical device is online or reporting valid measurements.
      </div>
    </Panel>
  );
}
