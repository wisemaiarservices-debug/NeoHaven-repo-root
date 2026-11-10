import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "./Agriculture";
import { Panel } from "@/components/nova/Panel";

export default function Infrastructure() {
  return (
    <AppShell>
      <PageHeader module="NOVA Infrastructure" title="NeoCell" subtitle="Infrastructure module workspace. No deployed NeoCell API or live gateway and sensor telemetry has been verified." />
      <Panel module="NeoCell · integration status" title="Device feed not connected" subtitle="Website availability is separate from device connectivity.">
        <div className="rounded-md border border-solar-gold/30 bg-solar-gold/5 p-4 text-sm text-muted-foreground">
          Gateway availability, sensor counts, latency, pump-node health and readiness are not shown as measured values because no authenticated device feed is connected to this Command Center.
          <div className="mt-3"><a className="underline underline-offset-2 text-aurora-blue" href="https://neocell-ebon.vercel.app" target="_blank" rel="noreferrer">Open NeoCell platform</a></div>
        </div>
      </Panel>
    </AppShell>
  );
}
