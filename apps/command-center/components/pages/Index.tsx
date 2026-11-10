import { AppShell } from "@/components/layout/AppShell";
import { CoreConnectivityPanel } from "@/components/nova/CoreConnectivityPanel";
import { ProductStatusPanel } from "@/components/nova/ProductStatusPanel";
import { NasaPowerInspector } from "@/components/nova/NasaPowerInspector";

export default function Index() {
  return (
    <AppShell>
      <div className="space-y-5">
        <section className="mb-2">
          <div className="text-[10px] uppercase tracking-[0.18em] text-aurora-blue/90 font-mono">NOVA OS · Command Center</div>
          <h1 className="mt-1 text-[26px] font-semibold tracking-tight">Operations overview</h1>
          <p className="mt-1 max-w-3xl text-[13px] text-muted-foreground">
            Verified service connectivity, provider-backed data retrieval and links to specialist workspaces. No unverified site KPIs are presented as live measurements.
          </p>
        </section>
        <CoreConnectivityPanel />
        <ProductStatusPanel />
        <NasaPowerInspector />
        <footer className="text-center text-[11px] text-muted-foreground py-4">
          NOVA OS · NeoHaven Urban Labs Inc. · Human review required for operational decisions.
        </footer>
      </div>
    </AppShell>
  );
}
