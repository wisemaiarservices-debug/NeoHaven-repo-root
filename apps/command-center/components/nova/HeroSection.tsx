import { site, services } from "@/data/mockData";
import { StatusDot } from "@/components/nova/Panel";
import { MapPin, Thermometer, Activity } from "lucide-react";

export function HeroSection() {
  return (
    <div className="glass-panel relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-aurora-blue/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-24 w-72 h-72 rounded-full bg-neo-green/10 blur-3xl pointer-events-none" />
      <div className="relative p-6 lg:p-7 flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-aurora-blue/90">
            <span>NOVA OS · Command Center</span>
            <span className="text-border">/</span>
            <span className="text-muted-foreground">Pilot Mode</span>
          </div>
          <h1 className="mt-2 text-[26px] lg:text-[30px] font-semibold tracking-tight leading-tight">
            {site.name}
          </h1>
          <p className="mt-1 text-[13px] text-muted-foreground max-w-2xl">
            From fragmented infrastructure data to operator-approved action. NOVA Core orchestrates
            NeoAgro, NeoGrid and NeoCell against the live site scenario.
          </p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-muted-foreground">
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-aurora-blue" />{site.location}</span>
            <span className="flex items-center gap-1.5"><Thermometer className="w-3.5 h-3.5 text-solar-gold" />Active scenario: <span className="text-foreground font-medium">{site.scenario}</span></span>
            <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-neo-green" />Telemetry stream: live · 1Hz</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 lg:min-w-[420px]">
          {services.map(s => {
            const tone = s.status === "online" ? "good" : s.status === "degraded" ? "warn" : "bad";
            return (
              <div key={s.id} className="glass-panel px-3 py-2.5">
                <div className="flex items-center gap-1.5">
                  <StatusDot tone={tone} />
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.status}</span>
                </div>
                <div className="mt-1 text-[13px] font-semibold leading-tight">{s.name}</div>
                <div className="text-[10px] text-muted-foreground font-mono mt-0.5">{s.latencyMs}ms</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
