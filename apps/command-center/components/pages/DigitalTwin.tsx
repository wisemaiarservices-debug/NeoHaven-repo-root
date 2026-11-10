import { AppShell } from "@/components/layout/AppShell";
import { DigitalTwinPanel } from "@/components/nova/DigitalTwinPanel";
import { PageHeader } from "./Agriculture";

export default function DigitalTwin() {
  return (
    <AppShell>
      <PageHeader module="Digital Twin" title="Site topology workspace" subtitle="Target structure for connecting registered energy, water, agriculture and infrastructure assets. No live site twin is available yet." />
      <DigitalTwinPanel />
    </AppShell>
  );
}
