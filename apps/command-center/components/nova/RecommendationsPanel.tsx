import { Panel } from "./Panel";
import { ClipboardCheck, ShieldAlert } from "lucide-react";

export function RecommendationsPanel() {
  return (
    <Panel
      module="NOVA Recommendations · operator review"
      title="No verified actions awaiting approval"
      subtitle="The approval queue is intentionally empty until recommendations are generated from verified site inputs."
    >
      <div className="rounded-md border border-border/60 bg-panel-elevated/40 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <ClipboardCheck className="h-4 w-4 text-aurora-blue" />
          Approval workflow not yet connected
        </div>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          Previous recommendation cards, confidence percentages and estimated water, carbon, resilience and yield impacts were static scenario fixtures. They were not validated against a selected site and have been removed.
        </p>
      </div>
      <div className="mt-3 rounded-md border border-solar-gold/30 bg-solar-gold/5 p-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-solar-gold">
          <ShieldAlert className="h-4 w-4" />
          Required before approval actions are enabled
        </div>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-[11px] leading-5 text-muted-foreground">
          <li>Verified site, asset and source records.</li>
          <li>Timestamped observations with units and quality flags.</li>
          <li>Documented method, assumptions and uncertainty for each recommendation.</li>
          <li>Persisted operator identity, decision, timestamp and audit event.</li>
          <li>Explicit human approval before any operational action.</li>
        </ul>
      </div>
    </Panel>
  );
}
