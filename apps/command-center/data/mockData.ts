// Deterministic demo data for NOVA OS Command Center — SolarHub agrivoltaic site.

export const site = {
  name: "SolarHub Agrivoltaic Demo Site",
  code: "NHV-SH-01",
  location: "Casablanca · Morocco",
  scenario: "Heatwave agrivoltaic optimization",
  operator: "Pilot Operator · Read/Approve",
  timestamp: "2026-06-25 14:32 UTC+1",
};

export const services = [
  { id: "core", name: "NOVA Core AI", status: "online", latencyMs: 84 },
  { id: "agro", name: "NeoAgro", status: "online", latencyMs: 112 },
  { id: "grid", name: "NeoGrid", status: "online", latencyMs: 96 },
  { id: "cell", name: "NeoCell", status: "degraded", latencyMs: 218 },
] as const;

export const productModules = [
  {
    name: "NOVA Command Center",
    product: "NOVA OS",
    status: "ready",
    summary: "Real Lovable Command Center source wired in PR #14.",
    href: "/",
    pr: "https://github.com/wisemaiarservices-debug/NeoHaven-repo-root/pull/14",
  },
  {
    name: "NOVA Agriculture / NeoAgro",
    product: "Agriculture",
    status: "ready",
    summary: "Merged Lovable NeoAgro agrivoltaic UI wired with NOVA Core AI v0 preserved.",
    href: "http://localhost:8506/dashboard",
    pr: "https://github.com/wisemaiarservices-debug/neoagro-platform/pull/15",
  },
  {
    name: "NOVA Energy / NeoGrid",
    product: "Energy",
    status: "ready",
    summary: "Merged Lovable NeoGrid energy UI wired with deterministic fallback API compatibility.",
    href: "http://localhost:8504",
    pr: "https://github.com/wisemaiarservices-debug/neogrid-platform/pull/3",
  },
  {
    name: "NOVA Infrastructure / NeoCell",
    product: "Infrastructure",
    status: "API ready / UI pending",
    summary: "Infrastructure API/spec layer is represented in Command Center; product UI source still pending.",
    href: "/infrastructure",
    pr: "",
  },
  {
    name: "NOVA Core AI",
    product: "Shared AI services",
    status: "integrated",
    summary: "Forecast, recommendation, simulation, and assistant explanation workflow visible.",
    href: "/nova-core",
    pr: "",
  },
  {
    name: "Digital Twin",
    product: "Shared twin layer",
    status: "integrated",
    summary: "Site context, asset graph, and operational chain remain available in the demo shell.",
    href: "/digital-twin",
    pr: "",
  },
  {
    name: "Knowledge Graph",
    product: "Shared intelligence layer",
    status: "integrated",
    summary: "Asset relationships and reasoning chain are visible for operator explanation.",
    href: "/knowledge-graph",
    pr: "",
  },
  {
    name: "Impact Reports",
    product: "Measurement layer",
    status: "integrated",
    summary: "Water, carbon, resilience, and yield-risk impact reporting remains available.",
    href: "/impact",
    pr: "",
  },
] as const;

export const kpis = [
  { label: "Site Health", value: "94", unit: "%", delta: "+1.2", tone: "good" },
  { label: "Crop Health (NDVI)", value: "0.72", unit: "", delta: "+0.03", tone: "good" },
  { label: "Soil Moisture", value: "31", unit: "%", delta: "-4", tone: "warn" },
  { label: "Solar Production", value: "184.6", unit: "kWh", delta: "+12%", tone: "good" },
  { label: "Battery SOC", value: "68", unit: "%", delta: "-6", tone: "warn" },
  { label: "Water Use Today", value: "12.4", unit: "m³", delta: "-18%", tone: "good" },
  { label: "Carbon Avoided", value: "92.1", unit: "kg CO₂e", delta: "+8%", tone: "good" },
  { label: "Resilience Score", value: "78", unit: "/100", delta: "+5", tone: "good" },
] as const;

export const fieldZones = [
  { id: "Z-01", crop: "Tomato",     ndvi: 0.74, moisture: 34, status: "Optimal",  irrigationL: 0 },
  { id: "Z-02", crop: "Tomato",     ndvi: 0.71, moisture: 29, status: "Irrigate", irrigationL: 480 },
  { id: "Z-03", crop: "Lettuce",    ndvi: 0.68, moisture: 26, status: "Stress",   irrigationL: 620 },
  { id: "Z-04", crop: "Lettuce",    ndvi: 0.70, moisture: 31, status: "Watch",    irrigationL: 220 },
  { id: "Z-05", crop: "Pepper",     ndvi: 0.76, moisture: 38, status: "Optimal",  irrigationL: 0 },
  { id: "Z-06", crop: "Pepper",     ndvi: 0.69, moisture: 27, status: "Irrigate", irrigationL: 540 },
  { id: "Z-07", crop: "Strawberry", ndvi: 0.73, moisture: 33, status: "Optimal",  irrigationL: 0 },
  { id: "Z-08", crop: "Strawberry", ndvi: 0.66, moisture: 24, status: "Stress",   irrigationL: 700 },
];

// 24h solar production + battery curves (deterministic).
export const solarSeries = [
  { t: "00", solar:  0, battery: 72, demand: 14 },
  { t: "02", solar:  0, battery: 64, demand: 12 },
  { t: "04", solar:  0, battery: 58, demand: 11 },
  { t: "06", solar:  6, battery: 55, demand: 18 },
  { t: "08", solar: 28, battery: 58, demand: 26 },
  { t: "10", solar: 62, battery: 67, demand: 32 },
  { t: "12", solar: 84, battery: 79, demand: 38 },
  { t: "14", solar: 78, battery: 82, demand: 44 },
  { t: "16", solar: 54, battery: 76, demand: 41 },
  { t: "18", solar: 22, battery: 71, demand: 36 },
  { t: "20", solar:  4, battery: 68, demand: 28 },
  { t: "22", solar:  0, battery: 64, demand: 20 },
];

