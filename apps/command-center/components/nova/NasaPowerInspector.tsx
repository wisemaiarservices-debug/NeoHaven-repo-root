"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { CalendarDays, Download, LoaderCircle, MapPin, RefreshCw, Satellite } from "lucide-react";
import { Panel } from "@/components/nova/Panel";

type WeatherResponse = {
  status: string;
  data_source: string;
  data_product: string;
  data_interpretation: string;
  attribution: string;
  attribution_url: string;
  requested_location: { latitude: number; longitude: number };
  requested_period: { start_date: string; end_date: string };
  units: Record<string, string>;
  records: Array<{ date: string; values: Record<string, number | null> }>;
  source_metadata?: { time_standard?: string; sources?: string[] };
  error?: string;
};

const fields = [
  ["T2M", "Mean temperature"],
  ["T2M_MAX", "Maximum temperature"],
  ["T2M_MIN", "Minimum temperature"],
  ["RH2M", "Relative humidity"],
  ["PRECTOTCORR", "Precipitation"],
  ["WS10M", "Wind speed"],
  ["ALLSKY_SFC_SW_DWN", "Solar irradiation"],
] as const;

export function NasaPowerInspector() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function retrieve(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setData(null);
    try {
      const query = new URLSearchParams({
        latitude, longitude, start_date: startDate, end_date: endDate,
      });
      const response = await fetch(`/api/data/weather/nasa-power/daily?${query}`, { cache: "no-store" });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || body.detail || `Request failed (HTTP ${response.status})`);
      setData(body as WeatherResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to retrieve weather data.");
    } finally {
      setLoading(false);
    }
  }

  function exportCsv() {
    if (!data?.records?.length) return;
    const keys = fields.map(([key]) => key);
    const header = ["date", ...keys];
    const rows = data.records.map(record => [
      record.date,
      ...keys.map(key => record.values[key] ?? ""),
    ]);
    const csv = [header, ...rows].map(row => row.map(value => {
      const text = String(value);
      return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
    }).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "nova-nasa-power-daily.csv";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(href), 1000);
  }

  return (
    <Panel
      module="NOVA Core · NASA POWER"
      title="Retrieve real daily weather & solar data"
      subtitle="Enter the coordinates of a site you are authorized to assess. No pilot location is preselected."
      right={<span className="chip border-aurora-blue/40 text-aurora-blue"><Satellite className="h-3 w-3" /> Provider retrieval</span>}
    >
      <form onSubmit={retrieve} className="grid grid-cols-1 gap-3 md:grid-cols-5">
        <label className="text-[11px] text-muted-foreground">
          <span className="mb-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> Latitude</span>
          <input required type="number" min="-90" max="90" step="any" value={latitude} onChange={e => setLatitude(e.target.value)} placeholder="e.g. 36.8" className="w-full rounded-md border border-border bg-panel-elevated px-3 py-2 text-sm text-foreground" />
        </label>
        <label className="text-[11px] text-muted-foreground">
          <span className="mb-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> Longitude</span>
          <input required type="number" min="-180" max="180" step="any" value={longitude} onChange={e => setLongitude(e.target.value)} placeholder="e.g. 10.2" className="w-full rounded-md border border-border bg-panel-elevated px-3 py-2 text-sm text-foreground" />
        </label>
        <label className="text-[11px] text-muted-foreground">
          <span className="mb-1 flex items-center gap-1"><CalendarDays className="h-3 w-3" /> Start date</span>
          <input required type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full rounded-md border border-border bg-panel-elevated px-3 py-2 text-sm text-foreground" />
        </label>
        <label className="text-[11px] text-muted-foreground">
          <span className="mb-1 flex items-center gap-1"><CalendarDays className="h-3 w-3" /> End date</span>
          <input required type="date" value={endDate} onChange={e => setEndDate(e.target.value)} min={startDate || undefined} className="w-full rounded-md border border-border bg-panel-elevated px-3 py-2 text-sm text-foreground" />
        </label>
        <div className="flex items-end">
          <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-md bg-aurora-blue px-3 py-2 text-sm font-semibold text-white disabled:opacity-60">
            {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            {loading ? "Retrieving" : "Retrieve data"}
          </button>
        </div>
      </form>

      {error && <div role="alert" className="mt-3 rounded-md border border-alert-red/40 bg-alert-red/5 p-3 text-sm text-alert-red">{error}</div>}

      {data && (
        <div className="mt-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-sm font-semibold">{data.records.length} daily records retrieved</div>
              <div className="text-[11px] text-muted-foreground">{data.requested_location.latitude}, {data.requested_location.longitude} · {data.requested_period.start_date} to {data.requested_period.end_date}</div>
            </div>
            <button type="button" onClick={exportCsv} className="chip border-border text-foreground hover:border-aurora-blue/60"><Download className="h-3 w-3" /> Export CSV</button>
          </div>
          <div className="overflow-x-auto rounded-md border border-border/60">
            <table className="w-full min-w-[680px] text-[11px]">
              <thead className="bg-panel-elevated text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 text-left">Date</th>
                  {fields.map(([key, label]) => <th key={key} className="px-3 py-2 text-right">{label}<div className="font-normal opacity-70">{data.units?.[key] ?? "unit n/a"}</div></th>)}
                </tr>
              </thead>
              <tbody>
                {data.records.map(record => (
                  <tr key={record.date} className="border-t border-border/40">
                    <td className="px-3 py-2 font-mono">{record.date}</td>
                    {fields.map(([key]) => <td key={key} className="px-3 py-2 text-right font-mono">{record.values[key] == null ? "—" : record.values[key]}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-md border border-solar-gold/30 bg-solar-gold/5 p-3 text-[11px] leading-5 text-muted-foreground">
            <strong className="text-solar-gold">{data.data_source} · {data.attribution}</strong>
            <div>{data.data_interpretation}. These gridded model and satellite-derived values are not local ground-station or sensor measurements.</div>
            <a href={data.attribution_url} target="_blank" rel="noreferrer" className="underline underline-offset-2">NASA POWER attribution and documentation</a>
          </div>
        </div>
      )}
    </Panel>
  );
}
