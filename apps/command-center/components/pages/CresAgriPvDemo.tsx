import { AppShell } from "@/components/layout/AppShell";
import {
  collaborationRoles,
  cresDemoContext,
  transparencyReferenceCase,
  validationPathway,
  weakGridReferenceCase,
} from "@/data/cresAgriPvDemoData";
import { BarChart3, CheckCircle2, CircleAlert, FileText, Leaf, Lightbulb, Network, ShieldCheck, Zap } from "lucide-react";

const Section = ({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) => (
  <section className="rounded-2xl border border-border/70 bg-card/70 p-5 shadow-sm">
    {eyebrow ? <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">{eyebrow}</div> : null}
    <h2 className="text-lg font-semibold tracking-tight mb-4">{title}</h2>
    {children}
  </section>
);

const MetricCard = ({ label, value, note }: { label: string; value: string; note: string }) => (
  <div className="rounded-xl border border-border/70 bg-background/60 p-4">
    <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</div>
    <div className="text-2xl font-semibold mt-1">{value}</div>
    <div className="text-xs text-muted-foreground mt-2 leading-relaxed">{note}</div>
  </div>
);

const Progress = ({ value }: { value: number }) => (
  <div className="h-2 rounded-full bg-muted overflow-hidden">
    <div className="h-full rounded-full bg-aurora-blue" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
  </div>
);

const CresAgriPvDemo = () => {
  const topTransparency = transparencyReferenceCase.scenarios.find(s => s.transparency === "60%");
  const bestWeakGrid = weakGridReferenceCase.operatingScenarios[2];

  return (
    <AppShell>
      <div className="space-y-5">
        <section className="rounded-3xl border border-border/70 bg-gradient-to-br from-card/90 via-card/70 to-background/80 p-6 lg:p-7 shadow-sm overflow-hidden relative">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-aurora-blue/10 blur-3xl" />
          <div className="absolute right-24 bottom-0 h-32 w-32 rounded-full bg-neo-green/10 blur-3xl" />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="chip border-neo-green/40 text-neo-green bg-neo-green/10"><ShieldCheck className="w-3 h-3" /> Synthetic discussion demo</span>
              <span className="chip border-aurora-blue/40 text-aurora-blue bg-aurora-blue/10"><Network className="w-3 h-3" /> CRES / BRITE collaboration pathway</span>
              <span className="chip border-solar-gold/40 text-solar-gold bg-solar-gold/10"><CircleAlert className="w-3 h-3" /> Not field-validated</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight max-w-4xl">{cresDemoContext.title}</h1>
            <p className="text-muted-foreground mt-3 max-w-3xl leading-relaxed">{cresDemoContext.subtitle}</p>
            <p className="text-sm text-muted-foreground mt-3 max-w-4xl leading-relaxed">{cresDemoContext.disclaimer}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
              <MetricCard label="PV transparency candidate" value={topTransparency?.transparency ?? "60%"} note="Discussion recommendation range: 40%–60%, pending expert validation." />
              <MetricCard label="Weak-grid scenario" value={`${bestWeakGrid.renewableUse}%`} note="Synthetic local renewable utilization with battery-supported irrigation." />
              <MetricCard label="Validation status" value="TRL 2–3" note="Target: move toward TRL 4–5 with expert review and controlled validation." />
            </div>
          </div>
        </section>

        <Section title="Why this demo exists" eyebrow="Meeting context">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {cresDemoContext.sources.map(source => (
              <div key={source} className="rounded-xl border border-border/70 bg-background/60 p-4 text-sm leading-relaxed text-muted-foreground">
                <Lightbulb className="w-4 h-4 text-aurora-blue mb-2" />
                {source}
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-aurora-blue/30 bg-aurora-blue/10 p-4 text-sm leading-relaxed">
            NOVA OS is positioned here as a decision-intelligence layer that can organize variables, scenarios, expert assumptions, recommendations, approvals, and impact reporting. It is not presented as a replacement for CRES / BRITE scientific or engineering tools.
          </div>
        </Section>

        <Section title="NOVA OS workflow for agri-PV collaboration" eyebrow="Decision intelligence">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {cresDemoContext.workflow.map((step, index) => (
              <div key={step} className="rounded-xl border border-border/70 bg-background/60 p-3 min-h-[86px]">
                <div className="text-[10px] text-muted-foreground font-mono">0{index + 1}</div>
                <div className="text-sm font-medium mt-2">{step}</div>
              </div>
            ))}
          </div>
        </Section>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <Section title="PV transparency decision support" eyebrow="Challenge 4-style workflow">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <MetricCard label="Reference crop" value="Tomato / pepper" note="High light requirement; final assumptions require expert review." />
              <MetricCard label="Recommended range" value={transparencyReferenceCase.recommendation.range} note={transparencyReferenceCase.recommendation.confidence} />
            </div>
            <div className="space-y-3">
              {transparencyReferenceCase.scenarios.map(scenario => (
                <div key={scenario.transparency} className="rounded-xl border border-border/70 bg-background/60 p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium">PV transparency {scenario.transparency}</div>
                      <div className="text-xs text-muted-foreground mt-1">{scenario.note}</div>
                    </div>
                    <span className="chip border-border/80 bg-card/80 text-xs">Confidence {scenario.designConfidence}%</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <div className="text-muted-foreground mb-1">Crop suitability</div>
                      <Progress value={scenario.cropSuitability} />
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Energy yield</div>
                      <Progress value={scenario.energyYield} />
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Water stress relief</div>
                      <Progress value={scenario.waterStressReduction * 3} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Weak-grid agri-PV operation" eyebrow="Challenge 5-style workflow">
            <div className="grid grid-cols-2 gap-3 mb-4">
              {weakGridReferenceCase.metrics.map(metric => (
                <MetricCard key={metric.label} label={metric.label} value={metric.value} note={metric.note} />
              ))}
            </div>
            <div className="space-y-3">
              {weakGridReferenceCase.operatingScenarios.map(scenario => (
                <div key={scenario.name} className="rounded-xl border border-border/70 bg-background/60 p-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="font-medium">{scenario.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{scenario.decision}</div>
                    </div>
                    <span className="chip border-neo-green/40 text-neo-green bg-neo-green/10 text-xs">Renewable use {scenario.renewableUse}%</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <div className="text-muted-foreground mb-1">Grid stress</div>
                      <Progress value={scenario.gridStress} />
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Renewable utilization</div>
                      <Progress value={scenario.renewableUse} />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3 text-xs text-muted-foreground">
                    <span>Curtailment: {scenario.curtailmentRisk}</span>
                    <span>·</span>
                    <span>Water risk: {scenario.waterRisk}</span>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>

        <Section title="Data and assumptions to request from CRES / BRITE" eyebrow="Collaboration inputs">
          <div className="overflow-hidden rounded-xl border border-border/70">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-muted-foreground">
                <tr>
                  <th className="text-left p-3 font-medium">Group</th>
                  <th className="text-left p-3 font-medium">Variable</th>
                  <th className="text-left p-3 font-medium">Sample</th>
                  <th className="text-left p-3 font-medium">Why it matters</th>
                </tr>
              </thead>
              <tbody>
                {transparencyReferenceCase.inputVariables.map(item => (
                  <tr key={`${item.group}-${item.variable}`} className="border-t border-border/70">
                    <td className="p-3 text-muted-foreground">{item.group}</td>
                    <td className="p-3 font-medium">{item.variable}</td>
                    <td className="p-3">{item.sample}</td>
                    <td className="p-3 text-muted-foreground">{item.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <Section title="Validation pathway" eyebrow="Proposed next step">
            <div className="space-y-3">
              {validationPathway.map(item => (
                <div key={item.phase} className="rounded-xl border border-border/70 bg-background/60 p-4">
                  <div className="flex items-center gap-2 font-medium"><CheckCircle2 className="w-4 h-4 text-neo-green" />{item.phase}</div>
                  <div className="text-xs text-muted-foreground mt-2">Owner: {item.owner}</div>
                  <div className="text-sm mt-2 leading-relaxed">{item.output}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Possible collaboration roles" eyebrow="EU-funded project framing">
            <div className="space-y-3">
              {collaborationRoles.map(role => (
                <div key={role.partner} className="rounded-xl border border-border/70 bg-background/60 p-4">
                  <div className="font-medium">{role.partner}</div>
                  <div className="text-sm text-muted-foreground mt-2 leading-relaxed">{role.role}</div>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-solar-gold/40 bg-solar-gold/10 p-4 mt-4 text-sm leading-relaxed">
              Suggested meeting ask: agree on a short follow-up concept note with one PV transparency scope, one weak-grid scope, required variables, validation workflow, and possible EU-funded project role split.
            </div>
          </Section>
        </div>

        <Section title="Operator-approved recommendation output" eyebrow="What NOVA OS would generate">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-xl border border-border/70 bg-background/60 p-4">
              <div className="flex items-center gap-2 font-medium mb-3"><Leaf className="w-4 h-4 text-neo-green" /> Transparency recommendation</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{transparencyReferenceCase.recommendation.rationale}</p>
              <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                {transparencyReferenceCase.recommendation.missingData.map(item => <li key={item}>Missing / required: {item}</li>)}
              </ul>
            </div>
            <div className="rounded-xl border border-border/70 bg-background/60 p-4">
              <div className="flex items-center gap-2 font-medium mb-3"><Zap className="w-4 h-4 text-solar-gold" /> Weak-grid recommendation</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{weakGridReferenceCase.recommendation.rationale}</p>
              <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                {weakGridReferenceCase.recommendation.checks.map(item => <li key={item}>Check: {item}</li>)}
              </ul>
            </div>
          </div>
        </Section>

        <footer className="text-center text-[11px] text-muted-foreground py-4">
          NOVA OS · NeoHaven AI Urban Labs · Synthetic agri-PV validation demo · No autonomous physical control.
        </footer>
      </div>
    </AppShell>
  );
};

export default CresAgriPvDemo;
