import { Panel } from "./Panel";
import { BatteryMedium, Sun, ShieldAlert } from "lucide-react";

export function NeoGridPanel() {
  return (
    <Panel module="NOVA Energy · NeoGrid" title="Energy data feed not connected" subtitle="No deployed NeoGrid API or verified inverter, meter or battery telemetry is available to this Command Center.">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="rounded-md border border-border/60 bg-panel-elevated/50 p-3">
          <Sun className="h-4 w-4 text-solar-gold" />
          <div className="mt-2 text-[13px] font-medium">Solar generation</div>
          <div className="mt-1 text-[11px] text-muted-foreground">No verified meter or inverter records</div>
        </div>
        <div className="rounded-md border border-border/60 bg-panel-elevated/50 p-3">
          <BatteryMedium className="h-4 w-4 text-aurora-blue" />
          <div className="mt-2 text-[13px] font-medium">Battery and grid</div>
          <div className="mt-1 text-[11px] text-muted-foreground">No verified state-of-charge or import/export data</div>
        </div>
      </div>
      <div className="mt-3 flex items-start gap-2 rounded-md border border-solar-gold/30 bg-solar-gold/5 p-3 text-[11px] leading-5 text-muted-foreground">
        <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-solar-gold" />
        Solar yield, battery dispatch, grid balance, curtailment and carbon impact are not estimated until the underlying measurements, units and accounting baseline are available.
      </div>
    </Panel>
  );
}
