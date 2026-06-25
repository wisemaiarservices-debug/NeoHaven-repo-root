import { AppShell } from "@/components/layout/AppShell";
import { NeoGridPanel } from "@/components/nova/NeoGridPanel";
import { KpiCard } from "@/components/nova/KpiCard";
import { PageHeader } from "./Agriculture";

export default function Energy() {
  return (
    <AppShell>
      <PageHeader module="NOVA Energy" title="NeoGrid" subtitle="Solar production, battery dispatch, grid balance and carbon avoidance for the SolarHub site." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-5">
        <KpiCard label="Solar Today"      value="184.6" unit="kWh" delta="+12%" tone="good" />
        <KpiCard label="Battery SOC"      value="68"    unit="%"   delta="-6"   tone="warn" />
        <KpiCard label="Grid Export"      value="38.2"  unit="kWh" delta="+22%" tone="good" />
        <KpiCard label="Carbon Avoided"   value="92.1"  unit="kg"  delta="+8%"  tone="good" />
      </div>
      <NeoGridPanel />
    </AppShell>
  );
}