export const energy = {
  solarTodayKwh: 184.6,
  gridImportKwh: 12.4,
  gridExportKwh: 38.2,
  batterySoc: 68,
  batteryKwh: 54,
  carbonAvoidedKg: 92.1,
};

export const infra = {
  gatewaysOnlinePct: 100,
  sensorsOnlinePct: 96,
  edgeBatteryReservePct: 72,
  dataLatencyMs: 218,
  pumpNodeHealth: "Nominal",
  readinessScore: 88,
  nodes: [
    { id: "GW-01", type: "LoRaWAN Gateway", status: "online",   latency: 84 },
    { id: "GW-02", type: "LoRaWAN Gateway", status: "online",   latency: 96 },
    { id: "SN-12", type: "Soil Sensor",     status: "online",   latency: 210 },
    { id: "SN-18", type: "Soil Sensor",     status: "degraded", latency: 612 },
    { id: "PN-01", type: "Pump Node",       status: "online",   latency: 144 },
    { id: "EM-03", type: "Energy Meter",    status: "online",   latency: 102 },
  ],
};

export const novaForecast = {
  weather: "Heatwave +6°C above seasonal · 72h window",
  irrigationDemand: "+34% above baseline next 24h",
  solarYield: "+12% surplus midday · curtailment risk 16:00–17:30",
  yieldRisk: "Lettuce Z-03 / Z-08 stress probability 0.62 without action",
};

export const recommendations = [
  {
    id: "REC-204",
    title: "Pre-irrigate stressed zones Z-03 & Z-08 before 11:00",
    module: "NeoAgro",
    priority: "High",
    confidence: 0.91,
    impact: { water: "-1.4 m³", carbon: "-6.2 kg", resilience: "+5%", yield: "+7%" },
    rationale:
      "Heatwave forecast + soil moisture < 28% in Z-03/Z-08. Pre-irrigation lowers transpiration stress and avoids peak-hour pumping.",
    status: "Awaiting approval",
  },
  {
    id: "REC-205",
    title: "Shift pump load to 12:00–14:00 solar surplus window",
    module: "NeoGrid",
    priority: "Medium",
    confidence: 0.86,
    impact: { water: "0 m³", carbon: "-9.1 kg", resilience: "+3%", yield: "0%" },
    rationale:
      "Solar yield exceeds onsite demand by 12% midday. Self-consumption avoids grid import and curtailment.",
    status: "Awaiting approval",
  },
  {
    id: "REC-206",
    title: "Reserve 15% battery headroom for evening pump cycle",
    module: "NeoGrid",
    priority: "Medium",
    confidence: 0.78,
    impact: { water: "-0.4 m³", carbon: "-3.0 kg", resilience: "+2%", yield: "+1%" },
    rationale: "Evening irrigation pulse on Z-06 will draw 4.2 kWh; preserve SOC to avoid diesel backup.",
    status: "Awaiting approval",
  },
  {
    id: "REC-207",
    title: "Dispatch field tech to inspect sensor SN-18 (degraded)",
    module: "NeoCell",
    priority: "Low",
    confidence: 0.69,
    impact: { water: "0 m³", carbon: "0 kg", resilience: "+2%", yield: "+1%" },
    rationale: "Latency 612ms · likely battery or antenna degradation. No safety impact.",
    status: "Approved",
  },
];

export const knowledgeGraph = {
  chain: [
    "Heatwave forecast",
    "→ Soil moisture deficit (Z-03, Z-08)",
    "→ Crop stress probability ↑",
    "→ Pre-irrigation recommended",
    "→ Pump load on solar surplus window",
    "→ Battery headroom reserved",
    "→ Yield protected · carbon avoided",
  ],
  assets: [
    { id: "ASSET-PV-01",  type: "Solar Panel Array", capacity: "48 kWp",  zone: "Canopy A" },
    { id: "ASSET-INV-01", type: "Inverter",           capacity: "50 kW",   zone: "Substation" },
    { id: "ASSET-BAT-01", type: "Battery Bank",       capacity: "80 kWh",  zone: "Substation" },
    { id: "ASSET-RES-01", type: "Reservoir",          capacity: "120 m³",  zone: "North" },
    { id: "ASSET-PMP-01", type: "Irrigation Pump",    capacity: "5.5 kW",  zone: "North" },
    { id: "ASSET-FLD-A",  type: "Field Zone",         capacity: "1.2 ha",  zone: "Zones Z-01..Z-04" },
    { id: "ASSET-FLD-B",  type: "Field Zone",         capacity: "1.4 ha",  zone: "Zones Z-05..Z-08" },
    { id: "ASSET-GW-01",  type: "LoRaWAN Gateway",    capacity: "—",       zone: "Mast 1" },
    { id: "ASSET-SN-12",  type: "Soil Sensor",        capacity: "—",       zone: "Z-03" },
  ],
};

export const impact = {
  waterSavingsM3: 3.2,
  carbonReductionKg: 21.8,
  resilienceGainPct: 12,
  yieldRiskReductionPct: 11,
};

export const scenario = {
  name: "Heatwave agrivoltaic optimization",
  baseline: {
    waterM3: 15.6, carbonKg: 0, yieldIndex: 100, resilience: 66,
  },
  optimized: {
    waterM3: 12.4, carbonKg: -21.8, yieldIndex: 111, resilience: 78,
  },
};
