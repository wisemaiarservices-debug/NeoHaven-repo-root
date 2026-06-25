import { AppShell } from "@/components/layout/AppShell";
import { NovaCorePanel } from "@/components/nova/NovaCorePanel";
import { RecommendationsPanel } from "@/components/nova/RecommendationsPanel";
import { DigitalTwinPanel } from "@/components/nova/DigitalTwinPanel";
import { KnowledgeGraphPanel } from "@/components/nova/KnowledgeGraphPanel";
import { PageHeader } from "./Agriculture";

export default function NovaAi() {
  return (
    <AppShell>
      <PageHeader module="NOVA Core AI v0" title="Decision intelligence layer" subtitle="Forecast, recommend, simulate and explain — across NeoAgro, NeoGrid and NeoCell. No autonomous control." />
      <div className="space-y-4">
        <NovaCorePanel />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DigitalTwinPanel />
          <KnowledgeGraphPanel />
        </div>
        <RecommendationsPanel />
      </div>
    </AppShell>
  );
}
