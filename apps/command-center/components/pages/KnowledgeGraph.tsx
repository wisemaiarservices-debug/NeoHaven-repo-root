import { AppShell } from "@/components/layout/AppShell";
import { KnowledgeGraphPanel } from "@/components/nova/KnowledgeGraphPanel";
import { PageHeader } from "./Agriculture";

export default function KnowledgeGraph() {
  return (
    <AppShell>
      <PageHeader module="Knowledge Graph" title="Evidence-backed asset registry" subtitle="Registered assets and relationships will be shown here once verified site records are available." />
      <KnowledgeGraphPanel />
    </AppShell>
  );
}
