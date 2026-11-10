import { site } from "@/data/mockData";
import { MapPin, ShieldCheck } from "lucide-react";

export function HeroSection() {
  return (
    <section className="glass-panel relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-7">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-aurora-blue/90">
            <span>NOVA OS · Command Center</span>
            <span className="text-border">/</span>
            <span className="text-muted-foreground">Integration preview</span>
          </div>
          <h1 className="mt-2 text-[26px] font-semibold tracking-tight leading-tight lg:text-[30px]">{site.name}</h1>
          <p className="mt-1 max-w-2xl text-[13px] text-muted-foreground">
            Shared operations and intelligence workspace. Product interfaces are linked, while module APIs, site telemetry and device connections are verified independently.
          </p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-muted-foreground">
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-aurora-blue" />{site.location}</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-solar-gold" />Human review required</span>
          </div>
        </div>
        <div className="rounded-md border border-solar-gold/30 bg-solar-gold/5 p-3 text-[12px] text-muted-foreground lg:max-w-[260px]">
          No pilot site selected. No live field telemetry or module device feed is currently verified.
        </div>
      </div>
    </section>
  );
}
