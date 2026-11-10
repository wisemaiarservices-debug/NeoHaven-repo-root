import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "./Agriculture";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
  { t: "00:00", title: "Start with live integration status", body: "Show the NOVA Core health check, persistence status and website reachability checks. Explain that website availability is not proof of a module API or field-device connection.", to: "/" },
  { t: "00:40", title: "Retrieve provider-backed environmental data", body: "Open the NASA POWER inspector. Enter coordinates and a date range for the location being discussed. Explain that the returned daily values are gridded provider data, not measurements from local field sensors.", to: "/agriculture" },
  { t: "01:35", title: "Review NeoAgro readiness", body: "Show the unconfigured site state and the required crop, water and connectivity observations. Do not present crop stress, soil moisture or irrigation instructions without verified site data.", to: "/agriculture" },
  { t: "02:10", title: "Review NeoGrid and NeoCell integration gates", body: "Show that the product websites are linked while energy telemetry, gateways and device feeds remain unverified. Explain the data and security requirements for connecting each module.", to: "/energy" },
  { t: "02:55", title: "Explain NOVA Core capability boundaries", body: "Separate deployed API health and provider retrieval from deterministic screening, unvalidated forecasting and optimization, and storage that is not yet provisioned.", to: "/nova-core" },
  { t: "03:40", title: "Show the target digital twin and asset registry", body: "Explain which asset domains and provenance fields must be registered before the system can render a live site topology or knowledge graph.", to: "/digital-twin" },
  { t: "04:20", title: "Close with evidence-gated decisions and impact", body: "Show the empty approval queue and impact evidence gate. NOVA is designed for operator-reviewed decisions; no unverified savings, carbon reductions or yield improvements are claimed.", to: "/recommendations" },
];

export default function DemoScript() {
  return (
    <AppShell>
      <PageHeader module="Executive Walkthrough" title="5-minute verified capability walkthrough" subtitle="A credible product demonstration that distinguishes deployed services, provider data, target architecture and capabilities still under development." />
      <ol className="space-y-2.5">
        {steps.map((s, i) => (
          <li key={i} className="glass-panel p-4 flex gap-4 items-start">
            <div className="w-12 shrink-0 pt-0.5 font-mono text-[11px] text-aurora-blue">{s.t}</div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[14px] font-semibold tracking-tight">{i + 1}. {s.title}</h3>
              <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
            <Link href={s.to} className="inline-flex shrink-0 items-center gap-1 self-center rounded-md border border-aurora-blue/40 bg-aurora-blue/10 px-2.5 py-1 text-[11px] text-aurora-blue hover:bg-aurora-blue/20">
              Open <ArrowRight className="h-3 w-3" />
            </Link>
          </li>
        ))}
      </ol>
      <div className="glass-panel mt-5 p-5">
        <div className="text-[10px] uppercase tracking-[0.18em] font-mono text-aurora-blue">Closing line</div>
        <p className="mt-1 text-[15px] italic">
          "NOVA OS connects specialist infrastructure platforms through a shared intelligence layer, with clear data provenance, operator review and measurable evidence as the foundation for future automation."
        </p>
      </div>
    </AppShell>
  );
}
