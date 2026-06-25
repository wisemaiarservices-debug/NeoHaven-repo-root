import { knowledgeGraph } from "@/data/mockData";
import { Panel } from "./Panel";
import { ArrowRight } from "lucide-react";

export function KnowledgeGraphPanel() {
  return (
    <Panel
      module="Knowledge Graph"
      title="Context chain & asset registry"
      subtitle="Reasoning provenance for every NOVA recommendation"
    >
      <div className="flex flex-wrap items-center gap-1.5 mb-4">
        {knowledgeGraph.chain.map((step, i) => (
          <span key={i} className="chip border-border/60 bg-panel-elevated/60 text-foreground/85 normal-case tracking-normal text-[11px]">
            {step.replace(/^→\s*/, "")}
            {i < knowledgeGraph.chain.length - 1 && <ArrowRight className="w-3 h-3 text-aurora-blue ml-1" />}
          </span>
        ))}
      </div>
      <div className="rounded-md border border-border/60 overflow-hidden">
        <table className="w-full text-[12px]">
          <thead className="bg-panel-elevated/80 text-muted-foreground text-[10px] uppercase tracking-wider">
            <tr>
              <th className="text-left px-3 py-2">Asset ID</th>
              <th className="text-left px-3 py-2">Type</th>
              <th className="text-left px-3 py-2">Capacity</th>
              <th className="text-left px-3 py-2">Zone / Location</th>
            </tr>
          </thead>
          <tbody>
            {knowledgeGraph.assets.map(a => (
              <tr key={a.id} className="border-t border-border/40 hover:bg-panel-elevated/60">
                <td className="px-3 py-1.5 font-mono text-aurora-blue">{a.id}</td>
                <td className="px-3 py-1.5">{a.type}</td>
                <td className="px-3 py-1.5 font-mono">{a.capacity}</td>
                <td className="px-3 py-1.5 text-muted-foreground">{a.zone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
