interface KpiCardProps {
  label: string;
  value: string;
  unit?: string;
  delta?: string;
  tone?: "good" | "warn" | "bad";
}

export function KpiCard({ label, value, unit, delta, tone = "good" }: KpiCardProps) {
  const deltaCls =
    tone === "good" ? "text-neo-green" : tone === "warn" ? "text-solar-gold" : "text-alert-red";
  const bar =
    tone === "good" ? "from-neo-green/60 to-neo-green/0"
    : tone === "warn" ? "from-solar-gold/60 to-solar-gold/0"
    : "from-alert-red/60 to-alert-red/0";
  return (
    <div className="glass-panel px-3 py-3 relative overflow-hidden">
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${bar}`} />
      <div className="stat-label">{label}</div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-[22px] leading-none font-semibold tracking-tight font-mono">{value}</span>
        {unit && <span className="text-[11px] text-muted-foreground">{unit}</span>}
      </div>
      {delta && <div className={`mt-1 text-[11px] font-medium ${deltaCls}`}>{delta} vs 7d</div>}
    </div>
  );
}
