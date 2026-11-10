import { AppShell } from "@/components/layout/AppShell";
import { NeoAgroPanel } from "@/components/nova/NeoAgroPanel";
import { NasaPowerInspector } from "@/components/nova/NasaPowerInspector";

export default function Agriculture() {
  return (
    <AppShell>
      <PageHeader module="NOVA Agriculture" title="NeoAgro" subtitle="Provider-backed daily weather and solar data through NOVA Core, alongside a clearly separated illustrative field-zone preview." />
      <NasaPowerInspector />
      <div className="mt-4"><NeoAgroPanel /></div>
    </AppShell>
  );
}

export function PageHeader({ module, title, subtitle }: { module: string; title: string; subtitle: string }) {
  return (
    <div className="mb-5">
      <div className="text-[10px] uppercase tracking-[0.18em] text-aurora-blue/90 font-mono">{module}</div>
      <h1 className="text-[24px] font-semibold tracking-tight mt-1">{title}</h1>
      <p className="text-[13px] text-muted-foreground mt-1 max-w-3xl">{subtitle}</p>
    </div>
  );
}
