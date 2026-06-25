import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "./Agriculture";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
  { t: "00:00", title: "Open Command Center", body: "Reviewer lands on Overview. Hero shows the SolarHub site, active heatwave scenario and service status chips. Anchor the story: 'This is the operating system for a real pilot site.'", to: "/" },
  { t: "00:30", title: "Read the KPI strip",   body: "8 KPIs frame the state of the site at a glance: site health, crops, energy, carbon, resilience. Point at soil moisture & battery SOC trending down — the scenario tension.", to: "/" },
  { t: "01:00", title: "Drill into NeoAgro",   body: "Field zone matrix shows which crops are stressed. Recommendation: pre-irrigate Z-03/Z-08 before 11:00.", to: "/agriculture" },
  { t: "01:45", title: "Drill into NeoGrid",   body: "Solar/battery/demand chart. Recommendation: shift pump load into 12:00–14:00 surplus to lift self-consumption.", to: "/energy" },
  { t: "02:30", title: "Show NeoCell readiness", body: "Edge gateways, sensors, latency, pump node. Demonstrates that NOVA knows whether the infrastructure can actually act.", to: "/infrastructure" },
  { t: "03:00", title: "Open NOVA Core AI",    body: "The decision intelligence layer answers: what is happening, why it matters, what's next, what to do, what impact. Scenario simulation quantifies the plan.", to: "/nova-core" },
  { t: "03:45", title: "Walk the Digital Twin & Knowledge Graph", body: "Show the asset flow and reasoning chain — provenance for every recommendation.", to: "/digital-twin" },
  { t: "04:15", title: "Approve recommendations", body: "Reviewer sees that NOVA proposes, the operator approves. No autonomous control — a deliberate trust boundary.", to: "/recommendations" },
  { t: "04:45", title: "Close on Impact",      body: "3.2 m³ water saved · 21.8 kg CO₂e avoided · +12% resilience · -11% yield risk. End on the tagline.", to: "/impact" },
];

export default function DemoScript() {
  return (
    <AppShell>
      <PageHeader module="Demo Script" title="5-minute pitch walkthrough" subtitle="Step-by-step narrative for mentors, partners and pilot operators. Each step links into the live prototype." />
      <ol className="space-y-2.5">
        {steps.map((s, i) => (
          <li key={i} className="glass-panel p-4 flex gap-4 items-start">
            <div className="font-mono text-[11px] text-aurora-blue w-12 shrink-0 pt-0.5">{s.t}</div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[14px] font-semibold tracking-tight">{i + 1}. {s.title}</h3>
              <p className="text-[12.5px] text-muted-foreground mt-1 leading-relaxed">{s.body}</p>
            </div>
            <Link href={s.to} className="shrink-0 self-center text-[11px] px-2.5 py-1 rounded-md border border-aurora-blue/40 text-aurora-blue bg-aurora-blue/10 hover:bg-aurora-blue/20 inline-flex items-center gap-1">
              Open <ArrowRight className="w-3 h-3" />
            </Link>
          </li>
        ))}
      </ol>
      <div className="glass-panel mt-5 p-5">
        <div className="text-[10px] uppercase tracking-[0.18em] text-aurora-blue font-mono">Closing line</div>
        <p className="text-[15px] mt-1 italic">"NOVA OS is not another dashboard. It is the decision intelligence layer that turns fragmented infrastructure data into operator-approved action."</p>
      </div>
    </AppShell>
  );
}
