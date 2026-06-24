export type ServiceSnapshot = {
  id: string;
  name: string;
  role: string;
  status: 'connected' | 'fallback';
  scenario: string;
  endpoint: string;
  kpis: Array<{ label: string; value: number | string; unit?: string; trend?: string }>;
  recommendation: string;
};

const fallbackServices: ServiceSnapshot[] = [
  {
    id: 'nova-core',
    name: 'NOVA Core AI v0',
    role: 'Forecast, recommendations, scenario simulation, assistant explanation',
    status: 'fallback',
    scenario: 'Heatwave agrivoltaic optimization',
    endpoint: 'http://localhost:8100',
    kpis: [
      { label: 'Heat Risk', value: 'High' },
      { label: 'Water Demand Delta', value: 18, unit: '%' },
      { label: 'Yield Risk', value: 'Medium High' },
    ],
    recommendation: 'Shift irrigation to evening window',
  },
  {
    id: 'neoagro',
    name: 'NOVA Agriculture / NeoAgro',
    role: 'Agrivoltaic crop, water, solar, carbon, and yield intelligence',
    status: 'fallback',
    scenario: 'Heatwave agrivoltaic optimization',
    endpoint: 'http://localhost:8000',
    kpis: [
      { label: 'Crop Health', value: 82, unit: '%' },
      { label: 'Soil Moisture', value: 31, unit: '%' },
      { label: 'Water Use Today', value: 18.4, unit: 'm3' },
    ],
    recommendation: 'Shift irrigation to evening window',
  },
  {
    id: 'neogrid',
    name: 'NOVA Energy / NeoGrid',
    role: 'Solar, battery, grid import, carbon, and load optimization',
    status: 'fallback',
    scenario: 'SolarHub energy optimization',
    endpoint: 'http://localhost:8200',
    kpis: [
      { label: 'Solar Production', value: 42.6, unit: 'kW' },
      { label: 'Battery State', value: 67, unit: '%' },
      { label: 'Grid Import', value: 4.8, unit: 'kW' },
    ],
    recommendation: 'Coordinate battery charging with irrigation timing',
  },
  {
    id: 'neocell',
    name: 'NOVA Infrastructure / NeoCell',
    role: 'Gateway, sensor, edge battery, latency, and site readiness',
    status: 'fallback',
    scenario: 'SolarHub site readiness and edge telemetry',
    endpoint: 'http://localhost:8300',
    kpis: [
      { label: 'Gateway Online', value: 94, unit: '%' },
      { label: 'Sensor Online', value: 89, unit: '%' },
      { label: 'Readiness Score', value: 87, unit: '%' },
    ],
    recommendation: 'Run pre-heatwave site readiness check',
  },
];

async function getJson(url: string) {
  const response = await fetch(url, { next: { revalidate: 10 } });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.json();
}

function envUrl(key: string, fallback: string) {
  return process.env[key] || fallback;
}

export async function getServiceSnapshots(): Promise<ServiceSnapshot[]> {
  const configs = [
    { id: 'neoagro', url: envUrl('NEXT_PUBLIC_NEOAGRO_API_URL', 'http://localhost:8000') },
    { id: 'neogrid', url: envUrl('NEXT_PUBLIC_NEOGRID_API_URL', 'http://localhost:8200') },
    { id: 'neocell', url: envUrl('NEXT_PUBLIC_NEOCELL_API_URL', 'http://localhost:8300') },
  ];

  const snapshots = await Promise.all(configs.map(async (config) => {
    const fallback = fallbackServices.find((service) => service.id === config.id)!;
    try {
      const data = await getJson(`${config.url}/api/v1/dashboard/summary`);
      const recommendation = data.recommendations?.[0]?.title || fallback.recommendation;
      return {
        ...fallback,
        status: 'connected' as const,
        scenario: data.scenario || fallback.scenario,
        endpoint: config.url,
        kpis: Array.isArray(data.kpis) ? data.kpis.slice(0, 3) : fallback.kpis,
        recommendation,
      };
    } catch {
      return fallback;
    }
  }));

  const coreFallback = fallbackServices.find((service) => service.id === 'nova-core')!;
  const coreUrl = envUrl('NEXT_PUBLIC_NOVA_CORE_API_URL', 'http://localhost:8100');
  let core = coreFallback;
  try {
    const health = await getJson(`${coreUrl}/health`);
    if (health.status === 'ok') {
      core = { ...coreFallback, status: 'connected', endpoint: coreUrl };
    }
  } catch {
    core = coreFallback;
  }

  return [core, ...snapshots];
}

export function aggregateImpact(services: ServiceSnapshot[]) {
  const connected = services.filter((service) => service.status === 'connected').length;
  return {
    connected,
    total: services.length,
    demoReadiness: Math.round(((connected || services.length) / services.length) * 100),
    waterSavingsM3: 3.2,
    carbonReductionKg: 21.8,
    resilienceGainPct: 12,
  };
}
