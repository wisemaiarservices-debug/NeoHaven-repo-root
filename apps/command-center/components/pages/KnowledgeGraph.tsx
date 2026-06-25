import { AppShell } from "@/components/layout/AppShell";
import { KnowledgeGraphPanel } from "@/components/nova/KnowledgeGraphPanel";
import { PageHeader } from "./Agriculture";

export default function KnowledgeGraph() {
  return (
    <AppShell>
      <PageHeader module="Knowledge Graph" title="Context & asset registry" subtitle="Every recommendation NOVA produces is grounded in this asset graph and reasoning chain." />
      <KnowledgeGraphPanel />
    </AppShell>
  );
}
