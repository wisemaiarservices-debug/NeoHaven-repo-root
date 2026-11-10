import { Panel } from "./Panel";
import { Database, Link2, ShieldCheck } from "lucide-react";

const requiredFields = [
  "Asset identifier and asset type",
  "Site identifier and physical location",
  "Parent-child and system relationships",
  "Capacity, unit and technical specification",
  "Source identity and verification status",
  "Last observed timestamp and quality flags",
];

export function KnowledgeGraphPanel() {
  return (
    <Panel
      module="Knowledge Graph"
      title="Evidence-backed asset registry"
      subtitle="No live site assets or verified relationships have been registered."
    >
      <div className="rounded-md border border-border/60 bg-panel-elevated/40 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Database className="h-4 w-4 text-aurora-blue" />
          Registry is empty
        </div>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          The previous asset list and reasoning chain were illustrative fixtures. They are not used as evidence for current NOVA Core decisions and are no longer presented as registered site data.
        </p>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {requiredFields.map((field) => (
          <div key={field} className="flex items-start gap-2 rounded-md border border-border/50 p-2.5 text-xs text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-aurora-blue" />
            {field}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-start gap-2 rounded-md border border-aurora-blue/25 bg-aurora-blue/5 p-3 text-[11px] leading-5 text-muted-foreground">
        <Link2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-aurora-blue" />
        Relationships and reasoning paths will be generated from registered records and explicit rules, not hardcoded scenario narratives.
      </div>
    </Panel>
  );
}
