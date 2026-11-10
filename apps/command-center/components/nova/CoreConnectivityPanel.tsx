"use client";

import { useCallback, useEffect, useState } from "react";
import { Activity, ExternalLink, RefreshCw, ShieldAlert, ShieldCheck, CircleHelp } from "lucide-react";
import { Panel } from "@/components/nova/Panel";

type StatusPayload = {
  checkedAt: string;
  core: { status: "online" | "unavailable"; service: string; endpoint: string; httpStatus: number | null };
  persistence: { status: string; detail: string; httpStatus: number | null };
  modules: Record<string, { status: string; url: string }>;
  dataTrust: { liveTelemetry: boolean; note: string };
};

const moduleMeta = [
  { id: "neoagro", name: "NeoAgro", label: "Agriculture", href: "https://neoagro-six.vercel.app" },
  { id: "neogrid", name: "NeoGrid", label: "Energy", href: "https://neogrid-sigma.vercel.app" },
  { id: "neocell", name: "NeoCell", label: "Infrastructure", href: "https://neocell-ebon.vercel.app" },
];

export function CoreConnectivityPanel() {
  const [data, setData] = useState<StatusPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/system/status", { cache: "no-store" });
      if (!response.ok) throw new Error(`Status check returned HTTP ${response.status}`);
      setData(await response.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to read integration status");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  const coreOnline = data?.core.status === "online";

  return (
    <div id="live-integration">
    <Panel
      module="NOVA OS · Live integration"
      title="Core connectivity & platform links"
      subtitle="Live process checks are separated from product navigation and field-data verification."
      right={
        <button onClick={() => void refresh()} disabled={loading} className="chip border-border/70 text-foreground hover:border-aurora-blue/60 disabled:opacity-50">
          <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} /> Check now
        </button>
      }
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="rounded-md border border-border/60 bg-panel-elevated/50 p-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm font-semibold"><Activity className="h-4 w-4 text-aurora-blue" /> NOVA Core API</div>
            <span className={`chip ${coreOnline ? "border-neo-green/40 text-neo-green bg-neo-green/10" : "border-alert-red/40 text-alert-red bg-alert-red/10"}`}>{loading ? "Checking" : coreOnline ? "Reachable" : "Unavailable"}</span>
          </div>
          <p className="mt-2 break-all text-[11px] text-muted-foreground">{data?.core.endpoint ?? "https://nova-core-api.neohaven.workers.dev"}</p>
          <p className="mt-1 text-xs text-muted-foreground">{data?.core.httpStatus ? `Health endpoint · HTTP ${data.core.httpStatus}` : "Health endpoint has not yet been checked."}</p>
        </div>
        <div className="rounded-md border border-border/60 bg-panel-elevated/50 p-3">
          <div className="flex items-center gap-2 text-sm font-semibold"><ShieldCheck className="h-4 w-4 text-aurora-blue" /> Persistent storage</div>
          <div className="mt-2 text-sm font-medium">{loading ? "Checking" : data?.persistence.status ?? "Not verified"}</div>
          <p className="mt-1 text-xs text-muted-foreground">{data?.persistence.detail ?? "Storage status is not yet available."}</p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-3">
        {moduleMeta.map((module) => (
          <a key={module.id} href={module.href} target="_blank" rel="noreferrer" className="rounded-md border border-border/60 bg-panel-elevated/40 p-3 hover:border-aurora-blue/50">
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="stat-label">{module.label}</div>
                <div className="mt-1 text-sm font-semibold">{module.name}</div>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2 text-[11px] text-solar-gold">UI link available · API not verified</div>
          </a>
        ))}
      </div>

      <div className="mt-3 rounded-md border border-solar-gold/30 bg-solar-gold/5 p-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-solar-gold"><ShieldAlert className="h-4 w-4" /> Data integrity notice</div>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">{data?.dataTrust.note ?? "Dashboard fixture data is not evidence of live telemetry."}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-muted-foreground">
          <span className="chip border-border/60">Live telemetry: {data?.dataTrust.liveTelemetry ? "verified" : "not connected"}</span>
          {data?.checkedAt && <span className="chip border-border/60">Checked {new Date(data.checkedAt).toLocaleString()}</span>}
        </div>
      </div>
      {error && <p role="alert" className="mt-2 text-xs text-alert-red"><CircleHelp className="mr-1 inline h-3 w-3" />{error}</p>}
    </Panel>
    </div>
  );
}
