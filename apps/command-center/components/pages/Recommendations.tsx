import { AppShell } from "@/components/layout/AppShell";
import { RecommendationsPanel } from "@/components/nova/RecommendationsPanel";
import { PageHeader } from "./Agriculture";

export default function Recommendations() {
  return (
    <AppShell>
      <PageHeader module="Recommendations" title="Operator action queue" subtitle="Prioritized actions with confidence, expected impact and approval state. NOVA never executes without human approval." />
      <RecommendationsPanel />
    </AppShell>
  );
}
