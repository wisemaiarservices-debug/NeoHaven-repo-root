import { AppShell } from "@/components/layout/AppShell";
import { NeoAgroPanel } from "@/components/nova/NeoAgroPanel";
import { KpiCard } from "@/components/nova/KpiCard";

export default function Agriculture() {
  return (
    <AppShell>
      <PageHeader module="NOVA Agriculture" title="NeoAgro" subtitle="Crop health, soil moisture and irrigation orchestration for the SolarHub agrivoltaic site." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-5">
        <KpiCard label="Crop Health (NDVI)" value="0.72" delta="+0.03" tone="good" />
        <KpiCard label="Soil Moisture Avg"  value="30" unit="%" delta="-4" tone="warn" />
        <KpiCard label="Water Use Today"    value="12.4" unit="m³" delta="-18%" tone="good" />
        <KpiCard label="Yield Risk"         value="11" unit="%↓" delta="-2" tone="good" />
      </div>
      <NeoAgroPanel />
    </AppShell>
  );
}

export function PageHeader({ module, title, subtitle }: { module: string; title: string; subtitle: string }) {
  return (
    <div className="mb-5">
      <div className="text-[10px] uppercase tracking-[0.18em] text-aurora-blue/90 font-mono">{module}</div>
      <h1 className="text-[24px] font-semibold tracking-tight mt-1">{title}</h1>
      <p className="text-[13px] text-muted-foreground mt-1 max-w-3xl">{subtitle}</p>
    </div>
  );
}
