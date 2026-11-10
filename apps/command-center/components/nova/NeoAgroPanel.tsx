import { Panel } from "./Panel";
import { Droplets, Leaf, MapPin, Radio } from "lucide-react";

export function NeoAgroPanel() {
  return (
    <Panel
      module="NOVA Agriculture · NeoAgro"
      title="Field data connection"
      subtitle="No pilot site, crop zones or field sensors have been registered in NOVA Core."
    >
      <div className="rounded-md border border-border/60 bg-panel-elevated/40 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <MapPin className="h-4 w-4 text-aurora-blue" />
          Site not configured
        </div>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          Zone-level crop health, soil moisture and irrigation demand will appear here after a site and its assets are registered and verified observations are ingested. No synthetic zone readings or irrigation instructions are shown.
        </p>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className="rounded-md border border-border/50 p-3">
          <Leaf className="h-4 w-4 text-neo-green" />
          <div className="mt-2 text-xs font-medium">Crop observations</div>
          <div className="mt-1 text-[11px] text-muted-foreground">No verified records</div>
        </div>
        <div className="rounded-md border border-border/50 p-3">
          <Droplets className="h-4 w-4 text-aurora-blue" />
          <div className="mt-2 text-xs font-medium">Water measurements</div>
          <div className="mt-1 text-[11px] text-muted-foreground">No meter or sensor feed</div>
        </div>
        <div className="rounded-md border border-border/50 p-3">
          <Radio className="h-4 w-4 text-solar-gold" />
          <div className="mt-2 text-xs font-medium">Field connectivity</div>
          <div className="mt-1 text-[11px] text-muted-foreground">No device feed connected</div>
        </div>
      </div>
      <div className="mt-3 rounded-md border border-aurora-blue/25 bg-aurora-blue/5 p-3 text-[11px] leading-5 text-muted-foreground">
        NASA POWER daily weather and solar data can be retrieved above for manually entered coordinates. It is gridded provider data, not a substitute for local soil, crop or irrigation sensors.
      </div>
    </Panel>
  );
}
