import { Panel } from "./Panel";
import { Sun, BatteryMedium, Droplet, Sprout, Radio } from "lucide-react";

const layers = [
  { name: "Generation", detail: "Solar assets not registered", icon: Sun },
  { name: "Storage", detail: "Battery assets not registered", icon: BatteryMedium },
  { name: "Water systems", detail: "Pumps and meters not registered", icon: Droplet },
  { name: "Agriculture", detail: "Field zones not registered", icon: Sprout },
  { name: "Connectivity", detail: "Gateways and sensors not connected", icon: Radio },
];

export function DigitalTwinPanel() {
  return (
    <Panel
      module="Digital Twin"
      title="Site topology workspace"
      subtitle="The topology is a target architecture, not a live digital twin. No site or assets are currently assigned."
    >
      <div className="rounded-md border border-border/60 bg-midnight/40 p-4">
        <div className="mb-3 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          Required asset domains · connection state
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {layers.map(({ name, detail, icon: Icon }) => (
            <div key={name} className="rounded-md border border-border/50 bg-panel-elevated/60 p-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Icon className="h-4 w-4 text-aurora-blue" />
                {name}
              </div>
              <div className="mt-2 text-[11px] text-muted-foreground">{detail}</div>
              <div className="mt-2 text-[10px] font-mono uppercase tracking-wide text-solar-gold">
                Not connected
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 text-[11px] leading-5 text-muted-foreground">
        A live twin will be rendered only from registered site and asset records with source identity, timestamps, units and quality metadata. No capacities, operating states or energy flows are inferred from this target layout.
      </p>
    </Panel>
  );
}
