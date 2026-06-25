import { Area, AreaChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { energy, solarSeries } from "@/data/mockData";
import { Panel } from "./Panel";
import { BatteryMedium, Sun, Leaf, ArrowDownRight, ArrowUpRight } from "lucide-react";

export function NeoGridPanel() {
  return (
    <Panel
      module="NOVA Energy · NeoGrid"
      title="Solar production · battery · grid"
      subtitle="24h profile · curtailment risk flagged 16:00–17:30"
      right={
        <div className="text-right">
          <div className="text-[11px] text-muted-foreground">Carbon avoided</div>
          <div className="text-[15px] font-semibold text-neo-green font-mono">{energy.carbonAvoidedKg} kg</div>
        </div>
      }
    >
      <div className="grid grid-cols-4 gap-2 mb-3">
        <Stat icon={<Sun className="w-3.5 h-3.5 text-solar-gold" />} label="Solar today" value={`${energy.solarTodayKwh} kWh`} />
        <Stat icon={<BatteryMedium className="w-3.5 h-3.5 text-aurora-blue" />} label="Battery SOC" value={`${energy.batterySoc}%`} sub={`${energy.batteryKwh} kWh`} />
        <Stat icon={<ArrowDownRight className="w-3.5 h-3.5 text-alert-red" />} label="Grid import" value={`${energy.gridImportKwh} kWh`} />
        <Stat icon={<ArrowUpRight className="w-3.5 h-3.5 text-neo-green" />} label="Grid export" value={`${energy.gridExportKwh} kWh`} />
      </div>

      <div className="h-44 -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={solarSeries} margin={{ top: 8, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="solarG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--solar-gold))" stopOpacity={0.55} />
                <stop offset="100%" stopColor="hsl(var(--solar-gold))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="demandG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--aurora-blue))" stopOpacity={0.35} />
                <stop offset="100%" stopColor="hsl(var(--aurora-blue))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
            <XAxis dataKey="t" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Area type="monotone" dataKey="solar" stroke="hsl(var(--solar-gold))" fill="url(#solarG)" strokeWidth={2} />
            <Area type="monotone" dataKey="demand" stroke="hsl(var(--aurora-blue))" fill="url(#demandG)" strokeWidth={1.5} />
            <Line type="monotone" dataKey="battery" stroke="hsl(var(--neo-green))" strokeWidth={1.5} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex items-center gap-4 text-[11px] text-muted-foreground">
        <Legend color="solar-gold" label="Solar kWh" />
        <Legend color="aurora-blue" label="Site demand" />
        <Legend color="neo-green" label="Battery SOC %" />
      </div>

      <div className="mt-3 p-3 rounded-md border border-neo-green/30 bg-neo-green/5">
        <div className="text-[10px] uppercase tracking-wider text-neo-green font-mono flex items-center gap-1">
          <Leaf className="w-3 h-3" /> NeoGrid recommendation
        </div>
        <div className="text-[13px] mt-0.5">
          Shift pump load into <span className="font-semibold">12:00–14:00</span> solar surplus to lift self-consumption to 92% and avoid 9.1 kg CO₂e import.
        </div>
      </div>
    </Panel>
  );
}

function Stat({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-md border border-border/60 bg-panel-elevated/60 px-2.5 py-2">
      <div className="flex items-center gap-1.5 stat-label">{icon}{label}</div>
      <div className="mt-1 text-[14px] font-semibold font-mono">{value}</div>
      {sub && <div className="text-[10px] text-muted-foreground">{sub}</div>}
    </div>
  );
}
function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`w-2.5 h-2.5 rounded-sm bg-${color}`} />
      {label}
    </span>
  );
}
