import {
  BatteryCharging,
  BookOpenCheck,
  ClipboardList,
  Database,
  Globe2,
  Leaf,
  RadioTower,
  Ruler,
  ShieldAlert,
} from "lucide-react";
import { Panel } from "@/components/nova/Panel";

const readiness = [
  {
    icon: ClipboardList,
    title: "Client and site profiles",
    status: "Not configured",
    detail: "No customer or pilot site is registered. Future profiles will capture site geometry, land area, timezone, permissions and versioned configuration.",
  },
  {
    icon: Leaf,
    title: "Crop and water systems",
    status: "Not configured",
    detail: "Crop species, cultivar, growth stage, soil, irrigation topology and water constraints must be supplied and validated per site.",
  },
  {
    icon: BatteryCharging,
    title: "Energy and equipment specifications",
    status: "Not registered",
    detail: "PV, inverter, battery, grid, load, pump and asset ratings must be discovered from documented specifications—not inferred from a generic template.",
  },
  {
    icon: RadioTower,
    title: "Sensors and gateways",
    status: "No live producers",
    detail: "Sensor identity, metric, units, range, precision, calibration, cadence, protocol and firmware are required before readings can be trusted.",
  },
  {
    icon: Database,
    title: "Scientific data and snapshots",
    status: "Research foundation",
    detail: "Dataset cataloguing, provenance, raster lineage and immutable snapshot contracts are in draft engineering work; no research dataset is persisted in Core yet.",
  },
  {
    icon: BookOpenCheck,
    title: "Experiments and model evaluation",
    status: "Draft · not deployed",
    detail: "A reproducible offline experiment pipeline is under review. No model training, independent field validation or model deployment is claimed.",
  },
  {
    icon: Globe2,
    title: "Cross-client generalization",
    status: "Not evaluated",
    detail: "A model proven for one crop, climate, land size, sensor family or energy topology must not be assumed to work for another without separate evidence.",
  },
];

export function AdaptiveReadinessPanel() {
  return (
    <Panel
      module="NOVA Core · adaptive architecture"
      title="One intelligence core · adaptable client profiles"
      subtitle="NOVA OS, NeoAgro, NeoGrid and NeoCell share NOVA Core. Each new client is represented by validated configuration and capability metadata—not hard-coded assumptions."
    >
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {readiness.map(({ icon: Icon, title, status, detail }) => (
          <article key={title} className="rounded-md border border-border/60 bg-panel-elevated/50 p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 text-[13px] font-semibold">
                <Icon className="h-4 w-4 shrink-0 text-aurora-blue" />
                {title}
              </div>
              <span className="shrink-0 text-[10px] font-mono uppercase tracking-wide text-solar-gold">{status}</span>
            </div>
            <p className="mt-2 text-[12px] leading-5 text-muted-foreground">{detail}</p>
          </article>
        ))}
      </div>

      <div className="mt-3 rounded-md border border-aurora-blue/25 bg-aurora-blue/5 p-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-aurora-blue">
          <Ruler className="h-4 w-4" /> Adaptive onboarding contract
        </div>
        <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
          Validate geometry, dimensions, units, operating ranges and compatibility; preserve source values and provenance; select only methods whose applicability is supported. Unknown specifications remain unknown and produce a configuration request or an explicit abstention.
        </p>
      </div>

      <div className="mt-3 rounded-md border border-solar-gold/30 bg-solar-gold/5 p-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-solar-gold">
          <ShieldAlert className="h-4 w-4" /> Learning and safety boundary
        </div>
        <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
          Shared learning is subject to data rights, consent and tenant isolation. Customer-specific calibration stays attributable. New crops, climates, sensor models and energy configurations require independent validation; consequential recommendations remain advisory and human-approved.
        </p>
      </div>
    </Panel>
  );
}
