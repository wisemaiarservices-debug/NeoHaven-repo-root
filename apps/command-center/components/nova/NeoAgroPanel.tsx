import { fieldZones } from "@/data/mockData";
import { Panel, StatusDot } from "./Panel";
import { Droplets, Leaf } from "lucide-react";

const toneFor = (s: string) =>
  s === "Optimal" ? "good" : s === "Watch" ? "info" : s === "Irrigate" ? "warn" : "bad";

export function NeoAgroPanel() {
  const totalIrrig = fieldZones.reduce((a, z) => a + z.irrigationL, 0);
  const stressed = fieldZones.filter(z => z.status === "Stress").length;
  return (
    <Panel
      module="NOVA Agriculture · NeoAgro"
      title="Field zones & irrigation"
      subtitle={`${fieldZones.length} zones · ${stressed} stressed · ${(totalIrrig/1000).toFixed(2)} m³ recommended`}
      right={
        <div className="text-right">
          <div className="text-[11px] text-muted-foreground">Water savings vs baseline</div>
          <div className="text-[15px] font-semibold text-neo-green font-mono">-18%</div>
        </div>
      }
    >
      <div className="grid grid-cols-4 gap-1.5">
        {fieldZones.map(z => {
          const tone = toneFor(z.status);
          return (
            <div key={z.id} className="rounded-md border border-border/60 bg-panel-elevated/60 px-2.5 py-2">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-muted-foreground">{z.id}</span>
                <StatusDot tone={tone as any} />
              </div>
              <div className="mt-1 text-[12px] font-semibold flex items-center gap-1">
                <Leaf className="w-3 h-3 text-neo-green" />{z.crop}
              </div>
              <div className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground">
                <span>NDVI {z.ndvi.toFixed(2)}</span>
                <span className="flex items-center gap-0.5"><Droplets className="w-2.5 h-2.5 text-aurora-blue" />{z.moisture}%</span>
              </div>
              <div className="mt-1.5 h-1 rounded-full bg-border/60 overflow-hidden">
                <div
                  className={`h-full ${tone === "good" ? "bg-neo-green" : tone === "warn" ? "bg-solar-gold" : tone === "bad" ? "bg-alert-red" : "bg-aurora-blue"}`}
                  style={{ width: `${z.moisture * 2}%` }}
                />
              </div>
              <div className="mt-1.5 text-[10px] text-muted-foreground">
                {z.irrigationL > 0 ? <span className="text-solar-gold">+{z.irrigationL}L</span> : <span>hold</span>}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 p-3 rounded-md border border-aurora-blue/30 bg-aurora-blue/5">
        <div className="text-[10px] uppercase tracking-wider text-aurora-blue font-mono">NeoAgro recommendation</div>
        <div className="text-[13px] mt-0.5">
          Pre-irrigate <span className="font-semibold">Z-03</span> and <span className="font-semibold">Z-08</span> with 1.32 m³ before 11:00 to neutralize heatwave stress.
          Defer non-critical zones to evening pulse on solar surplus.
        </div>
      </div>
    </Panel>
  );
}
