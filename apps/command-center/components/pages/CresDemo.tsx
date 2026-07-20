import { AppShell } from "@/components/layout/AppShell";
import { KpiCard } from "@/components/nova/KpiCard";
import {
  collaborationRoles,
  cresDemoKpis,
  cresDemoNotice,
  dataSourceCandidates,
  meetingQuestions,
  transparencyScenario,
  validationPathway,
  weakGridScenario,
} from "@/data/cresDemoData";

export default function CresDemo() {
  return (
    <AppShell>
      <div className="space-y-5">
        <PageHeader
          module="NOVA OS · CRES / BRITE collaboration discussion"
          title="Agri-PV Decision Intelligence Demo"
          subtitle="A parallel NOVA OS command-center view using synthetic sample data for PV transparency, weak-grid agri-PV operation, and EU-funded validation brainstorming."
        />

        <div className="glass-panel p-4 border-aurora-blue/30 bg-aurora-blue/5">
          <div className="flex flex-col lg:flex-row lg:items-start gap-3 lg:gap-6">
            <div className="min-w-[220px]">
              <div className="chip border-neo-green/40 text-neo-green bg-neo-green/10">Discussion mode</div>
              <h2 className="text-[18px] font-semibold mt-3">{cresDemoNotice.title}</h2>
            </div>
            <p className="text-[13px] text-muted-foreground leading-6 max-w-5xl">{cresDemoNotice.body}</p>
          </div>
        </div>

        <section aria-label="CRES demo KPIs">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {cresDemoKpis.map(kpi => (
              <KpiCard key={kpi.label} label={kpi.label} value={kpi.value} unit={kpi.unit} delta={kpi.delta} tone={kpi.tone} />
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <ScenarioPanel type="transparency" />
          <ScenarioPanel type="weak-grid" />
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <DataIntegrationPanel />
          <ValidationPanel />
          <CollaborationPanel />
        </section>

        <QuestionsPanel />

        <footer className="text-center text-[11px] text-muted-foreground py-4">
          NOVA OS · Synthetic agri-PV collaboration sandbox · No autonomous physical control · Expert validation required.
        </footer>
      </div>
    </AppShell>
  );
}

function PageHeader({ module, title, subtitle }: { module: string; title: string; subtitle: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-aurora-blue/90 font-mono">{module}</div>
      <h1 className="text-[28px] font-semibold tracking-tight mt-1">{title}</h1>
      <p className="text-[13px] text-muted-foreground mt-1 max-w-4xl">{subtitle}</p>
    </div>
  );
}

function ScenarioPanel({ type }: { type: "transparency" | "weak-grid" }) {
  const scenario = type === "transparency" ? transparencyScenario : weakGridScenario;

  return (
    <article className="glass-panel p-4 space-y-4">
      <div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">
          {type === "transparency" ? "Challenge 4-style workflow" : "Challenge 5-style workflow"}
        </div>
        <h2 className="text-[20px] font-semibold mt-1">{scenario.title}</h2>
        <p className="text-[13px] text-muted-foreground mt-1">{scenario.context}</p>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {Object.entries(scenario.site).map(([key, value]) => (
          <div key={key} className="rounded-lg border border-border/60 bg-card/40 p-3">
            <div className="stat-label capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
            <div className="text-[13px] mt-1">{value}</div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-[13px] font-semibold mb-2">Core variables injected</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {scenario.variables.map(variable => (
            <div key={variable.label} className="rounded-lg border border-border/60 p-3 bg-midnight/20">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[12px] text-muted-foreground">{variable.label}</span>
                <span className="text-[10px] text-aurora-blue font-mono">{variable.status}</span>
              </div>
              <div className="text-[13px] mt-1">{variable.value}</div>
            </div>
          ))}
        </div>
      </div>

      {type === "transparency" ? <TransparencyOptions /> : <WeakGridActions />}

      <div className="rounded-lg border border-neo-green/30 bg-neo-green/10 p-3">
        <div className="text-[12px] font-semibold text-neo-green mb-1">NOVA OS recommendation for discussion</div>
        <p className="text-[13px] leading-6 text-muted-foreground">{scenario.recommendation}</p>
      </div>

      <div>
        <h3 className="text-[13px] font-semibold mb-2">Limitations to state clearly</h3>
        <ul className="space-y-1.5 text-[12px] text-muted-foreground">
          {scenario.limitations.map(item => (
            <li key={item} className="flex gap-2">
              <span className="text-solar-gold">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function TransparencyOptions() {
  return (
    <div>
      <h3 className="text-[13px] font-semibold mb-2">Transparency scenario comparison</h3>
      <div className="space-y-2.5">
        {transparencyScenario.options.map(option => (
          <div key={option.transparency} className="rounded-lg border border-border/60 bg-card/30 p-3">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div>
                <div className="text-[13px] font-semibold">{option.transparency} PV glass transparency</div>
                <div className="text-[11px] text-muted-foreground">{option.recommendation}</div>
              </div>
              <span className="chip border-border/60 text-muted-foreground bg-muted/10">{option.risk}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <ScoreBar label="Crop" value={option.cropScore} tone="good" />
              <ScoreBar label="Energy" value={option.energyScore} tone="good" />
              <ScoreBar label="Water" value={option.waterScore} tone="warn" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeakGridActions() {
  return (
    <div>
      <h3 className="text-[13px] font-semibold mb-2">Operator-approved action candidates</h3>
      <div className="space-y-2.5">
        {weakGridScenario.actions.map(action => (
          <div key={action.title} className="rounded-lg border border-border/60 bg-card/30 p-3">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
              <div>
                <div className="text-[13px] font-semibold">{action.title}</div>
                <div className="text-[11px] text-aurora-blue mt-0.5">{action.module}</div>
              </div>
              <span className="chip border-neo-green/40 text-neo-green bg-neo-green/10">{action.confidence}% confidence</span>
            </div>
            <p className="text-[12px] text-muted-foreground mt-2">{action.effect}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScoreBar({ label, value, tone }: { label: string; value: number; tone: "good" | "warn" }) {
  const fill = tone === "good" ? "bg-neo-green" : "bg-solar-gold";

  return (
    <div>
      <div className="flex items-center justify-between text-[11px] mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono">{value}/100</span>
      </div>
      <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
        <div className={`h-full rounded-full ${fill}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function DataIntegrationPanel() {
  return (
    <article className="glass-panel p-4">
      <SectionTitle eyebrow="Data layer" title="Source candidates" />
      <div className="space-y-3 mt-4">
        {dataSourceCandidates.map(source => (
          <div key={source.name} className="rounded-lg border border-border/60 p-3 bg-card/30">
            <div className="text-[13px] font-semibold">{source.name}</div>
            <p className="text-[12px] text-muted-foreground mt-1 leading-5">{source.use}</p>
            <div className="text-[10px] text-aurora-blue font-mono mt-2">{source.demoStatus}</div>
          </div>
        ))}
      </div>
    </article>
  );
}

function ValidationPanel() {
  return (
    <article className="glass-panel p-4">
      <SectionTitle eyebrow="Validation" title="CRES / BRITE pathway" />
      <div className="space-y-3 mt-4">
        {validationPathway.map(step => (
          <div key={step.step} className="flex gap-3">
            <div className="w-8 h-8 rounded-md border border-aurora-blue/40 text-aurora-blue grid place-items-center font-mono text-[11px] shrink-0">
              {step.step}
            </div>
            <div>
              <div className="text-[13px] font-semibold">{step.title}</div>
              <p className="text-[12px] text-muted-foreground leading-5 mt-0.5">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function CollaborationPanel() {
  return (
    <article className="glass-panel p-4">
      <SectionTitle eyebrow="EU project fit" title="Complementary roles" />
      <div className="space-y-3 mt-4">
        {collaborationRoles.map(role => (
          <div key={role.partner} className="rounded-lg border border-border/60 p-3 bg-card/30">
            <div className="text-[13px] font-semibold">{role.partner}</div>
            <p className="text-[12px] text-muted-foreground mt-1 leading-5">{role.role}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

function QuestionsPanel() {
  return (
    <article className="glass-panel p-4">
      <SectionTitle eyebrow="Brainstorming support" title="Questions to use during the meeting" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-4">
        {meetingQuestions.map((question, index) => (
          <div key={question} className="rounded-lg border border-border/60 p-3 bg-midnight/20">
            <div className="text-[10px] text-aurora-blue font-mono mb-1">QUESTION {index + 1}</div>
            <p className="text-[13px] text-muted-foreground leading-5">{question}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{eyebrow}</div>
      <h2 className="text-[18px] font-semibold mt-1">{title}</h2>
    </div>
  );
}
