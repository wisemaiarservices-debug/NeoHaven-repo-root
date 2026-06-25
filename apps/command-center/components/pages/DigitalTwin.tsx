import { AppShell } from "@/components/layout/AppShell";
import { DigitalTwinPanel } from "@/components/nova/DigitalTwinPanel";
import { PageHeader } from "./Agriculture";

export default function DigitalTwin() {
  return (
    <AppShell>
      <PageHeader module="Digital Twin" title="Live site model" subtitle="Simplified flow of energy and water across the SolarHub site assets — solar → battery → pump → field → yield." />
      <DigitalTwinPanel />
    </AppShell>
  );
}
