import { AppShell } from "@/components/layout/AppShell";
import { Panel } from "@/components/nova/Panel";
import { PageHeader } from "./Agriculture";

export default function Recommendations() {
  return (
    <AppShell>
      <PageHeader module="Recommendations" title="Operator action queue" subtitle="Recommendations are generated only when their source inputs, method and confidence can be supported." />
      <Panel module="NOVA Core · recommendation evidence gate" title="No verified recommendations available" subtitle="The previous queue contained scenario fixtures, not validated site-specific recommendations.">
        <div className="rounded-md border border-solar-gold/30 bg-solar-gold/5 p-4 text-sm leading-6 text-muted-foreground">
          No actions are awaiting approval in the live system. NOVA Core currently provides deterministic screening for supplied inputs; it does not have a validated site-specific forecast or connected field observations to justify the earlier irrigation, energy-dispatch or maintenance recommendations.
          <ul className="mt-3 list-disc pl-5">
            <li>Connect verified site and asset records.</li>
            <li>Ingest source-identified observations with units, timestamps and quality flags.</li>
            <li>Run documented screening or calibrated models against those observations.</li>
            <li>Record recommendations with rationale and uncertainty.</li>
            <li>Require operator approval and persist the decision in an audit trail.</li>
          </ul>
        </div>
      </Panel>
    </AppShell>
  );
}
