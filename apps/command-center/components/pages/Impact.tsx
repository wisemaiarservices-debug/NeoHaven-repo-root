import { AppShell } from "@/components/layout/AppShell";
import { Panel } from "@/components/nova/Panel";
import { PageHeader } from "./Agriculture";

export default function Impact() {
  return (
    <AppShell>
      <PageHeader module="Impact Reports" title="Outcome accounting" subtitle="Measured impact will be reported only after a baseline, verified observations and approved interventions are available." />
      <Panel module="Impact accounting · evidence gate" title="No verified impact figures yet" subtitle="This is an intentional evidence gate, not a failed calculation.">
        <div className="rounded-md border border-solar-gold/30 bg-solar-gold/5 p-4 text-sm leading-6 text-muted-foreground">
          Water savings, carbon reductions, resilience improvements and yield-risk changes are not currently measurable from the connected data. No impact totals or percentage improvements are presented as achieved.
          <ul className="mt-3 list-disc pl-5">
            <li>Define a site-specific pre-intervention baseline.</li>
            <li>Connect source-identified meter, sensor and provider observations.</li>
            <li>Record operator-approved interventions and their timestamps.</li>
            <li>Calculate outcomes against the baseline with units and uncertainty.</li>
          </ul>
        </div>
      </Panel>
    </AppShell>
  );
}
