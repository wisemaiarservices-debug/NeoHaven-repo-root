import { AppShell } from "@/components/layout/AppShell";
import { NeoCellPanel } from "@/components/nova/NeoCellPanel";
import { KpiCard } from "@/components/nova/KpiCard";
import { PageHeader } from "./Agriculture";

export default function Infrastructure() {
  return (
    <AppShell>
      <PageHeader module="NOVA Infrastructure" title="NeoCell" subtitle="Edge gateways, sensor mesh and pump-node readiness underpinning the agrivoltaic site." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-5">
        <KpiCard label="Gateways Online"   value="100" unit="%"   delta="0"     tone="good" />
        <KpiCard label="Sensors Online"    value="96"  unit="%"   delta="-2"    tone="warn" />
        <KpiCard label="Data Latency"      value="218" unit="ms"  delta="+34"   tone="warn" />
        <KpiCard label="Readiness Score"   value="88"  unit="/100" delta="+3"   tone="good" />
      </div>
      <NeoCellPanel />
    </AppShell>
  );
}
