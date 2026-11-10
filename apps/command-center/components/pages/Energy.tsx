import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "./Agriculture";
import { Panel } from "@/components/nova/Panel";

export default function Energy() {
  return (
    <AppShell>
      <PageHeader module="NOVA Energy" title="NeoGrid" subtitle="Energy module workspace. No deployed NeoGrid API or live inverter, meter, solar or battery telemetry has been verified." />
      <Panel module="NeoGrid · integration status" title="Live energy feed not connected" subtitle="The production NeoGrid website is available, but this Command Center does not yet have a verified data endpoint.">
        <div className="rounded-md border border-solar-gold/30 bg-solar-gold/5 p-4 text-sm text-muted-foreground">
          Solar generation, battery state of charge, grid import/export and carbon accounting are intentionally not displayed as live values until a provider or device feed is connected and verified.
          <div className="mt-3"><a className="underline underline-offset-2 text-aurora-blue" href="https://neogrid-sigma.vercel.app" target="_blank" rel="noreferrer">Open NeoGrid platform</a></div>
        </div>
      </Panel>
    </AppShell>
  );
}
