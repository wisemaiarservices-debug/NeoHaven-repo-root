import { AppShell } from "@/components/layout/AppShell";
import { HeroSection } from "@/components/nova/HeroSection";
import { KpiCard } from "@/components/nova/KpiCard";
import { NeoAgroPanel } from "@/components/nova/NeoAgroPanel";
import { NeoGridPanel } from "@/components/nova/NeoGridPanel";
import { NeoCellPanel } from "@/components/nova/NeoCellPanel";
import { NovaCorePanel } from "@/components/nova/NovaCorePanel";
import { DigitalTwinPanel } from "@/components/nova/DigitalTwinPanel";
import { KnowledgeGraphPanel } from "@/components/nova/KnowledgeGraphPanel";
import { RecommendationsPanel } from "@/components/nova/RecommendationsPanel";
import { ImpactSummary } from "@/components/nova/ImpactSummary";
import { kpis } from "@/data/mockData";

const Index = () => (
  <AppShell>
    <div className="space-y-5">
      <HeroSection />

      <section aria-label="Key performance indicators">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {kpis.map(k => (
            <KpiCard key={k.label} label={k.label} value={k.value} unit={k.unit} delta={k.delta} tone={k.tone as any} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <NeoAgroPanel />
        <NeoGridPanel />
      </div>

      <NeoCellPanel />

      <NovaCorePanel />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DigitalTwinPanel />
        <KnowledgeGraphPanel />
      </div>

      <RecommendationsPanel compact />

      <ImpactSummary />

      <footer className="text-center text-[11px] text-muted-foreground py-4">
        NOVA OS · NeoHaven AI Urban Labs · "From fragmented infrastructure data to operator-approved action."
      </footer>
    </div>
  </AppShell>
);

export default Index;
