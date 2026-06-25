import { Panel } from "./Panel";
import { Sun, BatteryMedium, Droplet, Sprout, Leaf } from "lucide-react";

export function DigitalTwinPanel() {
  return (
    <Panel
      module="Digital Twin"
      title="Site flow · solar → battery → pump → field → yield"
      subtitle="Simplified live model · 1Hz tick"
    >
      <div className="relative grid-bg rounded-md p-5 border border-border/50 bg-midnight/40 overflow-hidden">
        <div className="absolute inset-x-0 top-1/2 h-px scan-line animate-scan opacity-50" />
        <div className="relative grid grid-cols-5 gap-2 items-center">
          <Node icon={<Sun className="w-5 h-5" />} label="Solar array" value="184.6 kWh" color="solar-gold" />
          <Arrow value="62 kW" />
          <Node icon={<BatteryMedium className="w-5 h-5" />} label="Battery" value="68% SOC" color="aurora-blue" />
          <Arrow value="4.2 kWh" />
          <Node icon={<Droplet className="w-5 h-5" />} label="Pump · 5.5 kW" value="ON cycle" color="aurora-blue" />
        </div>
        <div className="relative grid grid-cols-5 gap-2 items-center mt-4">
          <div />
          <div />
          <div />
          <Arrow value="1.32 m³" />
          <Node icon={<Sprout className="w-5 h-5" />} label="Field zones" value="Z-03 / Z-08" color="neo-green" />
        </div>
        <div className="relative grid grid-cols-5 gap-2 items-center mt-4">
          <div />
          <div />
          <div />
          <div />
          <div className="flex justify-end pr-1">
            <div className="flex items-center gap-1.5 text-[11px] text-neo-green">
              <Leaf className="w-3.5 h-3.5" /> Yield +11% protected
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

function Node({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className={`rounded-md border border-${color}/40 bg-panel-elevated/80 p-2.5 shadow-panel`}>
      <div className={`flex items-center gap-2 text-${color}`}>{icon}<span className="text-[11px] uppercase tracking-wider">{label}</span></div>
      <div className="mt-1 text-[13px] font-semibold font-mono">{value}</div>
    </div>
  );
}
function Arrow({ value }: { value: string }) {
  return (
    <div className="flex flex-col items-center text-[10px] text-muted-foreground font-mono">
      <span>{value}</span>
      <div className="h-px w-full bg-gradient-to-r from-aurora-blue/0 via-aurora-blue/70 to-aurora-blue/0 my-1" />
    </div>
  );
}
