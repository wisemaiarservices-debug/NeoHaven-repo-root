import { novaForecast, scenario, impact } from "@/data/mockData";
import { Panel } from "./Panel";
import { Brain, Sparkles } from "lucide-react";

export function NovaCorePanel() {
  return (
    <Panel
      module="NOVA Core AI v0"
      title="Decision intelligence layer"
      subtitle="Observe → Analyze → Forecast → Recommend → Simulate → Optimize → Measure"
      right={
        <span className="chip border-aurora-blue/40 text-aurora-blue bg-aurora-blue/10">
          <Sparkles className="w-3 h-3" /> 4 active inferences
        </span>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Block heading="What is happening?" tone="info">
          Heatwave event detected (+6°C above seasonal). Soil moisture deficit emerging in
          lettuce zones Z-03 / Z-08. Solar yield trending 12% above forecast.
        </Block>
        <Block heading="Why does it matter?" tone="warn">
          Without intervention, lettuce stress probability rises to 0.62 within 24h.
          Peak-hour grid import would offset today's carbon avoidance gains.
        </Block>
        <Block heading="What will happen next?" tone="info">
          <ul className="space-y-1 text-[12.5px]">
            <li>· Weather: {novaForecast.weather}</li>
            <li>· Irrigation demand: {novaForecast.irrigationDemand}</li>
            <li>· Solar yield: {novaForecast.solarYield}</li>
            <li>· Yield risk: {novaForecast.yieldRisk}</li>
          </ul>
        </Block>
        <Block heading="What should the operator do?" tone="good">
          Approve <span className="font-mono">REC-204</span> (pre-irrigate Z-03/Z-08) and
          <span className="font-mono"> REC-205</span> (shift pump to solar window).
          Hold <span className="font-mono">REC-206</span> until 15:00.
        </Block>
      </div>

      <div className="mt-4 p-3.5 rounded-md border border-border/60 bg-gradient-to-br from-aurora-blue/5 via-transparent to-neo-green/5">
        <div className="text-[10px] uppercase tracking-[0.18em] text-aurora-blue font-mono flex items-center gap-1">
          <Brain className="w-3 h-3" /> Scenario simulation · {scenario.name}
        </div>
        <div className="grid grid-cols-4 gap-3 mt-2">
          <Sim label="Water" baseline={`${scenario.baseline.waterM3} m³`} optimized={`${scenario.optimized.waterM3} m³`} delta={`-${impact.waterSavingsM3} m³`} good />
          <Sim label="Carbon" baseline="0" optimized={`-${impact.carbonReductionKg} kg`} delta={`-${impact.carbonReductionKg} kg CO₂e`} good />
          <Sim label="Resilience" baseline={`${scenario.baseline.resilience}`} optimized={`${scenario.optimized.resilience}`} delta={`+${impact.resilienceGainPct}%`} good />
          <Sim label="Yield risk" baseline="100" optimized={`${scenario.optimized.yieldIndex}`} delta={`-${impact.yieldRiskReductionPct}%`} good />
        </div>
        <div className="mt-3 text-[12px] text-muted-foreground">
          NOVA assistant: <span className="text-foreground">"Recommended plan protects the lettuce harvest while
          exporting 38 kWh of clean energy. All actions require operator approval — no autonomous control."</span>
        </div>
      </div>
    </Panel>
  );
}

function Block({ heading, tone, children }: { heading: string; tone: "info" | "good" | "warn"; children: React.ReactNode }) {
  const border = tone === "good" ? "border-neo-green/30" : tone === "warn" ? "border-solar-gold/30" : "border-aurora-blue/30";
  const txt =    tone === "good" ? "text-neo-green"      : tone === "warn" ? "text-solar-gold"      : "text-aurora-blue";
  return (
    <div className={`rounded-md border ${border} bg-panel-elevated/40 p-3`}>
      <div className={`text-[10px] uppercase tracking-[0.16em] font-mono ${txt}`}>{heading}</div>
      <div className="mt-1 text-[12.5px] leading-relaxed text-foreground/90">{children}</div>
    </div>
  );
}

function Sim({ label, baseline, optimized, delta, good }: { label: string; baseline: string; optimized: string; delta: string; good?: boolean }) {
  return (
    <div className="rounded-md border border-border/60 bg-panel-elevated/60 px-3 py-2">
      <div className="stat-label">{label}</div>
      <div className="mt-1 text-[10px] text-muted-foreground">Baseline <span className="font-mono text-foreground/70">{baseline}</span></div>
      <div className="text-[10px] text-muted-foreground">Optimized <span className="font-mono text-foreground/90">{optimized}</span></div>
      <div className={`mt-1 text-[12px] font-semibold font-mono ${good ? "text-neo-green" : "text-alert-red"}`}>{delta}</div>
    </div>
  );
}
